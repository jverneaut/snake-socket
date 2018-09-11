class Room {
  constructor(size = 32) {
    this.size = size;
    this.resetRoom();
    this.players = [];
  }

  resetRoom() {
    this.room = [];
    for (let i = 0; i < this.size; i++) {
      this.room.push([]);
      for (let j = 0; j < this.size; j++) {
        this.room[i][j] = 0;
      }
    }
  }


  registerKey(key) {
    const { positions } = this.players[0];
    switch (key) {
      case 'ArrowUp':
        if (positions[0][0] === positions[0][1] - 1) return;
        this.players[0].direction = 'up';
        break;
      case 'ArrowDown':
        if (positions[0][1] === positions[0][0] - 1) return;
        this.players[0].direction = 'down';
        break;
      case 'ArrowLeft':
        if (positions[1][1] === positions[0][1] - 1) return;
        this.players[0].direction = 'left';
        break;
      case 'ArrowRight':
        if (positions[0][1] === positions[1][1] - 1) return;
        this.players[0].direction = 'right';
        break;
      default:
        break;
    }
  }

  addPlayer(xStart = 0, yStart = 0, length = 6) {
    const positions = [];
    for (let i = 0; i < length; i++) {
      positions.push([yStart, xStart + (length - i - 1)]);
    }
    const player = {
      "positions": positions,
      "direction": "",
      "id": 1
    }
    this.players.push(player);
  }

  removePlayer(id) {
    this.players = this.players.filter(player => player.id !== id);
  }

  async update() {
    this.resetRoom();
    await this.players.forEach(player => {
      const { positions, id, direction } = player;
      switch (direction) {
        case "right":
          if (positions[0][1] === this.size - 1) return this.removePlayer(id);
          positions.unshift([positions[0][0], positions[0][1] + 1]);
          positions.pop();
          break;
        case "left":
          if (positions[0][1] === 0) return this.removePlayer(id);
          positions.unshift([positions[0][0], positions[0][1] - 1]);
          positions.pop();
          break;
        case "up":
          if (positions[0][0] === 0) return this.removePlayer(id);
          positions.unshift([positions[0][0] - 1, positions[0][1]]);
          positions.pop();
          break;
        case "down":
          if (positions[0][0] === this.size - 1) return this.removePlayer(id);
          positions.unshift([positions[0][0] + 1, positions[0][1]]);
          positions.pop();
          break;
        default:
          break;
      }
      positions.forEach((pos, index) => {
        const posX = pos[1];
        const posY = pos[0];
        this.room[posY][posX] = index === 0 ? id * 10 : id;
      });
      return;
    });
  }
}

module.exports = Room;
