import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  input: document.querySelector('#datetime-picker'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

let selectedTime = null;
let currentTime = null;
let timerId = null;

refs.startBtn.setAttribute('disabled', true);
refs.startBtn.addEventListener('click', onStartClick);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    checkTimeAvailable(selectedDates);
  },
};

flatpickr(refs.input, options);

function checkTimeAvailable(currentDate) {
  selectedTime = currentDate[0].getTime();
  currentTime = Date.now();
  if (selectedTime > currentTime) {
    refs.startBtn.removeAttribute('disabled');
  } else {
    Notiflix.Notify.failure('Please choose a date in the future');
    const checkDisableBtn = refs.startBtn.hasAttribute('disabled');
    if (!checkDisableBtn) {
      refs.startBtn.setAttribute('disabled', true);
    }
  }
}

function onStartClick() {
  refs.input.setAttribute('disabled', true);
  refs.startBtn.setAttribute('disabled', true);
  timerId = setInterval(() => {
    currentTime = Date.now();
    const countDownTime = selectedTime - currentTime;
    if (selectedTime <= currentTime) {
      clearInterval(timerId);
      alert('You time is up!');
      return;
    }
    const time = convertMs(countDownTime);
    updateTime(time);
  }, 1000);
}

function updateTime({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}