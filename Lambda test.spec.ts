import { test,expect } from '@playwright/test';

test('Scenario-1', async ({ page }) => {
  await page.goto('https://www.lambdatest.com/selenium-playground/');
  await page.locator(`//a[text()='Simple Form Demo']`).click();
  await expect(page).toHaveURL(/simple-form-demo/);
  const a = "Welcome to LambdaTest";
  await page.locator(`//input[@id='user-message']`).fill(a);
  await page.locator(`//button[@id='showInput']`).click();
  await expect(page.locator('#message.mt-20')).toHaveText(a);
});

test("Scenario-2", async ({ page }) => {
  await page.goto("https://www.lambdatest.com/selenium-playground");
  await page.getByText(/Drag & Drop/).click();
  const sliderTrack = await page.locator('#slider3').getByRole('slider')
  const sliderBound =await sliderTrack.boundingBox();
  if (sliderBound) {
  const targetPositionX = sliderBound.x + (sliderBound.width * 93) / 100;
  await sliderTrack.hover({ force: true, position: { x: 0, y: 0 } });
  await page.mouse.down();
  await page.mouse.move(targetPositionX, sliderBound.y);
  await page.mouse.up();
  await expect(page.locator('#rangeSuccess')).toHaveText('95');
}
})
test("Scenario-3", async ({ page }) => {
  await page.goto("https://www.lambdatest.com/selenium-playground");
  await page.getByText('Input Form Submit').click();
  const name = page.locator('input#name[required]');
  await page.getByRole('button', { name: 'submit' }).click();
  const validationMessage = await name.evaluate((element) => {
      const input = element as HTMLInputElement
      return input.validationMessage
      })
      expect(validationMessage).toContain('Please fill out this field.');
  await page.locator('#name.w-full.border').fill('lavanya');
  await page.locator('#inputEmail4').fill('lavanya@yahoo.com')
  await page.locator('#inputPassword4').fill('98745632')
  await page.getByPlaceholder('Company').fill('Finezoom');
  await page.getByPlaceholder('Website').fill('www.company.com');
  await page.selectOption('select.w-full.border', 'United States');
  await page.getByRole('combobox').selectOption('US');
  await page.locator('#inputCity').fill('Las Vegas');
  await page.getByPlaceholder('Address 1').fill('NO-1');
  await page.getByPlaceholder('Address 2').fill('Vegas');
  await page.getByPlaceholder('State').fill('Vegas');
  await page.getByPlaceholder('Zip code').fill('124567');
  await expect(page.locator('.success-msg.hidden')).toHaveText('Thanks for contacting us, we will get back to you shortly.')
})