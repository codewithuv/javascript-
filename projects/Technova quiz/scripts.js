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
let quizStartTime = null;
let quizEndTime = null;
let shuffledQuestions = [];

const app = document.getElementById('app');

// Fisher-Yates Shuffle Algorithm
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Shuffle options within each question
function shuffleOptions(questionsArray) {
    return questionsArray.map(q => {
        const shuffledOptions = shuffleArray(q.options);
        // Update correctAnswer index to match new position
        const correctOptionText = q.options[q.correctAnswer];
        const newCorrectAnswer = shuffledOptions.indexOf(correctOptionText);
        return {
            ...q,
            options: shuffledOptions,
            correctAnswer: newCorrectAnswer
        };
    });
}

// Play audio feedback using Web Audio API
function playSound(isCorrect) {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        if (isCorrect) {
            // Higher pitch for correct answer
            oscillator.frequency.value = 800;
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } else {
            // Lower pitch for incorrect answer
            oscillator.frequency.value = 300;
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        }
    } catch (e) {
        console.log('Audio context not available');
    }
}

// Format time display
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
        return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
        return `${minutes}m ${secs}s`;
    } else {
        return `${secs}s`;
    }
}

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
    quizStartTime = Date.now();
    quizEndTime = null;
    // Shuffle questions and their options
    shuffledQuestions = shuffleArray(questions);
    shuffledQuestions = shuffleOptions(shuffledQuestions);
    renderQuestion();
}

function renderQuestion() {
    const q = shuffledQuestions[currentQuestionIndex];
    const progressPercent = ((currentQuestionIndex) / shuffledQuestions.length) * 100;
    
    app.innerHTML = `
        <div class="progress-container">
            <div class="progress-bar" style="width: ${progressPercent}%"></div>
        </div>
        <p class="progress-text">Question ${currentQuestionIndex + 1} of ${shuffledQuestions.length}</p>
        <h2>${q.question}</h2>
        <div class="options">
            ${q.options.map((option, index) => `<div class="option" data-index="${index}">${option}</div>`).join('')}
        </div>
        <p id="feedback" class="hidden"></p>
        <p class="score-display">Score: ${score}/${shuffledQuestions.length}</p>
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
    const q = shuffledQuestions[currentQuestionIndex];
    const feedback = document.getElementById('feedback');
    const isCorrect = selectedAnswer === q.correctAnswer;
    
    if (isCorrect) {
        score++;
        feedback.className = 'correct';
        feedback.textContent = `Correct! ${q.explanation}`;
        playSound(true);
    } else {
        feedback.className = 'incorrect';
        feedback.textContent = `Incorrect. ${q.explanation}`;
        playSound(false);
    }
    feedback.classList.remove('hidden');
    setTimeout(nextQuestion, 2000);
}

function nextQuestion() {
    currentQuestionIndex++;
    selectedAnswer = null;
    if (currentQuestionIndex < shuffledQuestions.length) {
        renderQuestion();
    } else {
        quizEndTime = Date.now();
        renderResults();
    }
}

function renderResults() {
    const timeTaken = Math.floor((quizEndTime - quizStartTime) / 1000);
    const timeDisplay = formatTime(timeTaken);
    const percentage = Math.round((score / shuffledQuestions.length) * 100);
    
    let message = '';
    if (score === shuffledQuestions.length) {
        message = "Excellent! You're off to a great start.";
    } else if (score >= shuffledQuestions.length * 0.6) {
        message = "Nice job! Review our documentation to improve.";
    } else {
        message = "Don't worry — visit our onboarding resources again.";
    }
    
    app.innerHTML = `
        <div class="progress-container">
            <div class="progress-bar" style="width: 100%"></div>
        </div>
        <h1>Quiz Complete</h1>
        <div class="results-container">
            <div class="score-result">
                <p class="score-percentage">${percentage}%</p>
                <p>You scored ${score} out of ${shuffledQuestions.length}.</p>
            </div>
            <div class="time-result">
                <p><strong>Time Taken:</strong> ${timeDisplay}</p>
            </div>
        </div>
        <p>${message}</p>
        <button id="retake-btn">Retake Quiz</button>
    `;
    document.getElementById('retake-btn').addEventListener('click', renderWelcome);
}

renderWelcome();
