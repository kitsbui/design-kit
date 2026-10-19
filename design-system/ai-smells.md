# Mười dấu hiệu "mùi AI" và cách gỡ

"Mùi AI" là những mẫu hình sinh ra từ thói quen của công cụ, không từ nội dung. Người dùng không gọi tên được nhưng cảm thấy trang "chưa có người". Danh sách này rút từ FeestFinder ngày 17.10.2026; mỗi mục có chỗ đã thấy và cách gỡ đã áp dụng.

| # | Dấu hiệu | Thấy ở FeestFinder | Cách gỡ |
| --- | --- | --- | --- |
| 1 | **Trang trí sinh tự động lặp lại** (cùng một hình học trên mọi thẻ không ảnh) | Tile tam giác tím trên mọi thẻ; onboarding mở bằng 12 tile giống nhau | Ảnh thật là mặc định; thiếu ảnh thì tile chữ: tên lớn + nhóm + ngày. Hình học chỉ còn là marker 7–10 px |
| 2 | **Nhãn hoa 11 px cách chữ rộng ở mọi nơi** | GIỚI THIỆU, HYPE, ĐANG HOT, BẠN THÍCH GÌ? | Chữ hoa chỉ cho đầu cột bảng và tag trạng thái. Tiêu đề mục là chữ thường 20–24 px, đậm 600–700 |
| 3 | **Kính mờ trên nền phẳng** | Nav, tag, thanh tab nổi cách mép 12 px, dock | Kính chỉ khi đè lên ảnh hoặc bản đồ. Nav và thanh tab là bề mặt đặc chạm mép, viền 1 px |
| 4 | **Bộ lọc "Mọi X"** | Mọi thành phố · Mọi lúc · Mọi kiểu · Mọi vai trò · Mọi phong cách | Bộ lọc mang tên trường và giá trị: "Thành phố: TP.HCM". Giá trị đang chọn đậm; chưa chọn hiện tên trường |
| 5 | **Câu giải thích thay cho giao diện** | "Chọn gu của bạn, FeestFinder lọc sẵn…", "Hãy tử tế. Không đăng…", "Vị trí chỉ lưu trên thiết bị này." | Bỏ hết trừ quy tắc định dạng. Quy tắc cộng đồng vào link "Quy tắc" cạnh ô nhập. Số đếm vào tab |
| 6 | **Tiêu đề khổng lồ nói điều ai cũng biết** | "Tất cả sự kiện" 92 px; "Có gì quanh bạn?" | Tiêu đề là ngữ cảnh có dữ liệu: "Cuối tuần này ở TP.HCM". Cỡ 32 px, không 92 |
| 7 | **Pill cho mọi thứ** | Chip lọc, nút, tab cùng bo 9999 | Bộ lọc bo 8, nút bo 8, pill chỉ cho tag trạng thái và avatar. Mỗi vai trò một hình |
| 8 | **FAQ accordion ở cuối trang chủ** | 4 câu hỏi dưới danh sách, kiểu landing page SEO | FAQ về trang giới thiệu, giữ JSON-LD FAQPage ở đó. Trang chủ kết thúc bằng nội dung và footer |
| 9 | **Từ vựng gamification** | "Hype ngay", "+1 trong 24 giờ qua", "ĐANG HOT" | Một động từ và một số; tín hiệu bán nhanh là tag trạng thái có chấm ("Sắp hết vé"), không hiệu ứng. (Chủ dự án giữ chữ "Hype": giữ từ, bỏ trang trí) |
| 10 | **Thanh tab nổi và nút nổi** | Thanh tab cách mép 12 px bo 20 px kính; nút góp ý tròn nổi đè nút "Đăng" | Thanh tab chạm mép, nền đặc, safe-area; góp ý vào footer và menu, không nổi |

## Bổ sung từ phase 11–12 (người mới trên điện thoại)

| # | Dấu hiệu | Cách gỡ |
| --- | --- | --- |
| 11 | **Mọi thẻ đều có nhãn** (RADAR trên 9/10 thẻ, "LỄ HỘI LỚN THẾ GIỚI" gradient) | Một thẻ tối đa một nhãn, và chỉ nhãn đổi quyết định đi hay không (hết vé, sắp hết, huỷ). Nguồn dữ liệu là dấu nhỏ, không chữ |
| 12 | **Tên nội bộ trong màn đầu** (Radar, Hype, Nguồn, Kiểu đêm, Có hồ sơ / Từ Radar) | Màn đầu chỉ dùng từ của người dùng cuối (thành phố, ngày, giá). Tên nội bộ vào "Thêm" hoặc back office |
| 13 | **Nút "Đăng" chiếm góc của mọi người** | Người mở app phần lớn là người tiêu dùng; "Đăng" vào "Tôi" và footer |
| 14 | **Bắt đăng nhập ở hành động đầu tiên** (bấm tim) | Lưu trên máy trước, đồng bộ khi đăng nhập; đăng nhập chỉ khi mua, đăng, bình luận |
| 15 | **Khối rỗng vẫn giữ chỗ** ("0 hype", Hỏi đáp 3 tab không có gì) | Rỗng thì là một nút ("Đặt câu hỏi") hoặc ẩn; không hiện số 0 |
| 16 | **Cùng một hành động ở ba chỗ** ("Chỉ đường" × 3 trên một trang) | Mỗi hành động một lần, ở chỗ người ta cần nó (địa điểm), và một nút chính cố định |

## Quy tắc viết để không còn mùi AI

- Tiêu đề là danh từ có dữ liệu, không phải câu hỏi hay lời chào.
- Nút là động từ + đối tượng: "Mua vé", "Lưu", "Đăng sự kiện". Không "Bắt đầu", không "Khám phá ngay".
- Không câu giải thích dưới điều khiển; nếu cần, một gợi ý định dạng ("dd.mm.yyyy").
- Chữ thường cho mục; chữ hoa chỉ trong đầu bảng và tag.
- Trạng thái rỗng = một câu + một hành động: "Chưa có dự án nào. Tạo dự án".

## Quy tắc hình để không còn mùi AI

- Ảnh thật trước, tile chữ sau, hình học không bao giờ lặp quá một lần trong tầm nhìn.
- Một dải nhấn cho hành động chính, glow nhẹ chỉ trên nút đó; nhóm nội dung chỉ nhuộm chữ và marker, không nhuộm cả thẻ.
- Bề rộng luôn vừa thiết bị: không cuộn ngang ở đâu cả.
- Kính mờ chỉ trên ảnh và bản đồ. Bề mặt khác đặc, phân tầng bằng viền 1 px, không bóng đổ.
- Lưới 8 pt, bán kính 4 / 8 / 16 và pill, không giá trị lẻ.
- Mật độ thật: 3–4 thẻ một hàng ở 1440 px với ảnh 16:10; không thẻ nào cao hơn rộng trên máy tính.
