import { expect, test, type Page } from '@playwright/test';

async function assertAnchored(page: Page, targetName: string) {
  const target = page.locator(`[data-demo-target="${targetName}"]`).first();
  await expect(target).toBeVisible();
  await expect(page.locator('.demo-spotlight b')).toBeVisible();
  const measure = () => page.evaluate((name) => {
    const target = document.querySelector(`[data-demo-target="${name}"]`)!.getBoundingClientRect();
    const hole = document.querySelector('.demo-spotlight b')!.getBoundingClientRect();
    return { top: hole.top - target.top, left: hole.left - target.left,
      width: hole.width - target.width, height: hole.height - target.height };
  }, targetName);
  await expect.poll(async () => (await measure()).top).toBeCloseTo(-6, 0);
  await expect.poll(async () => (await measure()).left).toBeCloseTo(-6, 0);
  await expect.poll(async () => (await measure()).width).toBeCloseTo(12, 0);
  await expect.poll(async () => (await measure()).height).toBeCloseTo(12, 0);
  const before = await measure();
  await page.evaluate(() => window.scrollBy(0, 220));
  // Unrelated UI content must not recapture the hole at a different scroll position.
  await page.evaluate(() => {
    const status = document.createElement('span');
    status.textContent = 'demo test status';
    document.getElementById('root')!.append(status);
    status.remove();
  });
  await expect.poll(measure).toEqual(before);
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect.poll(measure).toEqual(before);
}

for (const width of [375, 430]) {
  test(`guest guide stays on its control through all purchase steps at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 740 });
    await page.goto('/');
    await page.evaluate(() => { localStorage.clear(); sessionStorage.clear(); });
    await page.goto('/t/HN-QB-A8K29?guide=1');
    const targets = ['guest-start', 'guest-next-stop', 'guest-catalog', 'guest-add-product',
      'guest-checkout', 'guest-pay-demo', 'guest-order-handoff'];
    for (let step = 0; step < targets.length; step++) {
      await expect(page.locator('.guest-mobile-guide')).toContainText(`Demo ${step + 1}/7`);
      await assertAnchored(page, targets[step]);
      if (step === 3) {
        await page.locator(`[data-demo-target="${targets[step]}"]`).evaluate((target) => target.scrollIntoView({ block: 'center' }));
        await page.screenshot({ path: `test-results/guest-spotlight-${width}.png` });
      }
      if (step < targets.length - 1) {
        await page.locator('.guest-mobile-guide .demo-guide-actions .button').last().click();
      }
    }
    await expect(page.getByRole('heading', { name: 'Đặt trước thành công!' })).toBeVisible();
    await page.locator('.guest-mobile-guide .demo-guide-actions .button').last().click();
    await expect(page).toHaveURL(/\/merchant\/orders\//);
  });
}
