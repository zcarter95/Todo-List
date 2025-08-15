import { addToDoItemToList } from "..";
import { format, parseISO } from "date-fns";
export default class UI {
    static getNewTaskData() {
        const submit = document.getElementById("new-task");
        submit.addEventListener("submit", (event) => {
            event.preventDefault();
            let formData = new FormData(submit);
            let item = {
                title: Object.fromEntries(formData).title,
                description: Object.fromEntries(formData).description,
                dueDate: Object.fromEntries(formData).dueDate,
                priority: Object.fromEntries(formData).priority
            }
            addToDoItemToList(item);
        });
    }
    static loadHomePage() {
        const openButton = document.querySelector("[data-open-modal]");
        const closeButton = document.querySelector("[data-close-modal]");
        const modal = document.querySelector("[data-modal]");
        

        openButton.addEventListener("click", () => {
        modal.showModal();
        });

        closeButton.addEventListener("click", () => {
        modal.close();
        });
    }
    static displayProjects(toDoList) {
        const projectsDom = document.getElementById("projects");
        for (const project of toDoList.projects) {
            let projectContainer = document.createElement("div");
            projectContainer.id = project.id;
            let projectTitle = document.createElement("h1");
            projectTitle.textContent = project.title;
            projectContainer.appendChild(projectTitle);
            projectsDom.appendChild(projectContainer);
        }
    }
    static displayTasks(task) {
        let projectContainer = document.getElementById(task.parentProject.id);

        let taskContainer = document.createElement("div");
        taskContainer.id = task.id;

        let taskTitle = document.createElement("h2");
        taskTitle.textContent = task.title;
        taskContainer.appendChild(taskTitle);

        let ul = document.createElement("ul");

        let taskDescription = document.createElement("li");
        taskDescription.textContent = task.description;
        ul.appendChild(taskDescription);

        let taskDueDate = document.createElement("li");
        let dateIso = parseISO(task.dueDate);
        taskDueDate.textContent = format(new Date(dateIso), 'MM/dd/yyyy');
        ul.appendChild(taskDueDate);

        let taskPriority = document.createElement("li");
        taskPriority.textContent = task.priority;
        ul.appendChild(taskPriority);

        taskContainer.appendChild(ul);
        projectContainer.appendChild(taskContainer);
    }
}
