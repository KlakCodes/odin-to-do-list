import "./styles.css";
import app from "./app";
import DOM from "./DOM";

document.addEventListener("DOMContentLoaded", () => {
    app.init();
    DOM.renderUI();
    DOM.renderProjects(app.getProjects());

    // TEST START
    const body = document.querySelector("body");
    const createProj = document.createElement("button");
    createProj.textContent = "Create Project";
    createProj.addEventListener('click', () => {
        const projName = prompt("Project name:")
        app.addProject(projName);
        DOM.renderProjects(app.getProjects());
    });
    body.appendChild(createProj);
    // TEST END
});