import { expect, test, type Page } from '@playwright/test';
import { createSeed, DEFAULT_MERCHANT } from '../../src/demo/data';

async function checkAnchor(page: Page, selector: string) {
  await expect(page.locator(selector).first()).toBeAttached();
  await expect(page.locator('.demo-spotlight b')).toBeAttached();
  const alignment = () =>
    page.evaluate((targetSelector) => {
      const target = document.querySelector(targetSelector)!.getBoundingClientRect();
      const ring = document.querySelector('.demo-spotlight b')!.getBoundingClientRect();
      return { top: ring.top - target.top, left: ring.left - target.left };
    }, selector);
  const before = await alignment();
  expect(before.top).toBeCloseTo(-6, 0);
  expect(before.left).toBeCloseTo(-6, 0);
  let maximumScroll = 0;
  for (const scrollTop of [220, 440, 100, 0]) {
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), scrollTop);
    maximumScroll = Math.max(maximumScroll, await page.evaluate(() => window.scrollY));
    // An unrelated DOM update must not re-anchor a frozen viewport snapshot.
    await page.evaluate(() => {
      const marker = document.createElement('span');
      marker.hidden = true;
      document.body.append(marker);
      marker.remove();
    });
    await expect.poll(async () => (await alignment()).top).toBeCloseTo(before.top, 0);
    await expect.poll(async () => (await alignment()).left).toBeCloseTo(before.left, 0);
  }
  expect(maximumScroll).toBeGreaterThan(0);
}

for (const width of [375, 430]) {
  for (const screen of [
    {
      name: 'merchant incoming order',
      step: 11,
      route: '/merchant/orders',
      target: 'merchant-new-order',
      status: 'NEW',
    },
    {
      name: 'merchant acceptance',
      step: 11,
      route: 'detail',
      target: 'merchant-accept-order',
      status: 'NEW',
    },
    {
      name: 'merchant preparation',
      step: 12,
      route: 'detail',
      target: 'merchant-start-prep',
      status: 'ACCEPTED',
    },
    {
      name: 'merchant ready',
      step: 13,
      route: 'detail',
      target: 'merchant-finish-prep',
      status: 'PREPARING',
    },
    { name: 'station overview', step: 14, route: '/station', target: 'station-kpis' },
    {
      name: 'station incoming vehicles',
      step: 15,
      route: '/station/vehicles',
      target: 'station-vehicle-filter',
    },
    {
      name: 'station partners',
      step: 16,
      route: '/station/partners',
      target: 'station-partner-ranking',
    },
  ] as const) {
    test(`${screen.name}: spotlight stays with control during mobile scroll (${width}px)`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 740 });
      const seed = createSeed();
      seed.demoGuideEnabled = true;
      seed.demoGuideStep = screen.step;
      seed.merchantSessionId = DEFAULT_MERCHANT;
      seed.stationLoggedIn = true;
      const part = seed.merchantOrders.find((order) => order.merchantId === DEFAULT_MERCHANT)!;
      if ('status' in screen && screen.status) part.status = screen.status;
      await page.addInitScript((state) => {
        localStorage.setItem('tram-viet-demo-v2', JSON.stringify({ state, version: 3 }));
      }, seed);
      await page.goto(screen.route === 'detail' ? `/merchant/orders/${part.id}` : screen.route);
      await checkAnchor(page, `[data-demo-target="${screen.target}"]`);
      await expect(page.locator('.demo-guide-panel')).toBeVisible();
    });
  }
}
