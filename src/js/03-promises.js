import Notiflix from 'notiflix';

// const shouldResolve = Math.random() > 0.3;



// promise
//   .then(value => {
//     console.log(value);
//   })
//   .catch(error => {
//     console.log(error);
//   });

const delayEl = document.querySelector('input[name=delay]');
const stepEl = document.querySelector('input[name=step]');
const amount = document.querySelector('input[name=amount]');
const submitBtn = document.querySelector('button');
submitBtn.addEventListener('click', onSubmit);



let position = 1

function onSubmit(evt) {
  evt.preventDefault();
  const delay = Number(delayEl.value)
  const step = Number(stepEl.value)
  let numbers = Number(amount.value)
  const intervalId =  setInterval(() => {
    if (position > numbers) {
      clearInterval(intervalId)
    }
    if (position <= numbers)  {
      createPromise(position, delay)
      position += 1
    console.log('numbers----', numbers)
      console.log('position---', position)
      
  }
  }, step);
  
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`));
      } else {
        reject(Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`));
      }
    }, delay);
  })
}


//   if (shouldResolve) {
//     ({ position, delay }) => {
//       console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//     }
//   }
//   else {
//     ({ position, delay }) => {
//       console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//     }
//   }
// }



// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });