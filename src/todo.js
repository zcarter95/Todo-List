import { format } from "date-fns";

export class ToDoItem {
    constructor (title, description, dueDate, priority) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.parentProject = null;
    }
}

export class ToDoProject {
    constructor (title) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.items = [ new ToDoItem("Example", "An example To-Do item", "8/22/2025", "2") ];
    }

    addItem(item) {
        this.items.push(item);
        item.parentProject = this;
    }
}

export class ToDoList {
    constructor () {
        this.id = crypto.randomUUID();
        this.projects = [new ToDoProject("Default Project")];
    }
}