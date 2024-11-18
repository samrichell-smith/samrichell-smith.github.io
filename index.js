
function generatePassword(length, includeLowercase, includeUppercase, includeNumbers, includeSymbols){

    const lowerChars = "abcdefghijklmnopqrstuvwxyz";
    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numChars = "1234567890";
    const symbolChars = "!@#$%^&*()_+}{";

    let allowedChars = "";
    let password = "";

    allowedChars += includeLowercase ? lowerChars : "";
    allowedChars += includeUppercase ? upperChars : "";
    allowedChars += includeNumbers ? numChars : "";
    allowedChars += includeSymbols ? symbolChars : "";

    if(length <= 0){
        return `(Password length must be at least 1)`;
    }

    if(allowedChars.length === 0){
        return `(At least one set of characters must be selected)`;
    }

    for(let i = 0; i < length; i++){

        const randomChar = Math.floor(Math.random() * allowedChars.length);
        password += allowedChars[randomChar];
    }

    return password;
}

const button = document.getElementById("Submit");
const generatedPassword = document.getElementById("generatedPassword");
const outputStrength = document.getElementById("passwordStrength");



button.onclick = function(){
    
    const passwordLength = document.getElementById("length").value;
    const includeLowercase = document.getElementById("lowercase").checked;
    const includeUppercase = document.getElementById("uppercase").checked;
    const includeNumbers = document.getElementById("numbers").checked;
    const includeSymbols = document.getElementById("symbols").checked;


    const password = generatePassword(passwordLength, includeLowercase, includeUppercase, includeNumbers, includeSymbols);
    const strength = passwordStrength(password);
    generatedPassword.innerHTML = `${password}`;
    outputStrength.innerHTML = `${strength}`;

    let text = password;  // Your text, calculated in JS
    let containerWidth = 490;  // The width of the box in px
    let minFontSize = 20;  // Minimum font size
    let maxFontSize = 70;  // Maximum font size

    adjustFontSize(text, containerWidth, minFontSize, maxFontSize);
}

function passwordStrength(password){

    const length = password.length;
    let possibleChars = 0;

    const lowerChars = "abcdefghijklmnopqrstuvwxyz";
    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numChars = "1234567890";
    const symbolChars = "!@#$%^&*()_+}{";

    
    for(let lowerChar of lowerChars){
        if(password.includes(lowerChar)){
            possibleChars += 26;
            break;
        }
    }

    for(let upperChar of upperChars){
        if(password.includes(upperChar)){
            possibleChars += 26;
            break;
        }
    }

    for(let numChar of numChars){
        if(password.includes(numChar)){
            possibleChars += 10;
            break;
        }
    }

    for(let symbolChar of symbolChars){
        if(password.includes(symbolChar)){
            possibleChars += 15;
            break;
        }
    }

    let strengthRating = possibleChars ** length;
    const strengthBox = document.getElementById("passwordStrength");


    switch(true){
        case (strengthRating <= 10 ** 10):
            strength = "Very Weak";
            strengthBox.style.backgroundColor = `#873434`;
            break;
        case (strengthRating <= 10 ** 15 && strengthRating > 10 ** 10):
            strength = "Weak";
            strengthBox.style.backgroundColor = `#ffc067`;
            break;  
        case (strengthRating <= 10 ** 18 && strengthRating > 10 ** 15):
            strength = "Moderate";
            strengthBox.style.backgroundColor = `#ffefbf`;
            break;
        case (strengthRating <= 3.2 * 10 ** 21 && strengthRating > 10 ** 18):
            strength = "Strong";
            strengthBox.style.backgroundColor = `#ffffbf`;
            break;
        case (strengthRating > 3.2 * 10 ** 21):
            strength = "Unbreakable";
            strengthBox.style.backgroundColor = `#d2e9b4`;
            break;

    }

    const textBox = document.getElementById("passwordStrength");
    textBox.style.fontSize = `70px`;

    return strength;
}

function adjustFontSize(text, containerWidth, minFontSize, maxFontSize) {
    const textBox = document.getElementById("generatedPassword");
    textBox.innerText = text;  

    const textLength = text.length;

    
    let fontSize = Math.max(minFontSize, Math.min(maxFontSize, containerWidth * 1.5 / textLength));

    
    textBox.style.fontSize = `${fontSize}px`;
}



