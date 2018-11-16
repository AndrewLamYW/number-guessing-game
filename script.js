const form = document.forms[0]
const numberField = form.elements.item("user-input")
const submitButton = form.elements[1]
const resetButton = document.querySelector("#guessing-form input[type='reset']")
const status = document.getElementById("status-message")
const listItems = document.querySelectorAll("li")

console.log(numberField)

const randNum = Math.round((Math.random() * 100) + 1)

console.log("random number is: " + randNum)

let round = 1;
let userInput, li

function disableInputs() {
    numberField.disabled = true
    submitButton.disabled = true
}

function enableInputs() {
    numberField.disabled = false
    submitButton.disabled = false
}

function clearListItemsContent() {
    listItems.forEach(function (listItem) {
        listItem.innerHTML = ""
    })
}

function resetGame() {
    enableInputs()
    status.innerHTML = "Start the game by submitting a number in the number field above."
    clearListItemsContent()
}

form.onsubmit = function (e) {
    // user can only submit if round is not more than 10
    e.preventDefault()
    const numInput = e.target[0]
    const submitButton = e.target[1]

    userInput = parseInt(numInput.value)
    li = document.querySelector(`li:nth-of-type(${round})`)
    li.textContent = userInput


    if (userInput === randNum) {
        status.textContent = "Yaaaassss! You guessed correctly!"
        disableInputs()
    } else if (userInput > randNum) {
        status.innerHTML = "Noooooop, your number is <strong>too <sup>high</sup></strong>"
    } else if (userInput < randNum) {
        status.innerHTML = "Noooooop, your number is <strong>too <sub>low</sub></strong>"
    } else {
        status.innerHTML = "Your number is out of range! Please enter between 1 to 100."
    }

    round++

    if (round > 10) {
        disableInputs()
    }


}

form.addEventListener("reset", resetGame)