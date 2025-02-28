import app from "./app";

const DOM = (() => {
    function renderProjects(projects) {
        const projectContainer = document.querySelector(".projects");
        projectContainer.innerHTML = "";

        projects.forEach(project => {
            const projectElement = document.createElement("li");
            projectElement.textContent = project.title;

            projectElement.addEventListener("click", () => {
                renderTasks(project);
            });

            projectContainer.appendChild(projectElement);
        });
    }

    function renderTasks(project) {
        const taskContainer = document.querySelector(".tasks");
        taskContainer.innerHTML = "";

        project.tasks.forEach(task => {
            const taskElement = document.createElement("div");
            taskElement.textContent = task.title;
            taskContainer.appendChild(taskElement);
        });
    }

    // TEST START
    function renderUI() {
        const body = document.querySelector("body");
        const testMessage = document.createElement("div");
        testMessage.textContent = "This is a test message in a function!";
        body.appendChild(testMessage);
    }

    const newProjectBtn = document.querySelector("#newProjectBtn");
    const newProjectTxt = document.querySelector("#newProjectTxt");
    newProjectBtn.addEventListener("click", () => {
        console.log("New project button clicked!");

        const projName = newProjectTxt.value;
        if (projName !== '') {
            app.addProject(projName);
            renderProjects(app.getProjects());
            newProjectTxt.value = '';
        } else {
            alert("Please enter a project name");
        }
    });

    const newTaskBtn = document.querySelector("#newTaskBtn");
    newTaskBtn.addEventListener("click", () => {
        console.log("New task button clicked!");
    });
    // TEST END

    return { renderProjects, renderUI };
})();

export default DOM;