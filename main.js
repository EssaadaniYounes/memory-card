let section = document.querySelector("section");
let playerLivesCounter = document.querySelector(".counter");
let audio = document.querySelector("audio");
let RemainingLives = 80;
playerLivesCounter.textContent = RemainingLives + "s";
document.addEventListener("DOMContentLoaded", (e) => {
  cardGenerator();
  setTimeout(() => {
    removeToggle();
  }, 1000);
});
let getData = () => [
  { src: "images/luffy.jpg", name: "luffy" },
  { src: "images/Zoro.jpg", name: "zoro" },
  { src: "images/sanji.jpg", name: "sanji" },
  { src: "images/nami.jpg", name: "nami" },
  { src: "images/ussop.jpg", name: "ussop" },
  { src: "images/chopper.jpg", name: "chopper" },
  { src: "images/robine.jpg", name: "robine" },
  { src: "images/franky.jpg", name: "franky" },
  { src: "images/luffy.jpg", name: "luffy" },
  { src: "images/Zoro.jpg", name: "zoro" },
  { src: "images/sanji.jpg", name: "sanji" },
  { src: "images/nami.jpg", name: "nami" },
  { src: "images/ussop.jpg", name: "ussop" },
  { src: "images/chopper.jpg", name: "chopper" },
  { src: "images/robine.jpg", name: "robine" },
  { src: "images/franky.jpg", name: "franky" },
];
const randomize = () => {
  let cardData = getData();
  cardData.sort(() => Math.random() - 0.5);
  return cardData;
};
//Creat Array Of Objects
const cardGenerator = () => {
  document.querySelectorAll(".card")?.forEach((item) => item.remove());
  //randomize the object
  const cardData = randomize();

  cardData.forEach((item) => {
    //create the element
    let card = document.createElement("div");
    let image = document.createElement("img");
    let back = document.createElement("div");
    //add some attribut
    card.classList.add("card");
    card.setAttribute("name", item.name);
    card.classList.add("toggledCard");
    image.classList.add("face");
    image.setAttribute("src", item.src);
    back.classList.add("back");

    //Add items to the DOM
    card.appendChild(image);
    card.appendChild(back);
    section.appendChild(card);
    card.addEventListener("click", (e) => {
      card.classList.toggle("toggledCard");
      checkCards(e);
    });
  });

  return cardData;
};
//Remove Toggle When the document is ready
removeToggle = () => {
  let cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.classList.remove("toggledCard");
  });
};
addToggle = () => {
  let cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.classList.add("toggledCard");
  });
  setTimeout(() => {
    removeToggle();
  }, 1000);
};
//check cards
const checkCards = (e) => {
  let clickedCard = e.target;
  clickedCard.classList.add("flipped");
  let toggledCard = document.querySelectorAll(".toggledCard");
  if (toggledCard.length === 16) {
    audio.src = "Success, win sound effect.mp3";
    setTimeout(() => {
      GameReset("Congratulations You Won 🎉👏");
    }, 1000);
  }
  const flippedCard = document.querySelectorAll(".flipped");
  if (flippedCard.length === 2) {
    if (
      flippedCard[0].getAttribute("name") ===
      flippedCard[1].getAttribute("name")
    ) {
      flippedCard.forEach((item) => {
        item.classList.remove("flipped");
        item.style.pointerEvents = "none";
      });
    } else {
      flippedCard.forEach((item) => {
        item.classList.remove("flipped");
        setTimeout(() => {
          item.classList.remove("toggledCard");
        }, 600);
      });
    }
  }
};
//Make A timer
setInterval(() => {
  RemainingLives--;
  playerLivesCounter.textContent = RemainingLives + "s";
  if (RemainingLives <= 10) {
    playerLivesCounter.style.color = "red";
  }
  if (RemainingLives == 0) {
    audio.src = "Sound effect - Wha Wha!.mp3";
    setTimeout(() => {
      GameReset("Opps You Lose 😔 Try Again");
    }, 1000);
  }
}, 1000);
//reset the game

GameReset = (message) => {
  cardGenerator();
  RemainingLives = 80;
  playerLivesCounter.textContent = RemainingLives + "s";
  playerLivesCounter.style.color = "black";
  let cards = randomize();

  let card = document.querySelectorAll(".card");
  let images = document.querySelectorAll(".face");

  section.style.pointerEvents = "none";

  cards.forEach((item, index) => {
    card[index].classList.remove("toggledCard", "flipped");
    setTimeout(() => {
      section.style.pointerEvents = "all";
      card[index].style.pointerEvents = "all";
      card[index].setAttribute("name", item.name);
      images[index].setAttribute("src", item.src);
    }, 1000);
  });
  addToggle();
  setTimeout(() => {
    window.alert(message);
  }, 100);
};
