export class AppShell {
    constructor(page) {
        this.page = page;
        this.sideNav = page.getByRole('navigation', { name: 'Main navigation' });
        this.toggleNavButton = page.getByRole('button', { name: 'Toggle navigation' });
        this.userName = page.getByTestId('header-user-name');
        this.signOutButton = page.getByRole('button', { name: 'Sign out' });
    }

    navLink(name) {
        return this.sideNav.getByRole('link', { name });
    }

    pageHeading(name) {
        return this.page.getByRole('heading', { name, exact: true });
    }

    async openFromSideNav(name) {
        await this.navLink(name).click();
    }
}
