import Task from './Task.js';
import UI from './UI.js';

export default class TaskManager{
    nextId : number;
    ui : UI;
    tasks : Task[];
    constructor(){
        this.nextId = 1;
        this.ui = new UI();
        this.ui.createAddButton(this);
        this.tasks = [];

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

        this.tasks.push(task);

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
        this.tasks = this.tasks.filter(task => task.getId().toString() != taskId);
    }
}