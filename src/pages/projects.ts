type ProjectType = 'websites' | 'programs' | 'videos' | 'conlangs';

const projectTypes: ProjectType[] = ['websites', 'programs', 'videos', 'conlangs'];
let visibleProjectTypes: ProjectType[] = projectTypes;

const filterButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('.projects--filter-button'));
const projectDivs = Array.from(document.getElementsByClassName('projects--div'));

for (const filterButton of filterButtons) {
    filterButton.addEventListener('click', () => {
        for (const fb of filterButtons) {
            fb.classList.remove('selected');
        }

        filterButton.classList.add('selected');

        const filterClass = (['show-all', ...projectTypes] as string[]).find((t) => filterButton.classList.contains(t));

        if (filterClass) {
            if (filterClass == 'show-all') {
                visibleProjectTypes = [...projectTypes];
            } else {
                visibleProjectTypes = [filterClass as ProjectType];
            }
        }

        for (const projectDiv of projectDivs) {
            projectDiv.classList.remove('visible');
            const projectClass = ([...projectTypes] as ProjectType[]).find((t) => projectDiv.classList.contains(t));

            if (projectClass && visibleProjectTypes.includes(projectClass)) {
                projectDiv.classList.add('visible');
            }
        }
    });
}
