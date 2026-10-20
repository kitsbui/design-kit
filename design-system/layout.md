# Khung trang và mẫu layout

Breakpoint: `tab` 760 (gutter 16 → 32), `desk` 900 (rail thành cột, dock và thanh tab biến mất), `wide` 1200 (ô tìm trong thanh, rail của danh sách). Gutter `--kd-gutter` 16 / 32 / 64. Trang **full width** trên máy tính: `.kd-wrap` không có max-width; chữ dài giữ `max-w-read` (760 px); lưới thêm cột chứ không rộng ra. **Không trang công khai nào có cột bên** (chủ FeestFinder, 20.10.2026): hồ sơ và form nằm ở cột giữa (`max-w-page` 1200 / `max-w-read`), bài viết ở giữa; xem `patterns.md`.

## Site công khai

**Máy tính:** một thanh 57 px: logo (link về trang chủ, tên đọc "X, trang chủ"), 4 đích, ô tìm (⌘K / Ctrl+K; từ 900–1200 px là biểu tượng), chọn ngôn ngữ, **một** nút nhấn ("Đăng…"), menu tài khoản. Breadcrumb của trang chi tiết: danh sách › chính nó, không có crumb "Trang chủ".

**Điện thoại:** trên cùng logo + biểu tượng tìm. Dưới cùng thanh tab đặc, chạm mép, safe-area, **4 chỗ** (ở FeestFinder: Sự kiện, Bản đồ, Đã lưu, Tôi). Không nút "Đăng" ở trên: nó nằm trong "Tôi" và footer. Mọi thứ khác (các đích phụ, nhóm nội dung) ở trong sheet "Tìm" và trong "Tôi".

**"Tôi"** là một danh sách duy nhất: menu tài khoản trên máy tính, hub ở `/profile` trên điện thoại; chưa đăng nhập thì là nút đăng nhập + những gì làm được không cần tài khoản (đã lưu trên máy, đăng, ngôn ngữ, giới thiệu, góp ý).

**Không có gì nổi trên trang.** Góp ý ở footer, menu và rail. Thanh cuộn hệ thống ẩn, thanh overlay 3 px vẽ khi đang cuộn.

## Màn danh sách (trang chủ)

```
[nav]
[thanh lệnh dính .kd-cmd]  điện thoại: 4 khoảng thời gian một chạm (Segmented full)
                            máy tính: thành phố · thời gian · loại · giá · nguồn · (tìm) · xoá · chế độ xem
[h1 = ngữ cảnh có dữ liệu, 32 px; sr-only trên điện thoại]
[điện thoại: Thành phố ▾  Chip nhóm 1  Chip nhóm 2 … (top 6 theo facet)]
[ngày 1: "Thứ Bảy 18.10 · hôm nay"]
  [thẻ dẫn 16:9] [hàng] [hàng]     ← máy tính; ngày ≤ 2 đêm: thẻ dẫn trải ngang
  [hàng] [hàng] [hàng]             ← điện thoại: mọi đêm là hàng (thumb 52 + chữ + giá)
[ngày 2 …] [tháng sau: một tiêu đề mỗi tháng]
[footer]
```

- Sự kiện đầu tiên **trong màn đầu** ở 390 và 1440 (kiểm tra bằng e2e).
- Thành phố trước: đoán từ máy (time zone) khi thành phố đó có ≥ 3 đêm, nhớ lựa chọn (kể cả "mọi thành phố"), đánh dấu `<html>` trước first paint và danh sách chờ (ẩn) đúng thành phố để không CLS.
- Không rail bên danh sách (đã bỏ 20.10.2026): các ngày chiếm cả bề rộng, từ 1100 px thẻ dẫn và các hàng chia đều.
- Bảng là chế độ nâng cao (`?view=table`) chỉ trên máy tính. Bản đồ là một tab, hỏi dữ liệu khi mở và khi "tìm trong vùng này", không khi kéo.
- Thẻ: ảnh 16:10 (hoặc tile chữ), **tối đa một nhãn** và chỉ nhãn đổi quyết định; nút lưu trên ảnh; tên 16/600; một dòng meta; giá đậm; không viền, không bóng, không "n quan tâm" khi n = 0.

## Màn chi tiết (trang sự kiện)

```
[crumbs]
[ảnh 16:9 | poster ngày nếu không ảnh]   [kicker · h1 · 4 dữ kiện CHỈ LÀ DỮ KIỆN · (máy tính: nút phụ "Chọn vé") · lưu · chia sẻ · người tổ chức]
[panel Vé ngay sau hero ở mọi bề rộng: thẻ dọc dưới 760 px, một hàng (giá · nơi bán | nút) từ 760]
[lineup] [giới thiệu + thông tin chính gập] [nghe trước]
[địa điểm: tên, địa chỉ, Chỉ đường · Đặt xe · Chép địa chỉ; bản đồ 16:9 bên dưới]
[Thêm: Đi cùng bạn bè › · Cẩm nang › · Thêm lịch ▾ · Hỏi đáp (n) ▾ · Hype (n) ▾]
[sắp tới của cùng người tổ chức: hàng, 1 cột điện thoại / 2–3 cột rộng hơn]
[dock điện thoại: "TỪ 1.200.000₫" + Mua vé]   ← tránh đường khi panel Vé trong tầm nhìn
[footer]
```

- Dưới 900 px dock là **đường duy nhất** tới vé. Mỗi hành động xuất hiện **một lần**, ở chỗ cần nó.
- Khối rỗng không giữ chỗ: Hỏi đáp chưa có gì là một nút; "0" không hiện.
- Liên kết `#discussion` (từ thông báo) mở sẵn mục gập tương ứng.
- Tên không in hai lần: hero không ảnh là poster ngày, không tile chữ tên.

## Back office (Studio, Console)

- **Rail** ≤ 7 mục nhìn thấy; nhóm mở ra khi một trang trong nhóm đang mở, nhóm gập hiện số đếm; dưới 900 px rail thành thanh menu. Đầu rail là bộ chuyển không gian làm việc (vai trò); chân rail là hồ sơ và "Góp ý".
- **"Hôm nay"**: số liệu, biểu đồ, rồi **danh sách việc cần làm, mỗi hàng một nút** (Sửa, Bổ sung, Tiếp tục). Biểu đồ không có số thì nói vậy và đưa một hành động.
- **Bảng** là grid: cột co lại, không min-width; gập thành thẻ dưới 640 px (hoặc sớm hơn với `fold md/lg/xl` cho bảng nhiều cột). Link trong cell `min-w-0 flex-1` để vùng chạm đủ 44 px.
- **Drawer** từ phải cho chỉnh sửa; **hàng chờ** chia đôi từ 1200 px (danh sách 400 px + chi tiết, mỗi bên cuộn riêng), thanh chọn nhiều dính đáy danh sách, tab chi tiết giữ nguyên khi chuyển mục, phím tắt j/k/a/r/e/x.
- **Wizard**: 4 bước có tên (số trên, tên dưới trên điện thoại) dưới thanh tiến độ; một bước một màn; bước cuối là tóm tắt có "Sửa" từng bước; mở được trước khi đăng nhập (form giữ trên máy), đăng nhập ở "Gửi"; không dòng kỹ thuật ("0/3 phần bắt buộc").
- **Ba trạng thái** mỗi màn trước khi code: tải (skeleton giữ đúng kích thước cuối), rỗng (có việc để làm), lỗi (thử lại).

## Chống CLS (phase 7, 0,47 → ≤ 0,02)

- Trang tải nội dung ở client giữ chiều cao màn (`min-h-dvh`) trước footer.
- Khối đến sau first paint có kích thước cuối từ đầu; skeleton không nhỏ hơn số thật.
- Không margin trên khối đầu tiên của trang (nó đẩy `<body>`); dùng padding.
- Lựa chọn (sự kiện đang chọn, tab) tính trong render, không trong effect sau render.
- Bản đồ đứng đầu trên điện thoại ở 55dvh, danh sách bên dưới; MapLibre chỉ tải khi màn bản đồ mở.
- Thứ ít người mở (sheet đăng nhập, chọn vai trò, tìm, góp ý, lần đầu) tải khi mở (`next/dynamic`).
