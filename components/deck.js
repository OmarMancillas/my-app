class Deck {
  numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
  suits = ["♣", "♦", "♥", "♠"];

  cards = [];
  randomTable = [];

  constructor() {
    this.suits.forEach((suit) => {
      this.numbers.forEach((face) => {
        this.cards.push(face + suit);
      });
    });
    this.randomTable = this.random();
  }

  dispatchCards(size) {
    return new Array(size)
      .fill()
      .map(
        () =>
          this.cards.splice(parseInt(Math.random() * this.cards.length), 1)[0]
      );
  }

  random(){
    return new Array(5)
      .fill()
      .map(
        () =>
          this.cards.splice(parseInt(Math.random() * this.cards.length), 1)[0]
      );
  }
}

class Hand {
  cards = [];
  constructor(deck, size) {
    this.cards = deck.dispatchCards(size);
  }
}

module.exports = {
  Deck,
  Hand,
};
