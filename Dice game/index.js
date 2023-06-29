var randomNumber1 = Math.floor(((Math.random())*6)+1);
var randomNumber2 = Math.floor(((Math.random())*6)+1);
var imgAddplayer1 = document.querySelector(".img1");
var imgAddplayer2 = document.querySelector(".img2");
var h1Add = document.querySelector("h1");

if (randomNumber1 == 1){
    imgAddplayer1.setAttribute("src","images/dice1.png");
}
else if (randomNumber1 == 2){
    imgAddplayer1.setAttribute("src","images/dice2.png");
}
else if (randomNumber1 == 3){
    imgAddplayer1.setAttribute("src","images/dice3.png");
}
else if (randomNumber1 == 4){
    imgAddplayer1.setAttribute("src","images/dice4.png");
}
else if (randomNumber1 == 5){
    imgAddplayer1.setAttribute("src","images/dice5.png");
}
else {
    imgAddplayer1.setAttribute("src","images/dice6.png");
}

if (randomNumber2 == 1){
    imgAddplayer2.setAttribute("src","images/dice1.png");
}
else if (randomNumber2 == 2){
    imgAddplayer2.setAttribute("src","images/dice2.png");
}
else if (randomNumber2 == 3){
    imgAddplayer2.setAttribute("src","images/dice3.png");
}
else if (randomNumber2 == 4){
    imgAddplayer2.setAttribute("src","images/dice4.png");
}
else if (randomNumber2 == 5){
    imgAddplayer2.setAttribute("src","images/dice5.png");
}
else {
    imgAddplayer2.setAttribute("src","images/dice6.png");
}

if (randomNumber1 < randomNumber2){
    h1Add.innerHTML = "Player 2 Wins! 🚩";
}
else if (randomNumber1 > randomNumber2){
    h1Add.innerHTML = "Player 1 Wins! 🚩"
}
else {
    h1Add.innerHTML = "Draw!"
}