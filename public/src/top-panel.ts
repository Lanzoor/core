const topPanel = document.createElement('div');
topPanel.id = 'top-panel';

const topPanelNav = document.createElement('nav');
topPanelNav.id = 'top-panel-navigation';

const panelLogo = document.createElement('div');
panelLogo.id = 'panel-logo';

const panelLogoText = document.createElement('p');
panelLogoText.textContent = 'lanzoor.dev';

const openNavigation = document.createElement('div');
openNavigation.id = 'open-navigation';
openNavigation.classList.add('navigation-toggle');

const openNavigationText = document.createElement('p');
openNavigationText.textContent = 'Navigation';

const openNavigationIcon = document.createElement('img');
openNavigationIcon.src = '/assets/icons/hamburger.svg';
openNavigationIcon.alt = '☰';

const navigationOverlay = document.createElement('div');
navigationOverlay.id = 'navigation-overlay';

const navigationPanel = document.createElement('div');
navigationPanel.id = 'navigation-panel';

const closeNavigation = document.createElement('div');
closeNavigation.id = 'close-navigation';
closeNavigation.classList.add('navigation-toggle');

const closeNavigationText = document.createElement('p');
closeNavigationText.textContent = 'Close';

const closeNavigationIcon = document.createElement('img');
closeNavigationIcon.src = '/assets/icons/close.svg';
closeNavigationIcon.alt = '☰';

const navigationPanelNav = document.createElement('nav');
const navigationPanelList = document.createElement('ul');

class NavigationDestination {
    private link: string;
    private name: string;
    private childElements?: NavigationDestination[];

    constructor(link: string, name: string, childElements?: NavigationDestination[]) {
        this.link = link;
        this.name = name;
        this.childElements = childElements;
    }

    appendTo(parent: HTMLElement) {
        const linkEl = document.createElement('a');
        linkEl.href = this.link;
        linkEl.textContent = this.name;

        if (parent instanceof HTMLUListElement) {
            const listItemEl = document.createElement('li');
            listItemEl.appendChild(linkEl);
            parent.appendChild(listItemEl);

            if (this.childElements) {
                this.createArrow(listItemEl);

                const childListEl = document.createElement('ul');
                childListEl.classList.add('dropdown');

                for (const child of this.childElements) {
                    child.appendTo(childListEl);
                }

                listItemEl.appendChild(childListEl);
            }
        } else if (parent instanceof HTMLElement) {
            parent.appendChild(linkEl);

            if (this.childElements) {
                this.createArrow(parent);

                const childDivEl = document.createElement('div');
                childDivEl.classList.add('inline-dropdown');

                for (const child of this.childElements) {
                    child.appendTo(childDivEl);
                }

                parent.appendChild(childDivEl);
            }
        }
    }

    private createArrow(container: HTMLElement) {
        const arrowEl = document.createElement('img');
        arrowEl.src = '/assets/icons/caret-down.svg';
        arrowEl.alt = '▼';
        arrowEl.classList.add('chevron');
        arrowEl.setAttribute('aria-expanded', 'false');

        arrowEl.addEventListener('click', () => {
            const expanded = arrowEl.getAttribute('aria-expanded') === 'true';
            arrowEl.setAttribute('aria-expanded', String(!expanded));
            const childList = container.querySelector('ul.dropdown');
            childList?.classList.toggle('open');
            arrowEl.classList.toggle('open');
        });

        container.appendChild(arrowEl);
    }
}

let destinations = [
    //
    new NavigationDestination('/', 'Welcome!'),
    new NavigationDestination('/profile', 'Profile'),
    new NavigationDestination('/projects', 'Projects'),
    new NavigationDestination('/docs', 'Documents', [new NavigationDestination('/docs/announcements', 'Announcements')]),
    new NavigationDestination('/credits', 'Credits'),
    new NavigationDestination('/troubleshooting', 'Troubleshooting'),
];

document.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(topPanel);

    topPanel.appendChild(topPanelNav);

    for (let destination of destinations) {
        destination.appendTo(topPanelNav);
    }

    panelLogo.appendChild(panelLogoText);

    openNavigation.appendChild(openNavigationText);
    openNavigation.appendChild(openNavigationIcon);

    topPanel.appendChild(panelLogo);
    topPanel.appendChild(openNavigation);

    panelLogo.addEventListener('click', () => {
        window.location.href = '/';
    });

    document.body.appendChild(navigationOverlay);

    navigationOverlay.appendChild(navigationPanel);

    closeNavigation.appendChild(closeNavigationText);
    closeNavigation.appendChild(closeNavigationIcon);
    navigationPanel.appendChild(closeNavigation);

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
