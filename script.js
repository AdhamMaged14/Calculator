// script.js
function add(a,b){
    return a+b;
}
function subtract(a,b){
    return a-b;
}
function multiply(a,b){ 
    return a*b;

}
function divide(a,b){
    if(b === 0) {
        throw new Error("Division by zero is not allowed.");
    }
    return a/b;
}
function  operate (operator,a,b){
    switch(operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            throw new Error("Invalid operator");
    }
}
let firstOperand = null;
let secondOperand = null;
let currentOperator = null;
let shouldResetScreen = false;
let currentInput = '0';
function inputDigit(digit){
    const display =document.getElementById('display');
    if(shouldResetScreen || display.textContent === '0'){
        display.textContent = digit;
        currentInput = digit;
        shouldResetScreen = false;
    }
    else{
        display.textContent += digit;
        currentInput += digit;
    }
}
function setOperator(operator) {
   if (shouldResetScreen && currentOperator !== null) {
        currentOperator = operator; // just replace it
        return;
    }
    if (currentOperator !== null && !shouldResetScreen) {
        evaluate(); 
    }
    firstOperand = parseFloat(currentInput);
    currentOperator = operator;
    shouldResetScreen = true;
}

   function evaluate() {
    if (currentOperator === null || shouldResetScreen) return;

    const secondOperand = parseFloat(currentInput);

    if (currentOperator === '/' && secondOperand === 0) {
        document.getElementById('display').textContent = "😬 Can't divide by 0!";
        return;
    }

    let result = operate(currentOperator, firstOperand, secondOperand);

    result = Math.round(result * 1000000) / 1000000;

    document.getElementById('display').textContent = result;
    currentInput = result.toString();
    firstOperand = result;
    shouldResetScreen = true;
}


function clear() {
    currentInput = '0';
    firstOperand = null;
    currentOperator = null;
    shouldResetScreen = false;

    const display = document.getElementById('display');
    display.textContent = '0';
}
function backspace() {
    const display = document.getElementById('display');
    if (display.textContent.length > 1) {
        display.textContent = display.textContent.slice(0, -1);
        currentInput = display.textContent;
    } else {
        display.textContent = '0';
        currentInput = '0';
    }
}
function inputDecimal() {
    if (shouldResetScreen) {
        currentInput = '0.';
        shouldResetScreen = false;
    } else if (!currentInput.includes('.')) {
        currentInput += '.';
    }

    document.getElementById('display').textContent = currentInput;
}

document.addEventListener("DOMContentLoaded", () => {
    const digitButtons = document.querySelectorAll(".btn-digit");
    digitButtons.forEach(button => {
        button.addEventListener("click", () => {
            inputDigit(button.textContent);
        });
    });
    const operatorButtons = document.querySelectorAll(".btn-operator");
const equalsButton = document.getElementById("equals");

operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        setOperator(button.textContent);
    });
});

equalsButton.addEventListener("click", evaluate);
const clearButton = document.getElementById("clear");
clearButton.addEventListener("click", clear);
 const backspaceButton = document.getElementById("backspace");
backspaceButton.addEventListener("click", backspace);
const decimalButton = document.getElementById("decimal");
decimalButton.addEventListener("click", inputDecimal);


});

