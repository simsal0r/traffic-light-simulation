import "./styles.css";

const circles = document.querySelectorAll(".circle");

//red, yellow, green
var holdTimes = [1000, 100, 4000];

//Start with green phase
let activeLight = 2;
var phase = 2;
var remainingTime = holdTimes[phase];

var requestTime = 0;

var lightInterval;

function runTrafficLight() {
  lightInterval = setInterval(() => {
    checkPhaseChange();
  }, 100);
}

function checkPhaseChange() {
  if (remainingTime <= 0) {
    changeLight();

    if (phase <= 0) {
      phase = 2;
    } else {
      phase--;
    }

    remainingTime = holdTimes[phase];
  } else {
    remainingTime = remainingTime - 100;
  }
  document.getElementById("counter").innerHTML = remainingTime;
}

function startTrafficLight() {
  runTrafficLight();
}

function pauseTrafficLight() {
  clearInterval(lightInterval);
}

function stopTrafficLight() {
  clearInterval(lightInterval);
  circles[activeLight].className = "circle";

  //Start with green phase
  activeLight = 2;
  phase = 2;
  remainingTime = holdTimes[phase];
  document.getElementById("counter").innerHTML = "";

  const currentLight = circles[activeLight];
  currentLight.classList.add(currentLight.getAttribute("color"));
}

function changeLight() {
  circles[activeLight].className = "circle";

  //console.log(activeLight);

  if (activeLight <= 0) {
    activeLight = 2;
  } else {
    activeLight--;
  }

  const currentLight = circles[activeLight];

  currentLight.classList.add(currentLight.getAttribute("color"));
}

document
  .getElementById("button-start")
  .addEventListener("click", startTrafficLight);
document
  .getElementById("button-pause")
  .addEventListener("click", pauseTrafficLight);
document
  .getElementById("button-stop")
  .addEventListener("click", stopTrafficLight);
