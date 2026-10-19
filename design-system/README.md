# Hệ thống thiết kế "Kính đêm" (night glass), bản dùng lại

Rút từ FeestFinder design v2 (10.2026). Dùng cho một sản phẩm web có người dùng trên điện thoại và một hoặc vài back office. Mặc định nền tối; có biến thể sáng. Mọi quy tắc ở đây đều có một cổng kiểm tra tự động trong `../gates/` hoặc một ô trong `checklist.md`.

## Năm câu nói hết hệ thống

1. **Màu nói một câu.** Một màu *thông tin* (tên nhóm, link, mục đang chọn, số đếm, "miễn phí"). Một dải *hành động* cho đúng một nút mỗi màn hình (glow nhẹ trên nút dẫn trang). *Trạng thái* là chấm 6 px kèm chữ, không bao giờ là nền nút hay viền. Mọi màu khác là bề mặt, viền, chữ.
2. **Một họ chữ, ba bán kính, không bóng đổ.** Noto Sans (hoặc một họ biến thiên tự host) cho chữ và số, số `tabular-nums`. Bán kính 4 (tag) / 8 (nút, chip, ô, thẻ) / 16 (sheet, hero) và pill (avatar, chấm). Tầng bằng bề mặt + viền 1 px; kính mờ chỉ trên ảnh hoặc bản đồ.
3. **Thiếu ảnh thì là chữ.** Tile chữ (tên lớn, nhóm, ngày), monogram dưới 160 px, poster ngày cho hero không ảnh. Không hình học lặp lại, không gradient trang trí.
4. **Vừa thiết bị, không cuộn ngang, chạm được.** Mọi màn ở 390 / 768 / 1440; không `min-width`, không `overflow-x: auto`; hàng chip và tab xuống dòng; bảng gập thành thẻ dưới 640 px; vùng chạm ≥ 44 px; thanh cuộn overlay 3 px.
5. **Chữ gọn.** Tiêu đề là danh từ có dữ liệu; nút là động từ + đối tượng; không câu giải thích; chữ hoa chỉ ở đầu bảng và tag; trạng thái rỗng = một câu + một hành động.

## Người mới trên điện thoại (bổ sung 18.10.2026)

- **Một màn một việc.** Danh sách để chọn; chi tiết để quyết và đi; "Tôi" để quản lý. Mỗi màn đúng một hành động chính.
- **Ba khái niệm trước.** Người mới chỉ gặp ba thứ (ở FeestFinder: thành phố, ngày, giá). Mọi tên nội bộ (nguồn dữ liệu, điểm số, bộ sưu tập, hộ chiếu…) chỉ hiện khi đã cần hoặc đã dùng.
- **Một cách làm một việc.** Lọc ở một chỗ, tìm ở một chỗ, lưu bằng một biểu tượng. Không lối thứ hai.
- **Lùi, không bỏ.** Tính năng phụ vào một mục "Thêm" của trang chi tiết hoặc vào "Tôi". Không xoá dữ liệu, không đổi API.
- **Ngân sách màn đầu** (đếm bằng `../gates/first-screen.spec.ts`, chỉ được giảm): danh sách ≤ 12 chỗ bấm, chi tiết ≤ 7 (cộng khung site), 1 chạm tới bộ lọc chính, 2 chạm từ thẻ tới hành động chính.
- **Dữ liệu thật xấu hơn dữ liệu mẫu.** Thiếu giá là "chưa rõ giá", không phải "miễn phí"; mặc định của importer không hiện như lời của nguồn; mô tả sai ngôn ngữ được đánh dấu.

## Tệp trong thư mục này

| Tệp | Nội dung |
| --- | --- |
| `tokens.json` | Nguồn sự thật của token: màu theo vai trò (tối và sáng), chữ, bán kính, breakpoint, chuyển động |
| `tokens.css` | Sinh từ JSON: khối `@theme` cho Tailwind v4 (`node ../scripts/build-tokens.mjs`) |
| `tokens.vanilla.css` | Sinh từ JSON: `:root` custom properties cho dự án không dùng Tailwind |
| `parts.md` | Danh mục phần tử và hợp đồng class của chúng |
| `layout.md` | Khung trang: site công khai, back office, màn danh sách, màn chi tiết, wizard |
| `copy.md` | Quy tắc chữ, cơ chế `{en, vi}`, thêm ngôn ngữ theo khoá tiếng Anh |
| `ai-smells.md` | Mười dấu hiệu "mùi AI" và cách gỡ |
| `rubric.md` | Bảng điểm 7 tiêu chí, định nghĩa 9 / 9,5 / 10, các số đo người mới |
| `checklist.md` | Checklist thiết kế trong mỗi pull request (vi + en) |

## Cách dùng trong dự án mới

1. Chép `tokens.css` vào `src/kd/theme.css` (hoặc đường dẫn của bạn), đổi màu nhấn theo thương hiệu **một lần** (xem `rubric.md`, mục "chọn màu trong một buổi").
2. Chép `../gates/check-tokens.ts` và nối vào `npm run lint`: không hex ngoài file token, ngân sách `[Npx]`, transition chỉ dùng `--dur-*`.
3. Dựng `/kit` (một trang hiển thị mọi phần ở 390 và 1440): phần mới vào `/kit` trước khi vào màn hình.
4. Dán `checklist.md` vào `.github/pull_request_template.md` và bật `../gates/github/design-checklist.yml`.
