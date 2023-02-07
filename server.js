const http = require('http');
const fs = require("fs");
const { url } = require('inspector');

const server = http.createServer((req, res) => {
  // Your code here
  const assetsPath = './assets/'
  if (req.url.startsWith('/static')) {
    let urlParts = req.url.split('/');
    
    if (req.method === 'GET' && urlParts.length >= 3) {      
      let asset;
      let assetDir = urlParts[2]
      let fileName = urlParts[3];
      let fileExt = fileName.slice(fileName.indexOf('.') + 1)
      let assetPath = assetsPath + assetDir + '/' + fileName ;
           
      if (fileExt.toLowerCase() === 'jpg') {
        res.setHeader('Content-type', 'image/jpeg');
        asset = fs.readFileSync(assetPath)
      }
      if (fileExt.toLowerCase() === 'css') {
        res.setHeader('Content-type', 'text/css');
        asset = fs.readFileSync(assetPath, 'utf-8')
      }
      res.statusCode = 200;
      res.body = asset;
      return res.end(res.body);
    }

  }


  let indexHtml = fs.readFileSync('./index.html', 'utf-8');
  res.statusCode = 200;
  res.setHeader('Content-type', 'text/html');
  res.body = indexHtml;
  res.end(res.body)
});

const port = 5000;

server.listen(port, () => console.log('Server is listening on port', port));