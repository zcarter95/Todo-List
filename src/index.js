import "./styles.css"
import { addToDo, getToDos, ToDoList } from "./todo"

const toDoList = new ToDoList();
const openButton = document.querySelector("[data-open-modal]");
const closeButton = document.querySelector("[data-close-modal]");
const modal = document.querySelector("[data-modal]");
const submit = document.getElementById("new-task");

openButton.addEventListener("click", () => {
    modal.showModal();
})

closeButton.addEventListener("click", () => {
    modal.close();
})

submit.addEventListener("submit", (event) => {
    event.preventDefault();
    let formData = new FormData(submit);
    console.log(formData);
})
