document.addEventListener('DOMContentLoaded', () => {
    let tokens = 0;
    let clickPower = 1;
    let autoclickerCost = 50;
    let powerCost = 100;
    let autoclicksPerSecond = 0;
    let tg = window.Telegram.WebApp;

    const tokenCountEl = document.getElementById('token-count');
    const autoclickerCostEl = document.getElementById('autoclicker-cost');
    const powerCostEl = document.getElementById('power-cost');

    function updateDisplay() {
        tokenCountEl.textContent = tokens;
        autoclickerCostEl.textContent = autoclickerCost;
        powerCostEl.textContent = powerCost;
    }

    function saveProgress() {
        const saveData = {
            tokens,
            clickPower,
            autoclickerCost,
            powerCost,
            autoclicksPerSecond
        };
        localStorage.setItem('clickerSave', JSON.stringify(saveData));
    }

    function loadProgress() {
        const saveData = JSON.parse(localStorage.getItem('clickerSave'));
        if (saveData) {
            tokens = saveData.tokens;
            clickPower = saveData.clickPower;
            autoclickerCost = saveData.autoclickerCost;
            powerCost = saveData.powerCost;
            autoclicksPerSecond = saveData.autoclicksPerSecond;
            updateDisplay();
        }
    }

    document.getElementById('clicker-image').addEventListener('click', () => {
        tokens += clickPower;
        updateDisplay();
        saveProgress();
    });

    document.getElementById('buy-autoclicker').addEventListener('click', () => {
        if (tokens >= autoclickerCost) {
            tokens -= autoclickerCost;
            autoclicksPerSecond++;
            autoclickerCost = Math.round(autoclickerCost * 1.5);
            updateDisplay();
            saveProgress();
        }
    });

    document.getElementById('buy-power').addEventListener('click', () => {
        if (tokens >= powerCost) {
            tokens -= powerCost;
            clickPower++;
            powerCost = Math.round(powerCost * 1.5);
            updateDisplay();
            saveProgress();
            tg.sendData(JSON.stringify({ tokens, clickPower, autoclickerCost, powerCost, autoclicksPerSecond }));
        }
    });

    setInterval(() => {
        if (autoclicksPerSecond > 0) {
            tokens += autoclicksPerSecond;
            updateDisplay();
            saveProgress();
        }
    }, 1000);

    

    loadProgress();
});
