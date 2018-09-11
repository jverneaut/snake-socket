const express = require('express');
const path = require('path');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const Room = require('./Room.js');

app.use(express.static(path.join(__dirname, '/public')));

const room = new Room(56);
room.addPlayer();

const sockets = [];

function update() {
  room.update();
  sockets.forEach(socket => {
    socket.emit('state', room.room);
  });
}
setInterval(update, 1000 / 24);

io.on('connection', socket => {
  socket.on('key', keycode => {
    room.registerKey(keycode);
  });
  sockets.push(socket);
});

server.listen(process.env.PORT || 5000);
