const timeoutUI = document.querySelector('span.timeout');
const resultContainerUI = document.querySelector('.result-container');
const timeoutContainerUI = document.querySelector('.timeout-container');
const finishButtonUI = document.querySelector(".finish-button");
const questionContainerUI = document.querySelector('.questions');
const mcqContainerUI = document.querySelector('.mcq-container');
let time = 1; // in minutes
let marks = 0;

const questions = [
  {
    "title": "What is the past form of 'eat'?",
    "options": ["eat", "ate", "eaten", "have ate"],
    "answer": "ate"
  },
  {
    "title": "Which sentence is present continuous tense?",
    "options": [
      "I eat rice",
      "I am eating rice",
      "I have eaten rice",
      "I have been eating rice for 1 year"
    ],
    "answer": "I am eating rice"
  },
  {
    "title": "Which sentence is present perfect tense?",
    "options": [
      "I eat rice",
      "I am eating rice",
      "I have eaten rice",
      "I have been eating rice for 1 year"
    ],
    "answer": "I have eaten rice"
  },
  {
    "title": "Which sentence is present perfect continuous tense?",
    "options": [
      "I eat rice",
      "I am eating rice",
      "I have eaten rice",
      "I have been eating rice for 1 year"
    ],
    "answer": "I have been eating rice for 1 year"
  },
  {
    "title": "Which sentence is past continuous tense?",
    "options": [
      "I eat rice",
      "I was eating rice",
      "I have eaten rice",
      "I have been eating rice for 1 year"
    ],
    "answer": "I was eating rice"
  },
  {
    "title": "Which sentence is past perfect tense?",
    "options": [
      "I eat rice",
      "I was eating rice",
      "I have eaten rice",
      "I have been eating rice for 1 year"
    ],
    "answer": "I have eaten rice"
  },
  {
    "title": "Which sentence is past perfect continuous tense?",
    "options": [
      "I eat rice",
      "I was eating rice",
      "I have eaten rice",
      "I have been eating rice for 1 year"
    ],
    "answer": "I have been eating rice for 1 year"
  },
  {
    "title": "Which sentence is future continuous tense?",
    "options": [
      "I eat rice",
      "I will be eating rice",
      "I have eaten rice",
      "I have been eating rice for 1 year"
    ],
    "answer": "I will be eating rice"
  },
  {
    "title": "Which sentence is future perfect tense?",
    "options": [
      "I eat rice",
      "I will be eating rice",
      "I will have eaten rice",
      "I have been eating rice for 1 year"
    ],
    "answer": "I will have eaten rice"
  },
  {
    "title": "Which sentence is future perfect continuous tense?",
    "options": [
      "I eat rice",
      "I will be eating rice",
      "I will have eaten rice",
      "I will have been eating rice for 1 year"
    ],
    "answer": "I will have been eating rice for 1 year"
  }
]

function updateTimeUI() {
  let minute = time - 1;
  let sec = 59;
  setInterval(function () {
    timeoutUI.innerHTML = `00:${minute < 10 ? '0' + minute : minute}:${sec < 10 ? '0' + sec : sec}`
    sec--;
    if (sec === 0) {
      minute--;
      sec = 59;

      if (minute < 0) {
        timeoutContainerUI.classList.remove('d-none');
        mcqContainerUI.classList.add('d-none');
      }
    }

  }, 1000);
}

function renderQuestions() {
  let htmlStr = '';

  questions.forEach((question, index) => {
    const { title, options } = question;

    htmlStr +=
      `<div class="card">
        <h2>${index + 1} . ${title}</h2>
        <ul>
          ${options.map((option, idx) => `<li>
            <input 
              type="radio" 
              name="question-${index + 1}" 
              id="${index}-${idx}"  
              value="${option}"
              data-question-index="${index}"
            />

            <label for="${index}-${idx}">${option}</label>
          </li>`).toString().replaceAll(',', '')}
        </ul>
      </div>`;
  })

  questionContainerUI.innerHTML = htmlStr;
}

function calcResult() {
  const selectedItems = document.querySelectorAll('input:checked');

  selectedItems.forEach(item => {
    const selectedValue = item.value;
    const questionIndex = item.getAttribute('data-question-index');
    if (selectedValue === questions[questionIndex].answer) marks++;
  })

  // show score
  document.querySelector('.score').textContent = marks;

  resultContainerUI.classList.remove('d-none');
  questionContainerUI.classList.add('d-none');
  mcqContainerUI.classList.add('d-none');
}


finishButtonUI.addEventListener('click', calcResult);

renderQuestions();
updateTimeUI();