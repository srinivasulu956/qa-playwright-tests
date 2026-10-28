export class LoadFormDialog {
    constructor(page, title) {
        this.page = page;
        this.dialog = page.getByRole('dialog', { name: title });
        this.customerSelect = this.dialog.getByRole('combobox', { name: 'Customer' });
        this.originInput = this.dialog.getByLabel('Origin');
        this.destinationInput = this.dialog.getByLabel('Destination');
        this.pickupDateInput = this.dialog.getByLabel('Pickup date');
        this.rateInput = this.dialog.getByLabel('Rate (USD)');
        this.saveButton = this.dialog.getByRole('button', { name: 'Save' });
    }

    errorMessage(text) {
        return this.dialog.getByText(text);
    }

    async fill({ customer, origin, destination, pickupDate, rate }) {
        await this.customerSelect.click();
        await this.page.getByRole('option', { name: customer, exact: true }).click();
        await this.originInput.fill(origin);
        await this.destinationInput.fill(destination);
        await this.pickupDateInput.fill(pickupDate);
        await this.rateInput.fill(rate);
    }

    async save() {
        await this.saveButton.click();
    }
}
