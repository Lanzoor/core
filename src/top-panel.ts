document.documentElement.setAttribute('data-theme', 'dark'); // remove later

const topPanel = document.createElement('div');
topPanel.id = 'top-panel';

const topPanelLinks = document.createElement('nav');
topPanelLinks.id = 'top-panel--links';

const topPanelLeft = document.createElement('div');
topPanelLeft.id = 'top-panel--left';

const topPanelLeftLink = document.createElement('a');
topPanelLeftLink.textContent = 'lanzoor.dev';
topPanelLeftLink.href = '/';
topPanelLeftLink.classList.add('plain');

const topPanelRight = document.createElement('div');
topPanelRight.id = 'top-panel--right';

const topPanelRightIcon = document.createElement('img');
topPanelRightIcon.src = '/assets/icons/hamburger.svg';
topPanelRightIcon.alt = '☰';
topPanelRightIcon.classList.add('navigation-toggle');

const topPanelRightSettingsIcon = document.createElement('img');
topPanelRightSettingsIcon.src = '/assets/icons/settings.svg';
topPanelRightSettingsIcon.alt = '⚙';

const navigationOverlay = document.createElement('div');
navigationOverlay.id = 'navigation-overlay';

const navigationPanel = document.createElement('div');
navigationPanel.id = 'navigation-panel';

const navigationClose = document.createElement('div');
navigationClose.id = 'navigation--close';
navigationClose.classList.add('navigation-toggle');

const navigationCloseText = document.createElement('p');
navigationCloseText.textContent = 'Close';

const navigationCloseIcon = document.createElement('img');
navigationCloseIcon.src = '/assets/icons/close.svg';
navigationCloseIcon.alt = '☰';

const navigationPanelNav = document.createElement('nav');
const navigationPanelList = document.createElement('ul');

class Destination {
    private link: string;
    private name: string;
    private childElements?: Destination[];

    constructor(link: string, name: string, childElements?: Destination[]) {
        this.link = link;
        this.name = name;
        this.childElements = childElements;
    }

    appendTo(parent: HTMLElement) {
        const textEl = document.createElement('div');
        const linkEl = document.createElement('a');

        if (!this.childElements) {
            linkEl.href = this.link;
            if (!this.link.startsWith('/')) {
                linkEl.target = '_blank';
            }
        } else {
            linkEl.classList.add('disabled');
        }

        linkEl.textContent = this.name;

        if (parent instanceof HTMLUListElement) {
            const listItemEl = document.createElement('li');
            parent.appendChild(listItemEl);

            textEl.appendChild(linkEl);
            listItemEl.appendChild(textEl);

            if (this.childElements) {
                const arrowEl = document.createElement('img');
                arrowEl.src = '/assets/icons/caret-down.svg';
                arrowEl.alt = '▼';
                arrowEl.classList.add('chevron');
                arrowEl.setAttribute('aria-expanded', 'false');

                textEl.appendChild(arrowEl);

                textEl.addEventListener('click', () => {
                    const expanded = arrowEl.getAttribute('aria-expanded') === 'true';

                    const allDropdowns = parent.querySelectorAll('ul.dropdown');
                    allDropdowns.forEach((dropdown) => dropdown.classList.remove('open'));

                    const allArrows = parent.querySelectorAll('img.chevron');
                    allArrows.forEach((arrow) => {
                        arrow.setAttribute('aria-expanded', 'false');
                        arrow.classList.remove('open');
                    });

                    const childList = listItemEl.nextElementSibling as HTMLUListElement | null;

                    if (childList && childList.classList.contains('dropdown')) {
                        arrowEl.setAttribute('aria-expanded', String(!expanded));
                        childList.classList.toggle('open', !expanded);
                        arrowEl.classList.toggle('open', !expanded);
                    }
                });

                const childListEl = document.createElement('ul');
                childListEl.classList.add('dropdown');

                for (const child of this.childElements) {
                    child.appendTo(childListEl);
                }

                parent.appendChild(childListEl);
            }
        } else if (parent instanceof HTMLElement) {
            parent.appendChild(linkEl);
            linkEl.href = this.link;

            if (this.childElements) {
                const childDivEl = document.createElement('div');
                childDivEl.classList.add('inline-dropdown');

                for (const child of this.childElements) {
                    child.appendTo(childDivEl);
                }

                parent.appendChild(childDivEl);
            }
        }
    }
}

let destinations = [
    //
    new Destination('/', 'Welcome!'),
    new Destination('/projects', 'Projects', [
        //
        new Destination('/projects', 'Project Portal'),
        new Destination('https://www.youtube.com/@lanzoorgaming', 'Videos'),
        new Destination('/projects/conlangs', 'Conlangs'),
    ]),
    new Destination('/docs', 'Documents', [
        //
        new Destination('/docs', 'Document Portal'),
        new Destination('/docs/announcements', 'Announcements'),
        new Destination('/api/docs', 'API Docs'),
    ]),
    new Destination('/credits', 'Credits', [
        //
        new Destination('/credits', 'Credits'),
        new Destination('/credits/fonts', 'Font Credits'),
        new Destination('/credits/icons', 'Icon Credits'),
    ]),
    new Destination('/troubleshooting', 'Troubleshooting'),
];

document.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(topPanel);

    topPanel.appendChild(topPanelLinks);

    for (let destination of destinations) {
        destination.appendTo(topPanelLinks);
    }

    topPanelLeft.appendChild(topPanelLeftLink);

    topPanelRight.appendChild(topPanelRightSettingsIcon);
    topPanelRight.appendChild(topPanelRightIcon);

    topPanel.appendChild(topPanelLeft);
    topPanel.appendChild(topPanelRight);

    topPanelLeft.addEventListener('click', () => {
        window.location.href = '/';
    });

    document.body.appendChild(navigationOverlay);

    navigationOverlay.appendChild(navigationPanel);

    navigationClose.appendChild(navigationCloseText);
    navigationClose.appendChild(navigationCloseIcon);
    navigationPanel.appendChild(navigationClose);

    navigationPanelNav.appendChild(navigationPanelList);
    for (let destination of destinations) {
        destination.appendTo(navigationPanelList);
    }

    navigationPanel.appendChild(navigationPanelNav);

    Array.from(document.getElementsByClassName('navigation-toggle')).forEach((button) => {
        button.addEventListener('click', () => {
            navigationOverlay.classList.toggle('active');
        });
    });
});
