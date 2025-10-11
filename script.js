// Get references to the HTML elements
const display = document.getElementById('display');
const buttons = document.querySelector('.buttons');

// Initialize calculator state variables
let firstValue = '';
let operator = '';
let secondValue = '';
let shouldResetDisplay = false;

// Function to perform the calculation
function calculate(num1, op, num2) {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    if (op === '+') return n1 + n2;
    if (op === '-') return n1 - n2;
    if (op === '*') return n1 * n2;
    if (op === '/') return n1 / n2;
    return num2; // Return the second number if no operator
}

// Listen for clicks on the buttons container
buttons.addEventListener('click', (event) => {
    const target = event.target; // The button that was clicked
    const value = target.dataset.value; // The 'data-value' attribute

    if (!target.matches('button')) {
        return; // Do nothing if the click wasn't on a button
    }

    // Handle number and decimal clicks
    if (value) {
        if (display.textContent === '0' || shouldResetDisplay) {
            display.textContent = value;
            shouldResetDisplay = false;
        } else {
            display.textContent += value;
        }
    }

    // Handle operator clicks (+, -, *, /)
    if (target.classList.contains('operator') && value) {
        firstValue = display.textContent;
        operator = value;
        shouldResetDisplay = true; // Prepare for the next number to be typed
    }

    // Handle the equals button
    if (target.id === 'equals') {
        if (!firstValue || !operator) return; // Need both values to calculate
        secondValue = display.textContent;
        const result = calculate(firstValue, operator, secondValue);
        display.textContent = result;
        
        // Reset state for next calculation
        firstValue = '';
        operator = '';
        shouldResetDisplay = true;
    }

    // Handle the clear button
    if (target.id === 'clear') {
        display.textContent = '0';
        firstValue = '';
        operator = '';
        secondValue = '';
    }
});