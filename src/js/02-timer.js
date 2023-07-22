import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const input = document.querySelector('#datetime-picker')
const startButton = document.querySelector('button[data-start]')
const secondsElement = document.querySelector('[data-seconds]')
const minutesElement = document.querySelector('[data-minutes]')
const hoursElement = document.querySelector('[data-hours]')
const daysElement = document.querySelector('[data-days]')

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0]
    const currentDate = Date.now()

    if (selectedDate < currentDate) {
        window.alert('Please choose a date in the future')
      startButton.disabled = true
    } else {
      startButton.disabled = false
    }
  },
};

flatpickr(input, options)

function convert(ms) {
  const second = 1000
  const minute = second * 60
  const hour = minute * 60
  const day = hour * 24
  const days = Math.floor(ms / day)
  const hours = Math.floor((ms % day) / hour)
  const minutes = Math.floor(((ms % day) % hour) / minute)
  const seconds = Math.floor((((ms % day) % hour) % minute) / second)
  return { days, hours, minutes, seconds }
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0')
}

function updateTimer(days, hours, minutes, seconds) {
  daysElement.textContent = addLeadingZero(days)
  hoursElement.textContent = addLeadingZero(hours)
  minutesElement.textContent = addLeadingZero(minutes)
  secondsElement.textContent = addLeadingZero(seconds)
}

startButton.addEventListener('click', () => {
  const selectedDate = flatpickr.parseDate(input.value, 'Y-m-d H:i')
  const currentDate = new Date()
  const countdown = selectedDate.getTime() - currentDate.getTime()

  if (countdown > 0) {
    startButton.disabled = true
    startCountdown(countdown)
  }
});

function startCountdown(duration) {
  const interval = setInterval(() => {
    const { days, hours, minutes, seconds } = convert(duration)

    if (duration <= 0) {
      clearInterval(interval)
      updateTimer(0, 0, 0, 0)
      return;
    }

    updateTimer(days, hours, minutes, seconds)
    duration -= 1000
  }, 1000)
}

