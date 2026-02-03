const questions = [
    {
        question: "Which of the following is a core TechNova value?",
        options: ["Speed", "Sustainability", "Security", "Style"],
        correctAnswer: 2,
        explanation: "Security is a core value at TechNova due to our enterprise clients."
    },
    {
        question: "What benefit does TechNova offer from day one?",
        options: ["Health insurance", "Stock options", "Unlimited PTO", "Free lunch"],
        correctAnswer: 0,
        explanation: "Correct! TechNova offers health insurance from day one."
    },
    {
        question: "What should you do if you receive a suspicious email?",
        options: ["Open it", "Delete it", "Report it", "Forward it"],
        correctAnswer: 2,
        explanation: "Report suspicious emails to IT security immediately."
    },
    {
        question: "How often should you update your password?",
        options: ["Never", "Monthly", "Every 90 days", "Daily"],
        correctAnswer: 2,
        explanation: "Passwords should be updated every 90 days for security."
    },
    {
        question: "TechNova's mission is to...",
        options: ["Make money", "Innovate for clients", "Build apps", "Sell software"],
        correctAnswer: 1,
        explanation: "TechNova innovates to serve enterprise clients effectively."
    }
];

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;

const app = document.getElementById('app');

function renderWelcome() {
    app.innerHTML = `
        <h1>Welcome to TechNova Onboarding Quiz</h1>
        <p>Test your knowledge of company values, benefits, and policies.</p>
        <button id="start-btn">Start Quiz</button>
    `;
    document.getElementById('start-btn').addEventListener('click', startQuiz);
}

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    renderQuestion();
}

function renderQuestion() {
    const q = questions[currentQuestionIndex];
    app.innerHTML = `
        <h2>Question ${currentQuestionIndex + 1} of ${questions.length}</h2>
        <p>${q.question}</p>
        <div class="options">
            ${q.options.map((option, index) => `<div class="option" data-index="${index}">${option}</div>`).join('')}
        </div>
        <p id="feedback" class="hidden"></p>
        <p>Score: ${score}/${questions.length}</p>
    `;
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', selectAnswer);
    });
}

function selectAnswer(event) {
    if (selectedAnswer !== null) return;
    selectedAnswer = parseInt(event.target.dataset.index);
    event.target.classList.add('selected');
    document.querySelectorAll('.option').forEach(opt => opt.style.pointerEvents = 'none');
    checkAnswer();
}

function checkAnswer() {
    const q = questions[currentQuestionIndex];
    const feedback = document.getElementById('feedback');
    if (selectedAnswer === q.correctAnswer) {
        score++;
        feedback.className = 'correct';
        feedback.textContent = `Correct! ${q.explanation}`;
    } else {
        feedback.className = 'incorrect';
        feedback.textContent = `Incorrect. ${q.explanation}`;
    }
    feedback.classList.remove('hidden');
    setTimeout(nextQuestion, 2000);
}

function nextQuestion() {
    currentQuestionIndex++;
    selectedAnswer = null;
    if (currentQuestionIndex < questions.length) {
        renderQuestion();
    } else {
        renderResults();
    }
}

function renderResults() {
    let message = '';
    if (score === 5) {
        message = "Excellent! You're off to a great start.";
    } else if (score >= 3) {
        message = "Nice job! Review our documentation to improve.";
    } else {
        message = "Don't worry — visit our onboarding resources again.";
    }
    app.innerHTML = `
        <h1>Quiz Complete</h1>
        <p>You scored ${score} out of ${questions.length}.</p>
        <p>${message}</p>
        <button id="retake-btn">Retake Quiz</button>
    `;
    document.getElementById('retake-btn').addEventListener('click', renderWelcome);
}

renderWelcome();