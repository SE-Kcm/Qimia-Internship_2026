import TaskManager from './TaskManager.js';
export default class UI {
    constructor();
    createDiv(taskId: string): HTMLDivElement;
    createAddButton(taskManager: TaskManager): void;
    createInput(): HTMLInputElement;
    createLabel(taskName: string): HTMLLabelElement;
    createDeleteButton(taskManager: TaskManager, taskId: string): HTMLButtonElement;
    createTaskBox(input: HTMLInputElement, label: HTMLLabelElement, btn: HTMLButtonElement, div: HTMLDivElement): void;
    checkboxAction(input: HTMLInputElement, label: HTMLLabelElement): void;
}
//# sourceMappingURL=UI.d.ts.map