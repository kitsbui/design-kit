## Thay đổi

<!-- Một hai câu: thay đổi gì, vì sao. Ảnh chụp trước/sau nếu đổi giao diện. -->

## Kiểm tra

- [ ] `npm run typecheck`, `npm run lint` ở mỗi gói đã đổi, test của khu vực, `npm test`
- [ ] `npm run test:screens` (layout 390/768/1440, axe, vùng chạm 44px)

## Thiết kế

<!-- Bắt buộc khi PR đổi front (design-checklist.yml). Đánh dấu mục đầu nếu không đổi giao diện. Chi tiết: docs/DESIGN_GOVERNANCE.md. -->

- [ ] Không đổi giao diện
- [ ] Một hành động chính mỗi màn hình (`tone: 'acc'`, `glow` cho nút dẫn trang); màu theo vai trò, không hex ngoài file token
- [ ] Vừa bề rộng ở 390 / 768 / 1440, không cuộn ngang; bảng gập thành thẻ dưới 640px
- [ ] Chữ gọn: tiêu đề và hành động, không dòng giải thích; đủ mọi ngôn ngữ của site
- [ ] Ba trạng thái: đang tải, rỗng (có việc để làm), lỗi (thử lại)
- [ ] Trợ năng: tên đọc được bắt đầu bằng chữ hiển thị, vùng chạm từ 44px, thấy được focus, sheet trả focus
- [ ] Màn mới có trong `e2e/setup.ts` (layout, axe, vùng chạm)
- [ ] Màn đầu không tăng số chỗ bấm (`first-screen.spec.ts`); tên nội bộ không xuất hiện ở màn đầu
- [ ] Ảnh so sánh (`Visual`): không đổi, hoặc đã xem `visual-diff` và gắn nhãn `visual-ok`
