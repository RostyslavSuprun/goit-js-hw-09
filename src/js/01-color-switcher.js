const body =  document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
console.log(startBtn);
console.log(stopBtn);

startBtn.addEventListener("click", onStart);
stopBtn.addEventListener("click", onStop);

stopBtn.setAttribute('disabled', true);
let timerId = null;

function onStart() {
   timerId = setInterval(() => {
    
        body.style.backgroundColor = getRandomHexColor()
    }, 1000);

    startBtn.setAttribute('disabled', true);
    stopBtn.removeAttribute('disabled', true);
};

function onStop() {
    clearInterval(timerId);
    stopBtn.setAttribute('disabled', true);
    startBtn.removeAttribute('disabled', true);
};


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
