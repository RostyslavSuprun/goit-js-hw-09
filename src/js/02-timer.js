import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Ukrainian } from "flatpickr/dist/l10n/uk.js"
flatpickr.localize(Ukrainian);

const LOCALSTORAGE_KEY = "saved_time";
require("flatpickr/dist/themes/material_green.css");
flatpickr("#datetime-picker", {enableTime: true,
    dateFormat: "Y-m-d H:i",
  time_24hr: true,
  defaultDate: new Date(),
    minuteIncrement: 1,
  minDate: Date.now(),
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      const selectedDate = selectedDates[0].getTime();
      console.log("selectedDate =", selectedDate);
      const result = selectedDate - Date.now();
      const convertResult = convertMs(result);
      console.log("result =", result);
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(convertResult));
      console.log("converted result =", convertResult);
      startBtn.setAttribute('disabled', true);
      changeNumbers();
      if (result >= 0) {
          changeNumbers();
          startBtn.removeAttribute('disabled', true);
          
      }
    },
});
  


const startBtn = document.querySelector('button[data-start]');
const second = document.querySelector('span[data-seconds]');
const minute = document.querySelector('span[data-minutes]');
const hour = document.querySelector('span[data-hours]');
const day = document.querySelector('span[data-days]');
const input = document.querySelector('#datetime-picker');



input.addEventListener('input', changeNumbers());


function changeNumbers() {
    const estimatedTime = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY))
    second.textContent = estimatedTime.seconds
    minute.textContent = estimatedTime.minutes
    hour.textContent = estimatedTime.hours
    day.textContent = estimatedTime.days
    console.log("estimatedTime =", estimatedTime);
    // localStorage.removeItem(LOCALSTORAGE_KEY)
}
input.textContent = Date.now()

// startBtn.addEventListener("click", startTimer);
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
// timer.start();


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



