import TaskManager from "./TaskManager.js";
export default class UI {
    constructor() {}
    createDiv(taskId: string): HTMLDivElement {
        const div = document.createElement("div");
        div.classList.add("taskbox");
        div.id = taskId;
        return div;
    }

    createAddButton(taskManager: TaskManager): void {
        const addButton = document.getElementById("addButton") as HTMLButtonElement;
        const inputValue = document.getElementById("taskName") as HTMLInputElement;
        addButton.addEventListener("click", () => {
            taskManager.addNewTask(inputValue.value);
            inputValue.value = "";
        });
    }

    createInput(taskId: string): HTMLInputElement {
        const input = document.createElement("input");
        input.type = "checkbox";
        input.classList.add("check");
        input.id = "task" + taskId;
        return input;
    }
    createLabel(taskName: string, taskId: string): HTMLLabelElement {
        const label = document.createElement("label");
        label.classList.add("label");
        label.textContent = taskName;
        label.htmlFor = "task" + taskId;
        return label;
    }
    createDeleteButton(taskManager: TaskManager, taskId: string): HTMLButtonElement {
        const btn = document.createElement("button");
        btn.classList.add("btn-delete");
        btn.textContent = "DELETE";
        const deleteHandler = () => taskManager.deleteTask(taskId);
        btn.addEventListener("click", deleteHandler);
        return btn;
    }
    createTaskBox(
        input: HTMLInputElement,
        label: HTMLLabelElement,
        btn: HTMLButtonElement,
        div: HTMLDivElement,
    ) {
        div.appendChild(input);
        div.appendChild(label);
        div.appendChild(btn);
        const taskList = document.getElementById("taskList");
        taskList?.appendChild(div);
    }

    checkboxAction(input: HTMLInputElement, label: HTMLLabelElement) {
        input.addEventListener("click", () => {
            if (input.checked) {
                label.classList.add("line-through", "text-gray-400");
            } else {
                label.classList.remove("line-through", "text-gray-400");
            }
        });
    }
}
