class ToDoItem {
    constructor (title, description, dueDate, priority, notes) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = new Date()
        this.priority = priority;
        this.notes = notes;
        this.parentProject = null;
    }
}

class ToDoProject {
    constructor (title) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.items = [];
    }

    addItem(item) {
        this.items.push(item);
        item.parentProject = this;
    }
}