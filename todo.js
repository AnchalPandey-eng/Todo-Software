// Select DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage or initialize an empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to display tasks
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        if (task.completed) {
            li.classList.add('task-completed');
        }

        const taskText = document.createElement('span');
        taskText.textContent = task.text;

        const actionsDiv = document.createElement('div');
        actionsDiv.classList.add('btn-group');

        // Edit Button
        const editBtn = document.createElement('button');
        editBtn.classList.add('btn', 'btn-warning', 'btn-sm');
        editBtn.textContent = 'Edit';
        editBtn.onclick = () => editTask(index);

        // Complete Button
        const completeBtn = document.createElement('button');
        completeBtn.classList.add('btn', 'btn-success', 'btn-sm');
        completeBtn.textContent = task.completed ? 'Undo' : 'Complete';
        completeBtn.onclick = () => toggleComplete(index);

        // Delete Button
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteTask(index);

        // Append buttons
        actionsDiv.appendChild(editBtn);
        actionsDiv.appendChild(completeBtn);
        actionsDiv.appendChild(deleteBtn);

        // Append task text and actions to the li
        li.appendChild(taskText);
        li.appendChild(actionsDiv);
        
        // Append li to task list
        taskList.appendChild(li);
    });
}

// Add Task function
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        tasks.push({ text: taskText, completed: false });
        taskInput.value = '';
        saveTasks(); // Save updated tasks to localStorage
        renderTasks(); // Re-render tasks
    }
}

// Edit Task function
function editTask(index) {
    const newText = prompt('Edit task:', tasks[index].text);
    if (newText) {
        tasks[index].text = newText;
        saveTasks(); // Save updated tasks to localStorage
        renderTasks(); // Re-render tasks
    }
}

// Toggle Complete/Undo function
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks(); // Save updated tasks to localStorage
    renderTasks(); // Re-render tasks
}

// Delete Task function
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks(); // Save updated tasks to localStorage
    renderTasks(); // Re-render tasks
}

// Event listeners
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Initial Render
renderTasks();
