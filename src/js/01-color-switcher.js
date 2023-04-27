const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
let timerId;

function handlerStart() {
  btnStart.disabled = true;
  timerId = setInterval(() => {
    const rndColor = getRandomHexColor();
    document.body.style.backgroundColor = rndColor;
  }, 1000);
}
function handlerStop() {
  btnStart.disabled = false;
  clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

btnStart.addEventListener('click', handlerStart);
btnStop.addEventListener('click', handlerStop);
