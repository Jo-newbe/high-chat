const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { resolve } = require('path');

app.use(require('express').static('static'));

app.use('/', (req, res) => {
  res.sendFile(resolve(__dirname, './index.html'));
});

io.on('connection', client => {
  // 服务端接收数据的事件
  client.on('new message', msg => {
    // 只要收到新的消息，向其他用户广播消息、
    client.broadcast.emit('new message', msg);
    // console.log(msg);
    // io.emit('new message', msg);
  });
});

server.listen(80, () => {
  console.log('Server Started.');
});
