let passwordLength = 16

const inputEl = document.getElementById("password")
const passwordLengthEl = document.querySelector("#password-length")

const upperCaseCheck = document.querySelector("#uppercase-check")
const numberCheck = document.querySelector("#number-check")
const symbolCheck = document.querySelector("#symbol-check")

const securityIndicatorBarEl = document.querySelector("#security-indicator-bar")

function generatePassword() {
    let chars = "abcdefghjkmnpqrstuvwxyz"

    const upperCaseChars = "ABCDEFGHJKLMNPQRSTUVWXYZ"
    const numberChars = "123456789"
    const symbolChars = "!@&*()[]"

    if (upperCaseCheck.checked) {
        chars += upperCaseChars
    }
    
    if (numberCheck.checked)  {
        chars += numberChars
    }
    
    if (symbolCheck.checked) {
        chars += symbolChars
    }

    let password = ""

    for(let i = 0; i < passwordLength; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length)
        password += chars.substring(randomNumber, randomNumber + 1)
    }
    inputEl.value = password
    calculateQuality()
    calculateFontSize()
}

function calculateQuality() {
    const percent = Math.round(
        (passwordLength / 64) * 40 +
        (upperCaseCheck.checked ? 20 : 0) +
        (numberCheck.checked ? 20 : 0) +
        (symbolCheck.checked ? 20 : 0)
    )

    console.log(percent)

    securityIndicatorBarEl.style.width = `${percent}%`
    
    if (percent > 69) {
        securityIndicatorBarEl.classList.remove("critical")
        securityIndicatorBarEl.classList.remove("warning")
        securityIndicatorBarEl.classList.add("safe")
    } else if (percent > 50) {
        securityIndicatorBarEl.classList.remove("critical")
        securityIndicatorBarEl.classList.remove("safe")
        securityIndicatorBarEl.classList.add("warning")
    } else {
        securityIndicatorBarEl.classList.add("critical")
        securityIndicatorBarEl.classList.remove("warning")
        securityIndicatorBarEl.classList.remove("safe")
    }

    if (percent >= 100) {
        securityIndicatorBarEl.classList.add("completed")
    } else {
        securityIndicatorBarEl.classList.remove("completed")
    }
}

function calculateFontSize () {
    if (passwordLength > 45) {
        inputEl.classList.remove('font-sm')
        inputEl.classList.remove('font-xs')
        inputEl.classList.add('font-xxs')
    } else if (passwordLength > 32) {
        inputEl.classList.remove('font-sm')
        inputEl.classList.add('font-xs')
        inputEl.classList.remove('font-xxs')
    } else if (passwordLength > 22) {
        inputEl.classList.add('font-sm')
        inputEl.classList.remove('font-xs')
        inputEl.classList.remove('font-xxs')
    } else {
        inputEl.classList.remove('font-sm')
        inputEl.classList.remove('font-xs')
        inputEl.classList.remove('font-xxs')
    }
}

function copy() {
    navigator.clipboard.writeText(inputEl.value)
}

document.getElementById("copy-1").addEventListener("click", copy)
document.getElementById("copy-2").addEventListener("click", copy)

passwordLengthEl.addEventListener("input", function(){
    passwordLength = passwordLengthEl.value
    document.querySelector("#password-length-text").innerHTML = passwordLengthEl.value
    generatePassword()
})

upperCaseCheck.addEventListener('click', generatePassword)
numberCheck.addEventListener('click', generatePassword)
symbolCheck.addEventListener('click', generatePassword)

document.getElementById("renew").addEventListener("click", generatePassword)

generatePassword()