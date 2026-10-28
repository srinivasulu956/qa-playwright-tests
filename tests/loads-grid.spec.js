import { test, expect } from '../fixtures/signed-in.js';
import { LoadsListPage } from '../pages/LoadsListPage.js';
import { LoadFormDialog } from '../pages/LoadFormDialog.js';
import { LOADS_PAGE_SIZE, NEXT_LOAD, newLoad, seededLoad } from '../test-data/loads.js';

test.describe('Loads grid', () => {
    let loadsPage;

    test.beforeEach(async ({ page }) => {
        loadsPage = new LoadsListPage(page);
        await loadsPage.goto();
    });

    test('shows the first page of loads', async () => {
        await expect(loadsPage.rows).toHaveCount(LOADS_PAGE_SIZE);
        await expect(loadsPage.row(1001)).toContainText('LD-1001');
    });

    test('filters by search text', async () => {
        await loadsPage.search('LD-1005');

        await expect(loadsPage.rows).toHaveCount(1);
        await expect(loadsPage.row(1005)).toBeVisible();
    });

    test('filters by status', async () => {
        await loadsPage.filterByStatus('Delivered');

        await expect(loadsPage.rows.first()).toContainText('Delivered');
        for (const row of await loadsPage.rows.all()) {
            await expect(row).toContainText('Delivered');
        }
    });

    test('checks required fields, then creates a load', async ({ page }) => {
        await loadsPage.createLoadButton.click();
        const dialog = new LoadFormDialog(page, 'Create load');
        await dialog.save();

        await expect(dialog.errorMessage('Customer is required')).toBeVisible();
        await expect(dialog.errorMessage('Origin is required')).toBeVisible();

        await dialog.fill(newLoad);
        await dialog.save();

        await expect(page.getByText(`Load ${NEXT_LOAD.loadNumber} saved`)).toBeVisible();
        await expect(dialog.dialog).toBeHidden();

        await loadsPage.search(NEXT_LOAD.loadNumber);
        await expect(loadsPage.row(NEXT_LOAD.id)).toContainText(newLoad.customer);
    });

    test('opens a load for editing from its row button', async ({ page }) => {
        await loadsPage.editButton(seededLoad.loadNumber).click();

        const dialog = new LoadFormDialog(page, `Edit load ${seededLoad.loadNumber}`);
        await expect(dialog.originInput).toHaveValue(seededLoad.origin);
    });
});
