//DOM Selection
let numOrOperator = document.querySelector("#calc-keypad");
let calcScreen = document.querySelector("#calc-screen");

let allDivs = document.querySelectorAll(".calc-single-key, .calc-ctrl-keys, .calc-operation-keys, .key-big");

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
numOrOperator.addEventListener("click", keyPressed)
allDivs.forEach(event => {
    event.addEventListener("mouseenter", hoverKeys);
    event.addEventListener("mouseout", (event) => { event.target.style.border = "1px solid rgb(148,148,148)";})
});



function keyPressed(event) {
    let target = event.target.textContent;
    let firsArrContent 
    firsArrContent = !(arrayOfFirstSetNum.some(value => Number.isInteger(Number(value))));


    if (arrayOfFirstSetNum.length < 12 && target ===  "."  && arrayOfFirstSetNum.length === 0) {
        arrayOfFirstSetNum.push("0", ".");
        calcScreen.textContent = Number(arrayOfFirstSetNum.join("")).toLocaleString('en-US');
    }
    else if (arrayOfFirstSetNum.length === 0 && target === "-") {
        arrayOfFirstSetNum.push(target);
        calcScreen.textContent = target;

    }
    else if (arrayOfFirstSetNum.length === 0 && firsArrContent && target !== "-" && ["/", "*", "+", "="].includes(target)) {
        calcScreen.textContent = target;
        operatorSignCounter = 0;
        operatorSign = [];

    }
    else if(arrayOfOperators.includes(target) && arrayOfFirstSetNum.length > 0 && operatorSignCounter === 1 && arrayOfSecondSetNum.length > 0) {
        if (target === "=") {
            result = operator(arrayOfFirstSetNum, operatorSign, arrayOfSecondSetNum);
            calcScreen.textContent = result;
            if (typeof result !== "string"){
            arrayOfFirstSetNum = Array.from(String(result));
            arrayOfSecondSetNum = [];
            operatorSignCounter = 0;
            operatorSign = undefined;
            otherThanNum = false;
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
            otherThanNum = true;
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
        if(arrayOfFirstSetNum.length < 12 && !otherThanNum && operatorSignCounter === 0) {
            arrayOfFirstSetNum.push(target);
            calcScreen.textContent = Number(arrayOfFirstSetNum.join("")).toLocaleString('en-US');
        }else if(arrayOfSecondSetNum.length < 12 && otherThanNum) {
            arrayOfSecondSetNum.push(target);
            calcScreen.textContent = Number(arrayOfSecondSetNum.join("")).toLocaleString('en-US');
        }
    } 
    else if (arrayOfFirstSetNum.length < 12 && operatorSignCounter === 0 && !otherThanNum && target ===  "."  && !arrayOfFirstSetNum.includes(target)) {
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
            calcScreen.textContent = Number(arrayOfFirstSetNum.join("")).toLocaleString('en-US');
            operatorSignCounter = 0;
            operatorSign = undefined;
            otherThanNum = false;   
        }
        else if (arrayOfSecondSetNum.length === 0 && operatorSignCounter === 1) {
            if (target === "=") {
                calcScreen.textContent = Number(arrayOfFirstSetNum.join("")).toLocaleString('en-US');
                operatorSignCounter = 0;
                operatorSign = undefined;
                otherThanNum = false;
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
            if (arrayOfFirstSetNum.length > 0 && operatorSignCounter === 0 && arrayOfSecondSetNum.length === 0) {
                arrayOfFirstSetNum.pop();
                arrayOfSecondSetNum = [];
                operatorSignCounter = 0;
                operatorSign = undefined;
                otherThanNum = false;
                calcScreen.textContent = Number(arrayOfFirstSetNum.join("")).toLocaleString('en-US');
            }
            else if (arrayOfFirstSetNum.length > 0 && operatorSignCounter > 0 && arrayOfSecondSetNum.length === 0) {
                operatorSignCounter = 0;
                operatorSign = undefined;
                calcScreen.textContent = " ";
            }
            else if (arrayOfFirstSetNum.length > 0 && operatorSignCounter > 0 && arrayOfSecondSetNum.length > 0) {
                arrayOfSecondSetNum.pop();
                calcScreen.textContent = Number(arrayOfSecondSetNum.join("")).toLocaleString('en-US');
            }
        }
    }
/**  
console.log(`this is the operator sign ${operatorSign}`);
console.log(`this is the operator sign counter ${operatorSignCounter}\n`);
console.log("....")
console.log(`this is the first arr ${arrayOfFirstSetNum}`);
console.log(`this is the first arr type ${typeof arrayOfFirstSetNum}`);
console.log(`this is the first arr length ${arrayOfFirstSetNum.length}\n`);
console.log("....")
console.log(`this is the other num indicator ${otherThanNum}`);
console.log("....")
console.log(`this is the second arr ${arrayOfSecondSetNum}`);
console.log(`this is the second arr type ${typeof arrayOfSecondSetNum}`);
console.log(`this is the second arr length ${arrayOfSecondSetNum.length}\n`);
**/   
};

console.log(numOrOperator)
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


function hoverKeys(event) {
    let target = event.target;

    if (["9", "8", "7", "6", "5", "4", "4", "3", "2", "1", "."].includes(target.textContent)) {
        target.style.border = "3px solid rgb(255, 251, 251)"; 
    }
    else if (["AC", "CE"].includes(target.textContent)) {
        target.style.border = "3px solid rgb(233, 229, 229)"; 
    }
    else if (["/", "*", "-", "+", "0", "="].includes(target.textContent)) {
        target.style.border = "3px solid rgb(255, 214, 0)"; 
    }

}




