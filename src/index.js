import './styles.css';

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
    }

    clickProject() {
        const projects = document.querySelectorAll('.project');
        projects.forEach((project) => {
            if (project.textContent === selectedProjectTitle) {
                project.classList.add('clicked');
            }
        });
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
})();

addEventListeners;
