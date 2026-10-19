# Các cổng tự động

Bản chép có thể dùng lại của các cổng đã chạy trên FeestFinder (Playwright, Node 24, chạy TypeScript trực tiếp). Mỗi cổng là một tệp; chúng chỉ import từ `setup.ts`, nơi dự án điền tài khoản, màn hình, cách đăng nhập và dấu hiệu "trang đã sẵn sàng". Skill `design-gates` (hoặc MCP `scaffold`) chép và hướng dẫn điền.

| Tệp | Kiểm tra | Thất bại khi |
| --- | --- | --- |
| `layout.spec.ts` | mọi màn của mọi vai trò ở 390 / 768 / 1440 | trang rộng hơn cửa sổ, hoặc một hộp nào đó cuộn ngang (kể cả hàng chip, tab) |
| `wcag.spec.ts` | axe-core WCAG 2.1 A/AA ở 390 và 1440 | lỗi serious hoặc critical |
| `targets.spec.ts` | mọi thứ bấm được ở 390 có cảm ứng | dưới 44 × 44 px, tính cả hit area `::before/::after`, trừ phần bị tổ tiên cắt; ngoại lệ WCAG: link trong câu, link có bản tương đương ≥ 44, điều khiển trong label |
| `perf.spec.ts` | điện thoại giả lập CPU 4× chậm, 4G | CLS > 0,05 khi tải, hoặc JS khởi động (các chunk HTML gọi, gzip) vượt ngân sách của màn; ngân sách chỉ giảm |
| `first-screen.spec.ts` | màn đầu ở 390×844, chưa đăng nhập | số chỗ bấm của trang danh sách hoặc trang chi tiết vượt ngân sách; trang chi tiết dài hơn 6 màn |
| `visual.spec.ts` | ảnh toàn trang của các màn chính ở 3 bề rộng | khác baseline > 1% điểm ảnh (local, opt-in `FF_VISUAL=1`); trên CI `github/visual.yml` so PR với base thay vì baseline |
| `check-tokens.ts` | mã nguồn front | hex ngoài file token, transition có thời gian riêng, số `[Npx]` vượt ngân sách |
| `github/visual.yml` | mỗi PR đụng front | ảnh khác base và chưa có nhãn `visual-ok`; push mới gỡ nhãn |
| `github/design-checklist.yml` + `.mjs` | mỗi PR đụng front | còn ô chưa đánh trong mục "## Thiết kế" (trừ khi đánh "Không đổi giao diện") |

## Lắp vào dự án

1. `npm i -D @playwright/test @axe-core/playwright && npx playwright install chromium` trong gói chứa e2e.
2. `playwright.config.ts`: `webServer` build production và seed dữ liệu **có bản ghi xấu như production**; `use: { timezoneId: 'UTC' }`; `fullyParallel: false` nếu các spec dùng chung dữ liệu.
3. Chép các tệp vào `e2e/`, điền `setup.ts`.
4. Chạy `perf` và `first-screen` một lần với ngân sách 999, đọc bảng in ra, ghi số đo vào. Từ đó chỉ giảm.
5. `check-tokens.ts` vào `scripts/`, sửa `THEME`, `IN_SCOPE`, `PX_BUDGET`; nối vào `npm run lint`.
6. `github/*` vào `.github/workflows`, `.github/scripts`, `.github/pull_request_template.md`; điền `FRONT_PATHS`, `E2E_DIR`, `WEB_DIR`; `gh label create visual-ok`; bảo vệ `main` với các check bắt buộc.

## Điều đã học khi chạy chúng

- Chạy **cả bộ** khi kiểm tra một cổng: các spec để lại dữ liệu cho nhau (targets thấy hàng mà spec khác tạo; perf đọc hàng chờ đã rỗng).
- Không chụp baseline và không tin kết quả từ build cache (ISR giữ id cũ).
- Lint có `--quiet` không in gì khi vượt ngân sách: kiểm tra mã thoát; không nối `| tail` trong chuỗi `&&`.
- Ngưỡng 1% toàn trang bỏ lọt thay đổi nhỏ ở vùng quan trọng (hero); thêm ảnh vùng cho chúng nếu cần.
- Cổng axe chạy trên **mọi vai trò** bắt được cả lỗi không phải trợ năng (một màn sập khi có dữ liệu).
