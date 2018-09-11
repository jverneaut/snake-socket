const socket = io.connect('http://localhost:5000');
import Board from './Board.js';

const canvas = document.getElementById('canvas');
const { width, height } = canvas;
const ctx = canvas.getContext('2d');
ctx.beginPath();
ctx.fillStyle = '#000';
ctx.rect(0, 0, width, height);
ctx.fill();

socket.on('state', room => {
  const board = new Board(room, width, height);
  board.draw(ctx);
});

window.addEventListener('keydown', event => {
  ['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'].forEach(keyCode => {
    if (event.code === keyCode) {
      socket.emit('key', keyCode);
    }
  });
});
