import { test, expect, chromium, Page, BrowserContext, Browser } from "@playwright/test"
let page:Page;
let context:BrowserContext;
let browser:Browser;
const capabilities = {
    'browserName': 'pw-chromium',// Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    'browserVersion': 'latest',
    'LT:Options': {
        'platform': 'Windows 10',
        'build': 'AssessmentLambda',
        'name': 'LambdaTest',
        'user': 'lavanya.qa.blues',
        'accessKey': 'QW4lTcmpTsH0YEULwKb3pFIfTHldOBxUoNl6VbMhVcCc1cbNfx',
        'network': true,
        'video': true,
        'console': true
    }
}
test("Scenario1", async () => {
    const browser = await chromium.connect({
        wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
    });
    test.slow();
    const page = await browser.newPage();
    await page.goto("https://www.lambdatest.com/selenium-playground");
    await page.getByText('Simple Form Demo').click();
    await expect(page).toHaveURL(/simple-form-demo/);
    const name = "Welcome to LambdaTest";
    await page.locator('#user-message').nth(0).fill(name);
    await page.locator('#showInput').click();
    await expect(page.locator('#message.mt-20')).toHaveText(name)
    await page.evaluate(_ => { }, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'Scenario-1' } })}`)
})
test("Scenario2", async () => {
    const browser = await chromium.connect({
        wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
    });
    test.slow();
    const page = await browser.newPage();
    await page.goto("https://www.lambdatest.com/selenium-playground");
    await page.getByText(/Drag & Drop/).click();
    const sliderTrack = await page.locator('#slider3').getByRole('slider')
    const sliderBound = await sliderTrack.boundingBox();
    if (sliderBound) {
        const targetPositionX = sliderBound.x + (sliderBound.width * 93) / 100;
        await sliderTrack.hover({ force: true, position: { x: 0, y: 0 } });
        await page.mouse.down();
        await page.mouse.move(targetPositionX, sliderBound.y);
        await page.mouse.up();
        await expect(page.locator('#rangeSuccess')).toHaveText('95');
        await page.evaluate(_ => { }, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'Scenario-2' } })}`)
    }
})
test("Scenario3", async () => {
    const browser = await chromium.connect({
        wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
    });
    test.slow();
    const page = await browser.newPage();
    await page.goto("https://www.lambdatest.com/selenium-playground");
    await page.getByText('Input Form Submit').click();
    const name = page.locator('input#name[required]');
    await page.getByRole('button', { name: 'submit' }).click();
    const validationMessage = await name.evaluate((element) => {
        const input = element as HTMLInputElement
        return input.validationMessage
    })
    expect(validationMessage).toContain('Please fill out this field.');
    await page.locator('#name.w-full.border').fill('Lavanya');
    await page.locator('#inputEmail4').fill('lavanya@gmail.com')
    await page.locator('#inputPassword4').fill('123456789')
    await page.getByPlaceholder('Company').fill('Finezoom');
    await page.getByPlaceholder('Website').fill('www.finezoom.com');
    await page.selectOption('select.w-full.border', 'United States');
    await page.getByRole('combobox').selectOption('US');
    await page.locator('#inputCity').fill('Las Vegas');
    await page.getByPlaceholder('Address 1').fill('NO-1');
    await page.getByPlaceholder('Address 2').fill('Vegas');
    await page.getByPlaceholder('State').fill('Vegas');
    await page.getByPlaceholder('Zip code').fill('45799');
    await expect(page.locator('.success-msg.hidden')).toHaveText('Thanks for contacting us, we will get back to you shortly.')
    await page.evaluate(_ => { }, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'Scenario-3' } })}`)
})
