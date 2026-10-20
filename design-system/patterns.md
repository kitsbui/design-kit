# Mẫu trang đã chứng minh (bổ sung 20.10.2026)

Rút từ một ngày làm theo yêu cầu trực tiếp của chủ FeestFinder sau redesign: bỏ mọi cột bên, trang nghệ sĩ kiểu dịch vụ nhạc, trình phát có sóng âm, bài blog ở giữa, công tắc ngôn ngữ bằng cờ, điện thoại toàn màn hình. Mỗi mẫu: **khi nào dùng**, **cấu trúc**, **chi tiết làm nó đúng**, **cách kiểm**.

## 1. Một cột, không cột bên

**Khi nào:** mọi trang công khai. Cột bên phải (rail, aside, "7 ngày tới", "Thông tin chính", panel vé dính) làm trang lệch và chia sự chú ý; trên điện thoại nó rơi xuống cuối nên thứ tự đọc khác nhau giữa hai thiết bị. Chủ dự án nói hai lần ("bỏ cột bên phải… apply cho toàn bộ trang web").

**Cấu trúc:**

| Loại trang | Bề rộng | Ghi chú |
| --- | --- | --- |
| Danh sách, sự kiện | full width trong gutter | lưới thêm cột, chữ dài `max-w-read` |
| Hồ sơ (nghệ sĩ, người dùng) | cột giữa `max-w-page` (1200 px) | hero và crumbs thẳng hàng với cột |
| Bài viết | cột giữa `max-w-read` (760 px) | ảnh bìa, bảng, FAQ, nguồn đều trong cột |
| Form công khai (quảng cáo) | cột giữa `max-w-read` | bảng giá trên form, liên hệ dưới |
| Trình soạn bài | cột giữa `max-w-3xl` | |

**Chi tiết:**
- Những gì từng ở cột bên **gập ở cuối cột** (Accordion "Thông tin chính", "Đã diễn", địa điểm, thiết bị), trừ thứ người ta cần ngay: đặt nó **liền kề** nội dung nó giải thích (chủ dự án: "thông tin chính để liền kề với phần giới thiệu").
- Panel vé của trang sự kiện thành **một hàng từ 760 px** ngay dưới hero: giá + nơi bán bên trái, nút chính bên phải (`w-auto`); dưới 760 px là thẻ dọc với nút full width.
- Địa điểm: chữ và nút đi (`max-w-read`) **trên** bản đồ; bản đồ `aspect-video` có `max-h`, không ép chiều cao cố định.
- Breadcrumb có tham số `width` để thẳng hàng với cột giữa; không thì nó lệch trái so với nội dung.
- Back office giữ panel làm việc (danh sách | chi tiết, form | xem trước): đó là công cụ, không phải trang đọc.

**Kiểm:** e2e `expect(page.getByRole('complementary')).toHaveCount(0)` trên các trang công khai; thứ tự tiêu đề `getByRole('heading', { level: 2 }).allInnerTexts()`.

## 2. Hồ sơ kiểu dịch vụ nhạc (trang nghệ sĩ)

**Khi nào:** trang của một người sáng tạo mà người xem đến để *nghe, xem lịch, theo dõi*. "Long trọng" = hero lớn, tên rất to, một hành động chính.

**Thứ tự (chủ dự án chốt):**
1. Hero: ảnh bìa trải ngang (chỉ khi có), mờ dần vào nền; avatar tròn lớn chồng lên mép dưới ảnh; kicker "Nghệ sĩ đã xác minh" (dấu tích màu thông tin); **tên** `clamp(2.5rem, 7vw, 5.5rem)`, 800, `letter-spacing: -0.04em`, `line-height: 1`, `overflow-wrap: anywhere`; một dòng meta (vai trò · style · thành phố).
2. Hàng hành động: **"Phát"** (pill, tone nhấn, glow: hành động duy nhất của màn), Theo dõi hoặc "Đây là tôi" (hồ sơ chưa ai nhận), Chia sẻ, trạng thái booking (chấm + chữ). Hàng số liệu (người theo dõi, đang theo dõi, sắp diễn) giữa hai đường kẻ.
3. **Sắp diễn**: 3 thẻ nổi bật (mỗi thẻ kèm "Mua vé" đi qua `/go?src=artist`), phần còn lại là hàng có ngày.
4. **Giới thiệu**: bio → thông tin chính (gập, ngay dưới bio) → link mạng xã hội → lưới dữ kiện booking (2–3 cột) → "Diễn cùng nhiều nhất" → các mục gập (lịch rảnh, đã diễn, địa điểm, thiết bị) → huy hiệu.
5. **Nghe**: playlist MP3 (mẫu 3), rồi các mix (SoundCloud/Mixcloud/Spotify tải player khi bấm).
6. **Khoảnh khắc** cuối cùng.

**Chi tiết:**
- Không có ảnh bìa → không có banner (không lặp tên); avatar không chồng mép.
- "Phát" khi chưa có playlist là link `#mix`; có playlist thì phát bài đầu qua sự kiện `window` (`ff:play-artist`) mà trình phát lắng nghe.
- Giữ neo của các tab cũ (`#shows`, `#about`, `#played`, `#mix`) để link cũ không gãy.
- Kích thước tuỳ ý (ảnh bìa `clamp(220px, 32vw, 440px)`, avatar 128 → 192) đặt trong class CSS (`.kd-artist-cover`, `.kd-artist-photo`) chứ không `h-[…]` khi ngân sách `[Npx]` đã đầy.
- Không tự thêm "Nghệ sĩ tương tự" nếu không có bằng chứng; chủ dự án đã bỏ nó.

**Kiểm:** heading cấp 2 theo thứ tự Sắp diễn < Giới thiệu < Nghe; nút "Mua vé" trong vùng "Sắp diễn" trỏ `/go/<slug>?src=artist`.

## 3. Trình phát có sóng âm (playlist ≤ 10 bài)

**Khi nào:** nghệ sĩ dán link MP3 họ tự host; muốn thấy sóng âm như SoundCloud mà không tải file khi chỉ xem trang.

**Kiến trúc:**
- **Server đo một lần khi thêm**: tải file (giới hạn byte, timeout, chống SSRF), giải mã từng khúc 64 KB bằng `mpg123-decoder` (WASM, không cần ffmpeg), lấy max mỗi khối → **600 điểm 0–100** + thời lượng; lưu cùng bài. File không đọc được thì không bao giờ vào trang.
- **Trình duyệt vẽ ngay** các vạch SVG từ peaks (cùng chiều cao với player thật: không CLS).
- **wavesurfer.js** (BSD-3) chỉ tải khi playlist gần vào màn (`IntersectionObserver`, `rootMargin: 300px`) hoặc khi bấm phát; khởi tạo với `media` là một `Audio` `preload="none"`, `peaks` và `duration` có sẵn → **không fetch file để vẽ**, chỉ stream khi phát.
- Màu đọc từ token lúc chạy (`getComputedStyle(document.documentElement).getPropertyValue('--color-info')`), không hex trong component.
- Hàng bài: nút full row, `aria-current` cho bài đang chọn, số thứ tự thành biểu tượng tạm dừng khi đang phát; trước/sau; hết bài tự sang bài kế.
- CSP: `media-src 'self' https:`. Thiếu dòng này, `default-src 'self'` chặn audio từ host khác.
- Không biết thời lượng → đừng `await load()` trước `play()` (với `preload="none"` metadata chỉ đến khi phát: chờ là treo).

**Kiểm:** e2e chặn host MP3 bằng `page.route(...).fulfill({ body: fixture, contentType: 'audio/mpeg' })`; bấm "Phát" ở hero → "Tạm dừng" hiện trong vùng "Playlist"; "Bài sau" đổi `aria-current`. Test API: file mẫu 2 giây cho đúng 600 peaks, giữa to hai đầu nhỏ; quá 10 bài trả `tracks_full`.

## 4. Bài viết ở giữa

Cột `mx-auto max-w-read`: chuyên mục (link, màu thông tin) → H1 → sapo → tác giả · ngày · phút đọc → chip style → ảnh bìa 16:9 có dòng credit → "Thông tin nhanh" (`dl` 2 cột) → thân bài → bài nhạc (player tải khi bấm) → FAQ (accordion, câu đầu mở) → bài con / bài cha → nguồn (danh sách số). Bảng thành thẻ dưới 560 px. Chi tiết trong `blog-kit/presentation.md`.

## 5. Công tắc ngôn ngữ bằng hai lá cờ

- Cờ vẽ bằng CSS (SVG data-URI trong file token, class `kd-flag-vn`/`kd-flag-us`), không component JS: tiết kiệm ngân sách JS mỗi trang. Cờ của trang hiện tại có vòng màu thông tin.
- Lần đầu: ngôn ngữ mặc định (chủ dự án chọn EN). Lần sau: ngôn ngữ cuối cùng người đó chọn, đọc từ cookie **ở proxy trước khi vẽ trang** → không nhảy chữ, không chuyển ngược người đã chọn VI về EN kể cả khi họ mở một link `?lang=en` được chia sẻ.
- Link chọn ngôn ngữ là `?setlang=xx`: proxy ghi cookie rồi redirect về địa chỉ sạch; chạy được không cần JS. Đã đăng nhập thì lưu cả vào tài khoản.
- Crawler, link preview và trình duyệt headless **không bao giờ** bị chuyển (SEO và test).
- Bản build cho e2e đặt mặc định riêng (`NEXT_PUBLIC_DEFAULT_LANG=vi`) để các test cũ giữ nguyên.

## 6. Điện thoại "nhập vai" (ẩn khung khi cuộn)

Cuộn xuống: nav trên, thanh lệnh, tab bar, dải cài đặt trượt ra ngoài (`<html data-chrome-away>` + `transform`); dock "Mua vé" rơi xuống mép dưới. Cuộn lên: trở lại. Chạm đầu tiên xin toàn màn hình nơi trình duyệt cho (Android; iPhone không). Bỏ qua dưới `navigator.webdriver` để test không chập chờn. Component tải bằng `next/dynamic`.

## 7. Con số thật và chia sẻ

- Đếm **người thật** (tài khoản đã tham gia) so với mục tiêu ("Cần gọi" → "Mục tiêu waitlist 200 · 37 người đã tham gia"); báo chủ dự án một lần khi đạt.
- Một sheet chia sẻ dùng chung cho mọi trang không phải sự kiện (Zalo, Facebook, Messenger, Threads, X, Telegram, chép link; tải khi mở).
- Số tiền rút gọn theo ngôn ngữ ("50 triệu", "1 tỷ"; "$5K") khi là preset, đầy đủ khi là con số thật.

## 8. Giữ ngân sách JS và px

- Tách file copy theo trang (một trang không tải chuỗi của trang khác).
- Thứ ít người mở → `next/dynamic` (sheet chia sẻ, công tắc cờ có placeholder giữ đúng bề rộng).
- Hình trang trí bằng CSS thay vì component.
- Ngân sách `[Npx]` chỉ được giảm: khi bỏ code cũ có giá trị tuỳ ý (ví dụ `gap-[clamp(28px,4vw,56px)]` của `kd-split`), **hạ ngân sách** ngay trong cùng thay đổi (FeestFinder: 104 → 98).
