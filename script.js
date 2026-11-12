//DOM Selection
let numOrOperator = document.querySelector("#calc-keypad");
let calcScreen = document.querySelector("#calc-screen");

//Variables Initialization
let  arrayOfFirstSetNum = [];
let arrayOfSecondSetNum = [];
let operatorSign = [];
let operatorSignCounter = 0;
let otherThanNum = false;
let result = 0;
arrayOfOperators = ["/", "*", "-", "+", "="];
arrayOfCtrl = ["AC", "CE"];

//Event listener
numOrOperator.addEventListener('click', keyPressed)

function keyPressed(event) {
    let target = event.target.textContent;
    let firsArrContent 
    if (typeof arrayOfFirstSetNum !== "number") {
        firsArrContent = !(arrayOfFirstSetNum.some(value => Number.isInteger(Number(value))));
    }

    if (arrayOfFirstSetNum.length < 12 && typeof arrayOfFirstSetNum !== "number" && target ===  "."  && arrayOfFirstSetNum.length === 0) {
        arrayOfFirstSetNum.push("0", ".");
        calcScreen.textContent = Number(arrayOfFirstSetNum.join("")).toLocaleString('en-US');
    }
    else if (arrayOfFirstSetNum.length === 0 && typeof arrayOfFirstSetNum !== "number" && target === "-") {
        arrayOfFirstSetNum.push(target);
        calcScreen.textContent = target;

    }
    else if ((arrayOfFirstSetNum.length === 0 || typeof arrayOfFirstSetNum !== "number") && firsArrContent && target !== "-" && ["/", "*", "+", "="].includes(target)) {
        calcScreen.textContent = target;
        operatorSignCounter = 0;
        operatorSign = [];

    }
    else if(arrayOfOperators.includes(target) && (arrayOfFirstSetNum.length > 0 || typeof arrayOfFirstSetNum === "number") && operatorSignCounter === 1 && arrayOfSecondSetNum.length > 0) {
        if (target === "=") {
            result = operator(arrayOfFirstSetNum, operatorSign, arrayOfSecondSetNum);
            calcScreen.textContent = result;
            if (typeof result !== "string"){
            arrayOfFirstSetNum = Array.from(String(result));
            arrayOfSecondSetNum = [];
            operatorSignCounter = 0;
            operatorSign = undefined;
            }
            else {   
                operatorSignCounter = 0;
                operatorSign = undefined;
                arrayOfFirstSetNum = [];
                arrayOfSecondSetNum = [];
                otherThanNum = false;
        }
        }
        else if (["/", "*", "+", "-"].includes(target)) {
            result = operator(arrayOfFirstSetNum, operatorSign, arrayOfSecondSetNum);
            calcScreen.textContent = result;
            if (typeof result !== "string"){
            arrayOfFirstSetNum = Array.from(String(result));
            arrayOfSecondSetNum = [];
            operatorSignCounter = 1;
            operatorSign = target;
            }
            else {
                operatorSignCounter = 0;
                operatorSign = undefined;
                arrayOfFirstSetNum = [];
                arrayOfSecondSetNum = [];
                otherThanNum = false;
        }
        }

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
    else if (arrayOfSecondSetNum.length < 12 && otherThanNum && target ===  "."  && arrayOfSecondSetNum.length === 0) {
        arrayOfSecondSetNum.push("0", ".");
        calcScreen.textContent = Number(arrayOfSecondSetNum.join("")).toLocaleString('en-US');
    }
    else if (arrayOfSecondSetNum.length < 12 && otherThanNum && target ===  "."  && !arrayOfSecondSetNum.includes(target)) {
        arrayOfSecondSetNum.push(target);
        calcScreen.textContent = Number(arrayOfSecondSetNum.join("")).toLocaleString('en-US');
    }

    else if(arrayOfOperators.includes(target)) {
        if (arrayOfSecondSetNum.length === 0 && operatorSignCounter === 0 && target === "=") {
            if (typeof arrayOfFirstSetNum === "number") {
                calcScreen.textContent = arrayOfFirstSetNum;
                operatorSignCounter = 0;
                operatorSign = undefined;
                otherThanNum = false;
            }
            else {
                calcScreen.textContent = Number(arrayOfFirstSetNum.join("")).toLocaleString('en-US');
                operatorSignCounter = 0;
                operatorSign = undefined;
                otherThanNum = false;
            }
            
        }
        else if (arrayOfSecondSetNum.length === 0 && operatorSignCounter === 1) {
            if (target === "=") {
                if (typeof arrayOfFirstSetNum === "number") {
                    calcScreen.textContent = arrayOfFirstSetNum;
                    operatorSignCounter = 0;
                    operatorSign = undefined;
                    otherThanNum = false;
                }
                else {
                    calcScreen.textContent = Number(arrayOfFirstSetNum.join("")).toLocaleString('en-US');
                    operatorSignCounter = 0;
                    operatorSign = undefined;
                    otherThanNum = false;
                }
            }
            else {
                calcScreen.textContent = target;
                operatorSign = target;
            }

        }
        else {
            calcScreen.textContent = target;
            operatorSign = target;
            operatorSignCounter ++
            otherThanNum = true;
        }

    }
    else if(arrayOfCtrl.includes(target)) {
        if (target === "AC") {
            calcScreen.textContent = target;
            operatorSignCounter = 0;
            operatorSign = undefined;
            arrayOfFirstSetNum = [];
            arrayOfSecondSetNum = [];
            otherThanNum = false;
        }
        else if (target === "CE") {
            if (arrayOfFirstSetNum.length > 0 && typeof arrayOfFirstSetNum !== "number" && operatorSignCounter === 0 && arrayOfSecondSetNum.length === 0) {
                arrayOfFirstSetNum.pop();
                calcScreen.textContent = Number(arrayOfFirstSetNum.join("")).toLocaleString('en-US');
            }
            else if (typeof arrayOfFirstSetNum === "number" && operatorSignCounter === 0 && arrayOfSecondSetNum.length === 0) {
                arrayOfFirstSetNum = [];
                arrayOfSecondSetNum = [];
                operatorSignCounter = 0;
                operatorSign = undefined;
                otherThanNum = false;
                calcScreen.textContent = Number(arrayOfFirstSetNum.join("")).toLocaleString('en-US');
            }
            else if (arrayOfFirstSetNum.length > 0 || typeof arrayOfFirstSetNum === "number" && operatorSignCounter > 0 && arrayOfSecondSetNum.length === 0) {
                operatorSignCounter = 0;
                operatorSign = undefined;
                calcScreen.textContent = " ";
            }
            else if (arrayOfFirstSetNum.length > 0 || typeof arrayOfFirstSetNum === "number" && operatorSignCounter > 0 && arrayOfSecondSetNum.length > 0) {
                arrayOfSecondSetNum.pop();
                calcScreen.textContent = Number(arrayOfSecondSetNum.join("")).toLocaleString('en-US');
            }
        }
    }
console.log(`this is the operator sign ${operatorSign}`);
console.log(`this is the operator sign counter ${operatorSignCounter}\n`);
console.log("....")
console.log(`this is the first arr ${arrayOfFirstSetNum}`);
console.log(`this is the first arr type ${typeof arrayOfFirstSetNum}`);
console.log(`this is the first arr length ${arrayOfFirstSetNum.length}\n`);
console.log("....")
console.log(`this is the other num indicator ${otherThanNum}`);

};


function operator(num1, opsSign, num2) {
    let firstOps;
    let secondOps;
    if (typeof num1 === "number") {
        firstOps = num1;
    }
    else if (num1.includes(".")) {
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
            return firstOps + secondOps;
        case ("-"):
            return firstOps - secondOps;
        case ("*"):
            return (Math.round((firstOps * secondOps) * 100) / 100);
        case ("/"):
            if (secondOps === 0) {
                return "Infinit Infinitum"
            }
            else {
                return (Math.round((firstOps / secondOps) * 100) / 100);
            }
    }
}







