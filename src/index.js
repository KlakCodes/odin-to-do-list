import "./styles.css";
import app from "./app";
import DOM from "./DOM";

document.addEventListener("DOMContentLoaded", () => {
    app.init();
    DOM.renderUI();
    DOM.renderProjects(app.getProjects());
});