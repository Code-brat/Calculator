let total = 0;
let buffer = '0'
let previousOperator;

const screen = document.querySelector('.screen');
const button = document.querySelector('.buttons')

function buttonClicked(value) {
    if(isNaN(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol) {
    switch(symbol) {
        case 'C':
            buffer = "0"
            total = 0;
            break;
        case '←':
            if(buffer.length == 1) {
                buffer = "0";
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '=':
            if(previousOperator === null) {
                return;
            } else {
                flushOperation(parseInt(buffer));
                previousOperator = null;
                buffer = total;
                total = 0;
            }
        case '÷':
        case '×':
        case '−':
        case '+':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol) {
    if(buffer == '0') {
        return;
    }

    const intBuffer = parseInt(buffer);

    if(total === 0) {
        total = intBuffer;
    } else {
        flushOperation(intBuffer)
        previousOperator = symbol;
        buffer = '0'
    }
}

function flushOperation(intBuffer) {
    if(previousOperator == '+') {
        total += intBuffer;
    } else if(previousOperator == '−') {
        total -= intBuffer;
    } else if(previousOperator == '×') {
        total *= intBuffer;
    } else if(previousOperator == '÷') {
        total /= intBuffer;
    }
}

function handleNumber(numberString) {
    if(buffer == '0') {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

function init() {
    button.addEventListener("click", function(event) {
        buttonClicked(event.target.innerText);
    })
}

init();