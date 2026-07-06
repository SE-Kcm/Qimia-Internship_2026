import Task from './Task.js';
import UI from './UI.js';

export default class TaskManager{

    constructor(){
        this.nextId = 1;
        this.ui = new UI();
        this.ui.createAddButton(this);
        this.tasks = [];
    }

    createTask(taskName){
        const task = new Task(taskName, this.nextId);
        this.nextId++;
        return task;
    }
    addNewTask(taskName){
        if(taskName.trim().length == 0){
            alert("Please enter a task name!");
            return;
        }
        const task = this.createTask(taskName);
        this.tasks.push(task);
        const taskID = task.getId();
        const div = this.ui.createDiv(taskID);

        const input = this.ui.createInput(taskID);

        const label = this.ui.createLabel(task.getName(), taskID);

        this.ui.checkboxAction(input, label);

        const btn = this.ui.createDeleteButton(this,task.getId());

        this.ui.createTaskBox(input, label, btn, div);
    }

    deleteTask(taskId){
        const element = document.getElementById(taskId);
        element.remove();
        this.task = this.tasks.filter(task =>task.getId() != taskId);
    }
}