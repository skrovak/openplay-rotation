// Tiny static file server — no dependencies, works out of the box on
// Railway (or anywhere else Node runs). Serves everything in ./public,
// defaulting to index.html.
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, "public");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

function send(res, status, data, contentType){
  res.writeHead(status, { "Content-Type": contentType || "text/plain; charset=utf-8" });
  res.end(data);
}

http.createServer((req, res) => {
  var urlPath = decodeURIComponent(req.url.split("?")[0]);
  if(urlPath === "/") urlPath = "/index.html";

  var fullPath = path.normalize(path.join(PUBLIC_DIR, urlPath));
  // guard against path traversal (e.g. "/../server.js")
  if(!fullPath.startsWith(PUBLIC_DIR)){
    send(res, 403, "Forbidden");
    return;
  }

  fs.readFile(fullPath, function(err, data){
    if(err){
      // single-page app: unknown paths fall back to index.html
      fs.readFile(path.join(PUBLIC_DIR, "index.html"), function(err2, data2){
        if(err2){ send(res, 404, "Not found"); return; }
        send(res, 200, data2, MIME[".html"]);
      });
      return;
    }
    var ext = path.extname(fullPath).toLowerCase();
    send(res, 200, data, MIME[ext] || "application/octet-stream");
  });
}).listen(PORT, function(){
  console.log("Open Play Rotation is up on port " + PORT);
});
