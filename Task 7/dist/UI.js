import TaskManager from './TaskManager.js';
export default class UI {
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
//# sourceMappingURL=UI.js.map