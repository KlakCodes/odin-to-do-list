const DOM = (() => {
    function renderProjects(projects) {
        const projectContainer = document.querySelector(".projects");
        projectContainer.innerHTML = "";

        projects.forEach(project => {
            const projectElement = document.createElement("div");
            projectElement.textContent = project.title;
            projectContainer.appendChild(projectElement);
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

    return { renderProjects, renderUI };
})();

export default DOM;