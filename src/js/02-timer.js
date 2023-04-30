import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const {
  Notify: { failure },
} = Notiflix;
const btnStart = document.querySelector('[data-start');
const arrTimerEl = document.querySelectorAll('.value');
let selectedDate = null;

// Flatpickr's option

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: Date.now(),
  minuteIncrement: 1,
  onClose([selectedDates]) {
    console.log(selectedDates);
    const currentDate = Date.now();
    if (selectedDates < currentDate) {
      failure('Please choose a date in the future');
      btnStart.disabled = true;
    } else {
      btnStart.disabled = false;
      selectedDate = selectedDates;
    }
  },
};

flatpickr('#datetime-picker', options);

function startTimer() {
  const currentDate = Date.now();
  let timeDiff = selectedDate ? selectedDate - currentDate : 0;

  const intervalId = setInterval(() => {
    if (timeDiff <= 0) {
      clearInterval(intervalId);
      return;
    }

    render(timeDiff);
    timeDiff -= 1000;
  }, 1000);
}

function render(timeDiff) {
  console.log(timeDiff);
  const { days, hours, minutes, seconds } = convertMs(timeDiff);

  [...arrTimerEl].forEach(el => {
    if (el.hasAttribute('data-days')) {
      el.textContent = addLeadingZero(days);
    } else if (el.hasAttribute('data-hours')) {
      el.textContent = addLeadingZero(hours);
    } else if (el.hasAttribute('data-minutes')) {
      el.textContent = addLeadingZero(minutes);
    } else if (el.hasAttribute('data-seconds')) {
      el.textContent = addLeadingZero(seconds);
    }
  });
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
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

btnStart.addEventListener('click', startTimer);
