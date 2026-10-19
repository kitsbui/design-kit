# design-kit

Bộ dụng cụ rút từ cuộc redesign FeestFinder (design v2, 10.2026): những gì đã chứng minh là đúng, những lỗi đã trả giá, và các công cụ để lần sau đi thẳng tới kết quả. Dành cho dự án web có người dùng trên điện thoại và một vài back office, xây bằng Claude Code (hoặc agent tương tự) cùng một chủ dự án quyết định nhanh.

| Thư mục | Là gì | Đọc khi |
| --- | --- | --- |
| [`LEARNINGS.md`](LEARNINGS.md) | Bản tự đánh giá toàn bộ quá trình: dòng thời gian, cách suy luận đúng và sai, cách thực hiện, 18 lỗi và bài học, phong cách và layout, 12 bài học chính, quy trình rút gọn | Trước khi bắt đầu dự án mới |
| [`design-system/`](design-system/README.md) | Hệ thống thiết kế "Kính đêm" dùng lại được: token theo vai trò (tối + sáng), danh mục phần tử, mẫu layout, quy tắc chữ, 16 dấu hiệu mùi AI, bảng điểm, checklist PR | Khi dựng front |
| [`gates/`](gates/README.md) | Các cổng tự động chép sang được: layout, axe, 44 px, CLS và JS, màn đầu người mới, so ảnh PR, checklist PR, lint token | Khi lắp CI |
| [`skills/`](skills/) | Sáu skill cho Claude Code: `design-review`, `design-system-setup`, `design-gates`, `design-phase`, `newcomer-flow`, `user-test` | Chép vào `.claude/skills/` của dự án |
| [`usertest/`](usertest/README.md) | Buổi thử 5 người trong một file HTML: kịch bản có đồng hồ, phiếu ghi, SUS tự tính, phán quyết theo bảng điểm, bảng Markdown dán vào roadmap | Khi cần cột "người thật" của mốc 9 |
| [`mcp/`](mcp/README.md) | MCP server đưa toàn bộ kit vào bất kỳ phiên agent nào: token, quy tắc, checklist, bảng điểm, tìm trong bài học, **đo màn đầu** của một URL, và chép cổng vào repo | Thêm vào `.mcp.json` |
| [`templates/`](templates/) | `CLAUDE.design.md` (đoạn dán vào CLAUDE.md), `DESIGN_GOVERNANCE.md`, `artboard.html` | Khi tạo repo |

## Bắt đầu một dự án mới trong 10 phút

```bash
# 1. Skill và MCP
cp -r /path/design-kit/skills/* my-app/.claude/skills/
cat >> my-app/.mcp.json  # xem mcp/.mcp.example.json

# 2. Trong phiên Claude Code của my-app
/design-system-setup   # token, phần tử, /kit, lint token, CLAUDE.md
/design-gates          # Playwright, axe, 44 px, CLS/JS, màn đầu, visual, checklist
/design-review         # đo và chấm trước khi vẽ; câu hỏi cho chủ dự án
/design-phase          # mỗi phase: nhánh → cổng → PR → visual-ok → merge → kiểm tra production
/newcomer-flow         # khi chủ dự án nói "lằng nhằng"
/user-test             # buổi thử 5 người: chuẩn bị việc, chạy usertest/index.html, sửa trong 2 ngày
```

## Năm điều rút gọn nhất

1. Đo trước (số nút màn đầu, khái niệm, chạm), đặt ngân sách chỉ được giảm, rồi mới vẽ.
2. Hai thang điểm: cổng tự động (đúng chuẩn) và người mới (hiểu ngay). Cổng xanh không có nghĩa là xong.
3. Token theo vai trò + lint cấm hex + cổng trước phase. Nửa ngày, tiết kiệm cả phase 0.
4. Dữ liệu thử phải xấu như production. Ba lỗi thật của FeestFinder đều do dữ liệu mẫu đẹp.
5. Quyết định của chủ dự án: 2–4 lựa chọn có hệ quả, chép nguyên văn lựa chọn thành checklist, ghi kèm ngày.

## Nguồn

FeestFinder: canvas đánh giá thiết kế 25 artboard (riêng tư của chủ dự án), `docs/FEESTFINDER_ROADMAP.md` mục "Design v2", `docs/DESIGN_GOVERNANCE.md`, `e2e/next/*.spec.ts`, 18 pull request #7–#18 trên `kitsbui/FeestFinder`.
