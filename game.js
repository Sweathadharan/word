const audio = new Audio();
audio.src="./click.wav";
const bg=document.getElementById('bgMusic').play()

function playAudio() {
    bgMusic.play();

} 
const letterWord = document.querySelector(".letters");
const hint = document.querySelector(".hint span");
const timeLeft = document.querySelector(".time b");
const input = document.querySelector("input");
const refresh =document.querySelector(".refresh");
const check =document.querySelector(".check");

let score = 0;

let correct;
let timer;
const gameTime = (time) => {
    if (time > 0) {
        timeLeft.innerText = time;
        timer=setTimeout(() => {
            gameTime(time - 1); 
        }, 1000);
    } else {
        scoreStorage();
        alert(`Time's up! ${correct.toUpperCase()} was the correct word.`);
        window.location.href = 'gameover.html';
    }
};

const init = ()=>{
    clearTimeout(timer);
    gameTime(45);
    let ranWord = words[Math.floor(Math.random()*words.length)];
    console.log("Original word:", ranWord.word);
    let arrayOfLetters = ranWord.word.split("");
    for (let i = arrayOfLetters.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arrayOfLetters[i], arrayOfLetters[j]] = [arrayOfLetters[j], arrayOfLetters[i]];
    }    
    letterWord.innerText=arrayOfLetters.join("");
    hint.innerText=ranWord.hint;
    correct=ranWord.word.toLowerCase();
    input.value="";
}


const correctWord = () => {
    const user = input.value.trim().toLowerCase(); 
    const message = user === correct ? "yayy" : "OOPs";
    if(correct === user)
        score++;
    if(correct !== user) {
        scoreStorage();
        score = 0;
        window.location.href = 'gameover.html';
    }
    alert(message); 
    init(); 
};

const info = document.querySelector(".info");
init();
refresh.addEventListener("click",init);
check.addEventListener("click",correctWord)

function scoreStorage() {
    window.localStorage.setItem('userScore', score);
}
window.onload=init;