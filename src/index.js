import './styles.css';

const initializeProperties = (function () {
    const projectCloseBtn = document.querySelector('.project-close-btn');
    const project = document.querySelector('.project');
    let projectBarOpen = true;
    const onclickProps = () => {
        projectCloseBtn.addEventListener('click', () => {
            const projectBar = document.getElementsByClassName('project-bar');
            projectBar[0].setAttribute(
                'style',
                projectBarOpen ? 'display: none' : 'display: block'
            );
            projectBarOpen ? (projectBarOpen = false) : (projectBarOpen = true);
        });
    };
    onclickProps();
})();

class DOM {
    constructor() {
        this.projectCloseBtn = document.querySelector('.project-close-btn');
        this.element = document.querySelector(selector);
    }

    on(eventType, callback) {
        this.element.addEventListener(eventType, callback);
    }
}
