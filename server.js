var http = require('http');
var fs = require('fs');
var url = require('url');


// 创建服务器
http.createServer( function (request, response) {
   // 解析请求，包括文件名
   var pathname = url.parse(request.url).pathname;

   // 输出请求的文件名
   console.log("Request for " + pathname + " received.");
   //获取最后一个.的位置
   var index = pathname.lastIndexOf(".");
   //获取后缀
   var ext = pathname.substr(index+1);
   //输出结果
   console.log("file extension:" + ext);
   console.log("readFile:" + pathname.substr(1));
   if (ext === "png") {
      var image = fs.readFileSync(pathname.substr(1));
      response.writeHead(200, {'Content-Type': 'image/png'});
      response.end(image, 'binary')
   } else {
      // 从文件系统中读取请求的文件内容
      fs.readFile(pathname.substr(1), function (err, data) {
         if (err) {
            console.log(err);
            // HTTP 状态码: 404 : NOT FOUND
            // Content Type: text/plain
            response.writeHead(404, {'Content-Type': 'text/html'});
         } else {
            // HTTP 状态码: 200 : OK
            // Content Type: text/plain
            response.writeHead(200, {'Content-Type': 'text/html'});

            // 响应文件内容
            response.write(data.toString());
         }
         //  发送响应数据
         response.end();
      });
   }
}).listen(3001);

// 控制台会输出以下信息
console.log('Server running at http://127.0.0.1:3001/');