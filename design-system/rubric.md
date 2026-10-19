# Bảng điểm và định nghĩa 9 / 9,5 / 10

## Bảy tiêu chí (thang 10), mỗi điểm một bằng chứng

| Tiêu chí | Hỏi gì | Bằng chứng để chấm |
| --- | --- | --- |
| Hình khối, hình ảnh | Ảnh thật hay hình sinh tự động? Bao nhiêu bán kính, bao nhiêu màu nhấn đang dùng? | Ảnh chụp 5 thẻ liên tiếp; đếm bán kính và hue trong CSS |
| Bố cục | Nội dung đầu tiên ở đâu trong màn đầu? Bao nhiêu hàng điều khiển trước nó? | Toạ độ y của nội dung đầu tiên ở 390 và 1440; số nút trong màn đầu |
| Thẩm mỹ | Hệ màu có nói được một câu? Chữ có nhất quán? | Danh sách màu ngoài token; ảnh so sánh 3 bề rộng |
| UX / UI | Mỗi việc có mấy cách làm? Trạng thái rỗng, lỗi, tải có đủ? | Đếm lối tới cùng một việc; e2e đi qua trạng thái rỗng |
| Điều hướng | Tới đích chính mất mấy chạm? Có mấy khung điều hướng cho cùng một người? | nav.spec: ≤ 2 chạm; số khung |
| Flow | Hành động chính có trong tầm tay? Có đổi khung giữa chừng? | Dock trên điện thoại; e2e từ danh sách tới checkout |
| Mobile | Cuộn ngang? Vùng chạm? axe? CLS? JS? | layout, targets, wcag, perf specs |

Thêm khi sản phẩm đã chạy: **Nội dung** (dữ liệu thật có đủ để người mới thấy thứ gần mình?), **Kỹ thuật** (số bài kiểm thử, CI), **Vận hành** (lỗi có được bắt, có web vitals thật?).

## Mốc điểm

| Điểm | Nghĩa |
| --- | --- |
| 5 | Chạy được, nhất quán ở mức "có token", nhưng muốn cho thấy mọi thứ; nhiều dấu hiệu mùi AI |
| 7 | Hệ màu một câu, một hành động chính, không cuộn ngang, nhưng người mới chưa biết bắt đầu từ đâu |
| 8 | Cổng tự động xanh (layout, axe, 44 px, CLS, JS, so ảnh, checklist). Đây là điểm của **cổng**, không phải của người dùng |
| **9** | Ba cột cùng xanh: (1) cổng tự động, (2) 5 người thật làm được việc chính không cần gợi ý (≥ 4/5), (3) số thật sau hai tuần không tụt. Không cột nào thay cột nào |
| 9,5 | Thêm: LCP ≤ 2,0 s và CLS ≤ 0,05 ở p75 người thật; ≥ 80% thẻ có ảnh thật; lỗi < 0,1% phiên |
| 10 | 5/5 người mới làm xong năm việc trên điện thoại của họ, SUS ≥ 80; sau hai tuần ≥ 60% người mới mở một trang chi tiết và ≥ 15% lưu một thứ |

## Số đo người mới (đếm bằng `../gates/first-screen.spec.ts` hoặc `mcp: measure_first_screen`)

| Số | Cách đếm | Mục tiêu | FeestFinder trước → sau |
| --- | --- | --- | --- |
| Chỗ bấm trong màn đầu danh sách | link, nút, ô, summary nhìn thấy trong `innerHeight` ở 390×844, trừ `aria-hidden` | ≤ 12 | 22 → 19 |
| Chỗ bấm trong màn đầu chi tiết | như trên | ≤ 7 (+ khung) | 15 → 10 |
| Khái niệm người mới gặp ở chi tiết | từ cần giải thích (nguồn, điểm, bộ sưu tập…) | 5 | 15 → 7 |
| Cách khác nhau để lọc hoặc tìm | thanh, sheet, rail, tab, ô | 2 | 5 → 3 |
| Chạm từ mở app tới thứ gần mình | | 1 | 3 → 0–1 |
| Chạm từ thẻ tới hành động chính | | 2 | 3–4 → 2 |
| Số màn hình của trang chi tiết | `scrollHeight / innerHeight` | ≤ 5 | 13 → 4 |

Mọi số này chỉ được giảm: ghi số hiện tại vào bài kiểm thử làm ngân sách.

## Chọn màu trong một buổi

Đừng đề xuất từng màu một (FeestFinder đổi màu nhấn 4 lần trong ngày 17.10). Làm một artboard:

1. Ba phương án dải nhấn, mỗi phương án vẽ trên **nền thật** với nút chính, tag nổi bật, link thông tin, ba chấm trạng thái, logo, trên cả nền tối và nền sáng.
2. Kèm số tương phản của chữ trên nút (≥ 4,5:1) và của màu thông tin trên nền (≥ 4,5:1).
3. Chủ dự án chọn một. Ghi ngày vào token file và CLAUDE.md. Hỏi lại trước khi đổi.

Quy tắc không đổi theo thương hiệu: thông tin ≠ hành động ≠ trạng thái; trạng thái "ổn" phải cách xa mốc giữa của dải nhấn; màu nhấn đơn sắc (không phải dải) chỉ cho focus ring và glow, và phải kiểm tra trên nền sáng (lime thất bại trên trắng).
