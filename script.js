document.addEventListener("DOMContentLoaded", function() {
    focusInput();
});
document.addEventListener("click", function() {
    focusInput();
});
const displayEquationElem = document.getElementById('displayEquation');
const correctOrIncorrectElem = document.getElementById('correctOrIncorrect');
const submitElem = document.getElementById('submit');
const previousEquation = document.getElementById('previousEquation');
const checkBoxElem = document.getElementById('checkBox');


let userInput = document.getElementById("numberInput");
let correctAnswer = 0;

let randomNr = 0;
randomNr = generateEquation()
displayEquationElem.innerHTML = randomNr

correctAnswer = parseInt(randomNr[0]) + parseInt(randomNr[4])
// console.log(correctAnswer)

let previousStartTime = 0;
let deltaTimeArr = []
let repeatEquationsArr = []
let roundsUntilRepeatArr = []

let wrongCounter = 0;
let correctCounter = 0;

userInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        if (userInput.value > 18 || userInput.value == '') {
            previousEquation.innerHTML = "type number under 19"
            userInput.value = ""
            return;
        }
        wrongCounter++
        correctCounter++

        timeAlgorythm()

        checkUserInput();

        if (checkBoxElem.checked) {
            updateDisplayWithAlgorythm()
        }
        randomNr = generateEquation()
        updateDisplay()
    } else {
        if (isNaN(event.key)) {
            event.preventDefault()
        }
    }
});


function timeAlgorythm() {

    let startTime = new Date().getTime()
    let deltaTime = startTime - previousStartTime;
    previousStartTime = startTime;
    if (deltaTime > 8000) { //ASSUME USER HAS BEEN AFK
        if (deltaTime === startTime) {
            deltaTime = 1000
        }
        deltaTime = averageDeltaTime(deltaTime, deltaTimeArr);
    }
    if (deltaTime > (averageDeltaTime(deltaTime, deltaTimeArr) + 1000) || userInput.value != correctAnswer) {
        repeatEquationsArr.push(randomNr[0], randomNr[4])
        roundsUntilRepeatArr.push(3 + Math.ceil(Math.random()*7))
    }
    // console.log(roundsUntilRepeatArr)
    // deltaTimeArr.push(deltaTime)
    // console.log(deltaTimeArr)
    console.log(averageDeltaTime(deltaTime, deltaTimeArr))
}

function averageDeltaTime(deltaTime, deltaTimeArr) {
    let sumOfDeltaTime = 0;
    for (let i = 0; i < deltaTimeArr.length; i++) {
        sumOfDeltaTime += deltaTimeArr[i];
    }
    return averageTime = (deltaTime + sumOfDeltaTime) / (deltaTimeArr.length+1);
}

function checkUserInput() {
    userInput = document.getElementById("numberInput");
    if (userInput.value == correctAnswer) {
        correctOrIncorrectElem.innerHTML = `Correct ${correctCounter}x`
        wrongCounter = 0;
        playSound('kenneth1.mp3')
        previousEquation.innerHTML = "wp"
    } else {
        correctOrIncorrectElem.innerHTML = `Incorrect ${wrongCounter}x`
        correctCounter = 0;
        playSound('kenneth2.mp3')
        previousEquation.innerHTML = `(${randomNr[0]} + ${randomNr[4]} = ${correctAnswer}) ≠ ${userInput.value}`
    }
}

function updateDisplayWithAlgorythm() {
    for (let i = 0; i < roundsUntilRepeatArr.length; i++) {
        roundsUntilRepeatArr[i]--
        if (roundsUntilRepeatArr[i] === 0) {
            randomNr = `${repeatEquationsArr[1]} + ${repeatEquationsArr[0]}` //switch them around so it feels different
            updateDisplay()
            roundsUntilRepeatArr.splice(i, 1)
            repeatEquationsArr.splice(0, 2)
            return;
        }
    }
}

function playSound(mp3) {
    let audio = new Audio(mp3)
    audio.play()
}

function generateEquation() {
    return `${Math.ceil(Math.random()*9)} + ${Math.ceil(Math.random()*9)}`
}

function focusInput() {
    document.getElementById("numberInput").focus();
}

function updateDisplay() {
    displayEquationElem.innerHTML = randomNr
    correctAnswer = parseInt(randomNr[0]) + parseInt(randomNr[4]) //parseint because it's a string xd
    console.log(correctAnswer)
    userInput.value = ""
}