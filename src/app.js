import { Project } from "./project";
import Storage from "./storage";

const app = (() => {
    let projects = [];

    function init() {
        // Load from localStorage or create a default project
        projects = Storage.loadProjects() || [new Project("Default")];

        console.table(projects);
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

    return { init, addProject, getProjects };
})();

export default app;
