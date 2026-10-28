import { test as base } from '@playwright/test';
import { QA_USER_STORAGE_FILE, readSavedSessionStorage } from '../helpers/session.js';

export const test = base.extend({
    storageState: QA_USER_STORAGE_FILE,
    context: async ({ context }, use) => {
        const { origin, entries } = readSavedSessionStorage();
        await context.addInitScript(
            ({ savedOrigin, savedEntries }) => {
                if (window.location.origin !== savedOrigin) {
                    return;
                }
                Object.entries(savedEntries).forEach(([key, value]) => window.sessionStorage.setItem(key, value));
            },
            { savedOrigin: origin, savedEntries: entries },
        );
        await use(context);
    },
});

export { expect } from '@playwright/test';
