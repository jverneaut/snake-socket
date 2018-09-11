const express = require('express');
const path = require('path');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const Room = require('./Room.js');

app.use(express.static(path.join(__dirname, '/public')));

const room = new Room(24);
room.addPlayer();

io.on('connection', socket => {
  socket.on('key', keycode => {
    room.registerKey(keycode);
  });
  async function update() {
    await room.update();
    socket.emit('state', room.room);
  }
  setInterval(update, 300);
});

server.listen(process.env.PORT || 5000);
