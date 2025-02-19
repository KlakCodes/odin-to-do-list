import { Project } from "./project";
import Storage from "./storage";

const app = (() => {
    let projects = [];

    function init() {
        projects = Storage.loadProjects() || [new Project("Default")];

        console.table(projects);
    }

    return { init };
})();

export default app;