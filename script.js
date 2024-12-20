let calculation = localStorage.getItem('calculation') || '';

function updateCalculation(value) {
    calculation += value;
    updateDisplay();
}

function calculateResult() {
    try {
        calculation = new Function(`return ${calculation}`)().toString();
        updateDisplay();
    } catch (error) {
        alert('Invalid Calculation!');
        clearCalculation();
    }
}

function clearCalculation() {
    calculation = '';
    updateDisplay();
}

function updateDisplay() {
    document.querySelector('.js-calculation').textContent = calculation;
    document.querySelector('.js-input').value = calculation;
    localStorage.setItem('calculation', calculation);
}

function handleKeyDown(event) {
    if (event.key === 'Enter' || event.key === '=') {
        calculateResult();
    } else if (event.key === 'Backspace') {
        calculation = calculation.slice(0, -1);
        updateDisplay();
    } else if (
        (event.key >= '0' && event.key <= '9') ||
        ['+', '-', '*', '/', '.'].includes(event.key)
    ) {
        calculation += event.key;
        updateDisplay();
    }
    if (event.key === 'Enter') {
        event.preventDefault();
    }
}

updateDisplay();
