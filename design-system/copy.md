# Chữ trên màn hình

## Quy tắc

1. **Tiêu đề và hành động, không giải thích.** Chủ dự án FeestFinder nói rõ: "người dùng muốn tiêu đề và hành động". Gợi ý chỉ khi có quy tắc định dạng. Không "tips card", không dòng "vì sao chúng tôi hỏi".
2. **Không dòng trạng thái đếm kết quả** ("14 sự kiện", "cập nhật 2 phút trước"). Số đếm vào tab hoặc chip khi nó là bộ lọc.
3. **Tiêu đề là danh từ có dữ liệu**: "Cuối tuần này ở TP.HCM", không "Khám phá sự kiện".
4. **Nút là động từ + đối tượng**: "Mua vé", "Lưu", "Đăng sự kiện". Một nút chính mỗi màn.
5. **Chữ hoa chỉ ở đầu bảng và tag** (11 px, tracking 0,06em). Mục là chữ thường 24 px đậm.
6. **Trạng thái rỗng = một câu + một hành động.** Trạng thái lỗi = một câu + "Thử lại".
7. **Tên đọc được bắt đầu bằng chữ hiển thị** (WCAG label-in-name): `aria-label="Lưu Headsmasher 5"` cho nút tim ghi "Lưu".
8. **Không tên nội bộ ở màn đầu** (tên nguồn dữ liệu, điểm số, cơ chế). Chúng vào "Thêm", "Tôi" hoặc back office.
9. **Ngôn ngữ đầu tiên là của người dùng** (FeestFinder: tiếng Việt trước). Mọi chuỗi là cặp `{en, vi}`; không bao giờ hard-code một ngôn ngữ trong điều kiện (`lang !== mặc định`, không `=== 'en'`).

## Cơ chế hai ngôn ngữ, rồi nhiều ngôn ngữ

```ts
// copy.ts của mỗi màn
export const WEB = {
  buyTickets: { en: 'Buy tickets', vi: 'Mua vé' },
  fromPrice: { en: 'from {p}', vi: 'từ {p}' },
};
// đọc: pick(WEB, lang).buyTickets; một dòng: tx(pair, lang); điền: fill(T.fromPrice, { p })
```

- Server: `L('English', 'Tiếng Việt')` trả cặp; API viết hai ngôn ngữ, màn hình chọn.
- Ngôn ngữ thứ ba trở đi (Thái, Nhật, Indonesia ở FeestFinder): một tệp mỗi ngôn ngữ, **khoá là dòng tiếng Anh**, chỉ gửi kèm trang trong ngôn ngữ đó; dòng thiếu đọc tiếng Anh. Ngày và số qua `Intl` của từng locale, không hard-code.
- Một dòng công khai mới phải có bản dịch ở mọi tệp ngôn ngữ: viết một script đối chiếu (`grep` khoá tiếng Anh) và chạy trước khi mở PR. FeestFinder bỏ sót 2 dòng ở phase 11–12 vì thiếu bước này.
- Tên ngôn ngữ ở footer viết bằng chữ bản địa thì vẽ bằng `system-ui` qua `::before`, nếu không mỗi trang sẽ tải webfont của ngôn ngữ đó.
- Người bản ngữ duyệt trước khi quảng bá ở nước đó: xuất CSV (khoá tiếng Anh, bản gốc, bản dịch, cột ghi chú), nhập lại bản sửa.

## Microcopy thường gặp (vi · en)

| Việc | vi | en |
| --- | --- | --- |
| Hành động chính mua | Mua vé | Buy tickets |
| Lưu / bỏ lưu | Lưu · Đã lưu | Save · Saved |
| Giá chưa rõ | Chưa rõ giá | Price not given yet |
| Giá ở nơi bán | Giá ở trang bán vé | Price on the ticket page |
| Miễn phí | Miễn phí | Free |
| Rỗng có hành động | Chưa có dự án nào. Tạo dự án | No projects yet. Start one |
| Lỗi | Không tải được. Thử lại | Could not load. Try again |
| Đăng nhập muộn | Đăng nhập để gửi duyệt | Log in to submit |
| Lưu trên máy | Đăng nhập để giữ trên mọi thiết bị | Log in to keep them on every device |
| Mục gập | Thêm | More |
| Quy tắc | Quy tắc | Rules |
| Hỏi | Đặt câu hỏi | Ask a question |
