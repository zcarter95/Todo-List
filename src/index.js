import "./styles.css"
import ToDoItem from "./modules/Item";
import ToDoProject from "./modules/Project";
import ToDoList from "./modules/List";
import UI from "./modules/UI";

const toDoList = new ToDoList();
const defaultProject = new ToDoProject("Default");
toDoList.addProject(defaultProject);

document.addEventListener('DOMContentLoaded', ready);
function ready() {
    UI.createProjectModal();
    UI.createTaskModal();
    UI.displayProjects(defaultProject);
    UI.getNewProjectData();
    UI.getNewTaskData();
}

export function addToDoItemToProject(item) {
    let task = new ToDoItem(item.title, item.description, item.dueDate, item.priority);
    defaultProject.addItem(task);
    UI.displayTasks(task);
}

export function addToDoProjectToList(item) {
    let project = new ToDoProject(item.title);
    toDoList.addProject(project);
    UI.displayProjects(project);
}