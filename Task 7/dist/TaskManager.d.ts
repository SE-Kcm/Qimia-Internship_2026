import Task from './Task.js';
import UI from './UI.js';
export default class TaskManager {
    nextId: number;
    ui: UI;
    tasks: Task[];
    constructor();
    createTask(taskName: string): Task;
    addNewTask(taskName: string): void;
    deleteTask(taskId: string): void;
}
//# sourceMappingURL=TaskManager.d.ts.map