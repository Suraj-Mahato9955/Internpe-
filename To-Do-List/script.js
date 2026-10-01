
// =========================
// GET HTML ELEMENTS
// =========================

const inputBox = document.getElementById("input-box");

const addBtn = document.getElementById("add-btn");

const listContainer = document.getElementById("list-container");


// =========================
// ADD TASK
// =========================

function addTask() {

    // Remove extra spaces
    const taskText = inputBox.value.trim();


    // Check empty input
    if (taskText === "") {

        alert("You must write something!");

        return;
    }


    // Create new list item
    const li = document.createElement("li");


    // Add task text
    li.textContent = taskText;


    // Add task to list
    listContainer.appendChild(li);


    // Create delete button
    const span = document.createElement("span");


    // Add X symbol
    span.textContent = "×";


    // Add delete button inside task
    li.appendChild(span);


    // Clear input
    inputBox.value = "";


    // Save tasks
    saveData();
}


// =========================
// ADD BUTTON CLICK
// =========================

addBtn.addEventListener("click", function () {

    addTask();

});


// =========================
// TASK CLICK
// =========================

listContainer.addEventListener("click", function (event) {


    // If user clicks the task
    if (event.target.tagName === "LI") {

        // Complete / Uncomplete
        event.target.classList.toggle("checked");


        // Save updated task
        saveData();
    }


    // If user clicks delete button
    else if (event.target.tagName === "SPAN") {

        // Delete task
        event.target.parentElement.remove();


        // Save updated list
        saveData();
    }

});


// =========================
// ENTER KEY
// =========================

inputBox.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        addTask();
    }

});


// =========================
// SAVE DATA
// =========================

function saveData() {

    localStorage.setItem(
        "todoTasks",
        listContainer.innerHTML
    );
}


// =========================
// LOAD DATA
// =========================

function showTask() {

    const savedTasks =
        localStorage.getItem("todoTasks");


    if (savedTasks) {

        listContainer.innerHTML = savedTasks;
    }
}


// =========================
// LOAD TASKS ON PAGE LOAD
// =========================

showTask();
