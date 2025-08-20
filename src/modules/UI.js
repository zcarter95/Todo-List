import { ta } from "date-fns/locale";
import { addToDoItemToProject, addToDoProjectToList,  setCurrentProject} from "..";
import { format, parseISO } from "date-fns";
import editImage from "../images/edit_icon.svg"
export default class UI {
    static displayCurrentProject(project) {
        const heading = document.getElementById("current-project-heading");
        heading.textContent = project.title;
        console.log(project.title);
    }

    static getCurrentProject() {
        const projects = document.getElementsByClassName("project");
        Array.from(projects).forEach(project => {
            project.addEventListener("click", () => {
                setCurrentProject(project);
            })
        });
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
        const createButton = document.getElementById("create-project");
        const createProjectForm = document.getElementById("new-project");
        const modal = document.getElementById("new-project-modal");

        openButton.addEventListener("click", () => {
            modal.showModal();
            createProjectForm.reset();
        });
        closeButton.addEventListener("click", () => {
            modal.close();
        })
        createButton.addEventListener("click", () => {
            modal.close();
        })
    }
    static createTaskModal() {
        const openButton = document.getElementById("new-task-button");
        const closeButton = document.getElementById("close-new-task-button");
        const createButton = document.getElementById("submit-task");
        const createTaskForm = document.getElementById("new-task");
        const modal = document.getElementById("new-task-modal");

        openButton.addEventListener("click", () => {
            modal.showModal();
            createTaskForm.reset();
        });

        closeButton.addEventListener("click", () => {
            modal.close();
        });
        createButton.addEventListener("click", () => {
            modal.close();
        })
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
            taskItem.id = task.id;
            let titleArea = document.createElement("div");
            titleArea.classList.add("title-area");
            let h3 = document.createElement("h3");
            h3.textContent = task.title;
            titleArea.appendChild(h3);
            let infoArea = document.createElement('div');
            infoArea.classList.add("info-area");
            let date = document.createElement("p");
            let dateIso = parseISO(task.dueDate);
            let dateFormatted = format(dateIso, "EEEE, MMMM do, yyyy")
            date.textContent = dateFormatted;
            infoArea.appendChild(date);
            
            const descriptionArea = document.createElement("div");
            descriptionArea.classList.add("description-area");
            const description = document.createElement("p");
            description.textContent = task.description;
            descriptionArea.appendChild(description);
            descriptionArea.style.display = "none";
            let editButton = document.createElement("button");
            editButton.style.border = "none";
            editButton.style.background = "none";
            let editIcon = document.createElement("img");
            editIcon.src = editImage;
            editButton.appendChild(editIcon);
            editButton.addEventListener("click", () => {
                updateTaskModal();
            })
            infoArea.appendChild(editButton);
            titleArea.appendChild(infoArea);
            switch (task.priority) {
                case "1":
                    taskItem.style.backgroundColor = "#90EE90";
                    break;
                case "2":
                    taskItem.style.backgroundColor = "#FFFFC5";
                    break;
                case "3":
                    taskItem.style.backgroundColor = "#FFCCCB";
                    break;
            };
            taskItem.appendChild(titleArea);
            taskItem.appendChild(descriptionArea);
            tasksContainer.appendChild(taskItem);
            taskItem.addEventListener("click", (event) => {
                if (event.target.nodeName === "DIV") {
                    switch (descriptionArea.style.display) {
                        case ("none"):
                            descriptionArea.style.display = "block";
                            break;
                        case ("block"):
                            descriptionArea.style.display = "none";
                            break;
                    }
                }
            })
        }  
    }
}

function updateTaskModal() {
    const closeButton = document.getElementById("close-update-task-button");
    const createButton = document.getElementById("update-task-button");
    const createTaskForm = document.getElementById("update-task");
    const modal = document.getElementById("update-task-modal");

    modal.showModal();
    createTaskForm.reset();

    closeButton.addEventListener("click", () => {
        modal.close();
    });
    createButton.addEventListener("click", () => {
        modal.close();
    })
}