# QA Playwright Tests (sample)

Sample Playwright project for the TMS demo app. It shows how tests can find elements in the UI and how a test repo can be set up. You can use it as a reference or reuse any part of it.

| | Link |
|---|---|
| Demo app | https://demo-playwright-support.netlify.app |
| Demo app code | https://github.com/srinivasulu956/tms-demo-app |

## Run on your PC

```
npm install
npx playwright install chromium
```

Run against the deployed demo (PowerShell):

```
$env:BASE_URL = "https://demo-playwright-support.netlify.app"; npm test
Remove-Item Env:BASE_URL
```

If `BASE_URL` isn't set, Playwright builds and starts the app from a `tms-demo-app` folder next to this one, so clone both repos side by side if you want that.

| Command | What it does |
|---|---|
| `npm test` | Run all tests (headless) |
| `npm run test:headed` | Run with browser windows visible |
| `npx playwright test --headed --workers=1` | One visible browser, one test at a time |
| `npm run test:ui` | UI mode: pick tests and watch each step |
| `npx playwright test --debug` | Pause before every step |
| `npm run report` | Open the last HTML report |
| `npm run codegen` | Click around the app and Playwright writes the test code |

## Run on GitHub

1. Click **Fork** → **Create fork**.
2. In your fork, open the **Actions** tab and enable workflows.
3. Click **Playwright tests** → **Run workflow**, paste the demo URL into the URL box, then click **Run workflow**. Forks don't copy repository variables, so the box must not be empty.
4. When the run finishes, download **playwright-report** under **Artifacts**.

## How the project is organised

| Folder | Purpose |
|---|---|
| `tests/auth.setup.js` | Signs in once and saves the session to `.auth/` (git-ignored). Runs before the other tests. |
| `fixtures/signed-in.js` | Tests that import `test` from here start already signed in. It restores cookies, localStorage **and sessionStorage**. |
| `pages/` | Page objects. Every locator lives here, so a label change in the app means one fix in one file. |
| `test-data/` | The test user (overridable with `QA_USERNAME` / `QA_PASSWORD`) and known seed records. |
| `tests/*.spec.js` | The tests. Login tests use plain `@playwright/test` because they must start signed out. |

Why sessionStorage: the app keeps the login in sessionStorage, like MSAL with `cacheLocation: 'sessionStorage'`. Playwright's built-in `storageState` doesn't save sessionStorage, so the fixture saves and restores it separately.

## Locator rules

1. `getByRole`, then `getByLabel`, then `getByText`.
2. `getByTestId` only where there's no visible text. Format: lowercase with hyphens, e.g. `load-row-1001`.
3. Never CSS classes or element positions.
