const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 42424;

http.createServer((req, res) => {
    let filePath = '.' + req.url;
    if (filePath === './') filePath = './index.html';
    
    // Parametreleri temizle (örn: ?v=1)
    filePath = filePath.split('?')[0];

    const extname = path.extname(filePath);
    let contentType = 'text/html';
    switch (extname) {
        case '.js': contentType = 'text/javascript'; break;
        case '.css': contentType = 'text/css'; break;
        case '.json': contentType = 'application/json'; break;
        case '.png': contentType = 'image/png'; break;      
        case '.jpg': contentType = 'image/jpg'; break;
        case '.wav': contentType = 'audio/wav'; break;
        case '.svg': contentType = 'image/svg+xml'; break;
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if(err.code == 'ENOENT'){
                res.writeHead(404);
                res.end("Dosya bulunamadi.");
            } else {
                res.writeHead(500);
                res.end('Sunucu hatasi: ' + err.code);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
}).listen(PORT, () => {
    console.log(`Sunucu baslatildi: http://localhost:${PORT}/`);
});
