export default class ToDoList {
    constructor () {
        this.id = crypto.randomUUID();
        this.projects = [];
    }
    addProject(project){
        this.projects.push(project);
        project.list = this;
    }
}