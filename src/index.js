import app from "./app";
import DOM from "./DOM";

document.addEventListener("DOMContentLoaded", () => {
    app.init();
    DOM.renderProjects(app.getProjects());

    app.addProject("Test 05");
    DOM.renderProjects(app.getProjects());
});