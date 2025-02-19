// import "./styles.css";
// import { Project } from "./project";
// import { Task } from "./task";

// const projects = [];

// const home = new Project("Home");
// const recipes = new Project("Recipes");

// projects.push(home, recipes);

// const tidy = new Task("Tidy", "Test", "2025-02-20", "Medium");
// const clean = new Task("Clean", "Test", "2025-02-22", "Low");
// const cake = new Task("Cake", "Test", "2025-02-19", "High");
// const pasta = new Task("Pasta", "Test", "2025-02-25", "Medium");
// const pizza = new Task("Pizza", "Test", "2025-02-28", "Low");

// home.addTask(tidy);
// home.addTask(clean);
// recipes.addTask(cake);
// recipes.addTask(pasta);
// recipes.addTask(pizza);

// pasta.toggleCompleted();

// console.table(projects);
// console.table(home.tasks);
// console.table(recipes.tasks);

import app from "./app";

document.addEventListener("DOMContentLoaded", () => {
    app.init();
    // DOM.renderProjects(app.getProjects());
  });