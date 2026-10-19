# Checklist thiết kế trong pull request

Dán vào `.github/pull_request_template.md`. `../gates/github/design-checklist.yml` từ chối PR đụng tới front mà còn ô chưa đánh dấu (trừ khi đánh ô đầu). Đánh dấu thật: ô "ảnh so sánh" chỉ đánh sau khi đã xem `visual-diff` và gắn nhãn `visual-ok`.

## Thiết kế

- [ ] Không đổi giao diện
- [ ] Một hành động chính mỗi màn hình (`tone: 'acc'`, `glow` cho nút dẫn trang); màu theo vai trò, không hex ngoài file token
- [ ] Vừa bề rộng ở 390 / 768 / 1440, không cuộn ngang; bảng gập thành thẻ dưới 640px
- [ ] Chữ gọn: tiêu đề và hành động, không dòng giải thích; đủ mọi ngôn ngữ của site
- [ ] Ba trạng thái: đang tải, rỗng (có việc để làm), lỗi (thử lại)
- [ ] Trợ năng: tên đọc được bắt đầu bằng chữ hiển thị, vùng chạm từ 44px, thấy được focus, sheet trả focus
- [ ] Màn mới có trong `e2e/routes.ts` (layout, axe, vùng chạm)
- [ ] Màn đầu không tăng số chỗ bấm (`first-screen.spec.ts`); tên nội bộ không xuất hiện ở màn đầu
- [ ] Ảnh so sánh (`Visual`): không đổi, hoặc đã xem `visual-diff` và gắn nhãn `visual-ok`

## Design (English)

- [ ] No visual change
- [ ] One primary action per screen (`tone: 'acc'`, `glow` on the one that leads the page); colours by role, no hex outside the token file
- [ ] Fits 390 / 768 / 1440 without sideways scroll; tables fold into cards under 640px
- [ ] Lean copy: titles and actions, no explaining lines; every language of the site
- [ ] Three states: loading, empty (with something to do), error (with retry)
- [ ] Accessibility: accessible names start with the visible words, targets of 44px or more, visible focus, sheets give focus back
- [ ] A new screen is listed in `e2e/routes.ts` (layout, axe, targets)
- [ ] The first screen gains no controls (`first-screen.spec.ts`); no internal name on the first screen
- [ ] Screens (`Visual`): unchanged, or the `visual-diff` seen and `visual-ok` added
