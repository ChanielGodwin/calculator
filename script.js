
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


    if(Number.isFinite(Number(target))) {
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
