import './styles.css';

const projectMap = new Map();
let selectedProject = '';

class DOM {
    newProject(projectName) {
        const projectBar = document.querySelector('.project-bar');
        const newProject = document.createElement('div');
        newProject.textContent = projectName;
        newProject.classList.add('project');
        newProject.setAttribute('id', projectName);
        newProject.addEventListener('click', () => {
            selectedProject = projectName;
            this.showTasks();
        });
        projectBar.appendChild(newProject);
    }

    removeProject() {
        const taskBar = document.querySelector('.task-bar');
        const project = document.getElementById(selectedProject);
        delete projectMap[selectedProject];
        project.remove();
        taskBar.innerHTML = '';
        selectedProject = '';
    }

    showTasks() {
        const taskBar = document.querySelector('.task-bar');
        taskBar.innerHTML = '';
        const tasks = projectMap[selectedProject];
        for (let task of tasks) {
            const addTask = document.createElement('div');
            addTask.classList.add('to-do-bar');
            addTask.setAttribute('id', task[0]);
            const title = document.createElement('h2');
            const description = document.createElement('p');
            const priorityBtn = document.createElement('button');
            const checkedBtn = document.createElement('div');
            title.textContent = task[0];
            description.textContent = task[1];
            if (task[2] === 'High') {
                priorityBtn.textContent = 'High';
            } else if (task[2] === 'Medium') {
                priorityBtn.textContent = 'Medium';
            } else {
                priorityBtn.textContent = 'Low';
            }
            this.buttonColour(priorityBtn);
            if (task[3]) {
                checkedBtn.textContent = 'X';
            } else {
                checkedBtn.textContent = '';
            }
            addTask.appendChild(title);
            addTask.appendChild(description);
            addTask.appendChild(priorityBtn);
            addTask.appendChild(checkedBtn);
            taskBar.appendChild(addTask);
        }

        changeButtonColor();
    }

    buttonColour(priorityBtn) {
        if (priorityBtn.textContent === 'High') {
            priorityBtn.setAttribute('style', 'background-color: red');
        } else if (priorityBtn.textContent === 'Medium') {
            priorityBtn.setAttribute('style', 'background-color: orange');
        } else {
            priorityBtn.setAttribute('style', 'background-color: green');
        }
    }
}

const initializeProperties = (function () {
    const dom = new DOM();
    const projectCloseBtn = document.querySelector('.project-close-btn');
    const projectBar = document.getElementsByClassName('project-bar');
    const newProjectBtn = document.querySelector('.new-project');
    const deleteProjectBtn = document.querySelector('.delete-project');
    const addTaskBtn = document.querySelector('.add-task-btn');

    let projectBarOpen = true;

    const onclickProps = () => {
        projectCloseBtn.addEventListener('click', () => {
            projectBar[0].setAttribute(
                'style',
                projectBarOpen ? 'display: none' : 'display: block'
            );
            projectBarOpen ? (projectBarOpen = false) : (projectBarOpen = true);
        });
    };
    onclickProps();

    const createProject = () => {
        newProjectBtn.addEventListener('click', () => {
            const project = new Project();
            dom.newProject(project.name);
        });
    };
    createProject();

    const removeProject = () => {
        deleteProjectBtn.addEventListener('click', () => {
            if (selectedProject) {
                dom.removeProject();
                for (let arr of projectMap) {
                    if (arr[0] === selectedProject) {
                        projectMap.delete(selectedProject);
                    }
                }
            }
        });
    };
    removeProject();

    const addTask = () => {
        addTaskBtn.addEventListener('click', () => {
            const newTask = new Task();
            if (selectedProject) {
                projectMap[selectedProject].push([
                    newTask.title,
                    newTask.description,
                    newTask.priority,
                    newTask.completed,
                ]);
                dom.showTasks();
            }
        });
    };
    addTask();
})();

class Project {
    constructor() {
        this.name = prompt('Enter the project name:');
        this.#initializeMap();
    }

    #initializeMap() {
        projectMap[this.name] = [];
    }

    addTomap(taskTitle, taskObj) {
        projectMap.get(selectedProject)[taskTitle] = taskObj;
    }
}

class Task {
    constructor() {
        this.title = prompt('Enter the title of the task');
        this.description = prompt('Enter the description of the task');
        this.priority = 'Low';
        this.completed = false;
    }
}
