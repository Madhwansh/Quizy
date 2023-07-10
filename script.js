const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Rome", "Berlin"],
    answer: 0,
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Venus", "Jupiter", "Saturn"],
    answer: 0,
  },
  {
    question: "Fastest Language in Computer Science?",
    options: ["C++", "C", "Javascript", "Java"],
    answer: 1,
  },
  {
    question: "Which is not a type of Computers?",
    options: ["Quantum", "MainFrame", "Super", "Android"],
    answer: 3,
  },
  {
    question: "Which is not an Oop pillar",
    options: ["Polymorphism", "Abstraction", "Encapsulation", "Applet"],
    answer: 3,
  },
  // Add more questions...
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const optionsContainer =
  document.getElementsByClassName("options-container")[0];
const optionButtons = document.getElementsByClassName("option");
const hintButton = document.getElementById("hint-button");
const resultElement = document.getElementById("result");
const resultContainer = document.getElementById("result-container");

function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  optionsContainer.innerHTML = "";

  for (let i = 0; i < currentQuestion.options.length; i++) {
    const option = document.createElement("div");
    option.textContent = currentQuestion.options[i];
    option.className = "option";
    option.addEventListener("click", () => checkAnswer(i));
    optionsContainer.appendChild(option);
  }
}

function checkAnswer(selectedOptionIndex) {
  const currentQuestion = questions[currentQuestionIndex];

  if (selectedOptionIndex === currentQuestion.answer) {
    score++;
    optionButtons[selectedOptionIndex].classList.add("correct");
  } else {
    optionButtons[selectedOptionIndex].classList.add("wrong");
    optionButtons[currentQuestion.answer].classList.add("correct");
  }

  for (let i = 0; i < optionButtons.length; i++) {
    optionButtons[i].classList.remove("option");
    optionButtons[i].removeEventListener("click", () => checkAnswer(i));
  }

  hintButton.disabled = true;

  setTimeout(() => {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 1500);
}

function showResult() {
  resultElement.textContent = `Your score: ${score}/${questions.length}`;
  resultContainer.style.display = "block";
  document.getElementById("quiz-container").style.display = "none";
}

hintButton.addEventListener("click", () => {
  const currentQuestion = questions[currentQuestionIndex];
  const optionIndexes = Array.from(
    Array(currentQuestion.options.length).keys()
  );
  const wrongOptions = optionIndexes.filter(
    (i) => i !== currentQuestion.answer
  );
  const removedOptions = shuffleArray(wrongOptions).slice(0, 2);

  for (let i = 0; i < removedOptions.length; i++) {
    optionButtons[removedOptions[i]].style.display = "none";
  }

  hintButton.disabled = true;
});

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

showQuestion();
