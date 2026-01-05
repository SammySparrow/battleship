export { Ship };

class Ship {
  constructor(length) {
    this.length = length;
    this.timesHit = 0;
    this.sunk = false;
  }

  hit() {
    this.timesHit += 1;
    if (this.timesHit === this.length) {
      this.sunk = true;
    }
  }
}
