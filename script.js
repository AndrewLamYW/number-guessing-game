const form = document.forms.namedItem("guessing-form")
const status = document.getElementById("status")

const randNum = Math.round((Math.random() * 100) + 1)

console.log("random number is: " + randNum)

let round = 1;
let userInput, li


form.onsubmit = function (e) {
    // user can only submit if round is not more than 10
    e.preventDefault()
    const numInput = e.target[0]
    const submitButton = e.target[1]

    userInput = parseInt(numInput.value)
    li = document.querySelector(`li:nth-of-type(${round})`)
    li.textContent = userInput


    if (userInput === randNum) {
        status.textContent = "Bingo! You guessed correctly!"
        disableInputs()
    } else if (userInput > randNum) {
        status.innerHTML = "Your number is <strong>too high</strong>, try again."
    } else if (userInput < randNum) {
        status.innerHTML = "Your number is <strong>too low</strong>, try again."
    } else {
        status.innerHTML = "Your number is out of range! Please enter between 1 to 100."
    }

    round++

    if (round > 10) {
        disableInputs()
    }

    function disableInputs() {
        numInput.disabled = true;
        submitButton.disabled = true;
    }
}