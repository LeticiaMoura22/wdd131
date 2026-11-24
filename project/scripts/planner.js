// Planner: checklist progress saved in localStorage, plus a validated sign-up form.
const TASKS_KEY = 'containerPlannerDone';
const SIGNUP_KEY = 'containerWorkshopSignup';

const seasonTasks = [
    { id: 'pots', month: 'March', task: 'Clean and check your pots, and make sure each has drainage holes.' },
    { id: 'mix', month: 'March', task: 'Buy fresh potting mix made for containers.' },
    { id: 'sow', month: 'April', task: 'Sow lettuce, spinach, and radish seeds in spring pots.' },
    { id: 'stake', month: 'May', task: 'Add stakes or a trellis for tomatoes and peas.' },
    { id: 'feed', month: 'June', task: 'Start feeding tomatoes and peppers every two weeks.' },
    { id: 'water', month: 'July', task: 'Check soil daily in hot weather and water deeply.' },
    { id: 'plant-fall', month: 'August', task: 'Sow kale and carrots for a fall harvest.' }
];

const taskList = document.getElementById('task-list');
const progressText = document.getElementById('progress');
const allDoneMessage = document.getElementById('all-done');

const signupForm = document.getElementById('signup-form');
const formStatus = document.getElementById('form-status');

function loadDoneTasks() {
    const saved = localStorage.getItem(TASKS_KEY);
    return saved ? JSON.parse(saved) : [];
}

function saveDoneTasks(doneIds) {
    localStorage.setItem(TASKS_KEY, JSON.stringify(doneIds));
}

function updateProgress(doneIds) {
    const total = seasonTasks.length;
    const completed = seasonTasks.reduce((count, task) => (doneIds.includes(task.id) ? count + 1 : count), 0);

    progressText.textContent = `${completed} of ${total} tasks done`;
    allDoneMessage.hidden = completed !== total;
}

function taskTemplate(task, isDone) {
    const doneClass = isDone ? 'task-done' : '';
    return `
        <li>
            <label>
                <input type="checkbox" data-task-id="${task.id}" ${isDone ? 'checked' : ''}>
                <span class="${doneClass}"><strong>${task.month}:</strong> ${task.task}</span>
            </label>
        </li>
    `;
}

function renderTasks() {
    const doneIds = loadDoneTasks();
    taskList.innerHTML = seasonTasks.map((task) => taskTemplate(task, doneIds.includes(task.id))).join('');
    updateProgress(doneIds);
}

taskList.addEventListener('change', (event) => {
    if (event.target.type !== 'checkbox') {
        return;
    }

    const taskId = event.target.dataset.taskId;
    const doneIds = loadDoneTasks();

    const updatedIds = event.target.checked
        ? [...doneIds, taskId]
        : doneIds.filter((id) => id !== taskId);

    saveDoneTasks(updatedIds);
    renderTasks();
});

// Form validation helpers
function showError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    errorElement.textContent = message;
    errorElement.hidden = false;
}

function clearError(fieldId) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    errorElement.textContent = '';
    errorElement.hidden = true;
}

function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateForm(data) {
    const errors = {};

    if (data.name.trim() === '') {
        errors.name = 'Please enter your name.';
    }

    if (data.email.trim() === '') {
        errors.email = 'Please enter your email address.';
    } else if (!isValidEmail(data.email.trim())) {
        errors.email = 'Please enter an email address like name@example.com.';
    }

    if (data.experience === '') {
        errors.experience = 'Please choose your experience level.';
    }

    if (data.session === null) {
        errors.session = 'Please choose a session.';
    }

    return errors;
}

function readFormData() {
    const formData = new FormData(signupForm);
    return {
        name: formData.get('name') || '',
        email: formData.get('email') || '',
        experience: formData.get('experience') || '',
        session: formData.get('session'),
        notes: (formData.get('notes') || '').trim()
    };
}

function showFieldErrors(errors) {
    ['name', 'email', 'experience', 'session'].forEach((fieldId) => {
        if (errors[fieldId]) {
            showError(fieldId, errors[fieldId]);
        } else {
            clearError(fieldId);
        }
    });
}

// Escape user-typed text before placing it in HTML.
function escapeHtml(text) {
    return text
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
}

function confirmationTemplate(signup) {
    const experienceText = signup.experience === 'new'
        ? 'We will start with the basics and walk you through every step.'
        : 'Bring your questions. We will go a little deeper.';

    return `
        <p>Thank you, ${escapeHtml(signup.name)}! You are signed up for the ${escapeHtml(signup.session)} session.</p>
        <p>${experienceText}</p>
        <p>We will send confirmation to ${escapeHtml(signup.email)}.</p>
    `;
}

function showConfirmation(signup) {
    formStatus.innerHTML = confirmationTemplate(signup);
    formStatus.hidden = false;
}

function saveSignup(signup) {
    localStorage.setItem(SIGNUP_KEY, JSON.stringify(signup));
}

function restoreSignup() {
    const saved = localStorage.getItem(SIGNUP_KEY);
    if (!saved) {
        return;
    }

    const signup = JSON.parse(saved);
    showConfirmation(signup);
}

signupForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = readFormData();
    const errors = validateForm(data);

    if (Object.keys(errors).length > 0) {
        showFieldErrors(errors);
        formStatus.hidden = true;
        const firstError = Object.keys(errors)[0];
        const firstField = document.getElementById(firstError === 'session' ? 'name' : firstError);
        firstField.focus();
        return;
    }

    ['name', 'email', 'experience', 'session'].forEach(clearError);
    saveSignup({ ...data, email: data.email.trim(), name: data.name.trim() });
    showConfirmation({ ...data, email: data.email.trim(), name: data.name.trim() });
    signupForm.reset();
});

renderTasks();
restoreSignup();
