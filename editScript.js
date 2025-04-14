// editScript.js

const editInput = document.getElementById('editInput');
const saveButton = document.getElementById('saveButton');
const cancelButton = document.getElementById('cancelButton');

const urlParams = new URLSearchParams(window.location.search);
const taskId = urlParams.get('id');

if (taskId) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        editInput.value = task.content;
    }
}

saveButton.addEventListener('click', () => {
    const newContent = editInput.value.trim();
    if (newContent && taskId) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.map(task => {
            if (task.id === taskId) {
                return { ...task, content: newContent };
            }
            return task;
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        window.location.href = 'index.html';
    }
});

cancelButton.addEventListener('click', () => {
    window.location.href = 'index.html';
});


