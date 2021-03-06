function add(a,b){
    return Number(a) + Number(b);
}

function subtract(a,b){
    return a - b;
}

function multiply(a,b){
    return a * b;
}

function divide(a,b){
    return a/b;
}

function modulo(a,b){
    return a%b;
}

function operate(operator, a, b){
    if(operator === "+") return add(a,b);
    else if (operator === "-") return subtract(a,b);
    else if (operator === "x") return multiply(a,b);
    else if (operator === "÷") return divide(a,b);
    else if (operator == "%") return modulo(a,b);
}

let first;
let second;
let operator ="";
let clear = false;
let sign = "+";
let decimal = false;

function getDec(number){
    if(Math.floor(number) !== number){
        return String(number).split(".")[1].length || 0;
    }
    return 0;
}

function round(number){
    let numDig = String(number).length;
    let numDec = getDec(number);
    if(numDig > 10){
        let difference = numDig - 10;
        let roundDec = numDec - difference;
        return number.toFixed(roundDec);
    }
    return number;
}

function checkDivideZero(operator, second){
    if(operator == "÷" && second == "0"){
        return true;
    }
    return false;
}

function display(){
    const buttons = document.querySelectorAll("button");
    const result = document.querySelector(".result");
    buttons.forEach(button => {
        button.addEventListener('click', ()=>{
            if(button.className == "operation" && button.textContent != "=" || button.textContent == "%"){
                if(operator !== ""){
                    if(checkDivideZero(operator, result.textContent)) {
                        result.textContent = "haha nice try";
                        clear = false;
                    }else{
                        let solution = operate(operator, first, result.textContent);
                        if (isNaN(solution)){
                            result.textContent = "NaN";
                        }else{
                            result.textContent = round(solution);
                        }
                        clear = true;
                    }
                }else{
                    clear = true;
                }
                first = result.textContent;
                operator = button.textContent;
            }else if(button.textContent =="="){
                second = result.textContent;
                if(checkDivideZero(operator, second)) {
                    result.textContent = "haha nice try";
                }else{
                    let solution = operate(operator, first, second);
                    if (isNaN(solution)){
                        result.textContent = "NaN";
                    }else{
                        result.textContent = round(solution);
                    }
                }
                first = result.textContent;
                operator = "";
                clear = false;
            }else if(button.textContent =="C"){
                result.textContent = "0";
                first = "0";
                second = "0";
                clear = false;
                operator = "";
            }else if(button.textContent =="+/-"){
                if (sign == "+") {
                    result.textContent = "-" + result.textContent;
                    sign = "-";
                }else {
                    result.textContent = result.textContent.substring(1);
                    sign = "+";
                }
            }else if(result.textContent =="0"){
                result.textContent = button.textContent;
            }else{
                if(clear == true){
                    result.textContent = button.textContent;
                    clear = false;
                }else{
                    if (result.textContent.length <= 9) {
                        if(button.textContent =="." && decimal == false){
                            result.textContent += button.textContent;
                            decimal = true;
                        }else if(button.textContent != "."){
                            result.textContent += button.textContent;
                        }
                    }
                }
            }
        })
    })
}

display();