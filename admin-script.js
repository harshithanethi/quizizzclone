// QuizMaster Admin Dashboard JavaScript

// DOM Elements
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');
const filters = document.querySelectorAll('#subject-filter, #difficulty-filter, #status-filter');
const searchInput = document.getElementById('quiz-search');
const quizzesTableBody = document.getElementById('quizzes-table-body');

// Navigation Management
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Hide all sections
        sections.forEach(section => section.classList.remove('active'));
        
        // Show target section
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    });
});

// Quiz Management Functions
function createNewQuiz() {
    // Create modal for new quiz creation
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content large">
            <div class="modal-header">
                <h2>Create New Quiz</h2>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <form class="quiz-creation-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="new-quiz-title">Quiz Title</label>
                            <input type="text" id="new-quiz-title" placeholder="Enter quiz title" required>
                        </div>
                        <div class="form-group">
                            <label for="new-quiz-subject">Subject</label>
                            <select id="new-quiz-subject" required>
                                <option value="">Select Subject</option>
                                <option value="math">Mathematics</option>
                                <option value="science">Science</option>
                                <option value="english">English</option>
                                <option value="social-studies">Social Studies</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="new-quiz-description">Description</label>
                        <textarea id="new-quiz-description" placeholder="Enter quiz description" rows="3"></textarea>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="new-quiz-difficulty">Difficulty Level</label>
                            <select id="new-quiz-difficulty" required>
                                <option value="">Select Difficulty</option>
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="new-quiz-time-limit">Time Limit (minutes)</label>
                            <input type="number" id="new-quiz-time-limit" placeholder="10" min="1" max="120">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="new-quiz-status">Status</label>
                        <select id="new-quiz-status">
                            <option value="draft">Draft</option>
                            <option value="active">Active</option>
                        </select>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn-secondary" onclick="closeModal()">Cancel</button>
                        <button type="submit" class="btn-primary">Create Quiz</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    // Add modal styles
    const modalStyles = `
        .modal-overlay {
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
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            animation: slideIn 0.3s ease;
        }
        
        .modal-content.large {
            max-width: 800px;
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
        
        .quiz-creation-form {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
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
        }
        
        .form-group input,
        .form-group textarea,
        .form-group select {
            padding: 0.75rem;
            border: 1px solid #D1D5DB;
            border-radius: 8px;
            font-size: 1rem;
            transition: border-color 0.3s ease;
        }
        
        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
            outline: none;
            border-color: #4F46E5;
            box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }
        
        .form-actions {
            display: flex;
            gap: 1rem;
            justify-content: flex-end;
            margin-top: 2rem;
            padding-top: 2rem;
            border-top: 1px solid #E5E7EB;
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

    // Add modal styles if not already added
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

    // Form submission
    const form = modal.querySelector('.quiz-creation-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const quizData = {
            title: document.getElementById('new-quiz-title').value,
            subject: document.getElementById('new-quiz-subject').value,
            description: document.getElementById('new-quiz-description').value,
            difficulty: document.getElementById('new-quiz-difficulty').value,
            timeLimit: document.getElementById('new-quiz-time-limit').value || 10,
            status: document.getElementById('new-quiz-status').value,
            createdAt: new Date().toISOString(),
            attempts: 0,
            avgScore: 0
        };

        // Add quiz to table
        addQuizToTable(quizData);
        
        // Close modal
        modal.remove();
        
        // Show success notification
        showNotification('Quiz created successfully!', 'success');
    });
}

function addQuizToTable(quizData) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <div class="quiz-title">
                <h4>${quizData.title}</h4>
                <p>${quizData.description || 'No description provided'}</p>
            </div>
        </td>
        <td><span class="subject-badge ${quizData.subject}">${getSubjectName(quizData.subject)}</span></td>
        <td><span class="difficulty-badge ${quizData.difficulty}">${quizData.difficulty}</span></td>
        <td>0</td>
        <td>${quizData.attempts}</td>
        <td>${quizData.avgScore}%</td>
        <td><span class="status-badge ${quizData.status}">${quizData.status}</span></td>
        <td>
            <div class="action-buttons">
                <button class="btn-icon" title="Edit" onclick="editQuiz('${quizData.title}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon" title="View" onclick="viewQuiz('${quizData.title}')">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn-icon" title="Duplicate" onclick="duplicateQuiz('${quizData.title}')">
                    <i class="fas fa-copy"></i>
                </button>
                <button class="btn-icon danger" title="Delete" onclick="deleteQuiz('${quizData.title}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </td>
    `;
    
    quizzesTableBody.appendChild(row);
}

function getSubjectName(subject) {
    const subjects = {
        'math': 'Mathematics',
        'science': 'Science',
        'english': 'English',
        'social-studies': 'Social Studies'
    };
    return subjects[subject] || subject;
}

// Quiz Actions
function editQuiz(quizTitle) {
    showNotification(`Editing quiz: ${quizTitle}`, 'info');
    // In a real app, this would open an edit modal
}

function viewQuiz(quizTitle) {
    showNotification(`Viewing quiz: ${quizTitle}`, 'info');
    // In a real app, this would open a view modal
}

function duplicateQuiz(quizTitle) {
    showNotification(`Duplicating quiz: ${quizTitle}`, 'info');
    // In a real app, this would create a copy of the quiz
}

function deleteQuiz(quizTitle) {
    if (confirm(`Are you sure you want to delete "${quizTitle}"? This action cannot be undone.`)) {
        // Find and remove the row
        const rows = quizzesTableBody.querySelectorAll('tr');
        rows.forEach(row => {
            const titleElement = row.querySelector('.quiz-title h4');
            if (titleElement && titleElement.textContent === quizTitle) {
                row.remove();
                showNotification(`Quiz "${quizTitle}" deleted successfully`, 'success');
            }
        });
    }
}

// Filter and Search Functionality
filters.forEach(filter => {
    filter.addEventListener('change', filterQuizzes);
});

if (searchInput) {
    searchInput.addEventListener('input', filterQuizzes);
}

function filterQuizzes() {
    const subjectFilter = document.getElementById('subject-filter')?.value.toLowerCase();
    const difficultyFilter = document.getElementById('difficulty-filter')?.value.toLowerCase();
    const statusFilter = document.getElementById('status-filter')?.value.toLowerCase();
    const searchTerm = searchInput?.value.toLowerCase();

    const rows = quizzesTableBody.querySelectorAll('tr');
    
    rows.forEach(row => {
        let showRow = true;
        
        // Subject filter
        if (subjectFilter) {
            const subjectBadge = row.querySelector('.subject-badge');
            if (subjectBadge && !subjectBadge.classList.contains(subjectFilter)) {
                showRow = false;
            }
        }
        
        // Difficulty filter
        if (difficultyFilter) {
            const difficultyBadge = row.querySelector('.difficulty-badge');
            if (difficultyBadge && !difficultyBadge.classList.contains(difficultyFilter)) {
                showRow = false;
            }
        }
        
        // Status filter
        if (statusFilter) {
            const statusBadge = row.querySelector('.status-badge');
            if (statusBadge && !statusBadge.classList.contains(statusFilter)) {
                showRow = false;
            }
        }
        
        // Search filter
        if (searchTerm) {
            const titleElement = row.querySelector('.quiz-title h4');
            const descriptionElement = row.querySelector('.quiz-title p');
            const titleText = titleElement?.textContent.toLowerCase() || '';
            const descriptionText = descriptionElement?.textContent.toLowerCase() || '';
            
            if (!titleText.includes(searchTerm) && !descriptionText.includes(searchTerm)) {
                showRow = false;
            }
        }
        
        row.style.display = showRow ? '' : 'none';
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
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
            display: flex;
            align-items: center;
            gap: 1rem;
            min-width: 300px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            flex: 1;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            padding: 0.25rem;
            border-radius: 4px;
            transition: background 0.3s ease;
        }
        
        .notification-close:hover {
            background: rgba(255, 255, 255, 0.2);
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
        
        .notification-warning {
            background: #F59E0B;
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

    // Close notification functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });

    // Auto remove notification after 4 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 4000);
}

function getNotificationIcon(type) {
    const icons = {
        'success': 'check-circle',
        'error': 'exclamation-circle',
        'warning': 'exclamation-triangle',
        'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// Utility function to close modal
function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
    }
}

// Settings Form Handling
document.addEventListener('DOMContentLoaded', () => {
    // Handle settings form submissions
    const settingsForms = document.querySelectorAll('.settings-form');
    settingsForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('Settings saved successfully!', 'success');
        });
    });

    // Add real-time stats updates (demo)
    updateStats();
    setInterval(updateStats, 30000); // Update every 30 seconds
});

function updateStats() {
    // Simulate real-time stats updates
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const currentValue = parseInt(stat.textContent.replace(/[^\d]/g, ''));
        const newValue = currentValue + Math.floor(Math.random() * 5);
        stat.textContent = stat.textContent.replace(/\d+/, newValue);
    });
}

// Export functionality
function exportData(type) {
    showNotification(`Exporting ${type} data...`, 'info');
    // In a real app, this would generate and download the appropriate file
    setTimeout(() => {
        showNotification(`${type} data exported successfully!`, 'success');
    }, 2000);
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
    // Set default active section
    const defaultSection = document.querySelector('.dashboard-section');
    if (defaultSection) {
        defaultSection.classList.add('active');
    }

    // Add loading states to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('btn-primary') || this.classList.contains('btn-secondary')) {
                this.classList.add('loading');
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 1000);
            }
        });
    });

    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K for search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.getElementById('quiz-search');
            if (searchInput) {
                searchInput.focus();
            }
        }
        
        // Escape to close modals
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});
