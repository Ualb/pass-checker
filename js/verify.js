const lengthSumary = (pw) => {
    return pw.length * 4;
};

const lengthLetterCase = (pw, typeCase) => {
    let count = 0;
    let multplier = null;
    let regex = null;

    switch (typeCase) {
        case 1: { // upper case
            regex = "^[A-Z]+"; 
            multplier = (count, length) => {
                if (count == 0) return 0;
                return (length - count) * 2;
            }; 
            break;
        };
        case 2: { // lower case
            regex = "^[a-z]+"; 
            multplier = (count, length) => {
                if (count == 0) return 0;
                return (length - count) * 2;
            }; 
            break;
        }
        case 3: { // numbers
            regex = "^[0-9]+"; 
            multplier = (count) => {
                return count * 4;
            }; 
            break;
        }
        case 4: { // symbols
        regex = "[^a-zA-Z0-9]"; 
            multplier = (count) => {
                return count * 6;
            } 
            break;
        }
    } 
    for(let iterator = 0; iterator < pw.length; ++iterator) { 
        if(new RegExp(regex).test(pw[iterator]))
            count++;  
    } 
    return ([1, 2].some((element) => element == typeCase)? multplier(count, pw.length): multplier(count));
};


const onlyType = (pw, type) => {
    if (type == 1) // letters
        return (pw.match(new RegExp("[A-Z]")) || pw.match(new RegExp("[a-z]")))? pw.length: 0;
    else // numbers
        return (pw.match(new RegExp("[0-9]")))? pw.length: 0;
};

const chartRepeat = (pw, typeCase) => {
    let counter = 0;
    let lastChar = '';  
    for (let iterator = 0; iterator < pw.length; ++iterator) {  
        if (typeCase == 1) // for letters
            if ((pw[iterator] == lastChar.toLowerCase() || pw[iterator] == lastChar.toUpperCase())
               && (new RegExp("[A-Z]").test(pw[iterator]) || new RegExp("[a-z]").test(pw[iterator]))) 
                   ++counter; 
        else  // for numbers
            if (pw[iterator] == lastChar && new RegExp("[0-9]").test(pw[iterator]))  
                ++counter;  
        lastChar = pw[iterator];
    }
    if (counter == 1) return counter + 1;
    return counter > 1? (counter + 1) * (counter): counter * (counter);
}

const isUpper = (letter) => { 
    if (letter !== null) {
        return letter !== letter.toLowerCase();
    }
    return false;
}

const isLower = (letter) => {
    if (letter !== null) {
        return letter !== letter.toUpperCase();
    }
    return false;
}

const caseRepeat = (pw, typeCase) => { 
    let counter = 0;
    let lastChar = null;  
    for (let iterator = 0; iterator < pw.length; ++iterator) { 
        if (typeCase == 1) {  // for upper case
            if (isUpper(lastChar) && isUpper(pw[iterator]) && lastChar === pw[iterator]){
                ++counter; 
            }
        }
        else {  // for lower case
            if (isLower(lastChar) && isLower(pw[iterator]) && lastChar === pw[iterator])  {
                ++counter;  
            }
        }
        lastChar = pw[iterator];
    } 
    return counter * 2;
}



const timeForCrack = (pass, upper, lower, numbers, symbols) => {
    if ((pass.length >= 9 && pass.length <= 10) && numbers && upper && lower) {
        return "days";
    }
    if ((pass.length > 8 && pass.length <= 13) && (upper || lower)) {
        return "hours";
    }
    if ((pass.length > 8 && pass.length <= 13) && (upper || lower) && (numbers || symbols)) {
        return "weeks";
    }
    if ((pass.length > 8 && pass.length <= 13) && upper && lower && numbers && symbols) {
        return "years";
    }
    if (pass.length > 13 && (upper || lower) && (!numbers && !symbols)) {
        return "weeks";
    }
    if (pass.length > 13 && upper && lower && numbers && symbols) {
        return "millennial";
    }
    if (pass.length <= 8 && (numbers && symbols)) {
        return "hours";
    }
    if (pass.length <= 8) {
        return "minutes";
    }  
    return "Is not possible to calc";
}
 
async function verify(event) { 
    (new TitleButton()).hide();
    let pass = password.value;
    let lengthValue = lengthSumary(pass);
    let upperCase = lengthLetterCase(pass, 1);
    let lowerCase = lengthLetterCase(pass, 2);
    let numberCase = lengthLetterCase(pass, 3);
    let symbolCase = lengthLetterCase(pass, 4);

    let sumaryPossitive = lengthValue + upperCase + lowerCase + numberCase + symbolCase;

    let onlyLetters = onlyType(pass, 1);
    let onlyNumbers = onlyType(pass, 2);

    if (onlyLetters > 0 && onlyNumbers > 0) {
        onlyLetters = 0;
        onlyNumbers = 0;
    }

    let currentLetters = chartRepeat(pass, 1); 
    let currentNumbers = chartRepeat(pass, 2);
    let upperRepeat = caseRepeat(pass, 1);
    let lowerRepeat = caseRepeat(pass, 2);
    
    let summaryNegative = onlyNumbers + onlyLetters + currentLetters + currentNumbers + upperRepeat + lowerRepeat;

    let isExposed = await isExplosed(pass.toLowerCase());
    let timeCrack = timeForCrack(pass, upperCase > 0, lowerCase > 0, numberCase > 0, symbolCase > 0);
    (new TitleButton()).show();
    filterResultId.innerHTML = (isExposed? "This password is exposed in dictionaries for crack, please change the password."
                                            : "This password is temporarily protected, please learn the complexity result.");
    complexResultId.innerHTML = "This password has " 
                                    + sumaryPossitive 
                                    + " strong points and " 
                                    + summaryNegative 
                                    + " weak points."
                                    + " Break-in time: " 
                                    + timeCrack
                                    + "."; 

}


document.querySelector("#passwordSubmit").addEventListener("click", verify);
