let numOrOperator = document.querySelector("#calc-keypad");
let calcScreen = document.querySelector("#calc-screen");
let  arrayOfFirstSetNum = [];
let arrayOfSecondSetNum = [];
let operatorSign = [];
let operatorSignCounter = 0;
let otherThanNum = false;
let result = 0;
arrayOfOperators = ["/", "*", "-", "+", "="];
arrayOfCtrl = ["AC", "CLR"];

numOrOperator.addEventListener('click', (event) => {
    let target = event.target.textContent;

    if(arrayOfOperators.includes(target) && arrayOfFirstSetNum.length > 0 && operatorSignCounter === 1 && arrayOfSecondSetNum.length > 0) {
        result = operator(arrayOfFirstSetNum, operatorSign, arrayOfSecondSetNum);
        console.log(` this is the result ${result}`);
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
        operatorSignCounter ++
        otherThanNum = true;
    }
    else if(arrayOfCtrl.includes(target)) {
        calcScreen.textContent = target;
        operatorSignCounter = 0;
        operatorSign = undefined;
        arrayOfFirstSetNum = [];
        arrayOfSecondSetNum = [];
        otherThanNum = false;
    }
    console.log(arrayOfFirstSetNum);
    console.log(arrayOfSecondSetNum);
    console.log(otherThanNum)

});

function operator(num1, opsSign, num2) {
    let firstOps;
    let secondOps;
    if (num1.includes(".")) {
        firstOps = parseFloat(num1.join("").toLocaleString('en-US'));
    }
    else {
        firstOps = Number(num1.join("").toLocaleString('en-US'));
    }
    if (num2.includes(".")) {
        secondOps = parseFloat(num2.join("").toLocaleString('en-US'));
    }
    else {
        secondOps = Number(num2.join("").toLocaleString('en-US'));
    }



    switch (opsSign) {
        case ("+"):
            return addOperator(firstOps, secondOps);
        case ("-"):
            return subtractOperator(firstOps, secondOps);
        case ("*"):
            return multiplyOperator(firstOps, secondOps)
        case ("/"):
            return divideOperator(firstOps, secondOps);
    }
}








function addOperator (firstNum, secondNum) {
    return firstNum + secondNum;
}

function subtractOperator (firstNum, secondNum) {
    return firstNum - secondNum;
}

function multiplyOperator (firstNum, secondNum) {
    return firstNum * secondNum;
}

function divideOperator (firstNum, secondNum) {
    return firstNum / secondNum;
}
