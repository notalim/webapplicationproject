import { ObjectId } from "mongodb";
import * as Validator from "email-validator"; //Yousaf - Url: https://www.npmjs.com/package/email-validator
import { phone } from "phone";
import validator from "validator"; //Yousaf - Url: https://www.npmjs.com/package/validator
//Yousaf - We can prolly just use validator to handle both email and website

export function checkString(str, strName) {
    if (!str) {
        throw `You must provide a ${strName}`;
    }
    if (typeof str !== "string") {
        throw `${strName} must be a string`;
    }
    if (str.trim().length === 0) {
        throw `${strName} can not be an empty string or a string with just spaces`;
    }
    str = str.trim();
    return str;
}
export function checkNumber(num, numName) {
    if (!num) {
        throw `You must provide a ${numName}`;
    }
    if (typeof num !== "number") {
        throw `${numName} must be a number`;
    }
    if (isNaN(num)) {
        throw `${numName} cannot be NaN`;
    }
    return num;
}
export function checkStringArray(arr, arrName) {
    if (!arr) {
        throw `You must provide a ${arrName}`;
    }
    if (!Array.isArray(arr) || arr.length === 0) {
        throw `${arrName} must be a non-empty array`;
    }
    for (let elm of arr) {
        elm = checkString(elm, arrName + " element");
    }
    return arr;
}

export function checkId(id, varName) {
    if (!id) throw `Error: You must provide a ${varName}`;
    if (typeof id !== "string") {
        throw `Error: ${varName} must be a string`;
    }
    id = id.trim();
    if (id.length === 0)
        throw `Error: ${varName} cannot be an empty string or just spaces`;
    if (!ObjectId.isValid(id)) throw `Error: ${varName} invalid object ID`;
    return id;
}

export function checkName(name, varName) {
    name = checkString(name, varName);
    if (name.length < 2) {
        throw `${varName} must be at least 2 characters`;
    }
    if (name.split(" ").length > 1) {
        throw `${varName} must be a single word`;
    }
    var regex = [/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,}$/g];
    if (name.replace(regex, "").length !== name.length) {
        throw `${varName} must not consist of special characters`;
    }
    return name;
}

export function checkCompany(comp, varName) {
    comp = checkString();
    return comp;
}

export function checkLegalAge(age, elmName) {
    age = checkNumber(age, elmName);
    if (age < 18) {
        throw `${elmName} must be at least 18 years old`;
    }
    return age;
}

export function checkPassword(password, elmName) {
    password = checkString(password, elmName);
    //Yousaf - Find password validating function in validator (NPM link at the top)
    //Change this to check if theres any spaces at all.
    if (password.length() != password.replace(" ", "").length()) {
        throw `${elmName} can not contain spaces`;
    }
    if (!validator.isStrongPassword(password)) {
        throw `${elmName} must be a strong password`;
    }
    return password;
}

export function checkWebsite(website, elmName) {
    //Yousaf - Found validator on NPM
    website = checkString(website, elmName);
    if (!validator.isURL(website)) {
        throw `${elmName} must be a valid URL`;
    }
    return website.trim();
}

export function checkEmail(email, elmName) {
    //Yousaf - Found package email-validator on npm, has like 600k downloads a week.
    //         I can do some testing with it later tho to check if it actually works
    //         If yall find anything else cool lmk
    email = checkString(email, elmName);
    if (!Validator.validate(email)) {
        throw `You must provide a valid email`;
    }
    return email.trim();
}

export function checkDate(date, elmName) {
    date = checkString(date, elmName);
    if (!validator.isDate(date)) {
        throw `${elmName} must be a valid date`;
    }
    return date.trim();
}

export function checkGender(gender, elmName) {
    gender = checkString(gender, elmName);
    if (!(gender === "M" || gender === "F")) {
        throw `Invalid value for ${elmName}`;
    }
    return gender;
}

export function checkWorkingHours(workingHours, elmName) {
    workingHours = checkString();
    if (workingHours.length() !== 4) {
        throw `${elmName} must be in valid workingHour format HH(AM/PM)`;
    }
    if (isNan(Number(workingHours.substring(0, 2)))) {
        throw `${elmName} invalid time`;
    }
    if (
        Number(workingHours.substring(0, 2)) < 1 ||
        Number(workingHours.substring(0, 2)) > 12
    ) {
        throw `${elmName} has an invalid time`;
    }
    if (
        workingHours.substring(2) !== "AM" &&
        workingHours.substring(2) !== "PM"
    ) {
        throw `${elmName} must contain only AM or PM`;
    }
    return workingHours.trim();
}

export function checkUserAge(_var, varName) {
    _var = checkNumber(_var, varName);
    //Yousaf - Not sure if the age should be more than 13 or 18 but imma do 18 for now
    //Chose 122 because the older person in the world reach 122 but we can change this later
    //if need be
    if (_var < 18 || _var > 122) {
        throw `${varName} must be a valid age`;
    }
}

export function checkPhone(_var, varName) {
    let Number = checkString(_var, varName);
    if (phone(Number).isValid === false) {
        throw `Invalid phone number`;
    }

    return Number;
}

export function checkPetWeight(_var, varName) {
    _var = checkNumber(_var, varName);
    _var = parseFloat(parseFloat(_var).toFixed(1)); // Round to 1 decimal point and parse back to float
    if (_var < 1 || _var > 180) {
        throw new Error(`${varName} must be a valid weight`);
    }
    return _var;
}

export function checkAgePreferences(_var, varName) {
    checkNumber(_var, varName);
    if (_var <= 0 || _var > 20) {
        `${varName} must be a valid age preference between 0 exclusive and 20 inclusive`;
    }
    return _var;
}

export function checkAddress(adr, varName) {
    // Yousaf - Change address to a subdocument potentially for map API
}
