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
        });
        projectBar.appendChild(newProject);
    }

    removeProject() {
        const project = document.getElementById(selectedProject);
        project.remove();
    }
}

const initializeProperties = (function () {
    const dom = new DOM();
    const projectCloseBtn = document.querySelector('.project-close-btn');
    const projectBar = document.getElementsByClassName('project-bar');
    const newProjectBtn = document.querySelector('.new-project');
    const deleteProjectBtn = document.querySelector('.delete-project');
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
            console.log('penis');
            const project = new Project();
            projectMap.set(project.name, {});
            dom.newProject(project.name);
        });
    };
    createProject();

    const removeProject = () => {
        deleteProjectBtn.addEventListener('click', () => {
            if (selectedProject) {
                dom.removeProject();
            }
        });
    };
    removeProject();
})();

class Project {
    constructor() {
        this.name = prompt('Enter the project name:');
    }
}
