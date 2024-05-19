let questions = [];
let currentQuestionIndex = 0;
let score = 0;

function generateQuestionForms() {
    const questionCount = document.getElementById('questionCount').value;
    if (questionCount > 0) {
        const quizForm = document.getElementById('quizForm');
        quizForm.innerHTML = '';
        for (let i = 0; i < questionCount; i++) {
            quizForm.innerHTML += `
                <div class="input-container">
                    <input type="text" placeholder="Enter question ${i + 1}" id="question${i}">
                    <input type="text" placeholder="Option 1" id="option${i}0">
                    <input type="text" placeholder="Option 2" id="option${i}1">
                    <input type="text" placeholder="Option 3" id="option${i}2">
                    <input type="text" placeholder="Option 4" id="option${i}3">
                    <input type="number" min="1" max="4" placeholder="Correct option (1-4)" id="correctOption${i}">
                </div>
            `;
        }
        quizForm.innerHTML += `<button onclick="saveQuestions()">Save Questions</button>`;
    }
}

function saveQuestions() {
    const questionCount = document.getElementById('questionCount').value;
    questions = [];
    for (let i = 0; i < questionCount; i++) {
        const questionText = document.getElementById(`question${i}`).value;
        const options = [
            document.getElementById(`option${i}0`).value,
            document.getElementById(`option${i}1}`).value,
            document.getElementById(`option${i}2`).value,
            document.getElementById(`option${i}3`).value
        ];
        const correctOption = parseInt(document.getElementById(`correctOption${i}`).value) - 1;
        questions.push({ questionText, options, correctOption });
    }
    startQuiz();
}

function startQuiz() {
    document.querySelector('.input-container').style.display = 'none';
    document.getElementById('quizForm').style.display = 'none';
    document.querySelector('.quiz-container').style.display = 'block';
    displayQuestion();
}

function displayQuestion() {
    const questionDisplay = document.getElementById('questionDisplay');
    const question = questions[currentQuestionIndex];
    questionDisplay.innerHTML = `
        <div class="question">
            <h3>${question.questionText}</h3>
        </div>
        <div class="options">
            ${question.options.map((option, index) => `
                <label>
                    <input type="radio" name="option" value="${index}"> ${option}
                </label>
            `).join('')}
        </div>
    `;
}

function submitAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
        const selectedValue = parseInt(selectedOption.value);
        if (selectedValue === questions[currentQuestionIndex].correctOption) {
            score++;
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            showScore();
        }
    } else {
        alert('Please select an option.');
    }
}

function showScore() {
    document.querySelector('.quiz-container').style.display = 'none';
    const scoreContainer = document.getElementById('scoreContainer');
    scoreContainer.style.display = 'block';
    document.getElementById('score').innerText = `${score} / ${questions.length}`;
}
