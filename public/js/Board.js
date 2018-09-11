export default class Board {
  constructor(room, width, height) {
    this.state = room;
    this.width = width;
    this.height = height;
    this.xSize = room[0].length;
    this.ySize = room.length;
  }

  draw(ctx) {
    const tileWidth = this.width / this.xSize;
    const tileHeight = this.height / this.ySize;
    for (let i = 0; i < this.xSize; i++) {
      for (let j = 0; j < this.ySize; j++) {
        ctx.beginPath();
        switch (this.state[j][i]) {
          case 10:
            ctx.fillStyle = 'red';
            ctx.lineWidth = 8;
            ctx.strokeStyle = '#fff';
            ctx.rect(i * tileWidth + 4, j * tileHeight + 4, tileWidth - 8, tileHeight - 8);
            ctx.stroke();
            break;
          case 1:
            ctx.fillStyle = 'red';
            ctx.strokeStyle = 'red';
            ctx.rect(i * tileWidth, j * tileHeight, tileWidth, tileHeight);
            break;
          case 2:
            ctx.fillStyle = 'yellow';
            ctx.strokeStyle = 'yellow';
            ctx.rect(i * tileWidth, j * tileHeight, tileWidth, tileHeight);
            break;
          case 20:
            ctx.fillStyle = 'yellow';
            ctx.lineWidth = 8;
            ctx.strokeStyle = 'red';
            ctx.rect(i * tileWidth + 4, j * tileHeight + 4, tileWidth - 8, tileHeight - 8);
            ctx.stroke();
            break;
          default:
            ctx.lineWidth = 0;
            ctx.fillStyle = 'black';
            ctx.rect(i * tileWidth, j * tileHeight, tileWidth, tileHeight);
            break;
        }
        ctx.fill();
      }
    }
  }
}
