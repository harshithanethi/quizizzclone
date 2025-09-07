// QuizMaster Interactive Learning Platform JavaScript

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navButtons = document.querySelector('.nav-buttons');
const subjectCards = document.querySelectorAll('.subject-card');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    navButtons.classList.toggle('active');
});

// Close mobile menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        navButtons.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Subject card interactions
subjectCards.forEach(card => {
    card.addEventListener('click', () => {
        const subject = card.getAttribute('data-subject');
        openQuizInterface(subject);
    });

    // Add hover effects
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Quiz Interface Functions
function openQuizInterface(subject) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'quiz-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${getSubjectTitle(subject)} Quiz</h2>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="quiz-options">
                    <button class="quiz-option-btn" onclick="createQuiz('${subject}')">
                        <i class="fas fa-plus"></i>
                        <span>Create New Quiz</span>
                    </button>
                    <button class="quiz-option-btn" onclick="joinQuiz('${subject}')">
                        <i class="fas fa-play"></i>
                        <span>Join Quiz</span>
                    </button>
                    <button class="quiz-option-btn" onclick="browseQuizzes('${subject}')">
                        <i class="fas fa-search"></i>
                        <span>Browse Quizzes</span>
                    </button>
                </div>
            </div>
        </div>
    `;

    // Add modal styles
    const modalStyles = `
        .quiz-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
            animation: fadeIn 0.3s ease;
        }
        
        .modal-content {
            background: white;
            border-radius: 16px;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            animation: slideIn 0.3s ease;
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid #E5E7EB;
        }
        
        .close-modal {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #6B7280;
            padding: 0.5rem;
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        
        .close-modal:hover {
            background: #F3F4F6;
            color: #374151;
        }
        
        .quiz-options {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        
        .quiz-option-btn {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1.5rem;
            background: #F9FAFB;
            border: 2px solid #E5E7EB;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 1rem;
            font-weight: 500;
        }
        
        .quiz-option-btn:hover {
            background: #4F46E5;
            color: white;
            border-color: #4F46E5;
            transform: translateY(-2px);
        }
        
        .quiz-option-btn i {
            font-size: 1.2rem;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideIn {
            from { 
                opacity: 0;
                transform: translateY(-20px);
            }
            to { 
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;

    // Add styles if not already added
    if (!document.querySelector('#modal-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'modal-styles';
        styleSheet.textContent = modalStyles;
        document.head.appendChild(styleSheet);
    }

    document.body.appendChild(modal);

    // Close modal functionality
    const closeModal = modal.querySelector('.close-modal');
    closeModal.addEventListener('click', () => {
        modal.remove();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function getSubjectTitle(subject) {
    const titles = {
        'math': 'Mathematics',
        'science': 'Science',
        'english': 'English Language Arts',
        'social-studies': 'Social Studies',
        'elementary': 'Elementary',
        'test-prep': 'Test Preparation'
    };
    return titles[subject] || subject;
}

function createQuiz(subject) {
    // Close current modal
    document.querySelector('.quiz-modal').remove();
    
    // Open quiz creation interface
    const modal = document.createElement('div');
    modal.className = 'quiz-modal';
    modal.innerHTML = `
        <div class="modal-content large">
            <div class="modal-header">
                <h2>Create ${getSubjectTitle(subject)} Quiz</h2>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <form class="quiz-form" id="quiz-creation-form">
                    <!-- Quiz Basic Info -->
                    <div class="form-section">
                        <h3>Quiz Information</h3>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="quiz-title">Quiz Title *</label>
                                <input type="text" id="quiz-title" placeholder="Enter quiz title" required>
                            </div>
                            <div class="form-group">
                                <label for="quiz-subject">Subject *</label>
                                <select id="quiz-subject" required>
                                    <option value="${subject}">${getSubjectTitle(subject)}</option>
                                    <option value="math">Mathematics</option>
                                    <option value="science">Science</option>
                                    <option value="english">English Language Arts</option>
                                    <option value="social-studies">Social Studies</option>
                                    <option value="elementary">Elementary</option>
                                    <option value="test-prep">Test Preparation</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="quiz-description">Description</label>
                            <textarea id="quiz-description" placeholder="Enter quiz description" rows="3"></textarea>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="quiz-difficulty">Difficulty Level *</label>
                                <select id="quiz-difficulty" required>
                                    <option value="easy">Easy</option>
                                    <option value="medium">Medium</option>
                                    <option value="hard">Hard</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="quiz-time-limit">Time Limit (minutes)</label>
                                <input type="number" id="quiz-time-limit" placeholder="10" min="1" max="120" value="10">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="quiz-tags">Tags (comma-separated)</label>
                                <input type="text" id="quiz-tags" placeholder="e.g., algebra, equations, basic">
                            </div>
                            <div class="form-group">
                                <label for="quiz-visibility">Visibility</label>
                                <select id="quiz-visibility">
                                    <option value="public">Public</option>
                                    <option value="private">Private</option>
                                    <option value="unlisted">Unlisted</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <!-- Questions Section -->
                    <div class="form-section">
                        <div class="section-header">
                            <h3>Questions</h3>
                            <div class="question-controls">
                                <button type="button" class="btn-secondary small" onclick="addQuestion()">
                                    <i class="fas fa-plus"></i> Add Question
                                </button>
                                <button type="button" class="btn-secondary small" onclick="importQuestions()">
                                    <i class="fas fa-upload"></i> Import
                                </button>
                            </div>
                        </div>
                        <div class="questions-container" id="questions-container">
                            <div class="question-item" data-question="1">
                                <div class="question-header">
                                    <h4>Question 1</h4>
                                    <div class="question-actions">
                                        <button type="button" class="btn-icon" onclick="duplicateQuestion(1)" title="Duplicate">
                                            <i class="fas fa-copy"></i>
                                        </button>
                                        <button type="button" class="btn-icon danger" onclick="removeQuestion(1)" title="Remove">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label>Question Text *</label>
                                    <textarea class="question-text" placeholder="Enter your question here..." rows="2" required></textarea>
                                </div>
                                <div class="form-group">
                                    <label>Question Type</label>
                                    <select class="question-type" onchange="changeQuestionType(1, this.value)">
                                        <option value="multiple-choice">Multiple Choice</option>
                                        <option value="true-false">True/False</option>
                                        <option value="fill-blank">Fill in the Blank</option>
                                        <option value="short-answer">Short Answer</option>
                                    </select>
                                </div>
                                <div class="question-options" id="options-1">
                                    <label>Answer Options *</label>
                                    <div class="options-container">
                                        <div class="option-row">
                                            <input type="radio" name="correct-1" value="A" class="correct-radio">
                                            <input type="text" placeholder="Option A" class="option-input" required>
                                        </div>
                                        <div class="option-row">
                                            <input type="radio" name="correct-1" value="B" class="correct-radio">
                                            <input type="text" placeholder="Option B" class="option-input" required>
                                        </div>
                                        <div class="option-row">
                                            <input type="radio" name="correct-1" value="C" class="correct-radio">
                                            <input type="text" placeholder="Option C" class="option-input" required>
                                        </div>
                                        <div class="option-row">
                                            <input type="radio" name="correct-1" value="D" class="correct-radio">
                                            <input type="text" placeholder="Option D" class="option-input" required>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label>Explanation (optional)</label>
                                    <textarea class="question-explanation" placeholder="Explain why this is the correct answer..." rows="2"></textarea>
                                </div>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label>Points</label>
                                        <input type="number" class="question-points" value="1" min="1" max="10">
                                    </div>
                                    <div class="form-group">
                                        <label>Time Limit (seconds)</label>
                                        <input type="number" class="question-time" placeholder="30" min="5" max="300">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Quiz Settings -->
                    <div class="form-section">
                        <h3>Quiz Settings</h3>
                        <div class="settings-grid">
                            <div class="setting-item">
                                <label>
                                    <input type="checkbox" id="shuffle-questions" checked>
                                    Shuffle Questions
                                </label>
                            </div>
                            <div class="setting-item">
                                <label>
                                    <input type="checkbox" id="shuffle-options" checked>
                                    Shuffle Answer Options
                                </label>
                            </div>
                            <div class="setting-item">
                                <label>
                                    <input type="checkbox" id="show-correct-answers">
                                    Show Correct Answers After Quiz
                                </label>
                            </div>
                            <div class="setting-item">
                                <label>
                                    <input type="checkbox" id="allow-retake">
                                    Allow Multiple Attempts
                                </label>
                            </div>
                            <div class="setting-item">
                                <label>
                                    <input type="checkbox" id="show-progress">
                                    Show Progress Bar
                                </label>
                            </div>
                            <div class="setting-item">
                                <label>
                                    <input type="checkbox" id="instant-feedback">
                                    Instant Feedback
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="form-actions">
                        <button type="button" class="btn-secondary" onclick="previewQuiz()">
                            <i class="fas fa-eye"></i> Preview
                        </button>
                        <button type="button" class="btn-secondary" onclick="saveDraft()">
                            <i class="fas fa-save"></i> Save Draft
                        </button>
                        <button type="button" class="btn-secondary" onclick="closeModal()">Cancel</button>
                        <button type="submit" class="btn-primary">
                            <i class="fas fa-check"></i> Create Quiz
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;

    // Add form styles
    const formStyles = `
        .modal-content.large {
            max-width: 1000px;
            max-height: 90vh;
        }
        
        .quiz-form {
            display: flex;
            flex-direction: column;
            gap: 2rem;
        }
        
        .form-section {
            background: #F9FAFB;
            padding: 1.5rem;
            border-radius: 12px;
            border: 1px solid #E5E7EB;
        }
        
        .form-section h3 {
            margin: 0 0 1.5rem 0;
            color: #374151;
            font-size: 1.25rem;
            border-bottom: 2px solid #4F46E5;
            padding-bottom: 0.5rem;
        }
        
        .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
        }
        
        .section-header h3 {
            margin: 0;
            border: none;
            padding: 0;
        }
        
        .question-controls {
            display: flex;
            gap: 0.5rem;
        }
        
        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
        }
        
        .form-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        
        .form-group label {
            font-weight: 500;
            color: #374151;
            font-size: 0.9rem;
        }
        
        .form-group input,
        .form-group textarea,
        .form-group select {
            padding: 0.75rem;
            border: 1px solid #D1D5DB;
            border-radius: 8px;
            font-size: 1rem;
            transition: border-color 0.3s ease;
            background: white;
        }
        
        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
            outline: none;
            border-color: #4F46E5;
            box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }
        
        .question-item {
            background: white;
            padding: 1.5rem;
            border-radius: 12px;
            border: 1px solid #E5E7EB;
            margin-bottom: 1.5rem;
            position: relative;
        }
        
        .question-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid #E5E7EB;
        }
        
        .question-header h4 {
            margin: 0;
            color: #374151;
        }
        
        .question-actions {
            display: flex;
            gap: 0.5rem;
        }
        
        .question-options {
            margin-top: 1rem;
        }
        
        .options-container {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }
        
        .option-row {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.5rem;
            border-radius: 8px;
            transition: background-color 0.3s ease;
        }
        
        .option-row:hover {
            background: #F3F4F6;
        }
        
        .correct-radio {
            width: 18px;
            height: 18px;
            accent-color: #4F46E5;
        }
        
        .option-input {
            flex: 1;
            margin: 0;
        }
        
        .settings-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
        }
        
        .setting-item {
            display: flex;
            align-items: center;
            padding: 0.75rem;
            background: white;
            border-radius: 8px;
            border: 1px solid #E5E7EB;
        }
        
        .setting-item label {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin: 0;
            cursor: pointer;
            font-weight: 500;
            color: #374151;
        }
        
        .setting-item input[type="checkbox"] {
            width: 18px;
            height: 18px;
            accent-color: #4F46E5;
        }
        
        .form-actions {
            display: flex;
            gap: 1rem;
            justify-content: flex-end;
            margin-top: 2rem;
            padding-top: 2rem;
            border-top: 1px solid #E5E7EB;
            flex-wrap: wrap;
        }
        
        .btn-secondary.small {
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
        }
        
        .question-type-specific {
            margin-top: 1rem;
            padding: 1rem;
            background: #F0F9FF;
            border-radius: 8px;
            border: 1px solid #BAE6FD;
        }
        
        .true-false-options {
            display: flex;
            gap: 1rem;
        }
        
        .true-false-option {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.75rem 1rem;
            background: white;
            border: 1px solid #D1D5DB;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .true-false-option:hover {
            border-color: #4F46E5;
        }
        
        .true-false-option.selected {
            border-color: #4F46E5;
            background: #EEF2FF;
        }
        
        .fill-blank-input {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #D1D5DB;
            border-radius: 8px;
            font-size: 1rem;
        }
        
        .short-answer-input {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #D1D5DB;
            border-radius: 8px;
            font-size: 1rem;
            min-height: 100px;
            resize: vertical;
        }
    `;

    // Add form styles if not already added
    if (!document.querySelector('#form-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'form-styles';
        styleSheet.textContent = formStyles;
        document.head.appendChild(styleSheet);
    }

    document.body.appendChild(modal);

    // Close modal functionality
    const closeModal = modal.querySelector('.close-modal');
    closeModal.addEventListener('click', () => {
        modal.remove();
    });

    // Form submission
    const form = modal.querySelector('.quiz-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Collect and validate quiz data
        const quizData = collectQuizData();
        
        if (!validateQuizData(quizData)) {
            return;
        }
        
        // Add metadata
        quizData.id = Date.now();
        quizData.createdAt = new Date().toISOString();
        quizData.status = 'active';
        quizData.attempts = 0;
        quizData.avgScore = 0;
        
        // Save quiz (in a real app, this would be sent to a server)
        saveQuiz(quizData);
        modal.remove();
        showNotification('Quiz created successfully!', 'success');
        
        // Update the quiz counter for next question
        questionCounter = 1;
    });
}

// Enhanced Quiz Creation Functions
let questionCounter = 1;

function addQuestion() {
    questionCounter++;
    const questionsContainer = document.getElementById('questions-container');
    
    const newQuestion = document.createElement('div');
    newQuestion.className = 'question-item';
    newQuestion.setAttribute('data-question', questionCounter);
    newQuestion.innerHTML = `
        <div class="question-header">
            <h4>Question ${questionCounter}</h4>
            <div class="question-actions">
                <button type="button" class="btn-icon" onclick="duplicateQuestion(${questionCounter})" title="Duplicate">
                    <i class="fas fa-copy"></i>
                </button>
                <button type="button" class="btn-icon danger" onclick="removeQuestion(${questionCounter})" title="Remove">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
        <div class="form-group">
            <label>Question Text *</label>
            <textarea class="question-text" placeholder="Enter your question here..." rows="2" required></textarea>
        </div>
        <div class="form-group">
            <label>Question Type</label>
            <select class="question-type" onchange="changeQuestionType(${questionCounter}, this.value)">
                <option value="multiple-choice">Multiple Choice</option>
                <option value="true-false">True/False</option>
                <option value="fill-blank">Fill in the Blank</option>
                <option value="short-answer">Short Answer</option>
            </select>
        </div>
        <div class="question-options" id="options-${questionCounter}">
            <label>Answer Options *</label>
            <div class="options-container">
                <div class="option-row">
                    <input type="radio" name="correct-${questionCounter}" value="A" class="correct-radio">
                    <input type="text" placeholder="Option A" class="option-input" required>
                </div>
                <div class="option-row">
                    <input type="radio" name="correct-${questionCounter}" value="B" class="correct-radio">
                    <input type="text" placeholder="Option B" class="option-input" required>
                </div>
                <div class="option-row">
                    <input type="radio" name="correct-${questionCounter}" value="C" class="correct-radio">
                    <input type="text" placeholder="Option C" class="option-input" required>
                </div>
                <div class="option-row">
                    <input type="radio" name="correct-${questionCounter}" value="D" class="correct-radio">
                    <input type="text" placeholder="Option D" class="option-input" required>
                </div>
            </div>
        </div>
        <div class="form-group">
            <label>Explanation (optional)</label>
            <textarea class="question-explanation" placeholder="Explain why this is the correct answer..." rows="2"></textarea>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Points</label>
                <input type="number" class="question-points" value="1" min="1" max="10">
            </div>
            <div class="form-group">
                <label>Time Limit (seconds)</label>
                <input type="number" class="question-time" placeholder="30" min="5" max="300">
            </div>
        </div>
    `;
    
    questionsContainer.appendChild(newQuestion);
    updateQuestionNumbers();
}

function removeQuestion(questionNumber) {
    const questionItem = document.querySelector(`[data-question="${questionNumber}"]`);
    if (questionItem) {
        questionItem.remove();
        updateQuestionNumbers();
    }
}

function duplicateQuestion(questionNumber) {
    const originalQuestion = document.querySelector(`[data-question="${questionNumber}"]`);
    if (originalQuestion) {
        questionCounter++;
        const clonedQuestion = originalQuestion.cloneNode(true);
        clonedQuestion.setAttribute('data-question', questionCounter);
        
        // Update the question number in the header
        const header = clonedQuestion.querySelector('.question-header h4');
        header.textContent = `Question ${questionCounter}`;
        
        // Update radio button names
        const radioButtons = clonedQuestion.querySelectorAll('.correct-radio');
        radioButtons.forEach(radio => {
            radio.name = `correct-${questionCounter}`;
        });
        
        // Update the select onchange
        const select = clonedQuestion.querySelector('.question-type');
        select.setAttribute('onchange', `changeQuestionType(${questionCounter}, this.value)`);
        
        // Update the options container ID
        const optionsContainer = clonedQuestion.querySelector('.question-options');
        optionsContainer.id = `options-${questionCounter}`;
        
        // Update action button onclick attributes
        const duplicateBtn = clonedQuestion.querySelector('.btn-icon[onclick*="duplicateQuestion"]');
        const removeBtn = clonedQuestion.querySelector('.btn-icon[onclick*="removeQuestion"]');
        duplicateBtn.setAttribute('onclick', `duplicateQuestion(${questionCounter})`);
        removeBtn.setAttribute('onclick', `removeQuestion(${questionCounter})`);
        
        // Clear the form inputs
        clonedQuestion.querySelectorAll('input, textarea, select').forEach(input => {
            if (input.type !== 'radio') {
                input.value = '';
            }
        });
        
        // Clear radio button selections
        clonedQuestion.querySelectorAll('.correct-radio').forEach(radio => {
            radio.checked = false;
        });
        
        originalQuestion.parentNode.insertBefore(clonedQuestion, originalQuestion.nextSibling);
        updateQuestionNumbers();
    }
}

function updateQuestionNumbers() {
    const questions = document.querySelectorAll('.question-item');
    questions.forEach((question, index) => {
        const header = question.querySelector('.question-header h4');
        header.textContent = `Question ${index + 1}`;
    });
}

function changeQuestionType(questionNumber, type) {
    const optionsContainer = document.getElementById(`options-${questionNumber}`);
    if (!optionsContainer) return;
    
    let newOptionsHTML = '';
    
    switch (type) {
        case 'multiple-choice':
            newOptionsHTML = `
                <label>Answer Options *</label>
                <div class="options-container">
                    <div class="option-row">
                        <input type="radio" name="correct-${questionNumber}" value="A" class="correct-radio">
                        <input type="text" placeholder="Option A" class="option-input" required>
                    </div>
                    <div class="option-row">
                        <input type="radio" name="correct-${questionNumber}" value="B" class="correct-radio">
                        <input type="text" placeholder="Option B" class="option-input" required>
                    </div>
                    <div class="option-row">
                        <input type="radio" name="correct-${questionNumber}" value="C" class="correct-radio">
                        <input type="text" placeholder="Option C" class="option-input" required>
                    </div>
                    <div class="option-row">
                        <input type="radio" name="correct-${questionNumber}" value="D" class="correct-radio">
                        <input type="text" placeholder="Option D" class="option-input" required>
                    </div>
                </div>
            `;
            break;
            
        case 'true-false':
            newOptionsHTML = `
                <label>Correct Answer *</label>
                <div class="question-type-specific">
                    <div class="true-false-options">
                        <div class="true-false-option" onclick="selectTrueFalse(${questionNumber}, 'true')">
                            <input type="radio" name="correct-${questionNumber}" value="true" class="correct-radio">
                            <span>True</span>
                        </div>
                        <div class="true-false-option" onclick="selectTrueFalse(${questionNumber}, 'false')">
                            <input type="radio" name="correct-${questionNumber}" value="false" class="correct-radio">
                            <span>False</span>
                        </div>
                    </div>
                </div>
            `;
            break;
            
        case 'fill-blank':
            newOptionsHTML = `
                <label>Correct Answer *</label>
                <div class="question-type-specific">
                    <input type="text" class="fill-blank-input" placeholder="Enter the correct answer..." required>
                </div>
            `;
            break;
            
        case 'short-answer':
            newOptionsHTML = `
                <label>Sample Answer (for reference)</label>
                <div class="question-type-specific">
                    <textarea class="short-answer-input" placeholder="Enter a sample answer or key points to look for..."></textarea>
                </div>
            `;
            break;
    }
    
    optionsContainer.innerHTML = newOptionsHTML;
}

function selectTrueFalse(questionNumber, value) {
    const options = document.querySelectorAll(`[data-question="${questionNumber}"] .true-false-option`);
    options.forEach(option => option.classList.remove('selected'));
    
    const selectedOption = document.querySelector(`[data-question="${questionNumber}"] .true-false-option[onclick*="${value}"]`);
    if (selectedOption) {
        selectedOption.classList.add('selected');
        const radio = selectedOption.querySelector('.correct-radio');
        radio.checked = true;
    }
}

function importQuestions() {
    showNotification('Import functionality would be implemented here', 'info');
    // In a real app, this would open a file picker and parse CSV/JSON files
}

function previewQuiz() {
    const form = document.getElementById('quiz-creation-form');
    if (!form) return;
    
    // Collect form data
    const quizData = collectQuizData();
    
    if (!validateQuizData(quizData)) {
        return;
    }
    
    // Create preview modal
    const modal = document.createElement('div');
    modal.className = 'quiz-modal';
    modal.innerHTML = `
        <div class="modal-content large">
            <div class="modal-header">
                <h2>Quiz Preview: ${quizData.title}</h2>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="quiz-preview">
                    <div class="preview-info">
                        <h3>${quizData.title}</h3>
                        <p>${quizData.description || 'No description provided'}</p>
                        <div class="preview-meta">
                            <span class="meta-item">Subject: ${getSubjectName(quizData.subject)}</span>
                            <span class="meta-item">Difficulty: ${quizData.difficulty}</span>
                            <span class="meta-item">Questions: ${quizData.questions.length}</span>
                            <span class="meta-item">Time Limit: ${quizData.timeLimit} minutes</span>
                        </div>
                    </div>
                    <div class="preview-questions">
                        ${quizData.questions.map((question, index) => `
                            <div class="preview-question">
                                <h4>Question ${index + 1}: ${question.text}</h4>
                                <div class="preview-options">
                                    ${question.type === 'multiple-choice' ? 
                                        question.options.map((option, optIndex) => `
                                            <div class="preview-option ${option.isCorrect ? 'correct' : ''}">
                                                ${String.fromCharCode(65 + optIndex)}) ${option.text}
                                                ${option.isCorrect ? ' ✓' : ''}
                                            </div>
                                        `).join('') :
                                        question.type === 'true-false' ?
                                            `<div class="preview-option correct">Correct Answer: ${question.correctAnswer}</div>` :
                                            `<div class="preview-option correct">Answer: ${question.correctAnswer}</div>`
                                    }
                                </div>
                                ${question.explanation ? `<p class="preview-explanation"><strong>Explanation:</strong> ${question.explanation}</p>` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add preview styles
    const previewStyles = `
        .quiz-preview {
            max-height: 70vh;
            overflow-y: auto;
        }
        
        .preview-info {
            background: #F0F9FF;
            padding: 1.5rem;
            border-radius: 12px;
            margin-bottom: 2rem;
            border: 1px solid #BAE6FD;
        }
        
        .preview-info h3 {
            margin: 0 0 0.5rem 0;
            color: #1E40AF;
        }
        
        .preview-meta {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
            margin-top: 1rem;
        }
        
        .meta-item {
            background: white;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.9rem;
            color: #374151;
            border: 1px solid #E5E7EB;
        }
        
        .preview-question {
            background: white;
            padding: 1.5rem;
            border-radius: 12px;
            margin-bottom: 1.5rem;
            border: 1px solid #E5E7EB;
        }
        
        .preview-question h4 {
            margin: 0 0 1rem 0;
            color: #374151;
        }
        
        .preview-options {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        
        .preview-option {
            padding: 0.75rem;
            border-radius: 8px;
            background: #F9FAFB;
            border: 1px solid #E5E7EB;
        }
        
        .preview-option.correct {
            background: #D1FAE5;
            border-color: #10B981;
            color: #065F46;
        }
        
        .preview-explanation {
            margin-top: 1rem;
            padding: 1rem;
            background: #FEF3C7;
            border-radius: 8px;
            border: 1px solid #F59E0B;
            color: #92400E;
        }
    `;
    
    // Add preview styles if not already added
    if (!document.querySelector('#preview-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'preview-styles';
        styleSheet.textContent = previewStyles;
        document.head.appendChild(styleSheet);
    }
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeModal = modal.querySelector('.close-modal');
    closeModal.addEventListener('click', () => {
        modal.remove();
    });
}

function saveDraft() {
    const quizData = collectQuizData();
    if (quizData.title) {
        // Save to localStorage for demo
        const drafts = JSON.parse(localStorage.getItem('quizDrafts') || '[]');
        drafts.push({
            ...quizData,
            id: Date.now(),
            savedAt: new Date().toISOString(),
            status: 'draft'
        });
        localStorage.setItem('quizDrafts', JSON.stringify(drafts));
        showNotification('Quiz saved as draft!', 'success');
    } else {
        showNotification('Please enter a quiz title to save as draft', 'warning');
    }
}

function collectQuizData() {
    const form = document.getElementById('quiz-creation-form');
    if (!form) return {};
    
    const quizData = {
        title: document.getElementById('quiz-title')?.value || '',
        subject: document.getElementById('quiz-subject')?.value || '',
        description: document.getElementById('quiz-description')?.value || '',
        difficulty: document.getElementById('quiz-difficulty')?.value || '',
        timeLimit: parseInt(document.getElementById('quiz-time-limit')?.value) || 10,
        tags: document.getElementById('quiz-tags')?.value?.split(',').map(tag => tag.trim()) || [],
        visibility: document.getElementById('quiz-visibility')?.value || 'public',
        settings: {
            shuffleQuestions: document.getElementById('shuffle-questions')?.checked || false,
            shuffleOptions: document.getElementById('shuffle-options')?.checked || false,
            showCorrectAnswers: document.getElementById('show-correct-answers')?.checked || false,
            allowRetake: document.getElementById('allow-retake')?.checked || false,
            showProgress: document.getElementById('show-progress')?.checked || false,
            instantFeedback: document.getElementById('instant-feedback')?.checked || false
        },
        questions: []
    };
    
    // Collect questions
    const questionItems = document.querySelectorAll('.question-item');
    questionItems.forEach((item, index) => {
        const questionData = {
            id: index + 1,
            text: item.querySelector('.question-text')?.value || '',
            type: item.querySelector('.question-type')?.value || 'multiple-choice',
            points: parseInt(item.querySelector('.question-points')?.value) || 1,
            timeLimit: parseInt(item.querySelector('.question-time')?.value) || 30,
            explanation: item.querySelector('.question-explanation')?.value || '',
            options: [],
            correctAnswer: ''
        };
        
        // Collect options based on question type
        if (questionData.type === 'multiple-choice') {
            const optionInputs = item.querySelectorAll('.option-input');
            const correctRadio = item.querySelector('.correct-radio:checked');
            
            optionInputs.forEach((input, optIndex) => {
                const option = {
                    id: String.fromCharCode(65 + optIndex),
                    text: input.value,
                    isCorrect: correctRadio?.value === String.fromCharCode(65 + optIndex)
                };
                questionData.options.push(option);
                
                if (option.isCorrect) {
                    questionData.correctAnswer = option.id;
                }
            });
        } else if (questionData.type === 'true-false') {
            const correctRadio = item.querySelector('.correct-radio:checked');
            questionData.correctAnswer = correctRadio?.value || '';
        } else if (questionData.type === 'fill-blank') {
            const answerInput = item.querySelector('.fill-blank-input');
            questionData.correctAnswer = answerInput?.value || '';
        } else if (questionData.type === 'short-answer') {
            const answerInput = item.querySelector('.short-answer-input');
            questionData.correctAnswer = answerInput?.value || '';
        }
        
        quizData.questions.push(questionData);
    });
    
    return quizData;
}

function validateQuizData(quizData) {
    if (!quizData.title.trim()) {
        showNotification('Please enter a quiz title', 'error');
        return false;
    }
    
    if (!quizData.subject) {
        showNotification('Please select a subject', 'error');
        return false;
    }
    
    if (!quizData.difficulty) {
        showNotification('Please select a difficulty level', 'error');
        return false;
    }
    
    if (quizData.questions.length === 0) {
        showNotification('Please add at least one question', 'error');
        return false;
    }
    
    // Validate each question
    for (let i = 0; i < quizData.questions.length; i++) {
        const question = quizData.questions[i];
        
        if (!question.text.trim()) {
            showNotification(`Please enter text for question ${i + 1}`, 'error');
            return false;
        }
        
        if (question.type === 'multiple-choice') {
            if (question.options.length < 2) {
                showNotification(`Question ${i + 1} needs at least 2 options`, 'error');
                return false;
            }
            
            if (!question.correctAnswer) {
                showNotification(`Please select a correct answer for question ${i + 1}`, 'error');
                return false;
            }
        } else if (question.type === 'true-false' || question.type === 'fill-blank') {
            if (!question.correctAnswer) {
                showNotification(`Please provide a correct answer for question ${i + 1}`, 'error');
                return false;
            }
        }
    }
    
    return true;
}

function getSubjectName(subject) {
    const subjects = {
        'math': 'Mathematics',
        'science': 'Science',
        'english': 'English Language Arts',
        'social-studies': 'Social Studies',
        'elementary': 'Elementary',
        'test-prep': 'Test Preparation'
    };
    return subjects[subject] || subject;
}

function joinQuiz(subject) {
    // Close current modal
    document.querySelector('.quiz-modal').remove();
    
    // Open join quiz interface
    const modal = document.createElement('div');
    modal.className = 'quiz-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Join ${getSubjectTitle(subject)} Quiz</h2>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <form class="join-form">
                    <div class="form-group">
                        <label for="quiz-code">Quiz Code</label>
                        <input type="text" id="quiz-code" placeholder="Enter quiz code" required>
                    </div>
                    <div class="form-group">
                        <label for="player-name">Your Name</label>
                        <input type="text" id="player-name" placeholder="Enter your name" required>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn-secondary" onclick="closeModal()">Cancel</button>
                        <button type="submit" class="btn-primary">Join Quiz</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Close modal functionality
    const closeModal = modal.querySelector('.close-modal');
    closeModal.addEventListener('click', () => {
        modal.remove();
    });

    // Form submission
    const form = modal.querySelector('.join-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const quizCode = document.getElementById('quiz-code').value;
        const playerName = document.getElementById('player-name').value;
        
        // In a real app, this would validate the quiz code and join the quiz
        modal.remove();
        startQuiz(quizCode, playerName);
    });
}

function browseQuizzes(subject) {
    // Close current modal
    document.querySelector('.quiz-modal').remove();
    
    // Open browse quizzes interface
    const modal = document.createElement('div');
    modal.className = 'quiz-modal';
    modal.innerHTML = `
        <div class="modal-content large">
            <div class="modal-header">
                <h2>Browse ${getSubjectTitle(subject)} Quizzes</h2>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="search-bar">
                    <input type="text" placeholder="Search quizzes..." class="search-input">
                    <button class="btn-primary">Search</button>
                </div>
                <div class="quizzes-grid">
                    <div class="quiz-card">
                        <h3>Basic Math Operations</h3>
                        <p>Test your knowledge of addition, subtraction, multiplication, and division.</p>
                        <div class="quiz-meta">
                            <span class="difficulty easy">Easy</span>
                            <span class="questions-count">10 Questions</span>
                        </div>
                        <button class="btn-primary" onclick="startQuiz('MATH001', 'Guest')">Start Quiz</button>
                    </div>
                    <div class="quiz-card">
                        <h3>Algebra Fundamentals</h3>
                        <p>Solve equations and work with variables in this comprehensive algebra quiz.</p>
                        <div class="quiz-meta">
                            <span class="difficulty medium">Medium</span>
                            <span class="questions-count">15 Questions</span>
                        </div>
                        <button class="btn-primary" onclick="startQuiz('MATH002', 'Guest')">Start Quiz</button>
                    </div>
                    <div class="quiz-card">
                        <h3>Geometry Basics</h3>
                        <p>Explore shapes, angles, and spatial relationships in geometry.</p>
                        <div class="quiz-meta">
                            <span class="difficulty hard">Hard</span>
                            <span class="questions-count">20 Questions</span>
                        </div>
                        <button class="btn-primary" onclick="startQuiz('MATH003', 'Guest')">Start Quiz</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add browse styles
    const browseStyles = `
        .search-bar {
            display: flex;
            gap: 1rem;
            margin-bottom: 2rem;
        }
        
        .search-input {
            flex: 1;
            padding: 0.75rem;
            border: 1px solid #D1D5DB;
            border-radius: 8px;
            font-size: 1rem;
        }
        
        .quizzes-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.5rem;
        }
        
        .quiz-card {
            background: #F9FAFB;
            padding: 1.5rem;
            border-radius: 12px;
            border: 1px solid #E5E7EB;
            transition: all 0.3s ease;
        }
        
        .quiz-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .quiz-card h3 {
            margin-bottom: 0.5rem;
            color: #374151;
        }
        
        .quiz-card p {
            margin-bottom: 1rem;
            color: #6B7280;
            font-size: 0.9rem;
        }
        
        .quiz-meta {
            display: flex;
            gap: 1rem;
            margin-bottom: 1rem;
        }
        
        .difficulty {
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 500;
        }
        
        .difficulty.easy {
            background: #D1FAE5;
            color: #065F46;
        }
        
        .difficulty.medium {
            background: #FEF3C7;
            color: #92400E;
        }
        
        .difficulty.hard {
            background: #FEE2E2;
            color: #991B1B;
        }
        
        .questions-count {
            color: #6B7280;
            font-size: 0.9rem;
        }
    `;

    // Add browse styles if not already added
    if (!document.querySelector('#browse-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'browse-styles';
        styleSheet.textContent = browseStyles;
        document.head.appendChild(styleSheet);
    }

    document.body.appendChild(modal);

    // Close modal functionality
    const closeModal = modal.querySelector('.close-modal');
    closeModal.addEventListener('click', () => {
        modal.remove();
    });
}

function startQuiz(quizCode, playerName) {
    // Close any open modals
    const existingModal = document.querySelector('.quiz-modal');
    if (existingModal) {
        existingModal.remove();
    }

    // Create quiz interface
    const quizInterface = document.createElement('div');
    quizInterface.className = 'quiz-interface';
    quizInterface.innerHTML = `
        <div class="quiz-container">
            <div class="quiz-header">
                <div class="quiz-info">
                    <h2>Quiz: Basic Math Operations</h2>
                    <p>Player: ${playerName}</p>
                </div>
                <div class="quiz-timer">
                    <span>Time: <span id="timer">10:00</span></span>
                </div>
            </div>
            <div class="quiz-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 0%"></div>
                </div>
                <span class="progress-text">Question 1 of 10</span>
            </div>
            <div class="question-container">
                <div class="question">
                    <h3>What is 15 + 27?</h3>
                </div>
                <div class="options">
                    <button class="option-btn" data-answer="A">A) 32</button>
                    <button class="option-btn" data-answer="B">B) 42</button>
                    <button class="option-btn" data-answer="C">C) 52</button>
                    <button class="option-btn" data-answer="D">D) 62</button>
                </div>
            </div>
            <div class="quiz-actions">
                <button class="btn-secondary" onclick="exitQuiz()">Exit Quiz</button>
                <button class="btn-primary" onclick="nextQuestion()" disabled>Next Question</button>
            </div>
        </div>
    `;

    // Add quiz interface styles
    const quizStyles = `
        .quiz-interface {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #4F46E5, #7C3AED);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 3000;
        }
        
        .quiz-container {
            background: white;
            border-radius: 20px;
            padding: 2rem;
            max-width: 800px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
        }
        
        .quiz-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid #E5E7EB;
        }
        
        .quiz-info h2 {
            margin: 0;
            color: #374151;
        }
        
        .quiz-info p {
            margin: 0;
            color: #6B7280;
        }
        
        .quiz-timer {
            background: #FEF3C7;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            color: #92400E;
            font-weight: 500;
        }
        
        .quiz-progress {
            margin-bottom: 2rem;
        }
        
        .progress-bar {
            width: 100%;
            height: 8px;
            background: #E5E7EB;
            border-radius: 4px;
            overflow: hidden;
            margin-bottom: 0.5rem;
        }
        
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #4F46E5, #7C3AED);
            transition: width 0.3s ease;
        }
        
        .progress-text {
            color: #6B7280;
            font-size: 0.9rem;
        }
        
        .question {
            margin-bottom: 2rem;
        }
        
        .question h3 {
            font-size: 1.5rem;
            color: #374151;
            margin: 0;
        }
        
        .options {
            display: grid;
            gap: 1rem;
            margin-bottom: 2rem;
        }
        
        .option-btn {
            padding: 1rem 1.5rem;
            background: #F9FAFB;
            border: 2px solid #E5E7EB;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
            text-align: left;
            font-size: 1rem;
            font-weight: 500;
        }
        
        .option-btn:hover {
            background: #E0E7FF;
            border-color: #4F46E5;
        }
        
        .option-btn.selected {
            background: #4F46E5;
            color: white;
            border-color: #4F46E5;
        }
        
        .option-btn.correct {
            background: #D1FAE5;
            color: #065F46;
            border-color: #10B981;
        }
        
        .option-btn.incorrect {
            background: #FEE2E2;
            color: #991B1B;
            border-color: #EF4444;
        }
        
        .quiz-actions {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .quiz-actions button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
    `;

    // Add quiz styles if not already added
    if (!document.querySelector('#quiz-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'quiz-styles';
        styleSheet.textContent = quizStyles;
        document.head.appendChild(styleSheet);
    }

    document.body.appendChild(quizInterface);

    // Quiz functionality
    let currentQuestion = 1;
    let selectedAnswer = null;
    let score = 0;

    const optionButtons = quizInterface.querySelectorAll('.option-btn');
    const nextButton = quizInterface.querySelector('.quiz-actions .btn-primary');

    optionButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove previous selection
            optionButtons.forEach(btn => btn.classList.remove('selected'));
            
            // Add selection to clicked button
            button.classList.add('selected');
            selectedAnswer = button.getAttribute('data-answer');
            
            // Enable next button
            nextButton.disabled = false;
        });
    });

    // Timer functionality
    let timeLeft = 600; // 10 minutes in seconds
    const timerElement = quizInterface.querySelector('#timer');
    
    const timer = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            endQuiz();
        }
        
        timeLeft--;
    }, 1000);

    // Store timer reference for cleanup
    quizInterface.timer = timer;
}

function nextQuestion() {
    // In a real app, this would move to the next question
    showNotification('Moving to next question...', 'info');
}

function exitQuiz() {
    const quizInterface = document.querySelector('.quiz-interface');
    if (quizInterface) {
        // Clear timer
        if (quizInterface.timer) {
            clearInterval(quizInterface.timer);
        }
        quizInterface.remove();
    }
}

function endQuiz() {
    const quizInterface = document.querySelector('.quiz-interface');
    if (quizInterface) {
        // Clear timer
        if (quizInterface.timer) {
            clearInterval(quizInterface.timer);
        }
        quizInterface.remove();
    }
    
    // Show results
    showNotification('Quiz completed! Great job!', 'success');
}

function saveQuiz(quizData) {
    // In a real app, this would save to a database
    console.log('Quiz saved:', quizData);
    
    // Store in localStorage for demo purposes
    const quizzes = JSON.parse(localStorage.getItem('quizzes') || '[]');
    quizzes.push({
        ...quizData,
        id: Date.now(),
        createdAt: new Date().toISOString()
    });
    localStorage.setItem('quizzes', JSON.stringify(quizzes));
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add notification styles
    const notificationStyles = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 4000;
            animation: slideInRight 0.3s ease;
        }
        
        .notification-success {
            background: #10B981;
        }
        
        .notification-error {
            background: #EF4444;
        }
        
        .notification-info {
            background: #3B82F6;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;

    // Add notification styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'notification-styles';
        styleSheet.textContent = notificationStyles;
        document.head.appendChild(styleSheet);
    }

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Utility function to close modal
function closeModal() {
    const modal = document.querySelector('.quiz-modal');
    if (modal) {
        modal.remove();
    }
}

// Function to open create quiz modal from navigation
function openCreateQuiz() {
    // Create a simple subject selection modal first
    const modal = document.createElement('div');
    modal.className = 'quiz-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Create New Quiz</h2>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <p>Select a subject for your quiz:</p>
                <div class="subject-selection">
                    <button class="subject-btn" onclick="createQuiz('math')">
                        <i class="fas fa-calculator"></i>
                        <span>Mathematics</span>
                    </button>
                    <button class="subject-btn" onclick="createQuiz('science')">
                        <i class="fas fa-flask"></i>
                        <span>Science</span>
                    </button>
                    <button class="subject-btn" onclick="createQuiz('english')">
                        <i class="fas fa-book"></i>
                        <span>English Language Arts</span>
                    </button>
                    <button class="subject-btn" onclick="createQuiz('social-studies')">
                        <i class="fas fa-globe"></i>
                        <span>Social Studies</span>
                    </button>
                    <button class="subject-btn" onclick="createQuiz('elementary')">
                        <i class="fas fa-child"></i>
                        <span>Elementary</span>
                    </button>
                    <button class="subject-btn" onclick="createQuiz('test-prep')">
                        <i class="fas fa-clipboard-check"></i>
                        <span>Test Preparation</span>
                    </button>
                </div>
            </div>
        </div>
    `;

    // Add subject selection styles
    const subjectStyles = `
        .subject-selection {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-top: 1.5rem;
        }
        
        .subject-btn {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.75rem;
            padding: 1.5rem;
            background: #F9FAFB;
            border: 2px solid #E5E7EB;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            color: #374151;
        }
        
        .subject-btn:hover {
            background: #4F46E5;
            color: white;
            border-color: #4F46E5;
            transform: translateY(-2px);
        }
        
        .subject-btn i {
            font-size: 2rem;
        }
        
        .subject-btn span {
            font-weight: 500;
            text-align: center;
        }
    `;

    // Add subject selection styles if not already added
    if (!document.querySelector('#subject-selection-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'subject-selection-styles';
        styleSheet.textContent = subjectStyles;
        document.head.appendChild(styleSheet);
    }

    document.body.appendChild(modal);

    // Close modal functionality
    const closeModal = modal.querySelector('.close-modal');
    closeModal.addEventListener('click', () => {
        modal.remove();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    // Add scroll effect to navbar
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = '#ffffff';
            navbar.style.backdropFilter = 'none';
        }
    });

    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.subject-card, .feature-card, .testimonial-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
