const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const tasksList = document.getElementById("tasksList");

//Variable to get tasks list from localStorage if available
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

//Function to save the tasks into localStorage
const saveTasks = () => localStorage.setItem("tasks", JSON.stringify(tasks));

//Function to add task in localStorage
function addTask() {
  const task = taskInput.value.trim();
  if (task) {
    tasks.push(task);
    taskInput.value = "";
    saveTasks();
    renderTasks();
  }
}

//Adding eventLister to Add Task Button
addBtn.addEventListener("click", addTask);

//Adding eventLister to Edit Task Button
tasksList.addEventListener("click", (e) => {
  if (e.target.classList.contains("edtBtn")) {
    editTasks(e.target.dataset.index);
  }
});

//Adding eventLister to Delete Task Button
tasksList.addEventListener("click", (e) => {
  if (e.target.classList.contains("dltBtn")) {
    deleteTasks(e.target.dataset.index);
  }
});

//Function to render tasks in the DOM
function renderTasks() {
  tasksList.innerHTML = "";
  tasks.forEach((task, index) => {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    taskDiv.id = `task${index}`;
    taskDiv.innerHTML = `
         <span>${task}</span>
          <button class="edtBtn" data-index=${index}>Edit</button>
          <button class="dltBtn" data-index=${index}>Delete</button>
  `;
    tasksList.appendChild(taskDiv);
  });
}

//Function to Edit the tasks
function editTasks(index) {
  const taskDiv = document.getElementById(`task${index}`);
  const taskSpan = taskDiv.querySelector("span");
  const task = taskSpan.innerText;
  const newTask = prompt("Update the task...", task);
  if (newTask) {
    tasks[index] = newTask;
    saveTasks();
    renderTasks();
  }
}

//Function to delete the tasks.
function deleteTasks(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

//Calling the render function to show the tasks on page reload/refresh
renderTasks();
