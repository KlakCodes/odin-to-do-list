import app from "./app";

const DOM = (() => {
    let selectedProj = "";
    let selectedTask = "";
    const updateTaskDialog = document.querySelector("#updateTaskDialog");

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

            switch (task.priority) {
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
                // TEST START
                // console.log("Edit task:", task);
                // task.title = `${task.title} - Edited`;
                // app.saveProjects();
                // renderTasks(selectedProj);
                // TEST END

                updateTaskDialog.showModal();

                document.querySelector("#updateTitle").value = task.title;
                document.querySelector("#updateDesc").value = task.description;
                document.querySelector("#updateDueDate").value = task.dueDate;
                document.querySelector("#updatePriority").value = task.priority;
            });

            if (task.completed) {
                taskCompBtn.textContent = "✔";
                taskCompBtn.style.backgroundColor = "#b4eeb4";
                taskCompBtn.style.color = "#008000";
            } else {
                taskCompBtn.textContent = "✔";
                taskCompBtn.style.backgroundColor = "#eeeeee";
                taskCompBtn.style.color = "#c0c0c0";
            }

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

            taskElement.addEventListener("click", () => {
                selectedTask = task;
            });
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
    const updateForm = document.querySelector("#updateTaskForm");

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

    const submitUpdateForm = (e) => {
        e.preventDefault();

        selectedTask.title = document.querySelector("#updateTitle").value;
        selectedTask.description = document.querySelector("#updateDesc").value;
        selectedTask.dueDate = document.querySelector("#updateDueDate").value;
        selectedTask.priority = document.querySelector("#updatePriority").value;

        app.saveProjects();
        renderTasks(selectedProj);

        updateTaskDialog.close();
    };

    function resetInputs() {
        document.querySelector("#taskTitle").value = "";
        document.querySelector("#taskDesc").value = "";
        document.querySelector("#taskDueDate").value = "";
        document.querySelector("#taskPriority").value = "Low";
    }

    const closeDialogBtn = document.querySelector("#closeNewDialog");
    closeDialogBtn.addEventListener("click", () => {
        resetInputs();
        newTaskDialog.close();
    });

    const closeUpdateBtn = document.querySelector("#closeUpdateDialog");
    closeUpdateBtn.addEventListener("click", () => {
        resetInputs();
        updateTaskDialog.close();
    });

    taskForm.addEventListener("submit", submitForm);
    updateForm.addEventListener("submit", submitUpdateForm);

    return { renderProjects, renderUI };
})();

export default DOM;