const topPanel = document.createElement('div');
topPanel.id = 'top-panel';

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
    private listItemEl: HTMLLIElement;
    private linkEl: HTMLAnchorElement;

    private arrowEl: HTMLImageElement | undefined;
    private childElements: NavigationDestination[] | undefined;

    constructor(link: string, name: string, childElements?: NavigationDestination[]) {
        this.listItemEl = document.createElement('li');

        this.linkEl = document.createElement('a');
        this.linkEl.href = link;
        this.linkEl.textContent = name;

        if (childElements) {
            this.arrowEl = document.createElement('img');
            this.arrowEl.src = '/assets/icons/caret-down.svg';
            this.arrowEl.alt = '▼';
            this.arrowEl.classList.add('chevron');

            this.childElements = childElements;
        }
    }

    appendTo(parentUListEl: HTMLUListElement) {
        this.listItemEl.appendChild(this.linkEl);

        parentUListEl.appendChild(this.listItemEl);

        if (this.arrowEl && this.childElements) {
            this.listItemEl.appendChild(this.arrowEl);

            const childListEl = document.createElement('ul');
            childListEl.classList.add('dropdown');

            for (const childElement of this.childElements) {
                childElement.appendTo(childListEl);
            }

            this.arrowEl.setAttribute('aria-expanded', 'false');
            this.arrowEl.addEventListener('click', () => {
                const expanded = this.arrowEl?.getAttribute('aria-expanded') === 'true';
                this.arrowEl?.setAttribute('aria-expanded', String(!expanded));
                childListEl.classList.toggle('open');
                this.arrowEl?.classList.toggle('open');
            });

            parentUListEl.appendChild(childListEl);
        }
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
