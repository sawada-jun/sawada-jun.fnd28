"use strict";

let imgArray = [
    "アルファート", "ハイエース", "ライス", "フラト", "ハリアー", "RAV4", "ヤリスクロス", "ウェルファイア", "フリウス", "コヘン"
];

let imgNumArray = [];
for (let i = 0; i < 10; i++) { 
    imgNumArray.push("<img src='" + imgArray[i] + ".png'>");
}

let array = [];
function numberPea() {
    for (let i = 0; i < 10; i++) {
        array.push(i);
        array.push(i);
    }
}
numberPea(); 

function shuffle(array) {
    for (let i = array.length - 1; i >= 0; i--) {
        let r = Math.floor(Math.random() * (i + 1)); 
        let value = array[i];
        array[i] = array[r];
        array[r] = value; 
    }
    return array;
}

function createGameBoard() {
    shuffle(array);
    let game_board = document.getElementById("game_board");
    game_board.innerHTML = ''; 
    for (let i = 0; i < 20; i++) {
        let div = document.createElement("div");
        div.className = "card"; 
        div.number = array[i]; 
        div.addEventListener("click", turn); //クリックイベ
        game_board.appendChild(div); 
    }
}


let startTime;
let timer;

function startTimer() {
    startTime = Date.now();
    timer = setInterval(updateElapsedTime, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

function updateElapsedTime() {
    let elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById("elapsed_time").innerText = elapsedTime;
}


let firstDraw = 0;

let firstCard;

let countUnit = 0;

function turn(event) {
    let div = event.target;
   
    if (div.innerText === '') {
        div.innerHTML = imgNumArray[div.number]; 
    } else {
        return; 
    }

    if (firstDraw === 0) { 
        firstCard = div;
        firstDraw = 1;
    } else { 
        if (firstCard.number === div.number) { 
            countUnit++;
            if (countUnit === 10) {
                stopTimer();
                document.getElementById("result_box").style.display = "block";
                updateElapsedTime(); 
            }
        } else {
            div.innerHTML = imgNumArray[div.number];
            setTimeout(function () {
                div.innerHTML = "";
                firstCard.innerText = '';
            }, 800);
        }
        firstDraw = 0;
    }
}




document.getElementById("button").addEventListener("click", function () {
    let cards = document.querySelectorAll(".card");
    for (let i = 0; i < cards.length; i++) {
        cards[i].innerHTML = imgNumArray[cards[i].number];
    }
    stopTimer();
    document.getElementById("result_box").style.display = "block";
    updateElapsedTime(); 
});

document.getElementById("reload").addEventListener("click", function () {
    stopTimer(); 
    countUnit = 0; 
    firstDraw = 0; 
    createGameBoard(); 
    startTimer();
    document.getElementById("result_box").style.display = "none";
});


window.onload = function() {
    createGameBoard();
    startTimer(); 
}
