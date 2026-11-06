let numOrOperator = document.querySelector("#calc-keypad");
let calcScreen = document.querySelector("#calc-screen");
let  arrayOfFirstSetNum = [];
let arrayOfSecondSetNum = [];
let operatorSign;
let operatorCount = 0;
let otherThanNum = false;
let result = 0;

numOrOperator.addEventListener('click', (event) => {

    arrayOfOperators = ["/", "*", "-", "+", "="];
    arrayOfCtrl = ["AC", "CLR"];
    let target = event.target.textContent;

    if(arrayOfOperators.includes(target) && arrayOfFirstSetNum.length > 0 && operatorCount === 1 && arrayOfSecondSetNum > 0) {
        result = operator(arrayOfFirstSetNum, operatorSign, arrayOfSecondSetNum);
        calcScreen.textContent = result;

    }
    else if(Number.isFinite(Number(target))) {
        if(arrayOfFirstSetNum.length < 12 && !otherThanNum) {
            arrayOfFirstSetNum.push(target);
            calcScreen.textContent = Number(arrayOfFirstSetNum.join("")).toLocaleString('en-US');
        }else if(arrayOfSecondSetNum.length < 12 && otherThanNum) {
            arrayOfSecondSetNum.push(target);
            calcScreen.textContent = Number(arrayOfSecondSetNum.join("")).toLocaleString('en-US');
        }
    } 
    else if (arrayOfFirstSetNum.length < 12 && !otherThanNum && target ===  "."  && !arrayOfFirstSetNum.includes(target)) {
        arrayOfFirstSetNum.push(target);
        calcScreen.textContent = Number(arrayOfFirstSetNum.join("")).toLocaleString('en-US');
    }
    else if (arrayOfSecondSetNum.length < 12 && otherThanNum && target ===  "."  && !arrayOfSecondSetNum.includes(target)) {
        arrayOfSecondSetNum.push(target);
        calcScreen.textContent = Number(arrayOfSecondSetNum.join("")).toLocaleString('en-US');
    }

    else if(arrayOfOperators.includes(target)) {
        calcScreen.textContent = target;
        operatorSign = target;
        operatorCount++
        otherThanNum = true;
    }
    else if(arrayOfCtrl.includes(target)) {
        calcScreen.textContent = target;
        operatorCount = 0;
        operatorSign = undefined;
        arrayOfFirstSetNum = [];
        arrayOfSecondSetNum = [];
        otherThanNum = false;
    }
    console.log(arrayOfFirstSetNum);
    console.log(arrayOfSecondSetNum);
    console.log(otherThanNum)
    console.log(result)

});

function operator(num1, opsSign, num2) {
    let firstOps = Number(num1.join("")).toLocaleString('en-US');
    let secondOps = Number(num2.join("")).toLocaleString('en-US');
    
    switch (opsSign) {
        case ("+"):
            addOperator(firstOps, secondOps)
        break;
        case ("-"):
            subtractOperator(firstOps, secondOps)
        break;
        case ("*"):
            multiplyOperator(firstOps, secondOps)
        break;
        case ("/"):
            divideOperator(firstOps, secondOps)
        break;
    }
}








function addOperator (firstNum, secondNum) {
    return oneDecimalPlace(Number(firstNum + secondNum));
}

function subtractOperator (firstNum, secondNum) {
    return oneDecimalPlace(Number(firstNum - secondNum));
}

function multiplyOperator (firstNum, secondNum) {
    return oneDecimalPlace(Number(firstNum * secondNum));
}

function divideOperator (firstNum, secondNum) {
    return oneDecimalPlace(Number(firstNum / secondNum));
}

function oneDecimalPlace (aNum) {
    console.log(typeof aNum);
    if (Number.isInteger(aNum)) {
        return aNum;
    }
    else {
        return parseFloat(aNum.toFixed(1));
    }
}