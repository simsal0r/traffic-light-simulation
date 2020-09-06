import "./styles.css";

const circles = document.querySelectorAll(".circle");
var lightInterval;

//red/yellow, red, yellow, green
var holdTimes = [1000, 7000, 1000, 3000];
var requestTime = 1000;

//Start with green phase
let activeLight = 2;
var phase = 3;
var remainingTime = holdTimes[phase];

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
    console.log(phase);
    remainingTime = holdTimes[phase];
  } else {
    remainingTime = remainingTime - 100;
  }
  document.getElementById("counter").innerHTML = remainingTime;
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

  const currentLight = circles[activeLight];
  currentLight.classList.add(currentLight.getAttribute("color"));
}

function clearLights() {
  circles[activeLight].className = "circle";
  circles[1].className = "circle";
}

//Buttons

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

function substractRequestTime() {
  if (phase === 1) {
    remainingTime = remainingTime - requestTime;
  }
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
document
  .getElementById("button-request")
  .addEventListener("click", substractRequestTime);

document.getElementById("button-request").innerHTML +=
  " (" + requestTime + " ms)";
