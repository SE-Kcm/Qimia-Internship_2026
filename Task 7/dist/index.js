"use strict";
class Task {
    name;
    id;
    constructor(name, id) {
        this.name = name;
        this.id = id;
    }
    getName() {
        return this.name;
    }
    getId() {
        return this.id;
    }
}
class TaskManager {
    nextId;
    ui;
    constructor() {
        this.nextId = 1;
        this.ui = new UI();
        this.ui.createAddButton(this);
    }
    createTask(taskName) {
        const task = new Task(taskName, this.nextId);
        this.nextId++;
        return task;
    }
    addNewTask(taskName) {
        if (taskName.length == 0) {
            alert("Please enter a task name!");
            return;
        }
        const task = this.createTask(taskName);
        const taskId = task.getId().toString();
        const div = this.ui.createDiv(taskId);
        const input = this.ui.createInput();
        const label = this.ui.createLabel(task.getName());
        this.ui.checkboxAction(input, label);
        const btn = this.ui.createDeleteButton(this, taskId);
        this.ui.createTaskBox(input, label, btn, div);
    }
    deleteTask(taskId) {
        const element = document.getElementById(taskId);
        element?.remove();
    }
}
class UI {
    constructor() {
    }
    createDiv(taskId) {
        const div = document.createElement("div");
        div.classList.add("taskbox");
        div.id = taskId;
        return div;
    }
    createAddButton(taskManager) {
        const addButton = document.getElementById("addButton");
        const inputValue = document.getElementById("taskName");
        addButton.addEventListener("click", () => {
            taskManager.addNewTask(inputValue.value);
            inputValue.value = "";
        });
    }
    createInput() {
        const input = document.createElement("input");
        input.type = "checkbox";
        input.classList.add("check");
        return input;
    }
    createLabel(taskName) {
        const label = document.createElement("label");
        label.classList.add("label");
        label.textContent = taskName;
        return label;
    }
    createDeleteButton(taskManager, taskId) {
        const btn = document.createElement("button");
        btn.classList.add("btn-delete");
        btn.textContent = "DELETE";
        btn.addEventListener("click", () => taskManager.deleteTask(taskId));
        return btn;
    }
    createTaskBox(input, label, btn, div) {
        div.appendChild(input);
        div.appendChild(label);
        div.appendChild(btn);
        const taskList = document.getElementById("taskList");
        taskList?.appendChild(div);
    }
    checkboxAction(input, label) {
        input.addEventListener("click", () => {
            if (input.checked) {
                label.classList.add("line-through", "text-gray-400");
            }
            else {
                label.classList.remove("line-through", "text-gray-400");
            }
        });
    }
}
const tm = new TaskManager();
console.log("TaskManager created");
//# sourceMappingURL=index.js.map