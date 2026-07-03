declare class Task {
    name: string;
    id: number;
    constructor(name: string, id: number);
    getName(): string;
    getId(): number;
}
declare class TaskManager {
    nextId: number;
    ui: UI;
    constructor();
    createTask(taskName: string): Task;
    addNewTask(taskName: string): void;
    deleteTask(taskId: string): void;
}
declare class UI {
    constructor();
    createDiv(taskId: string): HTMLDivElement;
    createAddButton(taskManager: TaskManager): void;
    createInput(): HTMLInputElement;
    createLabel(taskName: string): HTMLLabelElement;
    createDeleteButton(taskManager: TaskManager, taskId: string): HTMLButtonElement;
    createTaskBox(input: HTMLInputElement, label: HTMLLabelElement, btn: HTMLButtonElement, div: HTMLDivElement): void;
    checkboxAction(input: HTMLInputElement, label: HTMLLabelElement): void;
}
declare const tm: TaskManager;
//# sourceMappingURL=index.d.ts.map