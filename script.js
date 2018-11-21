const form = document.forms[0]
const inputsWrapper = document.getElementsByClassName("inputs-wrapper")[0]
const numberField = form.elements.item("user-input")
const submitButton = form.elements[1]
const resetButton = document.querySelector("input[type='reset']")
const status = document.getElementById("status-message")
const ballNumbers = document.querySelectorAll(".ball-number")
const balls = document.querySelectorAll(".ball")
const firstBall = document.querySelector(".ball")

let randNum = Math.round(Math.random() * 100 + 1)

console.log("random number is: " + randNum)

let round = 1
let userInput, li

function gameOver() {
  numberField.disabled = true
  submitButton.disabled = true

  inputsWrapper.classList.add("hidden")
  inputsWrapper.addEventListener("transitionend", function(event) {
    if (event.propertyName === "opacity") {
      inputsWrapper.style.display = "none"
      resetButton.style.display = "inline-block"
      resetButton.classList.remove("hidden")
    }
  })
}

form.onsubmit = function(e) {
  // user can only submit if round is not more than 10
  e.preventDefault()

  userInput = parseInt(numberField.value)
  ball = document.querySelector(`li:nth-of-type(${round}) .ball`)
  ballNumber = document.querySelector(`li:nth-of-type(${round}) .ball-number`)
  ballNumber.textContent = userInput

  if (userInput === randNum) {
    gameOver()
    status.classList.add("win")
    status.textContent = "Yaaaassss! You guessed correctly!"
    ball.classList.add("win")
    return
  } else if (userInput > randNum) {
    status.innerHTML =
      "Noooooop, your number is <strong>too <sup>high</sup></strong>"
    ball.classList.remove("bounce")
  } else if (userInput < randNum) {
    status.innerHTML =
      "Noooooop, your number is <strong>too <sub>low</sub></strong>"
    ball.classList.remove("bounce")
  } else {
    status.innerHTML =
      "Your number is out of range! Please enter between 1 to 100."
  }

  round++

  if (round <= 10) {
    nextBall = document.querySelector(`li:nth-of-type(${round}) .ball`)
    nextBall.classList.add("bounce")
  } else {
    gameOver()
    status.classList.add("lose")
    status.innerHTML = "GAME OVER!!! You lost!"
  }
}

form.addEventListener("reset", function() {
  resetButton.classList.add("hidden")
  resetButton.addEventListener("transitionend", function(event) {
    if (event.propertyName === "opacity") {
      resetButton.style.display = "none"
      inputsWrapper.style.display = "block"
      inputsWrapper.classList.remove("hidden")
    }
  })

  round = 1
  numberField.disabled = false
  submitButton.disabled = false
  status.innerHTML =
    "Start the game by submitting a number in the number field above."
  status.classList.remove("lose")
  status.classList.remove("win")
  ballNumbers.forEach(function(ballNumber) {
    ballNumber.innerHTML = ""
  })
  balls.forEach(function(ball) {
    ball.classList.remove("win")
    ball.classList.remove("bounce")
  })
  firstBall.classList.add("bounce")
  randNum = Math.round(Math.random() * 100 + 1)

  console.log("new random number is: " + randNum)
})
