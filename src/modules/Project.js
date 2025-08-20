export default class ToDoProject {
    constructor (title) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.items = [];
        this.list = null;
    }

    addItem(item) {
        this.items.push(item);
        item.parentProject = this;
    }
    removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
    }
}