# Nghiên cứu: nguồn, ảnh, video

Các script trong `scripts/` chỉ đọc trang công khai; chạy bằng `python3`. Đặt `BLOG_KIT_UA="TênSite/1.0 (https://site; email)"` trước khi gọi Wikimedia (họ yêu cầu User-Agent có liên hệ).

## Nguồn

- Ưu tiên: bách khoa có biên tập (Britannica, Wikipedia cho dữ kiện đã có trích dẫn), báo/tạp chí chuyên ngành có tên tuổi (Resident Advisor, Mixmag, DJ Mag, Pitchfork, The Guardian, Red Bull Music Academy), trang chính thức của nghệ sĩ, label, lễ hội.
- Mỗi bài 4–5 nguồn khác nhà xuất bản; mỗi nguồn ghi `title`, `publisher`, `url`.
- `python3 scripts/check_urls.py < urls.txt` → chỉ giữ link trả 200. Một số nhà (Britannica, Red Bull) chặn script bằng 403: kiểm bằng trình duyệt/WebFetch hoặc bỏ.
- `python3 scripts/wiki_titles.py "Jeff Mills" "Burial (musician)"` → tiêu đề tồn tại, không bị chuyển hướng sang trang khác.

## Ảnh (Wikimedia Commons)

- `python3 scripts/commons.py queries.json` (mảng chuỗi tìm) → kích thước, file, giấy phép, tác giả, mô tả, link ảnh 1600 px.
- Chỉ giấy phép tự do: CC BY, CC BY-SA, CC0, public domain. Không "fair use", không "non-commercial".
- Ảnh bìa: ngang, ≥ 1200 px rộng. Dùng link thumbnail 1600 px, bỏ tham số `utm_`.
- Credit: `Tác giả (link tới trang file) · giấy phép · Wikimedia Commons`. Tác giả là HTML trong metadata: lấy chữ, bỏ thẻ.
- Ảnh trong thân bài: chú thích nói ảnh minh hoạ điều gì, rồi credit.

## Video (YouTube)

- `python3 scripts/yt.py queries.json` → id, tiêu đề, kênh, huy hiệu, độ dài.
- Thứ tự ưu tiên kênh: kênh nghệ sĩ có huy hiệu "Official Artist Channel" → "<Nghệ sĩ> - Topic" (label phát hành) → kênh label đã xác minh. **Không bao giờ** bản reup của fan.
- Kiểm từng video: `yt.oembed(id)` trả dữ liệu = nhúng được; giữ `author_name` làm tên kênh, `author_url` làm hồ sơ khi nghệ sĩ không có Wikipedia.
- Ghi năm chỉ khi chắc (năm phát hành gốc, không phải năm upload).

## Ghi lại trong báo cáo

Bài đã làm; chỗ đã sửa so với tài liệu; thứ bỏ và vì sao (link không kiểm được, ảnh thiếu giấy phép, video không nhúng được); bài đang chờ duyệt ở đâu.
