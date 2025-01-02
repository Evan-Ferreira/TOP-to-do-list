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

    clickTask() {
        const tasks = document.querySelectorAll('.task');
        tasks.forEach((task) => {
            if (task.querySelector('h2').textContent === selectedTask) {
                task.classList.add('clicked');
            }
        });
    }

    unclickTask() {
        const tasks = document.querySelectorAll('.task');
        tasks.forEach((task) => {
            task.classList.remove('clicked');
        });
    }

    addTask(task) {
        let projectTaskCont = document.querySelector('.project-tasks-selected');
        const taskCont = document.createElement('div');
        taskCont.addEventListener('click', () => {
            selectedTask = task.title;
            this.unclickTask();
            this.clickTask();
        });
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
        checkbox.classList.add('checkbox');
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
        checkbox.addEventListener('click', () => {
            checkbox.textContent
                ? ((checkbox.textContent = ''), (task.checked = false))
                : ((checkbox.textContent = 'X'), (task.checked = false));
        });
        priorityBtn.addEventListener('click', () => {
            priorityBtn.classList.remove('priority-low');
            priorityBtn.classList.remove('priority-medium');
            priorityBtn.classList.remove('priority-high');
            if (priorityBtn.textContent === 'Low') {
                priorityBtn.classList.add('priority-medium');
                priorityBtn.textContent = 'Medium';
            } else if (priorityBtn.textContent === 'Medium') {
                priorityBtn.classList.add('priority-high');
                priorityBtn.textContent = 'High';
            } else {
                priorityBtn.classList.add('priority-low');
                priorityBtn.textContent = 'Low';
            }
            task.changePriority(priorityBtn.textContent);
        });
    }

    removeTask() {
        const project = document.getElementById(selectedProjectTitle);
        Array.from(project.children).forEach((task) => {
            if (task.querySelector('h2').textContent === selectedTask) {
                task.remove();
            }
        });
    }
}

class Project {
    constructor(name) {
        this.name = name;
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
    constructor(title, description, date) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.priority = 'Low';
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
        const project = new Project(prompt('Enter project name'));
        projects.push(project);
        dom.addProject(project);
        localStorage['projects'] = JSON.stringify(projects);
    });

    deleteProjectBtn.addEventListener('click', () => {
        for (let i = 0; i < projects.length; i++) {
            if (projects[i].name === selectedProjectTitle) {
                projects.splice(i, 1);
                localStorage['projects'] = JSON.stringify(projects);
                break;
            }
        }
        dom.deleteProject();
    });

    addTaskBtn.addEventListener('click', () => {
        const title = prompt('Enter task title');
        const description = prompt('Enter task description');
        const task = new Task(
            title,
            description,
            format(new Date(), 'MM/dd/yyyy')
        );
        projects.forEach((project) => {
            if (project.name === selectedProjectTitle) {
                project.addTask(task);
                localStorage['projects'] = JSON.stringify(projects);
            }
        });
        dom.addTask(task);
    });

    deleteTaskBtn.addEventListener('click', () => {
        projects.forEach((project) => {
            project.tasks.forEach((task) => {
                if (task.title === selectedTask) {
                    project.removeTask(task);
                    dom.removeTask();
                    localStorage['projects'] = JSON.stringify(projects);
                }
            });
        });
    });

    let projectsStorage = localStorage['projects'];
    if (projectsStorage) {
        projectsStorage = JSON.parse(projectsStorage);
        for (let projectData of projectsStorage) {
            let project = new Project(projectData.name);
            project.tasks = projectData.tasks.map(
                (taskData) => new Task(taskData.title, taskData.description)
            );
            selectedProjectTitle = projectData.name;
            projects.push(project);
            dom.clickProject();
            dom.addProject(project);
            for (let task of project.tasks) {
                dom.addTask(task);
            }
            dom.unclickAllProjects();
        }
        selectedProjectTitle = '';
    }
})();

addEventListeners;
