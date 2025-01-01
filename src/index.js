import './styles.css';
import { format } from 'date-fns';

let projectBarOpen = true;
let selectedProjectTitle = '';
let selectedTask = '';
let projects = [];

class DOM {
    constructor() {
        this.projectBar = document.querySelector('.project-bar');
    }

    showProjectBar() {
        this.projectBar.style.display = 'block';
    }

    hideProjectBar() {
        this.projectBar.style.display = 'none';
    }

    addProject(project) {
        const projectBar = document.querySelector('.project-bar');
        const projectCont = document.createElement('div');
        const header = document.createElement('h2');
        projectCont.classList.add('project');
        header.textContent = project.name;
        projectBar.appendChild(projectCont);
        projectCont.appendChild(header);
        projectCont.addEventListener('click', () => {
            if (selectedProjectTitle === project.name) {
                this.unclickAllProjects();
                selectedProjectTitle = '';
            } else {
                selectedProjectTitle = project.name;
                this.unclickAllProjects();
                this.clickProject();
            }
        });
    }

    deleteProject() {
        const array = document.querySelectorAll('.project');
        array.forEach((project) => {
            const h2 = project.querySelector('h2');
            if (h2.textContent === selectedProjectTitle) {
                project.remove();
            }
        });
    }

    unclickAllProjects() {
        const projects = document.querySelectorAll('.project');
        projects.forEach((project) => {
            project.classList.remove('clicked');
        });
        const projectTasks = document.querySelectorAll('.project-tasks');
        projectTasks.forEach((projectTask) => {
            projectTask.classList.remove('project-tasks-selected');
        });
    }

    clickProject() {
        const projects = document.querySelectorAll('.project');
        projects.forEach((project) => {
            if (project.textContent === selectedProjectTitle) {
                project.classList.add('clicked');
            }
        });
        let projectTasks = document.querySelector(`#${selectedProjectTitle}`);
        if (!projectTasks) {
            const taskSection = document.querySelector('.task-section');
            const taskCont = document.createElement('div');
            taskCont.id = selectedProjectTitle;
            taskCont.classList.add('project-tasks');
            taskCont.setAttribute('id', selectedProjectTitle);
            taskSection.appendChild(taskCont);
            projectTasks = document.querySelector(`#${selectedProjectTitle}`);
        }
        projectTasks.classList.add('project-tasks-selected');
    }

    addTask(task) {
        const projectTaskCont = document.querySelector(
            '.project-tasks-selected'
        );
        const taskCont = document.createElement('div');
        const title = document.createElement('h2');
        const description = document.createElement('p');
        const date = document.createElement('p');
        const priorityBtn = document.createElement('button');
        const checkbox = document.createElement('div');
        taskCont.classList.add('task');
        description.classList.add('description');
        date.classList.add('due-date');
        priorityBtn.classList.add('btn');
        priorityBtn.classList.add('priority-low');
        title.textContent = task.title;
        description.textContent = task.description;
        date.textContent = task.date;
        priorityBtn.textContent = task.priority;
        projectTaskCont.appendChild(taskCont);
        taskCont.appendChild(title);
        taskCont.appendChild(description);
        taskCont.appendChild(date);
        taskCont.appendChild(priorityBtn);
        taskCont.appendChild(checkbox);
        console.log(taskCont);
    }
}

class Project {
    constructor() {
        this.name = prompt('Enter project name');
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    removeTask(task) {
        this.tasks = this.tasks.filter((t) => t !== task);
    }
}

class Task {
    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.date = format(new Date(), 'MM/dd/yyyy');
        this.priority = 'low';
        this.checked = false;
    }

    changePriority(priority) {
        this.priority = priority;
    }
}

const addEventListeners = (function () {
    const dom = new DOM();
    const toggleProjectBtn = document.querySelector('.toggle-project-btn');
    const addProjectBtn = document.querySelector('.add-btn.project-btn');
    const deleteProjectBtn = document.querySelector('.delete-btn.project-btn');
    const addTaskBtn = document.querySelector('.add-btn.task-btn');
    const deleteTaskBtn = document.querySelector('.delete-btn.task-btn');
    const checkbox = document.querySelector('.checkbox');

    toggleProjectBtn.addEventListener('click', () => {
        if (projectBarOpen) {
            dom.hideProjectBar();
            projectBarOpen = false;
        } else {
            dom.showProjectBar();
            projectBarOpen = true;
        }
    });

    addProjectBtn.addEventListener('click', () => {
        const project = new Project();
        projects.push(project);
        dom.addProject(project);
    });

    deleteProjectBtn.addEventListener('click', () => {
        for (let i = 0; i < projects.length; i++) {
            if (projects[i].name === selectedProjectTitle) {
                projects.splice(i, 1);
                break;
            }
        }
        dom.deleteProject();
    });

    checkbox.addEventListener('click', () => {
        checkbox.textContent
            ? (checkbox.textContent = '')
            : (checkbox.textContent = 'X');
    });

    addTaskBtn.addEventListener('click', () => {
        const title = prompt('Enter task title');
        const description = prompt('Enter task description');
        const task = new Task(title, description);
        projects.forEach((project) => {
            if (project.name === selectedProjectTitle) {
                project.addTask(task);
            }
        });
        dom.addTask(task);
    });
})();

addEventListeners;
