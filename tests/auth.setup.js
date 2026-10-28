import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { AppShell } from '../pages/AppShell.js';
import { saveSignedInSession } from '../helpers/session.js';
import { qaUser } from '../test-data/users.js';

setup('sign in once as the QA user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.signIn(qaUser);

    await expect(new AppShell(page).pageHeading('Dashboard')).toBeVisible();
    await saveSignedInSession(page);
});
