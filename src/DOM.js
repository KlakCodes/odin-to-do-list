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

    return { renderProjects };
})();

export default DOM;