export class Project {
    constructor(title, tasks=[]) {
        this.title = title;
        this.tasks = tasks;
    }

    addTask(task) {
        this.tasks.push(task);
    }

    removeTask(taskTitle) {
        this.tasks = this.tasks.filter(task => task.title !== taskTitle);
    }
}