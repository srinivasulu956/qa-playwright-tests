import { expect } from '@playwright/test';

export class LoadsListPage {
    constructor(page) {
        this.page = page;
        this.grid = page.getByTestId('load-list-grid');
        this.rows = page.getByTestId(/^load-row-/);
        this.searchInput = page.getByLabel('Search loads');
        this.statusFilter = page.getByRole('combobox', { name: 'Status' });
        this.createLoadButton = page.getByRole('button', { name: 'Create load' });
    }

    async goto() {
        await this.page.goto('/loads');
        await this.waitForGrid();
    }

    async waitForGrid() {
        await expect(this.grid).toHaveAttribute('aria-busy', 'false');
    }

    row(loadId) {
        return this.page.getByTestId(`load-row-${loadId}`);
    }

    editButton(loadNumber) {
        return this.page.getByRole('button', { name: `Edit load ${loadNumber}` });
    }

    async search(text) {
        await this.searchInput.fill(text);
    }

    async filterByStatus(status) {
        await this.statusFilter.click();
        await this.page.getByRole('option', { name: status, exact: true }).click();
    }
}
