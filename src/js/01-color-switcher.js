const btnStart = document.querySelector('button[data-start]')
const btnStop = document.querySelector('button[data-stop]')
const body = document.querySelector('body')

let intervalId = ''
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`
}

btnStart.addEventListener('click', () => {
  intervalId = setInterval(() => {
    btnStart.disabled = true
    body.style.backgroundColor = getRandomHexColor()
  }, 1000);
});

btnStop.addEventListener('click', () => {
  clearInterval(intervalId)
  btnStart.disabled = false
  body.style.backgroundColor = ''
});

