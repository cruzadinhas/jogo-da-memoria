let images = [];

let flippedCards = [];

let modalGameOver = document.querySelector('#modalGameOver');

let matches = 0;

let imgMatchSign = document.querySelector("#imgMatchSign");

for(var i = 0; i < 10; i++) {
    var img = {
        src: "./img/"+ i + ".jpg",
        id: i%5
    };
    images.push(img);
};


startGame();

function startGame(){
    matches = 0;

    flippedCards = [];

    images = randomSort(images);

    modalGameOver.style.zIndex = -2;
    modalGameOver.removeEventListener("click" , startGame , false);

    let frontFaces = document.getElementsByClassName("front");
    let backFaces = document.getElementsByClassName("back");
   
    for(var i = 0; i < 16; i++) {
        frontFaces[i].classList.remove("flipped" , "match");
        backFaces[i].classList.remove("flipped" , "match");

        let card = document.querySelector("#card" + i);
        card.style.left = i % 5 === 0 ? 5 + "px" : i % 5 * 225 + "px";
        card.style.top = i < 5 ? 5 + "px" : 450 + "px";

        card.addEventListener('click' , flipCard , false);

        frontFaces[i].style.background = `url('${images[i].src}')`;
        frontFaces[i].setAttribute("id" , images[i].id);
    }

};

function randomSort(oldArray){
   let newArray = [];

   while(newArray.length !== oldArray.length) {
        var i = Math.floor(Math.random() * oldArray.length);

        if(newArray.indexOf(oldArray[i]) < 0) {
            newArray.push(oldArray[i]);
        }
   }

   return newArray;
};

function flipCard() {
    if(flippedCards.length < 2) {
        let faces = this.getElementsByClassName("face");

        if(faces[0].classList.length > 2){
            return;
        };


        faces[0].classList.toggle("flipped");
        faces[1].classList.toggle("flipped");

        flippedCards.push(this);

        if(flippedCards.length === 2){
            if(flippedCards[0].childNodes[3].id === flippedCards[1].childNodes[3].id){
                flippedCards[0].childNodes[1].classList.toggle("match");
                flippedCards[0].childNodes[3].classList.toggle("match");
                flippedCards[1].childNodes[1].classList.toggle("match");
                flippedCards[1].childNodes[3].classList.toggle("match");
                
                matchCardSign();

                matches++;

                flippedCards = [];

                if(matches === 5){
                    gameOver();
                }
            }
        }

    } else {
        flippedCards[0].childNodes[1].classList.toggle("flipped");
        flippedCards[0].childNodes[3].classList.toggle("flipped");
        flippedCards[1].childNodes[1].classList.toggle("flipped");
        flippedCards[1].childNodes[3].classList.toggle("flipped");

        flippedCards = [];
    };
    

};


function gameOver() {
    modalGameOver.style.zIndex = 10;
    modalGameOver.addEventListener("click" , startGame , false);
};

function matchCardSign() {
    imgMatchSign.style.zIndex = 1;
    imgMatchSign.style.top = 150 + "px";
    imgMatchSign.style.opacity = 0;
    setTimeout(function(){
        imgMatchSign.style.zIndex = -1;
        imgMatchSign.style.top = 250 + "px";
        imgMatchSign.style.opacity = 1;
    },1500);
};
