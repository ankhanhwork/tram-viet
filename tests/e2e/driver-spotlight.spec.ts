import { expect, test, type Page } from '@playwright/test';

async function expectAnchored(page: Page, targetName: string) {
  const target = page.locator(`[data-demo-target="${targetName}"]`);
  await expect(target).toBeVisible();
  const ring = page.locator('.demo-spotlight b');
  await expect(ring).toBeVisible();
  const assertPosition = async () => {
    await expect.poll(async () => {
      const [box, focus] = await Promise.all([target.boundingBox(), ring.boundingBox()]);
      if (!box || !focus) return Infinity;
      return Math.abs(box.x + box.width / 2 - focus.x - focus.width / 2)
        + Math.abs(box.y + box.height / 2 - focus.y - focus.height / 2);
    }).toBeLessThan(3);
  };
  await assertPosition();
  const before = await target.boundingBox();
  await page.evaluate(() => window.scrollBy(0, 180));
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
  await assertPosition();
  // An unrelated async update must not move the spotlight back into the viewport.
  await page.evaluate(() => {
    const status = document.createElement('span');
    status.hidden = true;
    status.textContent = 'Async demo status';
    document.getElementById('root')!.append(status);
  });
  await assertPosition();
  const after = await target.boundingBox();
  expect(after!.y).toBeLessThan(before!.y);
  await page.evaluate(() => window.scrollTo(0, 0));
  await assertPosition();
}

for (const width of [375, 390, 430]) {
  test(`driver spotlight stays on its control while scrolling at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 667 });
    await page.goto('/app');
    await expectAnchored(page, 'planner-start');
    await page.screenshot({ path: `test-results/driver-spotlight-${width}.png` });
    await page.locator('[data-demo-target="planner-start"]').click();
    await expectAnchored(page, 'planner-ai-mode');
    await page.locator('[data-demo-target="planner-ai-mode"]').click();
    await expectAnchored(page, 'planner-demo-itinerary');
    await page.locator('[data-demo-target="planner-demo-itinerary"]').click();
    await expect(page.locator('[data-demo-target="planner-review-next"]')).toBeVisible();
    await expect(page.locator('.demo-guide-panel')).toContainText('Xem lại lịch thủ công');
    for (const target of ['planner-review-next', 'planner-rest-detail', 'planner-add-station', 'planner-rest-continue', 'planner-info-next', 'planner-save']) {
      const control = page.locator(`[data-demo-target="${target}"]`);
      await control.evaluate((element) => element.scrollIntoView({ block: 'center' }));
      if (target === 'planner-add-station') {
        await expect.poll(async () => {
          const [box, focus] = await Promise.all([control.boundingBox(), page.locator('.demo-spotlight b').boundingBox()]);
          if (!box || !focus) return Infinity;
          return Math.abs(box.y + box.height / 2 - focus.y - focus.height / 2);
        }).toBeLessThan(3);
      }
      await control.click();
    }
    await expect(page.locator('[data-demo-target="driver-share"]')).toBeVisible();
    await expect(page.locator('.demo-guide-panel')).toContainText('Mở trải nghiệm khách');
  });
}

