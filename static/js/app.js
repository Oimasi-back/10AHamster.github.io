document.addEventListener('DOMContentLoaded', () => {
    let tokens = 0;
    let clickPower = 1;
    let autoclickerCost = 50;
    let powerCost = 100;
    let autoclicksPerSecond = 0;
    let lastClickTime = 0;
    let clickCount = 0;
    const maxClicksPerSecond = 15;

    const tokenCountEl = document.getElementById('token-count');
    const autoclickerCostEl = document.getElementById('autoclicker-cost');
    const powerCostEl = document.getElementById('power-cost');
    const buyAutoclickerBtn = document.getElementById('buy-autoclicker');
    const buyPowerBtn = document.getElementById('buy-power');
    const clickerImage = document.getElementById('clicker-image');

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

    function handleClick() {
        const now = Date.now();

        // Если прошло больше секунды, сбросить счетчик кликов
        if (now - lastClickTime > 1000) {
            lastClickTime = now;
            clickCount = 0;
        }

        clickCount++;

        // Если пользователь кликает слишком часто
        if (clickCount > maxClicksPerSecond) {
            alert("Вы нажимаете слишком быстро, это может быть автокликер.");
            return;
        }

        tokens += clickPower;
        updateDisplay();
        saveProgress();
    }

    clickerImage.addEventListener('click', handleClick);

    function handlePurchase(button, cost, onSuccess) {
        if (tokens >= cost) {
            tokens -= cost;
            onSuccess();
            button.style.backgroundColor = ''; // Сбрасываем цвет кнопки
            updateDisplay();
            saveProgress();
        } else {
            button.classList.add('insufficient-funds'); // Добавляем класс для плавной анимации
            setTimeout(() => {
                button.classList.remove('insufficient-funds'); // Убираем класс после окончания анимации
            }, 1500);
        }
    }

    buyAutoclickerBtn.addEventListener('click', () => {
        handlePurchase(buyAutoclickerBtn, autoclickerCost, () => {
            autoclicksPerSecond++;
            autoclickerCost = Math.round(autoclickerCost * 2.5); // Увеличение стоимости в 2.5 раза
        });
    });

    buyPowerBtn.addEventListener('click', () => {
        handlePurchase(buyPowerBtn, powerCost, () => {
            clickPower++;
            powerCost = Math.round(powerCost * 2.5); // Увеличение стоимости в 2.5 раза
        });
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
