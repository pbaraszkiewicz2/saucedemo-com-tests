# saucedemo-com-tests

Repository contains test suites prepared in Cypress for online shop: saucedemo.com

**Requirements**

- Node v.20 installed.
- Chrome Browser Installed

**Installation**

1\. Clone repository to local machine

2\. Verify node version:

```
node -v
```

3\. You should have node v.20 set

4\. Install dependencies with npm

```
npm i
```

**Running tests**

There are two options to run tests:

1\. With preview, selecting specific test suite to test:

```
npm run cypress:open
```

In this mode you can select browser in which you want to execute your tests.

2\. In headless mode (chrome):

```
npm run cypress:headless:chrome
```

3\. In headless mode (electron):

```
npm run cypress:headless:electron
```

In headless mode tests are executed in the Chrome browser.

**Test reports**

If you run tests in headless mode, reports are generated for each test suite as html file at the end of the test. Reports are available in the folder:

```
saucedemo-com-tests/mochawesome-report/
```
