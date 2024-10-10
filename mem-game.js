const cards = document.querySelectorAll('.mem-card');

let flippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let score = 0;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!flippedCard) {
    //first click
    flippedCard = true;
    firstCard = this;

    return;
  }

    //second click
  flippedCard = false;
  secondCard = this;
    
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();

}
function disableCards() {
  //it matches!
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  
  resetBoard();
}

function unflipCards() {
  lockBoard = true; 
  //no match
  setTimeout(() => {
    firstCard.classList.remove('flip')
    secondCard.classList.remove('flip');

    lockBoard = false;
  }, 1000); 
}

function resetBoard() {
  [flippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffleCards() {
  cards.forEach(card => {
  let randomPos = Math.floor(Math.random() *12);
  card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));





// const gridContainer = document.querySelector(".grid-container");
// let cards = [];
// let firstCard, secondCard;
// let lockBoard = false;
// let score = 0;

// document.querySelector(".score").textContent = score;

// fetch("./data/cards.json")
//   .then((res) => res.json())
//   .then((data) => {
//     cards = [...data, ...data];
//     shuffleCards();
//     generateCards();
//   });

//   function shuffleCards() {
//     let currentIndex = cards.length,
//       randomIndex,
//       temporaryValue;
//     while (currentIndex !== 0) {
//       randomIndex = Math.floor(Math.random() * currentIndex);
//       currentIndex -= 1;
//       temporaryValue = cards[currentIndex];
//       cards[currentIndex] = cards[randomIndex];
//       cards[randomIndex] = temporaryValue;
//     }
//   }

//   function generateCards() {
//     for (let card of cards) {
//       const cardElement = document.createElement("div");
//       cardElement.classList.add("card");
//       cardElement.setAttribute("data-name", card.name);
//       cardElement.innerHTML = `
//         <div class= "front">
//           <img class= "front-image" src=${card.image}>
//         </div>
//         <div class="back"></div>
//         `;
//       gridContainer.appendChild(cardElement);
//       cardElement.addEventListener("click", flipCard);
//     }
//   }

//   function flipCard() {
//     if (lockBoard) return;
//     if (this === firstCard) return;
   
//     this.classList.add(".card. flipped");

//     if (firstCard) {
//       firstCard = this;
//       return;
//     }

//     secondCard = this;
//     score++;
//     document.querySelector(".score").textContent = score;
//     lockBoard = true;

//     checkForMatch();
// }

// function checkForMatch() {
//   let isMatch = firstCard.dataset.name === secondCard.dataset.name;   
  
//   isMatch ? disableCards() : unflipCards();
// }

// function disableCards() {
//   firstCard.removeEventListener("click", flipCard);
//   secondCard.removeEventListener("click", flipCard);

//   resetBoard();
// }

// function unflipCards() {
//   setTimeout(() => {
//     firstCard.classList.remove("flipped");
//     secondCard.classList.remove("flipped");
//     resetBoard();
//   }, 1000);
// }

// function resetBoard() {
//   firstCard = null;
//   secondCard = null;
//   lockBoard = false;
// }

// function restart() {
//   resetBoard();
//   shuffleCards();
//   score = 0;
//   document.querySelector(".score").textContent = score;
//   gridContainer.innerHTML = "";
//   generateCards();
// }