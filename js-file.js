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
let operator;
let clear = false;

function display(){
    const buttons = document.querySelectorAll("button");
    const result = document.querySelector(".result");
    buttons.forEach(button => {
        button.addEventListener('click', ()=>{
            if(button.id == "÷" || button.id == "x" || button.id =="-" ||button.id=="+"){
                if((typeof operator) !== 'undefined'){
                    let solution = operate(operator, first, result.textContent);
                    result.textContent = solution;
                }
                first = result.textContent;
                operator = button.id;
                clear = true;
            }else if(button.id =="="){
                second = result.textContent;
                result.textContent = operate(operator, first, second);
            }else if(button.id =="C"){
                result.textContent = "0";
                first = "0";
                second = "0";
                clear = false;
            }else if(result.textContent =="0"){
                result.textContent = button.id;
            }else{
                if(clear == true){
                    result.textContent = button.id;
                    clear = false;
                }else{
                    result.textContent += button.id;
                }
            }
        })
    })
}

display();