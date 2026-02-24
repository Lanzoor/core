class Project {
    title: string;
    type: string;
    description: string;
    projectLink: string | undefined;
    infoLink: string | undefined;
    sourceLink: string | undefined;
    targetBlank: boolean;
    private lastModified: Date;

    constructor(title: string, type: string, description: string, projectLink?: string, infoLink?: string, sourceLink?: string, targetBlank: boolean = false, lastModified: Date = new Date()) {
        this.title = title;
        this.type = type;
        this.description = description;
        this.projectLink = projectLink;
        this.sourceLink = sourceLink;
        this.infoLink = infoLink;
        this.lastModified = lastModified;
        this.targetBlank = targetBlank;
    }

    formatDate(): string {
        return this.lastModified.toLocaleDateString('en-US', {
            // prettier, pls...
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    }
}

let projects = [
    //
    new Project('VSCode Tweaks', 'program', 'Custom VSCode tweaks and<br>overlays with a local server', 'https://github.com/Lanzoor/vscode-tweaks'),
];

let projectsGrid = document.getElementById('projects--grid')! as HTMLDivElement;

function updateProjects() {
    projectsGrid.innerHTML = ``;

    projects.forEach((project) => {
        let projectDiv = document.createElement('div');
        projectDiv.classList.add(project.type);

        let projectLinks: string[] = [];

        if (project.projectLink) {
            projectLinks.push(`<a href="${project.projectLink}" ${project.targetBlank ? "target='_blank'" : ''}>link</a>`);
        }

        if (project.infoLink) {
            projectLinks.push(`<a href="${project.infoLink}">info</a>`);
        }

        if (project.sourceLink) {
            projectLinks.push(`<a href="${project.sourceLink}" ${project.targetBlank ? "target='_blank'" : ''}>source code</a>`);
        }

        let combinedLinks: string = projectLinks.join(' | ');

        projectDiv.innerHTML = `
<h1>${project.title}</h1>
${combinedLinks}<br>
<b>${project.description}</b><br>
<span class="dim">Last updated ${project.formatDate()}</span>`;

        projectsGrid.appendChild(projectDiv);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    updateProjects();
});
