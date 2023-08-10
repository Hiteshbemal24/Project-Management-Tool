let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const taskManagerContainer = document.querySelector(".taskManager");
const confirmEl = document.querySelector(".confirm");
const confirmedBtn = confirmEl.querySelector(".confirmed");
const cancelledBtn = confirmEl.querySelector(".cancel");
const chatForm = document.getElementById('chatForm');
const messageInput = document.getElementById('messageInput');
const chatContainer = document.getElementById('chatContainer');

let indexToBeDeleted = null

document.getElementById('taskForm').addEventListener('submit', handleFormSubmit);

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault();
  const taskInput = document.getElementById('taskInput');
  const taskDescription = document.getElementById('taskDescription');
  const taskText = taskInput.value.trim();
  const descriptionText = taskDescription.value.trim();

  if (taskText !== '') {
    const newTask = {
      text: taskText,
      description: descriptionText,
      completed: false
    };

    tasks.push(newTask);
    saveTasks();
    taskInput.value = '';
    taskDescription.value = '';
    renderTasks();
  }
}

// Function to save tasks to local storage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

renderTasks();


// Function to render tasks
function renderTasks() {
  const taskContainer = document.getElementById('taskContainer');
  taskContainer.innerHTML = '';

  tasks.forEach((task, index) => {
    const taskCard = document.createElement('div');
    taskCard.classList.add('taskCard');
    let classVal = "pending";
    let textVal = "Pending"
    if (task.completed) {
      classVal = "completed";
      textVal = "Completed";
    }
    taskCard.classList.add(classVal);

    const taskText = document.createElement('p');
    // taskText.innerText = task.text;
    taskText.innerHTML = `<strong>${task.text}</strong><br>${task.description}`;

    const taskStatus = document.createElement('p');
    taskStatus.classList.add('status');
    taskStatus.innerText = textVal;

    const toggleButton = document.createElement('button');
    toggleButton.classList.add("button-box");
    const btnContentEl = document.createElement("span");
    btnContentEl.classList.add("green");
    btnContentEl.innerText = task.completed ? 'Mark as Pending' : 'Mark as Completed';
    toggleButton.appendChild(btnContentEl);
    toggleButton.addEventListener('click', () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    });

    const deleteButton = document.createElement('button');
    deleteButton.classList.add("button-box");
    const delBtnContentEl = document.createElement("span");
    delBtnContentEl.classList.add("red");
    delBtnContentEl.innerText = 'Delete';
    deleteButton.appendChild(delBtnContentEl);
    deleteButton.addEventListener('click', () => {
      indexToBeDeleted = index
      confirmEl.style.display = "block";
      taskManagerContainer.classList.add("overlay");
    });

    taskCard.appendChild(taskText);
    taskCard.appendChild(taskStatus);
    taskCard.appendChild(toggleButton);
    taskCard.appendChild(deleteButton);

    taskContainer.appendChild(taskCard);
  });
}

// function to delete the selected task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

confirmedBtn.addEventListener("click", () => {
  confirmEl.style.display = "none";
  taskManagerContainer.classList.remove("overlay");
  deleteTask(indexToBeDeleted)
});

cancelledBtn.addEventListener("click", () => {
  confirmEl.style.display = "none";
  taskManagerContainer.classList.remove("overlay");
});

//function to chat
chatForm.addEventListener('submit', handleChatSubmit);

function handleChatSubmit(event) {
    event.preventDefault();
    const messageText = messageInput.value.trim();
    
    if (messageText !== '') {
        appendChatMessage('user', messageText); 
        setTimeout(() => {
            const responseText = "Thanks for your message!";
            appendChatMessage('bot', responseText); 
        }, 1000);
        
        messageInput.value = ''; // Clear the input field
    }
}

function appendChatMessage(sender, text) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.innerText = text;
    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}
