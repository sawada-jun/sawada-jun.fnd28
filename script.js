"use strict";

let imgArray = [
    "アルファート", "ハイエース", "ライス", "フラト", "ハリアー", "RAV4", "ヤリスクロス", "ウェルファイア", "フリウス", "コヘン"
];

let imgNumArray = [];
for (let i = 0; i < 10; i++) { //画像のURLが入った配列作成
    imgNumArray.push("<img src='" + imgArray[i] + ".png'>");
}

let array = [];
function numberPea() {
    for (let i = 0; i < 10; i++) {
        array.push(i);
        array.push(i);
    }
}
numberPea(); //0~9のペアが入った配列を作成

function shuffle(array) {
    for (let i = array.length - 1; i >= 0; i--) {
        let r = Math.floor(Math.random() * (i + 1)); //ランダムな整数を代入
        let value = array[i]; //ループ時の値を代入
        array[i] = array[r]; //ループ時の値にランダム整数で取得したインデックス番号の値を代入
        array[r] = value; //ランダム整数で取得したインデックス番号の値にループ時の値を代入(入れ替え)
    }
    return array;
}

function createGameBoard() {
    shuffle(array);
    let game_board = document.getElementById("game_board");
    game_board.innerHTML = ''; // 既存のカードを削除
    for (let i = 0; i < 20; i++) {
        let div = document.createElement("div");
        div.className = "card"; //カードの裏側を表示するためのタグ
        div.number = array[i]; // カードにインデックス番号を追加
        div.addEventListener("click", turn); //クリックイベントを追加
        game_board.appendChild(div); //土台に各divを追加
    }
}

// タイマー用の変数
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

//一枚目かどうかのフラグ(1枚目:true 2枚目:false)
let firstDraw = 0;
//一枚目のカードを格納
let firstCard;
//揃えた枚数(ペアができるたびに+1 10ペアで終了させる)
let countUnit = 0;

function turn(event) {
    let div = event.target;
    // 裏向きのカードをクリックした場合は画像を表示する
    if (div.innerText === '') {
        div.innerHTML = imgNumArray[div.number]; //カードに追加されたインデックス番号の画像をurlとして指定して代入
    } else {
        return; //数字が表示されているカードはなにもしない
    }

    if (firstDraw === 0) { //一枚目のドローだったら
        firstCard = div; //カードの情報を収納
        firstDraw = 1; //1を代入→二枚目の処理へ
    } else { //二枚目の処理
        if (firstCard.number === div.number) { //二枚目のドローカードの番号が今引いた番号と一緒だったら
            countUnit++;
            if (countUnit === 10) {
                stopTimer();
                document.getElementById("result_box").style.display = "block";
                updateElapsedTime(); // 経過時間を更新して表示
            }
        } else {
            div.innerHTML = imgNumArray[div.number];
            setTimeout(function () {
                div.innerHTML = "";
                firstCard.innerText = '';
            }, 500);
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
    updateElapsedTime(); // 経過時間を更新して表示
});

document.getElementById("reload").addEventListener("click", function () {
    stopTimer(); // 既存のタイマーを停止
    countUnit = 0; // 揃えた枚数をリセット
    firstDraw = 0; // 一枚目フラグをリセット
    createGameBoard(); // ゲームボードを再作成
    startTimer(); // タイマーを再開
    document.getElementById("result_box").style.display = "none"; // 結果ボックスを非表示にする
});

// ページ読み込み時にゲームボードを作成
window.onload = function() {
    createGameBoard();
    startTimer(); // ページ読み込み時にタイマーを開始
}
