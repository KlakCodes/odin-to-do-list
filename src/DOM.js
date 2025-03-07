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

            let taskColor = "#fff"

            switch(task.priority) {
                case "High":
                    taskColor = "#ff0000";
                    break;
                case "Medium":
                        taskColor = "#ffa500";
                    break;
                case "Low":
                        taskColor = "#ffff00";
                    break;
                default:
                    taskColor = "#fff";
            }

            taskElement.style.backgroundColor = taskColor;

            const taskTitle = document.createElement("div");
            const taskDesc = document.createElement("div");
            const taskDueDate = document.createElement("div");
            const taskPriority = document.createElement("div");
            const taskCompleted = document.createElement("div");
            const taskEdit = document.createElement("button");
            const taskCompBtn = document.createElement("button");
            const taskDelete = document.createElement("button");

            taskTitle.textContent = task.title;
            taskDesc.textContent = task.description;
            taskDueDate.textContent = task.dueDate;
            taskPriority.textContent = task.priority;
            taskCompleted.textContent = task.completed;
            taskEdit.textContent = "Edit";
            taskDelete.textContent = "Delete";

            taskEdit.addEventListener("click", () => {
                console.log("Edit task:", task);
            });

            let taskCompBtnText = "";

            if(task.completed) {
                taskCompBtnText = "Reopen task";
            } else {
                taskCompBtnText = "Task complete";
            }

            taskCompBtn.textContent = taskCompBtnText;
            taskCompBtn.addEventListener("click", () => {
                app.toggleCompTask(task);
                renderTasks(selectedProj);
            });

            taskDelete.addEventListener("click", () => {
                console.log("Delete task:", task);
                app.removeTask(selectedProj, task.title);
                renderTasks(selectedProj);
            });

            taskElement.appendChild(taskTitle);
            taskElement.appendChild(taskDesc);
            taskElement.appendChild(taskDueDate);
            taskElement.appendChild(taskPriority);
            taskElement.appendChild(taskCompleted);
            taskElement.appendChild(taskEdit);
            taskElement.appendChild(taskCompBtn);
            taskElement.appendChild(taskDelete);

            taskContainer.appendChild(taskElement);
        });
    }

    function renderUI() {
        const footer = document.querySelector(".footer");
        const year = new Date().getFullYear();
        footer.textContent = `Copyright © ${year} KlakCodes`;
    }

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

        let taskTitle = document.querySelector("#taskTitle").value;
        let taskDesc = document.querySelector("#taskDesc").value;
        let taskDueDate = document.querySelector("#taskDueDate").value;
        let taskPriority = document.querySelector("#taskPriority").value;

        app.addTask(selectedProj, taskTitle, taskDesc, taskDueDate, taskPriority);
        renderTasks(selectedProj);

        resetInputs();
        newTaskDialog.close();
    };

    function resetInputs() {
        document.querySelector("#taskTitle").value = "";
        document.querySelector("#taskDesc").value = "";
        document.querySelector("#taskDueDate").value = "";
        document.querySelector("#taskPriority").value = "Low";
    }

    const closeDialogBtn = document.querySelector(".closeDialog");
    closeDialogBtn.addEventListener("click", () => {
        resetInputs();
        newTaskDialog.close();
    });

    taskForm.addEventListener("submit", submitForm);

    return { renderProjects, renderUI };
})();

export default DOM;