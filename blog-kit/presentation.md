# Trình bày bài viết

## Trang bài viết

Một cột ở giữa, `mx-auto max-w-read` (≈ 760 px), trên máy tính cũng vậy: không cột bên, không mục lục dính lệch một bên.

```
[crumbs: Blog › bài (thẳng hàng với cột)]
[chuyên mục: link, màu thông tin]
[H1]
[sapo, màu chữ phụ]
[avatar · Tác giả · ngày · n phút đọc · Sửa (chỉ người có quyền)]
[chip các style/chủ đề → trang lọc]
[ảnh bìa 16:9 + "Ảnh bìa · Tác giả, giấy phép, nguồn"]
[Thông tin nhanh: dl 2 cột từ 760 px, viền trên dưới]
[thân bài]
[Bài nhạc: thumbnail + tên + năm · kênh · nền tảng + ghi chú; player tải khi bấm]
[Câu hỏi thường gặp: accordion, câu đầu mở; câu hỏi là h3]
[Trong chủ đề này: bài con, 2 cột] / [Thuộc: bài cha]
[Nguồn: danh sách đánh số, link mở tab mới]
```

- Bài chỉ có một ngôn ngữ: trang ngôn ngữ kia hiện nội dung gốc với `lang=` đúng trên khối đó và một dòng "Bài này viết bằng tiếng Việt".
- Phút đọc tính riêng cho từng ngôn ngữ.
- Không quảng cáo chen giữa định nghĩa và mục đầu tiên.

## Ngữ pháp thân bài (vẽ thành phần tử, không bao giờ HTML)

| Viết | Thành |
| --- | --- |
| `## Tiêu đề` / `### Tiêu đề` | h2 (cỡ d3) / h3 |
| `- mục` / `1. mục` | ul / ol |
| `> câu` | blockquote viền màu thông tin |
| `**đậm**` `*nghiêng*` | strong / em |
| `[chữ](https://…)` và link trần | a; link ra ngoài `target=_blank`, `rel="noopener nofollow ugc"` trừ bài của đội biên tập |
| bảng Markdown | lưới `role="table"`; dưới 560 px mỗi hàng thành thẻ có nhãn cột |
| `![alt](https://… "chú thích · credit")` trên một dòng | figure 16:9, `loading="lazy"`, `referrerPolicy="no-referrer"`, figcaption |

Ảnh được kiểm (`probeImage`) khi thêm: link https, là ảnh thật, không quá nặng.

## Media nhúng

- Người viết dán **link hoặc mã nhúng** (SoundCloud, Mixcloud, Spotify, YouTube). Server rút ra định danh rồi **dựng lại địa chỉ player** trên host cho phép; không bao giờ lưu hay vẽ HTML dán vào.
- YouTube dùng `youtube-nocookie.com`; thumbnail `i.ytimg.com/vi/<id>/hqdefault.jpg`.
- Trước khi bấm: chỉ thumbnail + chữ. Bấm: iframe `aspect-video` (YouTube) hoặc chiều cao của dịch vụ, autoplay.
- Host player phải nằm trong `frame-src` của CSP.

## Trình soạn

- Một tab VI / EN phía trên các trường song ngữ (tiêu đề, sapo, thân bài, facts, FAQ); nhãn trường ghi ngôn ngữ ("Tiêu đề · Tiếng Việt").
- Trường không song ngữ ở ngoài tab: chuyên mục (chip), ảnh bìa + credit, style, thành phố, nguồn, bài cha (chỉ đội biên tập), bài nhạc (thêm/xoá, ghi chú hai ngôn ngữ).
- Thanh trạng thái: Nháp · Chờ duyệt · Đã đăng · Bị trả lại (kèm lời nhắn của đội) và một nút chính (Gửi duyệt / Đăng).
- Thiếu gì để gửi thì liệt kê đúng thứ thiếu, không câu giải thích chung.

## Luồng duyệt

Bài người dùng gửi → hàng chờ của đội (mọi admin được báo). Tác giả sửa bài đã đăng → quay lại hàng chờ. Đội biên tập viết → đăng ngay. Bài từ content pack → chờ duyệt lần đầu; được cập nhật theo pack chỉ khi chưa ai sửa (`edited_at` rỗng); không bao giờ bị xoá bởi job.
