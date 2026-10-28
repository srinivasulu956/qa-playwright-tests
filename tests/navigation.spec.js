import { test, expect } from '../fixtures/signed-in.js';
import { AppShell } from '../pages/AppShell.js';

test.describe('Side navigation', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/dashboard');
    });

    test('opens each page from the side nav', async ({ page }) => {
        const appShell = new AppShell(page);

        await appShell.openFromSideNav('Loads');
        await expect(page).toHaveURL(/\/loads$/);
        await expect(appShell.pageHeading('Loads')).toBeVisible();
        await expect(appShell.navLink('Loads')).toHaveAttribute('aria-current', 'page');

        await appShell.openFromSideNav('Carriers');
        await expect(appShell.pageHeading('Carriers')).toBeVisible();
        await expect(page.getByTestId('carrier-row-MC-100231')).toContainText('Lone Star Freight');
    });

    test('hides and shows the side nav from the header', async ({ page }) => {
        const appShell = new AppShell(page);

        await appShell.toggleNavButton.click();
        await expect(appShell.sideNav).toBeHidden();

        await appShell.toggleNavButton.click();
        await expect(appShell.sideNav).toBeVisible();
    });

    test('shows the load counts on the dashboard', async ({ page }) => {
        await expect(page.getByTestId('dashboard-card-booked')).toContainText('11');
        await expect(page.getByTestId('dashboard-card-in-transit')).toContainText('11');
    });
});
