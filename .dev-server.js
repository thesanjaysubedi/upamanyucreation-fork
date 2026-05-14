const http = require('http');
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const port = 8080;
const types = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.gif': 'image/gif', '.webp': 'image/webp', '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon', '.json': 'application/json',
  '.mp4': 'video/mp4', '.webm': 'video/webm', '.mov': 'video/quicktime'
};

const WORK_HTML = path.join(root, 'work.html');
const ASSETS_WORK = path.join(root, 'assets', 'work');

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let total = 0;
    const limit = 250 * 1024 * 1024;
    req.on('data', (c) => {
      total += c.length;
      if (total > limit) { req.destroy(); reject(new Error('Body too large (max 250 MB)')); return; }
      chunks.push(c);
    });
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

function jsonResponse(res, status, obj) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(obj));
}

function safeFileName(name) {
  return name.replace(/[^a-zA-Z0-9._-]/g, '_').replace(/_{2,}/g, '_');
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function uniquePath(dir, baseName, ext) {
  let name = `${baseName}${ext}`;
  let i = 1;
  while (fs.existsSync(path.join(dir, name))) {
    name = `${baseName}-${i}${ext}`;
    i++;
  }
  return name;
}

async function handleAddWork(req, res) {
  try {
    const buf = await readBody(req);
    const data = JSON.parse(buf.toString('utf8'));
    const { filename, base64, thumbBase64, title, category } = data;
    if (!filename || !base64 || !title || !category) return jsonResponse(res, 400, { error: 'filename, base64, title, category are required' });
    if (!['video', 'poster'].includes(category)) return jsonResponse(res, 400, { error: 'category must be "video" or "poster"' });

    const subDir = category === 'video' ? 'videos' : 'posters';
    const targetDir = path.join(ASSETS_WORK, subDir);
    fs.mkdirSync(targetDir, { recursive: true });

    const ext = path.extname(filename).toLowerCase();
    const baseName = safeFileName(path.basename(filename, ext) || 'item');
    const finalName = uniquePath(targetDir, baseName, ext);
    fs.writeFileSync(path.join(targetDir, finalName), Buffer.from(base64, 'base64'));
    const fileBaseNoExt = path.basename(finalName, ext);

    const relFile = `assets/work/${subDir}/${finalName}`.replace(/\\/g, '/');
    const isVideoFile = ['.mp4', '.webm', '.mov'].includes(ext);
    const isImage = ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext);

    let thumbRel = relFile;
    if (category === 'video' && isVideoFile && thumbBase64) {
      const thumbName = `${fileBaseNoExt}-thumb.jpg`;
      const thumbPath = path.join(targetDir, thumbName);
      fs.writeFileSync(thumbPath, Buffer.from(thumbBase64, 'base64'));
      thumbRel = `assets/work/${subDir}/${thumbName}`.replace(/\\/g, '/');
    } else if (category === 'video' && !thumbBase64) {
      thumbRel = relFile;
    }

    const dataType = (category === 'video' && isVideoFile) ? 'video' : 'image';
    const cssClass = category === 'video' ? 'video' : 'poster';
    const catLabel = category === 'video' ? 'Video Ad' : 'Poster';
    const titleEsc = escapeHtml(title);
    const catEsc = escapeHtml(catLabel);

    const snippet = `        <div class="item ${cssClass}" data-type="${dataType}" data-src="${relFile}" data-title="${titleEsc}" data-cat="${catEsc}"><img src="${thumbRel}" alt=""><div class="meta"><span>${catEsc}</span><h4>${titleEsc}</h4></div></div>`;

    let workHtml = fs.readFileSync(WORK_HTML, 'utf8');
    const gridStart = workHtml.indexOf('<div class="work-grid">');
    if (gridStart === -1) return jsonResponse(res, 500, { error: 'work-grid not found' });
    let depth = 0; let i = gridStart; let endIdx = -1;
    while (i < workHtml.length) {
      if (workHtml.startsWith('<div', i)) { depth++; i = workHtml.indexOf('>', i) + 1; continue; }
      if (workHtml.startsWith('</div>', i)) {
        depth--;
        if (depth === 0) { endIdx = i; break; }
        i += 6; continue;
      }
      i++;
    }
    if (endIdx === -1) return jsonResponse(res, 500, { error: 'Could not match work-grid closing div' });
    const newHtml = workHtml.slice(0, endIdx) + snippet + '\n      ' + workHtml.slice(endIdx);
    fs.writeFileSync(WORK_HTML, newHtml);

    return jsonResponse(res, 200, { ok: true, file: relFile, thumbnail: thumbRel });
  } catch (e) {
    return jsonResponse(res, 500, { error: e.message });
  }
}

function parseWorkItems() {
  const html = fs.readFileSync(WORK_HTML, 'utf8');
  const itemRegex = /<div class="item (video|poster)"\s+data-type="([^"]*)"\s+data-src="([^"]*)"\s+data-title="([^"]*)"\s+data-cat="([^"]*)"><img src="([^"]*)"[^>]*>.*?<\/div>\s*<\/div>/g;
  const items = [];
  let m;
  while ((m = itemRegex.exec(html)) !== null) {
    items.push({
      cssClass: m[1],
      dataType: m[2],
      src: m[3],
      title: m[4],
      cat: m[5],
      thumb: m[6]
    });
  }
  return items;
}

async function handleListWork(req, res) {
  try {
    const items = parseWorkItems();
    return jsonResponse(res, 200, { items });
  } catch (e) {
    return jsonResponse(res, 500, { error: e.message });
  }
}

function safeWithinAssetsWork(p) {
  const abs = path.resolve(root, p);
  return abs.startsWith(ASSETS_WORK + path.sep) || abs.startsWith(ASSETS_WORK + '/');
}

async function handleDeleteWork(req, res) {
  try {
    const buf = await readBody(req);
    const { src } = JSON.parse(buf.toString('utf8'));
    if (!src) return jsonResponse(res, 400, { error: 'src is required' });

    let workHtml = fs.readFileSync(WORK_HTML, 'utf8');
    const items = parseWorkItems();
    const target = items.find(it => it.src === src);
    if (!target) return jsonResponse(res, 404, { error: 'Item not found in work.html' });

    const escSrc = src.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const removeRegex = new RegExp(`\\s*<div class="item (?:video|poster)"\\s+data-type="[^"]*"\\s+data-src="${escSrc}"\\s+data-title="[^"]*"\\s+data-cat="[^"]*"><img src="[^"]*"[^>]*>.*?<\\/div>\\s*<\\/div>`, 'g');
    const newHtml = workHtml.replace(removeRegex, '');
    if (newHtml === workHtml) return jsonResponse(res, 500, { error: 'Could not remove item from work.html' });
    fs.writeFileSync(WORK_HTML, newHtml);

    const deleted = [];
    if (target.src.startsWith('assets/work/') && safeWithinAssetsWork(target.src)) {
      const filePath = path.join(root, target.src);
      if (fs.existsSync(filePath)) { fs.unlinkSync(filePath); deleted.push(target.src); }
    }
    if (target.thumb !== target.src && target.thumb.startsWith('assets/work/') && safeWithinAssetsWork(target.thumb)) {
      const thumbPath = path.join(root, target.thumb);
      if (fs.existsSync(thumbPath)) { fs.unlinkSync(thumbPath); deleted.push(target.thumb); }
    }

    return jsonResponse(res, 200, { ok: true, deletedFiles: deleted });
  } catch (e) {
    return jsonResponse(res, 500, { error: e.message });
  }
}

http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/api/add-work') return handleAddWork(req, res);
  if (req.method === 'GET'  && req.url === '/api/list-work') return handleListWork(req, res);
  if (req.method === 'POST' && req.url === '/api/delete-work') return handleDeleteWork(req, res);

  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  const file = path.join(root, p);
  if (!file.startsWith(root)) { res.writeHead(403); return res.end(); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end('Not found: ' + p); }
    const ext = path.extname(file).toLowerCase();
    res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(port, '0.0.0.0', () => console.log('Server on http://localhost:' + port + ' (LAN: bound to 0.0.0.0)'));
