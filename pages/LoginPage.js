export class LoginPage {
    constructor(page) {
        this.page = page;
        this.heading = page.getByRole('heading', { name: 'Sign in to TMS Demo' });
        this.usernameInput = page.getByLabel('Username');
        this.passwordInput = page.getByLabel('Password');
        this.signInButton = page.getByRole('button', { name: 'Sign in' });
        this.errorAlert = page.getByRole('alert');
    }

    async goto() {
        await this.page.goto('/login');
    }

    async signIn({ username, password }) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.signInButton.click();
    }
}
