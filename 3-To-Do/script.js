const pendingList = document.getElementById('pendingList');
const completedList = document.getElementById('completedList');
const taskInput = document.getElementById('taskInput');
const dateInput = document.getElementById('dateInput');
const timeInput = document.getElementById('timeInput');

function addTask() {
    const taskText = taskInput.value.trim();
    const taskDate = dateInput.value;
    const taskTime = timeInput.value;

    if (taskText === '' || taskDate === '' || taskTime === '') 
    {
        alert('Please fill in all fields.');
        return;
    }

    const [year, month, day] = taskDate.split('-');
    const formattedDate = new Date(year, month - 1, day);
    const taskDateTimeString = formattedDate.toISOString().slice(0, 10) + ' ' + taskTime;
    const taskDateTime = new Date(taskDateTimeString);
    const now = new Date();

    const taskItem = document.createElement('li');

    if (taskDateTime <= now) {
        taskItem.classList.add('today');
    } else {
        taskItem.classList.add('future');
    }

    taskItem.innerHTML = `
    <span>${taskText}</span>
    <br>
    <span class="task-time">${taskDateTime.toLocaleString()}</span>
    <button onclick="completeTask(this)">Complete</button>
    <button onclick="deleteTask(this)">Delete</button>
`;

    pendingList.appendChild(taskItem);

    taskInput.value = '';
    dateInput.value = '';
    timeInput.value = '';
}

function completeTask(button) {
    const taskItem = button.parentElement;
    
    if (taskItem.classList.contains('completed')) {
        taskItem.classList.remove('completed');
        pendingList.prepend(taskItem); // Move back to pending list
        button.innerText = 'Complete';
    } else {
        taskItem.classList.add('completed');
        completedList.appendChild(taskItem);
        button.innerText = 'Uncomplete';
    }
}

function deleteTask(button) {
    const taskItem = button.parentElement;
    taskItem.remove();
}

function isValidTime(time) {
    const pattern = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s([APap][Mm])$/;
    return pattern.test(time);
}
