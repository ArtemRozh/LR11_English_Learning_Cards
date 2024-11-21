const words = [
    { original: "winner", translated: "переможець" },
    { original: "height", translated: "висота" },
    { original: "hospital", translated: "лікарня" },
    { original: "bedroom", translated: "спальня" },
    { original: "chocolate", translated: "шоколад" },
    { original: "role", translated: "роль" },
    { original: "comparison", translated: "порівняння" },
    { original: "army", translated: "армія" },
    { original: "midnight", translated: "північ" },
    { original: "restaurant", translated: "ресторан" },
    { original: "buyer", translated: "покупець" },
    { original: "volume", translated: "об'єм" },
    { original: "student", translated: "студент" },
    { original: "product", translated: "продукт" },
    { original: "studio", translated: "студія" },
    { original: "psychology", translated: "психологія" },
    { original: "television", translated: "телебачення" },
    { original: "affair", translated: "справа" },
    { original: "clothes", translated: "одяг" },
    { original: "two", translated: "два" },
    { original: "failure", translated: "невдача" },
    { original: "art", translated: "мистецтво" },
    { original: "coffee", translated: "кава" },
    { original: "mixture", translated: "суміш" }
];

let availableWords = words.slice();
let currentWords = [];
let currentSize;
let current = 0;
let maxSize = words.length;
let guessed = new Array(currentSize).fill(false);
let state = true;
let guesses = [0,0];

let temp = prompt("Введіть кількість слів (від 10 до 25)");
if (temp >= 10 && temp <= maxSize+1) {
    currentSize = parseInt(temp);
} else{
    currentSize = 10;
}

function fillWords(){
    for(let i = 0; i < currentSize; ++i){
        let index = Math.floor(Math.random() * availableWords.length);
        currentWords.push(availableWords[index]);
        availableWords.splice(index, 1);
    }
}

fillWords();


$("#wordDiv").text(currentWords[0].original);
$("#current").text(`${current+1}/${currentSize}`);

$(".arrow-img").on("click", function() {
    if ($(this).is(":first-child")) {
        if(current != 0){
            current-=1;
        }
        $("#wordDiv").text(currentWords[current].original);
        $("#current").text(`${current+1}/${currentSize}`);
    } else {
        if(current != currentSize - 1){
            current+=1;
        }
        $("#wordDiv").text(currentWords[current].original);
        $("#current").text(`${current+1}/${currentSize}`);
    }

    if(guessed[current]){
        $("#takeAGuess").prop("disabled", true);
    } else{
        $("#takeAGuess").prop("disabled", false);
    }
});

$("#wordDiv").on("click", ()=>{
    if(guessed[current]){
        if(state){
            $("#wordDiv").text(currentWords[current].translated);
            state = false;
        } else {
            $("#wordDiv").text(currentWords[current].original);
            state = true;
        }

    }
});

$("#takeAGuess").on("keydown", (keyPress) => {
    let state = false;
    if (keyPress.key === "Enter") {
        if($("#takeAGuess").val().toLowerCase().trim() === currentWords[current].translated) {
            guesses[0]++;
            $("#correct").html(`Вірно <br> ${guesses[0]}`);
            state = true;
        } else{
            guesses[1]++;
            $("#incorrect").html(`Невірно <br> ${guesses[1]}`);
        }

        $("#takeAGuess").val("");
        $("#takeAGuess").prop("disabled", true);
        guessed[current] = true;

        if(guesses[0] + guesses[1] === currentSize){
            gameEnd();
        }

        if(state){
            if(current != currentSize - 1){
                current+=1;
            } else {
                current-=1;
            }
            $("#wordDiv").text(currentWords[current].original);
            $("#current").text(`${current+1}/${currentSize}`)

            if(!guessed[current]){
                $("#takeAGuess").prop("disabled", false);
            }
        }
    }
});

function gameEnd(){
    let rightPer = Math.round((guesses[0]/currentSize) * 100), wrongPer = Math.round((guesses[1]/currentSize) * 100);
    $("#green").css("width", `${rightPer}%`);
    $("#red").css("width", `${wrongPer}%`);
    $("#overlay").css("display", "flex");

    let addLine;
    if(rightPer == 0){
        addLine = "Спробуй ще раз!";
    } else if(rightPer < 25 ){
        addLine = "Гарна спроба, але недостатньо!";
    } else if(rightPer < 50){
        addLine = "Чудово, але все ще недостатньо!";
    } else if(rightPer < 100){
        addLine = "Чудово!";
    } else if(rightPer == 100){
        addLine = "Мегачудово!";
    }
    $("#comparisonDiv+p").html(`Вірно ${guesses[0]}
        <br> Не вірно ${guesses[1]} 
        <br> ${addLine}`);
}

$("#overlay").on("click", ()=>{
    $("#overlay").css("display", "none");
    availableWords = words.slice();
    guessed.fill(false);
    guesses[0] = 0;
    guesses[1] = 0;
    current = 0;
    $("#takeAGuess").prop("disabled", false);
    $("#current").text(`${current+1}/${currentSize}`);

    currentWords = [];
    fillWords();
    $("#wordDiv").text(currentWords[0].original);
    $("#correct").html(`Вірно <br> ${guesses[0]}`);
    $("#incorrect").html(`Невірно <br> ${guesses[1]}`);
});
