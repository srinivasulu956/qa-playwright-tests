import fs from 'node:fs';
import path from 'node:path';

export const QA_USER_STORAGE_FILE = '.auth/qa-user-storage.json';
export const QA_USER_SESSION_STORAGE_FILE = '.auth/qa-user-session-storage.json';

export async function saveSignedInSession(page) {
    fs.mkdirSync(path.dirname(QA_USER_STORAGE_FILE), { recursive: true });
    await page.context().storageState({ path: QA_USER_STORAGE_FILE });

    const sessionStorageEntries = await page.evaluate(() => ({ ...window.sessionStorage }));
    const origin = new URL(page.url()).origin;
    fs.writeFileSync(QA_USER_SESSION_STORAGE_FILE, JSON.stringify({ origin, entries: sessionStorageEntries }));
}

export function readSavedSessionStorage() {
    return JSON.parse(fs.readFileSync(QA_USER_SESSION_STORAGE_FILE, 'utf-8'));
}
