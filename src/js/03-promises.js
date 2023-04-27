import Notiflix from 'notiflix';

const form = document.querySelector('form');
const {
  Notify: { failure, success },
} = Notiflix;

function handlerSubmit(e) {
  e.preventDefault();
  let objSettings = {};

  [...form].forEach(el => {
    if (el.nodeName === 'INPUT') {
      const { name, value } = el;
      objSettings = {
        ...objSettings,
        [name]: Number(value),
      };
    }
  });
  handlePromise(objSettings);
}

function handlePromise({ delay, step, amount }) {
  let position = 1;
  for (let i = 0; i < amount; i++) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

form.addEventListener('submit', handlerSubmit);
