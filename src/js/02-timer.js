import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Ukrainian } from "flatpickr/dist/l10n/uk.js"
flatpickr.localize(Ukrainian);
require("flatpickr/dist/themes/material_green.css");
flatpickr("#datetime-picker", {});


const startBtn = document.querySelector('button[data-start]');
const seconds = document.querySelector('span[data-seconds]');
const input = document.querySelector('#datetime-picker');
console.log(input);

input.textContent = Date.now()

startBtn.addEventListener("click", startTimer);
let timerId = null;

const timer = {
    start() {
        const startTime = Date.now()
        setInterval(() => {
            const currentTime = Date.now()
            const deltaTime = startTime - currentTime
            console.log(deltaTime)
        }, 1000)
    }
    
}
timer.start();

function startTimer() {
    timerId = setInterval(() => {
        
        console.log(Date.now())
        console.log(Number(seconds.textContent+1));
    }, 1000);
}



function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}