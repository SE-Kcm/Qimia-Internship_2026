let tasks = []
let nextId = 1;

const addButton = document.getElementById("addButton");
const inputValie = document.getElementById("taskName");
addButton.addEventListener("click", () => {
    addNewTask(taskName);
    taskName.value = "";
});

function addNewTask(taskName){
    //const taskName = document.getElementById("taskName"); 
    if(taskName.value.length == 0){
        alert("Please enter a task name!");
        return;
    }
    let task ={
        name: taskName.value,
        id: nextId
    }
    
    tasks.push(task);
    nextId++;
    const div = document.createElement("div");
    div.classList.add("taskbox");
    div.id = task.id;

    const input = document.createElement("input");
    input.type = "checkbox";
    //input.value = "checked";
    input.classList.add("check")

    const label = document.createElement("label");
    label.classList.add("label");
    label.textContent = task.name;

    input.addEventListener("click", () => {
        if(input.checked){
            label.classList.add("line-through", "text-gray-400");
        }else{
            label.classList.remove("line-through", "text-gray-400");
        }
    });

    const btn = document.createElement("button");
    btn.classList.add("btn-delete");
    btn.textContent = "DELETE";

    btn.addEventListener("click", () => deleteTask(task.id));

    div.appendChild(input);
    div.appendChild(label);
    div.appendChild(btn);

    const taskList = document.getElementById("taskList");
    taskList.appendChild(div);
}

function deleteTask(id){
    const element = document.getElementById(id);
    element.remove();

    
}
function listAllTasks(){
 
}
