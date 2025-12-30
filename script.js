const riskBtn = document.getElementById("riskBtn");
const riskMode = document.getElementById("riskMode");
const mainContent = document.getElementById("mainContent");
const exitRisk = document.getElementById("exitRisk");
const counterEl = document.getElementById("counter");

let countdown;
let timeLeft = 10;

riskBtn.addEventListener("click", () => {
    mainContent.style.display = "none";
    riskMode.classList.remove("hidden");
    timeLeft = 10;
    counterEl.textContent = timeLeft;

    countdown = setInterval(() => {
        timeLeft--;
        counterEl.textContent = timeLeft;

        if (timeLeft <= 0) {
            exitRiskMode();
        }
    }, 1000);
});

exitRisk.addEventListener("click", () => {
    exitRiskMode();
});

function exitRiskMode() {
    clearInterval(countdown);
    riskMode.classList.add("hidden");
    mainContent.style.display = "block";
}