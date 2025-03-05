import app from "./app";

const DOM = (() => {
    let selectedProj = "";

    function renderProjects(projects) {
        const projectContainer = document.querySelector(".projects");
        projectContainer.innerHTML = "";

        projects.forEach(project => {
            const projectElement = document.createElement("li");
            projectElement.textContent = project.title;

            projectElement.addEventListener("click", () => {
                selectedProj = project;
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
            taskElement.classList.toggle("taskCard");

            const taskTitle = document.createElement("div");
            const taskDesc = document.createElement("div");
            const taskDueDate = document.createElement("div");
            const taskPriority = document.createElement("div");
            const taskCompleted = document.createElement("div");

            taskTitle.textContent = task.title;
            taskDesc.textContent = task.description;
            taskDueDate.textContent = task.dueDate;
            taskPriority.textContent = task.priority;
            taskCompleted.textContent = task.completed;

            taskElement.appendChild(taskTitle);
            taskElement.appendChild(taskDesc);
            taskElement.appendChild(taskDueDate);
            taskElement.appendChild(taskPriority);
            taskElement.appendChild(taskCompleted);

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
    // TEST END

    const newProjectBtn = document.querySelector("#newProjectBtn");
    const newProjectTxt = document.querySelector("#newProjectTxt");
    newProjectBtn.addEventListener("click", () => {

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
    const newTaskDialog = document.querySelector("#newTaskDialog");
    newTaskBtn.addEventListener("click", () => {
        newTaskDialog.showModal();
    });

    const taskForm = document.querySelector("#newTaskForm");

    const submitForm = (e) => {
        e.preventDefault();

        const taskTitle = document.querySelector("#taskTitle").value;
        const taskDesc = document.querySelector("#taskDesc").value;
        const taskDueDate = document.querySelector("#taskDueDate").value;
        const taskPriority = document.querySelector("#taskPriority").value;

        app.addTask(selectedProj, taskTitle, taskDesc, taskDueDate, taskPriority);
        renderTasks(selectedProj);
        newTaskDialog.close();
    };

    taskForm.addEventListener("submit", submitForm);

    return { renderProjects, renderUI };
})();

export default DOM;