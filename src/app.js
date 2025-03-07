import { Project } from "./project";
import { Task } from "./task";
import Storage from "./storage";

const app = (() => {
    let projects = [];

    function init() {
        // Load from localStorage or create a default project
        projects = Storage.loadProjects() || [new Project("Default")];

        console.table(projects);
    }

    function saveProjects() {
        Storage.saveProjects(projects);
    }

    function addProject(name) {
        const newProject = new Project(name);
        projects.push(newProject);
        Storage.saveProjects(projects);

        console.log("New project added:", newProject);
    }

    function getProjects() {
        return projects;
    }

    function addTask(project, title, description, dueDate, priority) {
        const newTask = new Task(title, description, dueDate, priority);
        project.addTask(newTask);
        Storage.saveProjects(projects);

        console.log(newTask);
    }

    function removeTask(project, title) {
        project.removeTask(title);
        Storage.saveProjects(projects);
    }

    function toggleCompTask(task) {
        task.toggleCompleted();
        Storage.saveProjects(projects);
    }

    return { init, saveProjects, addProject, getProjects, addTask, removeTask, toggleCompTask };
})();

export default app;
