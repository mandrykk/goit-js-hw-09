const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let intervalId = null;

buttonStart.addEventListener('click', () => {
    intervalId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);

    buttonStart.disabled = true;
    buttonStop.disabled = false;
});

buttonStop.addEventListener('click', () => {
    clearInterval(intervalId);
    
    buttonStart.disabled = false;
    buttonStop.disabled = true;
});