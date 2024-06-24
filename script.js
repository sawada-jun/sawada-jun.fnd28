"use script"

let imgArray = [
    "アルファード", "ハイエース", "ライズ", "プラド", "ハリアー", "RAV4", "ヤリスクロス", "ヴェルファイア", "プリウス", "レクサスLC"
]

let imgNumArray = [];
for (let i = 0; i < 10; i++) {//画像のURLが入った配列作成
    imgNumArray.push(`<img src="${imgArray[i]}.jpg">`);
}

let array = [];
function numberPea() {
    for (let i = 0; i < 10; i++) {
        array.push(i);
        array.push(i);
    }
}
numberPea();//0~9のペアが入った配列を作成

function shuffle(array) {
    for (let i = array.length - 1; i >= 0; i--) {
        let r = Math.floor(Math.random() * i);//ランダムな整数を代入
        let value = array[i];//ループ時の値を代入
        array[i] = array[r];//ループ時の値にランダム整数で取得したインデックス番号の値を代入
        array[r] = value;//ランダム整数で取得したインデックス番号の値にループ時の値を代入(入れ替え)

    }
    return array;
}
shuffle(array);

let game_board = document.getElementById("game_board");

//div要素作成(カード);
for (i = 0; i < 20; i++) {
    let div = document.createElement("div");
    div.className = "card";//カードの裏側を表示するためのタグ
    div.number = array[i];// カードにインデックス番号を追加
    div.addEventListener("click", turn);//クリックイベントを追加
    game_board.appendChild(div);//土台に各divを追加
}


//一枚目かどうかのフラグ(1枚目:true 2枚目:false)
let firstDraw = 0;
//一枚目のカードを格納
let firstCard;
//揃えた枚数(ペアができるたびに+1 10ペアで終了させる)
let countUnit = 0;

//カードクリック時の処理;
function turn(event) {
    let div = event.target;
    //裏向きのカードをクリックした場合は画像を表示する
    if (div.innerText == '') {
        div.innerHTML = imgNumArray[div.number];//カードに追加されたインデックス番号の画像をurlとして指定して代入
    } else {
        return//数字が表示されているカードはなにもしない
    }

    if (firstDraw === 0) {//一枚目のドローだったら
        firstCard = div;//カードの情報を収納
        firstDraw = 1;//1を代入→二枚目の処理へ
    } else {//二枚目の処理
        if (firstCard.number === div.number) {//二枚目のドローカードの番号が今引いた番号と一緒だったら
            countUnit++;

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
});

document.getElementById("reload").addEventListener("click", function () {
    window.location.reload();
})
