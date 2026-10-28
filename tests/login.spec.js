import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { AppShell } from '../pages/AppShell.js';
import { qaUser } from '../test-data/users.js';

test.describe('Login', () => {
    test('sends a signed-out user to the login page', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await page.goto('/loads');

        await expect(page).toHaveURL(/\/login$/);
        await expect(loginPage.heading).toBeVisible();
    });

    test('shows required messages when the form is empty', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.signInButton.click();

        await expect(page.getByText('Username is required')).toBeVisible();
        await expect(page.getByText('Password is required')).toBeVisible();
    });

    test('shows an error for a wrong password', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.signIn({ username: qaUser.username, password: 'wrong-password' });

        await expect(loginPage.errorAlert).toHaveText('Invalid username or password');
        await expect(page).toHaveURL(/\/login$/);
    });

    test('signs in and signs out', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const appShell = new AppShell(page);
        await loginPage.goto();
        await loginPage.signIn(qaUser);

        await expect(appShell.pageHeading('Dashboard')).toBeVisible();
        await expect(appShell.userName).toHaveText(qaUser.displayName);

        await appShell.signOutButton.click();
        await expect(page).toHaveURL(/\/login$/);
    });
});
