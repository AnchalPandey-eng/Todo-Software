// Select DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const deleteAllBtn = document.getElementById('deleteAllBtn');

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

        // Edit Button with confirmation
        const editBtn = document.createElement('button');
        editBtn.classList.add('btn', 'btn-warning', 'btn-sm');
        editBtn.textContent = 'Edit';
        editBtn.onclick = () => confirmEdit(index);

        // Complete Button
        const completeBtn = document.createElement('button');
        completeBtn.classList.add('btn', 'btn-success', 'btn-sm');
        completeBtn.textContent = task.completed ? 'Undo' : 'Complete';
        completeBtn.onclick = () => toggleComplete(index);

        // Delete Button with confirmation
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => confirmDelete(index);

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

// Confirm Edit Task function
function confirmEdit(index) {
    const newText = prompt('Edit task:', tasks[index].text);
    if (newText !== null) {
        // Only update if user enters something (or cancels the prompt)
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

// Confirm Delete Task function
function confirmDelete(index) {
    if (confirm("Are you sure you want to delete this task?")) {
        tasks.splice(index, 1); // Remove the task from the array
        saveTasks(); // Save updated tasks to localStorage
        renderTasks(); // Re-render tasks
    }
}

// Delete All Tasks function
function deleteAllTasks() {
    if (tasks.length > 0 && confirm("Are you sure you want to delete all tasks?")) {
        tasks = []; // Clear tasks array
        saveTasks(); // Clear tasks from localStorage
        renderTasks(); // Re-render empty list
    }
}

// Event listeners
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Event listener for "Delete All" button
deleteAllBtn.addEventListener('click', deleteAllTasks);

// Initial Render
renderTasks();
