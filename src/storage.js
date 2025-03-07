import { Project } from "./project";
import { Task } from "./task";

const Storage = (() => {
    function saveProjects(projects) {
      localStorage.setItem("projects", JSON.stringify(projects));
    }
  
    function loadProjects() {
      const projects = JSON.parse(localStorage.getItem("projects"));
      // return projects ? projects.map(p => new Project(p.title, p.tasks)) : null;
      if (projects) {
        return projects.map(p => {
            const tasks = p.tasks.map(t => new Task(t.title, t.description, t.dueDate, t.priority, t.completed));
            return new Project(p.title, tasks);
        });
      }
      return null;
    }
  
    return { saveProjects, loadProjects };
  })();
  
  export default Storage;
  