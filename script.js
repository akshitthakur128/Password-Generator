const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthDisplay]");
const indicator = document.querySelector("[data-indicator]");
const uppercase = document.querySelector('#uppercase');
const lowercase = document.querySelector('#lowercase');
const numbers = document.querySelector('#numbers');
const symbols = document.querySelector('#symbols');
let copyMessage = document.querySelector("[copyMessage]");
let copyBtn = document.querySelector(".copyBtn");
let passwordDisplay = document.querySelector("input[passwordDisplay]");.
let allcheckBoxes = document.querySelectorAll("input[type=checkbox]");
let generateBtn = document.querySelector("#generateBtn");
const symbol = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
let password = "";
let passwordLength = 10;
let checkCount = 1;
handleSlider();
// set strength circle color to grey


// set passswordLength
function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}

function setIndicator(color){
    indicator.style.background = color;
}
function getRndInteger(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNumber(){
    return getRndInteger(0, 9);
}

function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97, 123));
}

function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65, 91));
}

function generateSymbol(){
    const randNum = getRndInteger(0, symbol.length);
    return symbol.charAt(randNum);
}

function shufflePassword(array){
    // Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}
function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbol = false;

    if (uppercase.checked) hasUpper = true;
    if (lowercase.checked) hasLower = true;
    if (numbers.checked) hasNumber = true;
    if (symbol.checked) hasSymbol = true;

    if (hasUpper && hasLower && (hasNumber || hasSymbol) && passwordLength >= 8) {
        setIndicator("#0f0");
    } else if (
        (hasLower || hasUpper) &&
        (hasNumber || hasSymbol) &&
        passwordLength >= 6
    ) {
        setIndicator("#ff0");
    } else {
        setIndicator("#f00");
    }
}

function handleCheckBoxChange(){
    checkCount = 0;
    allcheckBoxes.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount++;
        }
    })
    // special Condition
    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
}
allcheckBoxes.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})

async function copyContent(){
        try{
        await (navigator.clipboard.writeText(passwordDisplay.value));
        copyMsg.innerText = "copied";
        }   
        catch(e){
        copyMsg.innerText = "Failed";
        }

        copyMsg.classList.add("active");

        setTimeout(() => {
            copyMsg.classList.remove("active");
        }, 2000);
}



inputSlider.addEventListener('input', (e) =>{
    passwordLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click', () => {
    if(passwordDisplay.value)
        copyContent();
})

generateBtn.addEventListener('click', ()=>{
    // none of the checkbox are selected
    if(checkCount <= 0) return;

    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
    // let's start the journey to find new password
    // remove old password
    password = "";
    // let's put the stuff mentioned by checkboxes
    // if(uppercaseCheck.checked){
    //     password += generateUpperCase();
    // }
    // if(lowercaseCheck.checked){
    //     password += generateUpperCase();
    // }if(numberCheck.checked){
    //     password += generateRandomNumber();
    // }if(symbolsCheck.checked){
    //     password += generateUpperCase();
    // }
    let funcArr = [];
    if(uppercaseCheck.checked){
        funcArr.push(generateUpperCase);
    }
    if(lowercaseCheck.checked){
        funcArr.push(generateLowerCase);
    }
    if(numberCheck.checked){
        funcArr.push(generateRandomNumber);
    }
    if(symbolsCheck.checked){
        funcArr.push(generateSymbol);
    }   
    // compulsory addition
    for(let i = 0; i<funcArr.length; i++){
        password += funcArr[i]();
    }
    // remaining addition
    for(let i = 0; i<passwordLength-funcArr.length; i++){
        let rndIndex = getRndInteger(0, funcArr.length);
    }

    // Shuffle the password
    password = shufflePassword(Array.from(password));
    // show the password in UI
    passwordDisplay.value = password;

    // calcualte Strength
    calcStrength();
    

})


