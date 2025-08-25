let tasks = JSON.parse(localStorage.getItem("tasks")) || []; 
let editIndex = -1; 

// Add or Update Task
function addTask() {
  let taskInput = document.getElementById("taskInput");
  let taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("⚠️ Please enter a task!");
    return;
  }

  if (editIndex === -1) {
    tasks.push(taskText); // add new
  } else {
    tasks[editIndex] = taskText; // update existing
    editIndex = -1;
  }

  taskInput.value = "";
  saveTasks();
  displayTasks();
}

// Display Tasks
function displayTasks() {
  let taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    let li = document.createElement("li");

    let span = document.createElement("span");
    span.textContent = task;
    li.appendChild(span);

    let btnDiv = document.createElement("div");
    btnDiv.className = "btns";

    // Edit button
    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit";
    editBtn.onclick = () => editTask(index);
    btnDiv.appendChild(editBtn);

    // Delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete";
    deleteBtn.onclick = () => deleteTask(index);
    btnDiv.appendChild(deleteBtn);

    li.appendChild(btnDiv);
    taskList.appendChild(li);
  });
}

// Edit Task
function editTask(index) {
  document.getElementById("taskInput").value = tasks[index];
  editIndex = index;
}

// Delete Task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  displayTasks();
}

// Save tasks in LocalStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Display saved tasks on load
window.onload = displayTasks;
