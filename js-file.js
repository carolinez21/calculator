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

function operate(operator, a, b){
    if(operator === "+") return add(a,b);
    else if (operator === "-") return subtract(a,b);
    else if (operator === "x") return multiply(a,b);
    else if (operator === "÷") return divide(a,b);
}

let first;
let second;
let operator ="";
let clear = false;

function getDec(number){
    if(Math.floor(number) !== number){
        return String(number).split(".")[1].length || 0;
    }
    return 0;
}

function round(number){
    let numDig = String(number).length;
    let numDec = getDec(number);
    if(numDig > 15){
        let difference = numDig - 15;
        let roundDec = numDec - difference;
        return number.toFixed(roundDec);
    }
    return number;
}

function checkDivideZero(operator, first, second){
    if(operator == "÷" && first == "0" && second == "0"){
        return true;
    }
    return false;
}

function display(){
    const buttons = document.querySelectorAll("button");
    const result = document.querySelector(".result");
    buttons.forEach(button => {
        button.addEventListener('click', ()=>{
            if(button.id == "÷" || button.id == "x" || button.id =="-" ||button.id=="+"){
                if(operator !== ""){
                    if(checkDivideZero(operator, first, result.textContent)) {
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
                operator = button.id;
            }else if(button.id =="="){
                second = result.textContent;
                if(checkDivideZero(operator, first, second)) {
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
            }else if(button.id =="C"){
                result.textContent = "0";
                first = "0";
                second = "0";
                clear = false;
                operator = "";
            }else if(result.textContent =="0"){
                result.textContent = button.textContent;
            }else{
                if(clear == true){
                    result.textContent = button.textContent;
                    clear = false;
                }else{
                    result.textContent += button.textContent;
                }
            }
        })
    })
}

display();