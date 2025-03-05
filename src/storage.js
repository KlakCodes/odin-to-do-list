import { Project } from "./project";

const Storage = (() => {
    function saveProjects(projects) {
      localStorage.setItem("projects", JSON.stringify(projects));
    }
  
    function loadProjects() {
      const projects = JSON.parse(localStorage.getItem("projects"));
      return projects ? projects.map(p => new Project(p.title, p.tasks)) : null;
    }
  
    return { saveProjects, loadProjects };
  })();
  
  export default Storage;
  