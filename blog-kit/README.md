# blog-kit

Cách viết và trình bày blog đã dùng cho FeestFinder (20.10.2026: "EDM là gì?" và chín bài hướng dẫn dòng nhạc, song ngữ, nguồn đã kiểm, ảnh có giấy phép, 45 video kiểm bằng oEmbed), đóng gói để dùng lại ở dự án khác. Chủ dự án chỉ gửi tài liệu; agent làm hết phần còn lại.

| File | Là gì |
| --- | --- |
| [`writing.md`](writing.md) | Cấu trúc một bài, độ dài từng phần, giọng văn song ngữ, thuật ngữ giữ tiếng Anh, những gì không bao giờ bịa |
| [`presentation.md`](presentation.md) | Trang bài viết (cột giữa), ngữ pháp thân bài, ảnh có credit, bảng, player nhúng, FAQ, trình soạn VI/EN, luồng duyệt |
| [`seo-aio.md`](seo-aio.md) | Thẻ meta, canonical và hreflang, JSON-LD (BlogPosting, DefinedTerm, FAQPage, ItemList, BreadcrumbList), sitemap, `llms.txt`, bản `.md`; checklist điểm cao nhất |
| [`research.md`](research.md) | Nghiên cứu: nguồn uy tín, ảnh Wikimedia Commons có giấy phép, video kênh chính thức kiểm bằng oEmbed, kiểm link |
| [`template.md`](template.md) | Khung một bài (hai ngôn ngữ) để điền |
| [`scripts/`](scripts/) | `yt.py` (tìm YouTube kèm kênh và huy hiệu, `oembed()`), `commons.py` (ảnh Commons kèm giấy phép, tác giả, ảnh 1600 px), `check_urls.py` (mã HTTP của từng link), `wiki_titles.py` (tiêu đề Wikipedia tồn tại, không bị chuyển hướng) |

Skill: [`skills/blog-writing`](../skills/blog-writing/SKILL.md). MCP: `blog_guide`, `blog_template`, `blog_check` (chấm một bài theo các quy tắc ở đây), `blog_jsonld` (dựng JSON-LD cho bài).

## Năm điều rút gọn nhất

1. **Mở bài bằng định nghĩa 40–60 từ, thuật ngữ in đậm**, trả lời đúng câu người ta tìm ("X là gì?"). Đó là đoạn AI và Google trích.
2. **Mỗi khẳng định có nguồn, mỗi ảnh có giấy phép, mỗi video là kênh chính thức đã kiểm oEmbed.** Không chắc thì bỏ, không đoán năm, quốc tịch hay ID video.
3. **Song ngữ là hai bài viết, không phải một bản dịch**: mỗi ngôn ngữ tự nhiên; thuật ngữ nghề giữ tiếng Anh.
4. **Dữ liệu có cấu trúc đi cùng nội dung**: facts, FAQ 5 câu, nguồn, bài nhạc, bài cha → JSON-LD tương ứng.
5. **DB là nguồn thật để người biên tập sửa; repo giữ content pack; job nhập không ghi đè bản đã sửa.**
