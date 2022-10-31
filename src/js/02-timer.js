import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Ukrainian } from "flatpickr/dist/l10n/uk.js"
flatpickr.localize(Ukrainian);

const LOCALSTORAGE_KEY = "saved_time";
const TIME_KEY = "Unix-Time"
require("flatpickr/dist/themes/material_green.css");
const flatPicker =  new flatpickr("#datetime-picker", {enableTime: true,
    dateFormat: "Y-m-d H:i",
  time_24hr: true,
  defaultDate: new Date(),
    minuteIncrement: 1,
    minDate: Date.now(),
  onClose(selectedDates) {

      const selectedDate = selectedDates[0].getTime();
      localStorage.setItem(TIME_KEY, JSON.stringify(selectedDate));

      const result = selectedDate - Date.now();
      const convertResult = convertMs(result);
  
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(convertResult));


      changeNumbers();
      if (result >= 0) {
          
          startBtn.removeAttribute('disabled', true);
          
      }
      
    },
});
  


const startBtn = document.querySelector('button.start_timer');
const second = document.querySelector('span[data-seconds]');
const minute = document.querySelector('span[data-minutes]');
const hour = document.querySelector('span[data-hours]');
const day = document.querySelector('span[data-days]');
const input = document.querySelector('#datetime-picker');



// input.addEventListener('input', changeNumbers);

startBtn.addEventListener('click', click);

function click() {
    if (startBtn.hasAttribute('disabled')) {
       return
    }
    startTimer()
    console.log('timer started')
};

function changeNumbers() {
    const estimatedTime = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY))
  second.textContent = estimatedTime.seconds
   if (second.textContent.length < 2) {
        second.textContent = '0' + estimatedTime.seconds
      }
  minute.textContent = estimatedTime.minutes
  if (minute.textContent.length < 2) {
        minute.textContent = '0' + estimatedTime.minutes
      }
  hour.textContent = estimatedTime.hours
   if (hour.textContent.length < 2) {
        hour.textContent = '0' + estimatedTime.hours
      }
  day.textContent = estimatedTime.days
   if (day.textContent.length < 2) {
        day.textContent = '0' + estimatedTime.days
      }
    // console.log("estimatedTime =", estimatedTime);

    // localStorage.removeItem(LOCALSTORAGE_KEY)
}
input.textContent = Date.now()

// startBtn.addEventListener("click", startTimer);
// let timerId = null;

function startTimer() {
    const destinationTime = JSON.parse(localStorage.getItem(TIME_KEY))
    localStorage.removeItem(LOCALSTORAGE_KEY)
    localStorage.removeItem(TIME_KEY)
   
    setInterval(() => {
        // startBtn.setAttribute('disabled', true);
        const timerValue = destinationTime - Date.now()
        if (timerValue <= 0) {
            return
        }
        const convertedValue = convertMs(timerValue)
  
          second.textContent = convertedValue.seconds
      if (second.textContent.length < 2) {
        second.textContent = '0' + convertedValue.seconds
      }
        
      minute.textContent = convertedValue.minutes
      if (minute.textContent.length < 2) {
        minute.textContent = '0' + convertedValue.minutes
      }
      hour.textContent = convertedValue.hours
      if (hour.textContent.length < 2) {
        hour.textContent = '0' + convertedValue.hours
      }
      day.textContent = convertedValue.days
      if (day.textContent.length < 2) {
        day.textContent = '0' + convertedValue.days
      }
      
        
        }, 1000)
}

// const timer = {
//     start() {
        
//         setInterval(() => {
//             const currentTime = Date.now()
//             const deltaTime = startTime - currentTime
//             console.log(deltaTime)
//         }, 1000)
//     }
    
// }
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

// function addLeadingZero(value) {
//   if (value < 10) {
//    return value = '0' + value
//   }
// }

