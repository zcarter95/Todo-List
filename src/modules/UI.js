import { addToDoItemToProject, addToDoProjectToList } from "..";
import { format, parseISO } from "date-fns";
export default class UI {
    static displayCurrentProject(project) {
        const tasks_view = document.getElementById("current_project");
        const heading = document.getElementById("current-project-heading");
        heading.textContent = project.title;
    }

    static getNewProjectData() {
        const submit = document.getElementById("new-project");
        submit.addEventListener("submit", (event) => {
            event.preventDefault();
            let formData = new FormData(submit);
            let project = {
                title: Object.fromEntries(formData).title
            }
            addToDoProjectToList(project);
        })
    }
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
            addToDoItemToProject(item);
        });
    }
    static createProjectModal() {
        const openButton = document.getElementById("new-project-button");
        const closeButton = document.getElementById("close-new-project-button");
        const modal = document.getElementById("new-project-modal");

        openButton.addEventListener("click", () => {
            modal.showModal();
        });
        closeButton.addEventListener("click", () => {
            modal.close();
        })
    }
    static createTaskModal() {
        const openButton = document.getElementById("new-task-button");
        const closeButton = document.getElementById("close-new-task-button");
        const modal = document.getElementById("new-task-modal");

        openButton.addEventListener("click", () => {
            modal.showModal();
        });

        closeButton.addEventListener("click", () => {
            modal.close();
        });
    }
    static displayProjects(project) {
        const projectsDom = document.getElementById("projects");
        let projectContainer = document.createElement("div");
        projectContainer.id = project.id;
        projectContainer.classList.add("project");
        let projectTitle = document.createElement("h2");
        projectTitle.textContent = project.title;
        projectContainer.appendChild(projectTitle);
        projectsDom.appendChild(projectContainer);
        
    }
    static displayTasks(project) {
        const tasksContainer = document.getElementById("tasks-container");
        tasksContainer.innerHTML = '';
        for (const task of Array.from(project.items)) {
            console.log(task);
            let taskItem = document.createElement("div");
            taskItem.classList.add("task");
            let h3 = document.createElement("h3");
            h3.textContent = task.title;
            switch (task.priority) {
                case 1:
                    taskItem.style.backgroundColor = "lightgreen";
                case 2:
                    taskItem.style.backgroundClip = "lightyellow";
                case 3:
                    taskItem.style.backgroundColor = "lightred";
            };
            taskItem.appendChild(h3);
            tasksContainer.appendChild(taskItem);
        }  
    }
}
