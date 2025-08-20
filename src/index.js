import "./styles.css"
import ToDoItem from "./modules/Item";
import ToDoProject from "./modules/Project";
import ToDoList from "./modules/List";
import UI from "./modules/UI";

const toDoList = new ToDoList();
const defaultProject = new ToDoProject("Default");
toDoList.addProject(defaultProject);
let currentProject = defaultProject;
UI.currentProject = defaultProject;
let currentTaskId = ""

document.addEventListener('DOMContentLoaded', ready);
function ready() {
    UI.createProjectModal();
    UI.createTaskModal();
    UI.displayProjects(defaultProject);
    UI.getNewProjectData();
    UI.getTaskData("new-task");
    UI.getTaskData("update-task");
    UI.displayCurrentProject(currentProject);
    UI.getCurrentProject();
}

export function addToDoItemToProject(item) {
    let task = new ToDoItem(item.title, item.description, item.dueDate, item.priority);
    currentProject.addItem(task);
    UI.displayTasks(currentProject);
}

export function updateTask(item) {
    let currentTask = currentProject.items.find(task => task.id === currentTaskId);
    currentTask.title = item.title;
    currentTask.description = item.description;
    currentTask.dueDate = item.dueDate;
    currentTask.priority = item.priority;
    UI.displayTasks(currentProject);
}

export function addToDoProjectToList(item) {
    let project = new ToDoProject(item.title);
    toDoList.addProject(project);
    UI.displayProjects(project);
    UI.getCurrentProject();
}

export function setCurrentProject(project) {
    const projectId = project.id;
    const selectedProject = toDoList.projects.find(p => p.id === projectId);
    currentProject = selectedProject;
    UI.currentProject = currentProject;
    UI.displayCurrentProject(currentProject);
    UI.displayTasks(currentProject);
}

export function currentUpdateTask(taskId) {
    currentTaskId = taskId
}

export function removeTaskFromProject(taskId) {
    currentProject.removeItem(taskId);
    UI.displayTasks(currentProject);
    if (currentProject.items.length === 0) {
        UI.displayCurrentProject(currentProject);
    }
}