"use strict";

var allCards = document.querySelectorAll('.card'); 
var pictureCards = document.querySelectorAll('[data-group="picture"]'); 
var nameCards = document.querySelectorAll('[data-group="name"]'); 
var relationshipCards = document.querySelectorAll('[data-group="relationship"]'); 

let pictureCard, nameCard, relationshipCard;

function start() {
  allCards.forEach(card => card.addEventListener("click", selectCardType));
  document.getElementById("start").style.visibility = "hidden";
  document.getElementById("instructions").innerHTML = "Please select the correct picture, name and relationship for each of your family members";
  let newPos;
  for (let cardIndex = 0; cardIndex<allCards.length; cardIndex++) {
    newPos = Math.floor(Math.random() * allCards.length);
    allCards[cardIndex].style.order = newPos;
    allCards[cardIndex].selected = false;
  }
};

function checkDoneGame() {
  if (document.getElementsByClassName("card").length == 0) {
    document.getElementById("replay").style.visibility = "visible";
  }
}

function unselectMatch() {
  unselectCard(pictureCard);
  unselectCard(nameCard);
  unselectCard(relationshipCard);
}

function deleteMatch() {
  pictureCard.remove();
  nameCard.remove();
  relationshipCard.remove();
  unselectMatch();
  checkDoneGame();
}

function displayMatch(isMatch) {
  if (isMatch) {
    pictureCard.style.border = "5px solid green";
    nameCard.style.border = "5px solid green";
    relationshipCard.style.border = "5px solid green";
    document.getElementById("status").style.visibility = "visible";
    document.getElementById("status").innerHTML = "Correct!";
    document.getElementById("status").style.color = "green";
    setTimeout(function() {
      deleteMatch();
      document.getElementById("status").style.visibility = "hidden";
    }, 900);
  } 
  else {
    pictureCard.style.border = "5px solid red"; 
    nameCard.style.border = "5px solid red"; 
    relationshipCard.style.border = "5px solid red"; 
    document.getElementById("status").style.visibility = "visible";
    document.getElementById("status").innerHTML = "Try Again!";
    document.getElementById("status").style.color = "red";
    setTimeout(function() {
      unselectMatch();    
      document.getElementById("status").style.visibility = "hidden";
    }, 900);
  } 
}

function checkForMatch() {
  if(pictureCard != null && nameCard != null && relationshipCard != null) {
    if(pictureCard.dataset.name === nameCard.dataset.name &&
      nameCard.dataset.relation === relationshipCard.dataset.relation) {
        displayMatch(true);
    }
    else {
        displayMatch(false);
    }
  }
}

function unselectCard(card) {
  card.style.border = "5px solid black";
  card.selected = false;
  if (card.dataset.group == "picture") {
    pictureCard = null;
  }
  if (card.dataset.group == "name") {
    nameCard = null;
  }
  if (card.dataset.group == "relationship") {
    relationshipCard = null;
  }
}

function selectCard(card, cardGroup) {
  if (card.selected) {
    unselectCard(card);
  }
  else {
    card.style.border = "5px solid yellow";
    card.selected = true;   
    for(var cardIndex = 0; cardIndex<cardGroup.length; cardIndex++) {
      if (cardGroup[cardIndex] != card && cardGroup[cardIndex].selected) {
        unselectCard(cardGroup[cardIndex]);
      }
    }
    if (card.dataset.group == "picture") {
      pictureCard = card;
    }
    if (card.dataset.group == "name") {
      nameCard = card;
    }
    if (card.dataset.group == "relationship") {
      relationshipCard = card;
    }
    checkForMatch();
  }
}

function selectCardType(){
  if (this.dataset.group == "picture") {
    selectCard(this, pictureCards);
  }
  if (this.dataset.group == "name") {
    selectCard(this, nameCards);
  }
  if (this.dataset.group == "relationship") {
    selectCard(this, relationshipCards);
  }
}

function replay() {
  window.location.reload();
}

document.getElementById("start").addEventListener("click", start); 
document.getElementById("replay").addEventListener("click", replay); 
