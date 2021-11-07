// add date to header
const date = new Date().toString().slice(0, 15);
document.getElementById("date").innerHTML = date;

// reload 
document.querySelector(".fa-sync-alt").onclick = _ => location.reload();

// tasks list array
let todoList = [];

// add saved tasks to to do list
if (localStorage.getItem("task")) {
  todoList = JSON.parse(localStorage.getItem("task"));
}

// get tasks from device memory
getSavedTasks();

// add tasks to array 
send.onclick = function () {
  if (input.value !== "") {
    createTasks(input.value);
    input.value = "";
  }
};

// click on task element 
let taskEl = document.querySelector(".task");

tasks.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-trash-alt")) {
    // delete task from device memory
    deleteTask(e.target.parentElement.getAttribute("task-id"));
    // remove task from html
    e.target.parentElement.remove();
  }
  // Mark Task As Done 
  if (e.target.classList.contains("fa-circle")) {
    // done on localStorage
    taskIsDone(e.target.parentElement.getAttribute("task-id"));
    e.target.className = "fas fa-check-circle";
    e.target.parentElement.children[1].classList.add("done");
    check.play();
  } else if (e.target.classList.contains("fa-check-circle")) {
    // done on localStorage
    taskIsDone(e.target.parentElement.getAttribute("task-id"));
    e.target.className = "fas fa-circle";
    e.target.parentElement.children[1].classList.remove("done");
  }
});

function createTasks(taskName) {
  // task data
  const task = {
    title: taskName,
    id: Date.now(),
    isDone: false,
  };
  // push task data to array
  todoList.push(task);
  addTasksToPage(todoList);
  // save tasks to device memory
  saveTask(todoList);
}

function addTasksToPage(todoList) {
  // Empty Tasks Div
  tasks.innerHTML = "";
  // Looping On Tasks
  todoList.forEach((task) => {
    // task element
    let div = document.createElement("li");
    div.className = "task";
    // if task completed 
    let checkBox = document.createElement("i");
    checkBox.className = "fas fa-circle";
    if (task.isDone) {
      checkBox.className = "fas fa-check-circle";
    } else {
      checkBox.className = "fas fa-circle";
    }
    div.appendChild(checkBox);
    div.setAttribute("task-id", task.id);
    // text element
    let taskTitleEl = document.createElement("div");
    taskTitleEl.className = "text";
    taskTitleEl.appendChild(document.createTextNode(task.title));
    // if task completed 
    if (task.isDone) {
      taskTitleEl.classList.toggle("done");
    }
    div.appendChild(taskTitleEl);
    // delete button
    let delBtn = document.createElement("i");
    delBtn.className = "fas fa-trash-alt";
    div.appendChild(delBtn);
    // append element to tasks
    tasks.appendChild(div);
  });
}

function saveTask(todoList) {
  let memory = localStorage.setItem("task", JSON.stringify(todoList));
}

function getSavedTasks() {
  let memory = localStorage.getItem("task");
  if (memory) {
    let tasks = JSON.parse(memory);
    addTasksToPage(tasks);
  }
}

function deleteTask(taskId) {
  // get element by task id
  todoList = todoList.filter((task) => task.id != taskId);
  saveTask(todoList);
}

function taskIsDone(taskId) {
  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].id == taskId) {
      if (todoList[i].isDone == false) {
        todoList[i].isDone = true;
      } else {
        todoList[i].isDone = false;
      }
    }
  saveTask(todoList);
  }
}