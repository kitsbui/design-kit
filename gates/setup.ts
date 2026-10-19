/**
 * Những gì mỗi dự án phải điền cho các cổng (layout, wcag, targets, perf, first-screen, visual):
 * các tài khoản thử, các màn của từng vai trò, cách đăng nhập, và dấu hiệu "trang đã sẵn sàng".
 * Các spec chỉ import từ tệp này.
 */
import type { Page } from '@playwright/test';

/** Tài khoản của dữ liệu thử (seed), một cho mỗi vai trò có màn hình riêng. */
export const ACCOUNTS = {
  user: { identifier: 'user@example.com', password: 'change-me' },
  admin: { identifier: 'admin@example.com', password: 'change-me' },
};
export type Role = 'visitor' | keyof typeof ACCOUNTS;

/** Mọi màn, theo vai trò mở được nó. Thêm màn mới vào đây (checklist thiết kế có một ô cho việc này). */
export const ROUTES: Record<Role, string[]> = {
  visitor: ['/', '/about'],
  user: ['/profile', '/saved'],
  admin: ['/console'],
};

/** Màn danh sách và màn chi tiết tiêu biểu, cho ngân sách màn đầu và ảnh so sánh. */
export const SCREENS = { list: '/', detail: '/e/first', visual: ['/', '/e/first', '/about'] };

/** Đăng nhập bằng API của dự án (nhanh hơn qua màn hình). Sửa cho đúng route của bạn. */
export async function signIn(page: Page, account: { identifier: string; password: string }) {
  const r = await page.request.post('/auth/login', { data: account });
  if (!r.ok()) throw new Error(`sign-in failed: ${r.status()} ${await r.text()}`);
}

/** Trang đã hydrate: chờ một dấu hiệu của runtime (ví dụ `html[data-session]`), rồi mạng yên. */
export async function ready(page: Page) {
  await page.locator('html[data-session]').waitFor({ state: 'attached', timeout: 15_000 }).catch(() => {});
  await page.waitForLoadState('networkidle', { timeout: 5_000 }).catch(() => {});
}

/** Đường dẫn có `:first`: thay bằng id của bản ghi đầu tiên (sửa cho đúng API của bạn). */
export async function resolve(page: Page, path: string): Promise<string> {
  if (!path.includes(':first')) return path;
  const { items } = await (await page.request.get('/events?limit=1')).json();
  return path.replace(':first', items[0].slug ?? items[0].id);
}
