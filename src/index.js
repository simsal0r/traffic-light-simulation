import "./styles.css";

const circles = document.querySelectorAll(".circle");

//red/yellow, red, yellow, green
var holdTimes = [1000, 3000, 1000, 3000];

//Start with green phase
let activeLight = 2;
var phase = 3;
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
      phase = 3;
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
  clearLights();

  //Start with green phase
  activeLight = 2;
  phase = 3;
  remainingTime = holdTimes[phase];
  document.getElementById("counter").innerHTML = "";

  const currentLight = circles[activeLight];
  currentLight.classList.add(currentLight.getAttribute("color"));
}

function changeLight() {
  clearLights();
  //Special case red/yellow
  if (phase === 1) {
    const yellowLight = circles[1];
    yellowLight.classList.add(yellowLight.getAttribute("color"));
  } else {
    if (activeLight <= 0) {
      activeLight = 2;
    } else {
      activeLight--;
    }
  }

  //console.log(activeLight);

  const currentLight = circles[activeLight];
  currentLight.classList.add(currentLight.getAttribute("color"));
}

function clearLights() {
  circles[activeLight].className = "circle";
  circles[1].className = "circle";
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
