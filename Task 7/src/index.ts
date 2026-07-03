class Task{
     name: string;
     id: number;
    
    constructor(name: string,id:number){
        this.name = name;
        this.id = id
    }

    getName(): string{
        return this.name;
    }

    getId () : number{
        return this.id;
    }
}

class TaskManager{
    nextId : number;
    ui : UI;
    constructor(){
        this.nextId = 1;
        this.ui = new UI();
        this.ui.createAddButton(this);
    }

    createTask(taskName : string) : Task{
        const task = new Task(taskName, this.nextId);
        this.nextId++;
        return task;
    }
    addNewTask(taskName : string) : void{
        if(taskName.length == 0){
            alert("Please enter a task name!");
            return;
        }
        const task = this.createTask(taskName);
        const taskId : string = task.getId().toString();

        const div = this.ui.createDiv(taskId);

        const input = this.ui.createInput();

        const label = this.ui.createLabel(task.getName());

        this.ui.checkboxAction(input, label);

        const btn = this.ui.createDeleteButton(this,taskId);

        this.ui.createTaskBox(input, label, btn, div);
    }

    deleteTask(taskId: string) : void{
        const element = document.getElementById(taskId);
        element?.remove();
    }
}

class UI{

    constructor(){
    
    }
    createDiv(taskId:string): HTMLDivElement {
        const div = document.createElement("div");
        div.classList.add("taskbox");
        div.id = taskId;
        return div;
    }

    createAddButton(taskManager : TaskManager) : void{
        const addButton = document.getElementById("addButton") as HTMLButtonElement;
        const inputValue = document.getElementById("taskName") as HTMLInputElement;
        addButton.addEventListener("click", () => {
            taskManager.addNewTask(inputValue.value);
            inputValue.value = "";
        });
    }

    createInput(): HTMLInputElement{
        const input = document.createElement("input");
        input.type = "checkbox";
        input.classList.add("check");
        return input;
    }
    createLabel(taskName: string): HTMLLabelElement{
        const label = document.createElement("label");
        label.classList.add("label");
        label.textContent = taskName;
        return label;
    }
    createDeleteButton(taskManager: TaskManager, taskId:string): HTMLButtonElement{
        const btn = document.createElement("button");
        btn.classList.add("btn-delete");
        btn.textContent = "DELETE";
        btn.addEventListener("click", () => taskManager.deleteTask(taskId))
        return btn;

    }
    createTaskBox(input : HTMLInputElement, label: HTMLLabelElement, btn: HTMLButtonElement, div:HTMLDivElement){
        div.appendChild(input);
        div.appendChild(label);
        div.appendChild(btn);
        const taskList = document.getElementById("taskList");
        taskList?.appendChild(div);
    }

    checkboxAction(input: HTMLInputElement, label: HTMLLabelElement){
            input.addEventListener("click", () => {
            if(input.checked){
                label.classList.add("line-through", "text-gray-400");
            }else{
                label.classList.remove("line-through", "text-gray-400");
            }
        });
    }
}

const tm = new TaskManager();
console.log("TaskManager created");
