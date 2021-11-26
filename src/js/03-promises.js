import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
form.addEventListener('submit', onFormSubmit);

function createPromise(position, delay) {
const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
      resolve({position, delay})
    } else {
    reject({position, delay});
    }
    }, delay)
  });
}

function onFormSubmit(evt) {
  const onSubmit = {};
  evt.preventDefault();
  const formData = new FormData(form);
  formData.forEach((value, name) => onSubmit[name] = Number(value));
  createDelayForEvents(onSubmit)
};

function createDelayForEvents(obj) {
  for (let i = 0; i < obj.amount; i ++) {
    const position = i + 1;
    const delayTotal = obj.delay + (obj.step * i);
    showEvent(position, delayTotal);
  }
}

function showEvent(position, delay) {
  createPromise(position, delay)
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
  })
    .catch(({ position, delay }) => {
     Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
  });
}
