import { expect, test, type Page } from '@playwright/test';
import { exampleText } from '../../src/lib/journey';
function textPdf() {
  const stream =
    'BT /F1 12 Tf 50 750 Td (07:00 Ha Noi | Khoi hanh | 0) Tj 0 -24 Td (20:00 Da Nang | Ket thuc | 0) Tj ET';
  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
  ];
  let body = '%PDF-1.4\n';
  const offsets = [0];
  objects.forEach((o, i) => {
    offsets.push(Buffer.byteLength(body));
    body += `${i + 1} 0 obj\n${o}\nendobj\n`;
  });
  const xref = Buffer.byteLength(body);
  body += `xref\n0 6\n0000000000 65535 f \n${offsets
    .slice(1)
    .map((n) => `${String(n).padStart(10, '0')} 00000 n `)
    .join('\n')}\ntrailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return Buffer.from(body);
}
test('reads PDF text locally and supports manual added destinations', async ({ page }) => {
  await reset(page);
  await page.goto('/app/trips/new?mode=import');
  await page
    .locator('input[type=file]')
    .setInputFiles({ name: 'hanh-trinh.pdf', mimeType: 'application/pdf', buffer: textPdf() });
  await expect(page.getByLabel('Nội dung lịch trình')).toHaveValue(/07:00 Ha Noi/, {
    timeout: 30000,
  });
  await page.getByRole('button', { name: 'Tạo lịch từ nội dung' }).click();
  await expect(page.getByLabel('Địa điểm')).toHaveCount(2);
  await page.getByRole('button', { name: 'Thêm điểm đến', exact: true }).click();
  await page.getByLabel('Địa điểm').nth(1).fill('Ninh Bình');
  await expect(page.getByLabel('Quãng đường chặng (km)').nth(1)).toHaveValue('680');
  await page.getByRole('button', { name: 'Tiếp tục · Chọn nơi nghỉ chân' }).click();
  await expect(
    page.locator('.rest-option').filter({ hasText: 'Trạm Việt Ninh Bình' }),
  ).toBeVisible();
});
test('fresh travel, imported handbook, configurable rests and guest place details', async ({
  page,
}) => {
  await reset(page);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/app');
  await expect(page.getByRole('heading', { name: 'Hành trình của bạn', exact: true })).toHaveCount(
    0,
  );
  await expect(
    page.getByRole('heading', { name: 'Chuyến đi đầu tiên bắt đầu từ đây' }),
  ).toBeVisible();
  await page.screenshot({ path: 'test-results/travel-fresh.png', fullPage: true });
  await page.getByRole('link', { name: /Nhập lịch trình từ ảnh/ }).click();
  await page.locator('input[type=file]').setInputFiles('assets/generated/station-ninh-binh.png');
  await expect(page.getByAltText('Ảnh lịch trình đã tải')).toBeVisible();
  await page.getByLabel('Nội dung lịch trình').fill(exampleText);
  await page.getByRole('button', { name: 'Tạo lịch từ nội dung' }).click();
  await expect(page.getByLabel('Địa điểm')).toHaveCount(11);
  await page.getByLabel('Tên hành trình').fill('Ba ngày khám phá miền Trung');
  await page.getByRole('button', { name: 'Tiếp tục · Chọn nơi nghỉ chân' }).click();
  const station = page.locator('.rest-option').filter({ hasText: 'Trạm Việt Ninh Bình' });
  await station.getByRole('checkbox').check();
  await expect(station.getByLabel('Thời gian nghỉ (phút)')).toHaveValue('15');
  await expect(page.getByText('Thêm 15 phút nghỉ chân vào lịch trình.')).toBeVisible();
  await station.getByLabel('Thời gian nghỉ (phút)').fill('45');
  await expect(page.getByText('Thêm 45 phút nghỉ chân vào lịch trình.')).toBeVisible();
  await page.screenshot({ path: 'test-results/planner-rests.png', fullPage: true });
  await page.getByRole('button', { name: 'Tiếp tục · Thông tin chuyến đi' }).click();
  await page.getByLabel('Biển số xe').fill('30A-123.45');
  await page.getByRole('button', { name: 'Xem lại hành trình' }).click();
  await page.getByRole('button', { name: 'Tạo hành trình & sổ tay' }).click();
  await expect(page.locator('.timeline>li')).toHaveCount(12);
  await page.getByRole('link',{name:'Sửa lịch',exact:true}).click();
  await page.getByRole('button',{name:'Tiếp tục · Chọn nơi nghỉ chân'}).click();
  await expect(page.getByText('Thêm 45 phút nghỉ chân vào lịch trình.')).toBeVisible();
  await page.getByRole('button',{name:'Tiếp tục · Thông tin chuyến đi'}).click();
  await page.getByRole('button',{name:'Xem lại hành trình'}).click();
  await page.getByRole('button',{name:'Lưu thay đổi',exact:true}).click();
  await expect(page.locator('.timeline>li')).toHaveCount(12);
  await page.getByRole('link', { name: 'Chia sẻ', exact: true }).click();
  const link = await page.getByLabel('Link công khai').inputValue();
  await page.goto(link);
  await page.getByLabel('Họ tên').fill('Khách cùng đi');
  await page.getByRole('button', { name: 'Tiếp tục xem hành trình' }).click();
  await expect(page.getByRole('heading', { name: 'Sổ tay hành trình' })).toBeVisible();
  await expect(page.locator('.timeline>li')).toHaveCount(12);
  await page.getByRole('link', { name: 'Đại Nội Huế', exact: false }).click();
  await expect(page.getByRole('heading', { name: 'Đại Nội Huế' })).toBeVisible();
  await expect(page.getByText(/không gian kiến trúc cung đình/)).toBeVisible();
  await page.screenshot({ path: 'test-results/place-handbook.png', fullPage: true });
  await page.getByRole('link', { name: 'Điểm tiếp theo' }).click();
  await expect(page.getByRole('heading', { name: 'Chùa Thiên Mụ' })).toBeVisible();
});
async function reset(page: Page) {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
}
async function guestOrder(page: Page, multi = false) {
  await page.goto('/t/HN-DN-A8K29');
  await page.getByLabel('Họ tên').fill('Trần Hà');
  await page.getByRole('button', { name: 'Tiếp tục xem hành trình' }).click();
  await expect(page.getByRole('heading', { name: 'Hà Nội → Đà Nẵng' })).toBeVisible();
  await page.getByRole('link', { name: 'Xem trạm dừng' }).click();
  await page.getByRole('link', { name: 'Khám phá sản phẩm' }).click();
  await expect
    .poll(() =>
      page
        .locator('.product-art img')
        .evaluateAll(
          (nodes) => nodes.filter((n) => (n as HTMLImageElement).naturalWidth > 0).length,
        ),
    )
    .toBeGreaterThan(0);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: 'test-results/catalog-mobile.png', fullPage: true });
  await page.getByRole('link', { name: 'Xem Cơm gà tại Cơm Việt', exact: true }).click();
  await expect
    .poll(() =>
      page
        .getByAltText('Cơm gà', { exact: true })
        .evaluate((n) => (n as HTMLImageElement).naturalWidth),
    )
    .toBeGreaterThan(0);
  await page.screenshot({ path: 'test-results/food-detail-mobile.png', fullPage: true });
  await page.getByRole('button', { name: 'Tăng số lượng' }).click();
  await page.getByLabel('Ghi chú cho cửa hàng').fill('Không hành');
  await page.getByRole('button', { name: /Thêm vào giỏ/ }).click();
  await page.getByRole('button', { name: 'Thêm Cà phê sữa tại Cơm Việt', exact: true }).click();
  if (multi) {
    await page
      .getByRole('button', { name: 'Thêm Cơm cháy Ninh Bình tại Siêu thị Trạm Việt' })
      .click();
    await page.getByRole('button', { name: 'Thêm Khăn giấy tại Siêu thị Trạm Việt' }).click();
  }
  await page.getByRole('link', { name: /Xem giỏ/ }).click();
  await page.getByRole('link', { name: 'Tiếp tục thanh toán' }).click();
  await page.getByRole('button', { name: /^Thanh toán ·/ }).click();
  await expect(page.getByRole('heading', { name: 'Đặt trước thành công!' })).toBeVisible();
  const code = await page.locator('h2').filter({ hasText: /^TV-/ }).innerText();
  const pickup = (await page.getByAltText(`QR nhận đơn ${code}`).getAttribute('src'))!;
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: 'test-results/order-qr-mobile.png', fullPage: true });
  return { code, pickup, url: page.url() };
}
test('complete pitch: QR, order, ETA preparation, check-in, pickup, commission and reprint', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await reset(page);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/app/login');
  await page.getByRole('button', { name: 'Đăng nhập', exact: true }).click();
  await page.goto('/app/trips/trip-hn-dn/share');
  await expect(page.getByAltText('QR mở hành trình Hà Nội → Đà Nẵng')).toBeVisible();
  await expect(page.getByLabel('Link công khai')).toHaveValue(/\/t\/HN-DN-A8K29$/);
  const order = await guestOrder(page);
  await expect(page.locator('.customer-portion')).toHaveCount(1);
  await page.goto('/station/login');
  await page.getByRole('button', { name: 'Vào quản lý trạm' }).click();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/station/vehicles/trip-hn-dn');
  await expect(page.getByText(/^2\.020\.000/)).toBeVisible();
  await expect(
    page.locator('.metric').filter({ hasText: 'Đơn khách' }).getByText('18', { exact: true }),
  ).toBeVisible();
  await page.goto('/merchant/login');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Đăng nhập', exact: true }).click();
  await page.locator('.merchant-order-card').filter({ hasText: order.code }).click();
  const partUrl = page.url();
  await page.getByRole('button', { name: 'Nhận đơn', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Bắt đầu làm' })).toBeVisible();
  await page.goto('/demo-control');
  await page.getByRole('button', { name: 'Đặt ETA còn 32 phút' }).click();
  await page.goto(partUrl);
  await expect(page.getByText(/Nên bắt đầu sau 17 phút/)).toBeVisible();
  await page.goto('/demo-control');
  await page.getByRole('button', { name: '+17 phút', exact: true }).click();
  await page.goto(partUrl);
  await expect(page.getByText(/Đến giờ chuẩn bị/)).toBeVisible();
  await page.getByRole('button', { name: 'Bắt đầu làm' }).click();
  await page.goto('/demo-control');
  await page.getByRole('button', { name: '+12 phút', exact: true }).click();
  await page.goto(partUrl);
  await page.getByRole('button', { name: 'Đã làm xong' }).click();
  await expect(
    page.getByRole('button', { name: 'Quét QR & bàn giao', exact: true }),
  ).toBeDisabled();
  await page.goto('/app/trips/trip-hn-dn');
  await page.getByRole('button', { name: 'Check-in tại trạm', exact: true }).click();
  await page.getByRole('button', { name: 'Tôi đã đến trạm' }).click();
  await page.goto(order.url);
  await expect(page.getByText('Món đã sẵn sàng. Mời bạn đến quầy nhận.')).toBeVisible();
  await page.goto(partUrl);
  await page.getByRole('button', { name: 'Quét QR & bàn giao', exact: true }).click();
  await page.locator('dialog input[type=file]').setInputFiles({
    name: 'pickup.png',
    mimeType: 'image/png',
    buffer: Buffer.from(order.pickup.split(',')[1], 'base64'),
  });
  await expect(page.getByText(/Đúng đơn hàng/)).toBeVisible();
  await page.getByRole('button', { name: 'Xác nhận bàn giao' }).click();
  await page.goto('/app/earnings');
  await expect(page.getByTestId('earned-commission')).toHaveText(/^9\.000/);
  await page.goto(partUrl);
  await page.getByRole('button', { name: 'Xem phiếu / in lại' }).click();
  await page.getByRole('button', { name: 'In lại phiếu', exact: true }).click();
  await expect(page.getByText(/Đã in thành công/)).toBeVisible();
  await page.getByRole('button', { name: 'Đóng', exact: true }).click();
  await page.goto('/app/earnings');
  await expect(page.getByTestId('earned-commission')).toHaveText(/^9\.000/);
  await page.reload();
  await expect(page.getByTestId('earned-commission')).toHaveText(/^9\.000/);
  await page.goto('/station/sales');
  await expect(
    page
      .locator('.metric')
      .filter({ hasText: 'Doanh thu hoàn tất' })
      .getByText(/^180\.000/),
  ).toBeVisible();
  expect(errors).toEqual([]);
});
test('multi-counter order, shop isolation, availability validation, rejection and reset', async ({
  page,
}) => {
  await reset(page);
  const order = await guestOrder(page, true);
  await expect(page.locator('.customer-portion')).toHaveCount(2);
  await expect(page.getByText(/^260\.000/).first()).toBeVisible();
  await page.goto('/merchant/login');
  await page.getByRole('button', { name: 'Đăng nhập', exact: true }).click();
  await page.locator('.merchant-order-card').filter({ hasText: order.code }).click();
  const partUrl = page.url();
  await expect(page.getByText('2 × Cơm gà', { exact: true })).toBeVisible();
  await expect(page.getByText('Cơm cháy Ninh Bình', { exact: true })).toHaveCount(0);
  await page.getByRole('button', { name: 'Từ chối đơn', exact: true }).click();
  await page.getByRole('button', { name: 'Xác nhận từ chối' }).click();
  await page.goto(order.url);
  await expect(page.getByText(/Lý do: Hết món/)).toBeVisible();
  await expect(page.getByText(/Hoàn tất/)).toHaveCount(0);
  await page.goto('/t/HN-DN-A8K29/station/station-ninh-binh/catalog');
  await page.getByRole('button', { name: 'Thêm Cơm gà tại Cơm Việt', exact: true }).click();
  await page.getByRole('link', { name: /Xem giỏ/ }).click();
  const cartUrl = page.url();
  await page.goto('/merchant/menu');
  await page
    .locator('.menu-item')
    .filter({ has: page.getByRole('heading', { name: 'Cơm gà', exact: true }) })
    .getByRole('checkbox')
    .uncheck();
  await page.goto(cartUrl);
  await expect(page.getByRole('link', { name: 'Tiếp tục thanh toán' })).toHaveAttribute(
    'aria-disabled',
    'true',
  );
  await page.goto('/merchant/orders');
  await page.getByRole('button', { name: 'Đăng xuất' }).click();
  await page.getByLabel('Email cửa hàng').fill('sieuthi@demo.vn');
  await page.getByRole('button', { name: 'Đăng nhập', exact: true }).click();
  await page.locator('.merchant-order-card').filter({ hasText: order.code }).click();
  await expect(page.getByText('1 × Cơm cháy Ninh Bình', { exact: true })).toBeVisible();
  await expect(page.getByText('2 × Cơm gà', { exact: true })).toHaveCount(0);
  await page.goto('/demo-control');
  await page.getByRole('button', { name: 'Reset Demo', exact: true }).click();
  await page.goto(partUrl);
  await expect(page.getByRole('button', { name: 'Đăng nhập', exact: true })).toBeVisible();
  await page.goto('/station/login');
  await page.getByRole('button', { name: 'Vào quản lý trạm' }).click();
  await page.goto('/station/vehicles/trip-hn-dn');
  await expect(page.getByText(/^1\.840\.000/)).toBeVisible();
});
test('normal user creates, shares and joins trips without partner capabilities', async ({
  page,
}) => {
  await reset(page);
  await page.goto('/app/login');
  await page.getByLabel('Email', { exact: true }).fill('hoang@demo.vn');
  await page.getByRole('button', { name: 'Đăng nhập', exact: true }).click();
  await expect(
    page.getByRole('navigation', { name: 'Travel App' }).getByRole('link', { name: 'Thu nhập' }),
  ).toHaveCount(0);
  await page.goto('/app/trips/new');
  await page.getByLabel('Tên hành trình').fill('Chuyến xe tải demo');
  await page.getByRole('button', { name: 'Tiếp tục · Chọn nơi nghỉ chân' }).click();
  await page.getByRole('button', { name: 'Tiếp tục · Thông tin chuyến đi' }).click();
  await page.getByRole('button', { name: 'Xem lại hành trình' }).click();
  await page.getByRole('button', { name: 'Tạo hành trình & sổ tay' }).click();
  await expect(page.getByRole('heading', { name: 'Chuyến xe tải demo' })).toBeVisible();
  await page.getByRole('link', { name: 'Chia sẻ', exact: true }).click();
  await expect(page.getByAltText('QR mở hành trình Chuyến xe tải demo')).toBeVisible();
  await page.goto('/app/trips/join');
  await page.getByRole('button', { name: 'Xem và tham gia chuyến' }).click();
  await expect(page.getByRole('button', { name: 'Rời chuyến đã lưu' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Check-in tại trạm' })).toHaveCount(0);
  await page.goto('/demo-control');
  await page.getByRole('checkbox', { name: /Mô phỏng thiết bị đã cài Travel App/ }).check();
  await page.goto('/t/HN-DN-A8K29');
  await expect(page).toHaveURL(/\/app\/trips\/trip-hn-dn$/);
});
test('same-origin tabs share changes and all surfaces have usable layouts', async ({
  page,
  context,
}) => {
  await reset(page);
  await page.goto('/merchant/login');
  await page.getByRole('button', { name: 'Đăng nhập', exact: true }).click();
  await page.goto('/merchant/menu');
  const guest = await context.newPage();
  await guest.goto('/t/HN-DN-A8K29');
  await guest.getByLabel('Họ tên').fill('Khách tab hai');
  await guest.getByRole('button', { name: 'Tiếp tục xem hành trình' }).click();
  await guest.goto('/t/HN-DN-A8K29/station/station-ninh-binh/catalog');
  await page
    .locator('.menu-item')
    .filter({ has: page.getByRole('heading', { name: 'Cơm gà', exact: true }) })
    .getByRole('checkbox')
    .uncheck();
  await expect(
    guest.getByRole('button', { name: 'Thêm Cơm gà tại Cơm Việt', exact: true }),
  ).toBeDisabled();
  for (const width of [375, 430]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of [
      '/app',
      '/t/HN-DN-A8K29/journey',
      '/t/HN-DN-A8K29/station/station-ninh-binh/catalog',
      '/merchant/orders',
    ]) {
      await page.goto(path);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      ).toBe(true);
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/station/login');
  await page.getByRole('button', { name: 'Vào quản lý trạm' }).click();
  await page.screenshot({ path: 'test-results/station-desktop.png', fullPage: true });
  await page.setViewportSize({ width: 768, height: 1024 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
  await page.screenshot({ path: 'test-results/station-tablet.png', fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/app/trips/trip-hn-dn');
  await page.screenshot({ path: 'test-results/travel-mobile.png', fullPage: true });
  await page.goto('/merchant/orders');
  await page.screenshot({ path: 'test-results/merchant-mobile.png', fullPage: true });
  await page.goto('/t/HN-DN-A8K29/journey');
  await page.screenshot({ path: 'test-results/guest-mobile.png', fullPage: true });
  await guest.close();
});
