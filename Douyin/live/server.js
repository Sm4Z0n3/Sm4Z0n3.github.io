// 服务器端代码
var http = require('http');
var io = require('socket.io');

// 创建一个http服务器，监听3000端口
var server = http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
});
server.listen(3000);

// 创建一个socket.io实例，绑定到http服务器上
var socket = io(server);

// 监听客户端连接事件
socket.on('connection', function(client) {
  console.log('Client connected');

  // 监听客户端发送的消息事件
  client.on('message', function(data) {
    console.log('Received message from client: ' + data);

    // 向客户端回复消息
    client.send('Hello, client');
  });

  // 监听客户端断开连接事件
  client.on('disconnect', function() {
    console.log('Client disconnected');
  });
});
