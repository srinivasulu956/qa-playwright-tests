import { test, expect } from '../fixtures/signed-in.js';
import { LoadsListPage } from '../pages/LoadsListPage.js';
import { seededLoad } from '../test-data/loads.js';

const CREATE_BUTTON_LOCATORS = {
    getByRole: (page) => page.getByRole('button', { name: 'Create load' }),
    getByText: (page) => page.getByText('Create load', { exact: true }),
    getByTitle: (page) => page.getByTitle('Create a new load'),
    getByTestId: (page) => page.getByTestId('loads-create'),
    'CSS id': (page) => page.locator('#loads-create'),
    'CSS class': (page) => page.locator('.loads-page__create'),
    'CSS attribute': (page) => page.locator('[data-testid="loads-create"]'),
    XPath: (page) => page.locator('xpath=//section[@id="loads-page"]//button[normalize-space()="Create load"]'),
};

const SEARCH_INPUT_LOCATORS = {
    getByLabel: (page) => page.getByLabel('Search loads'),
    getByPlaceholder: (page) => page.getByPlaceholder('Load #, customer or city'),
    getByTestId: (page) => page.getByTestId('loads-search'),
    'CSS id': (page) => page.locator('#loads-search'),
    XPath: (page) => page.locator('xpath=//input[@id="loads-search"]'),
};

test.describe('Locator styles', () => {
    test.beforeEach(async ({ page }) => {
        await new LoadsListPage(page).goto();
    });

    for (const [style, locate] of Object.entries(CREATE_BUTTON_LOCATORS)) {
        test(`finds the Create load button with ${style}`, async ({ page }) => {
            const button = locate(page);

            await expect(button).toHaveCount(1);
            await expect(button).toHaveAttribute('id', 'loads-create');
        });
    }

    for (const [style, locate] of Object.entries(SEARCH_INPUT_LOCATORS)) {
        test(`searches with the input found by ${style}`, async ({ page }) => {
            await locate(page).fill(seededLoad.loadNumber);

            await expect(page.getByTestId(/^load-row-/)).toHaveCount(1);
        });
    }

    test('finds the logo with getByAltText', async ({ page }) => {
        await expect(page.getByAltText('TMS Demo logo')).toBeVisible();
    });

    test('finds a row button by chaining and filtering', async ({ page }) => {
        const row = page.getByRole('row').filter({ hasText: seededLoad.loadNumber });
        await row.getByTitle(`Edit load ${seededLoad.loadNumber}`).click();

        await expect(page.getByRole('dialog', { name: `Edit load ${seededLoad.loadNumber}` })).toBeVisible();
    });

    test('opens the status list found by its test id and picks an option by role', async ({ page }) => {
        await page.getByTestId('loads-status-filter').click();
        await page.getByRole('option', { name: 'Delivered', exact: true }).click();

        await expect(page.getByTestId(/^load-row-/).first()).toContainText('Delivered');
    });
});
