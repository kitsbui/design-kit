# SEO và AIO cho bài viết

AIO = để trợ lý AI (ChatGPT, Perplexity, Google AI Overviews, Claude) hiểu, trích đúng và dẫn link về. Cùng một gốc với SEO: nội dung trả lời thẳng, có cấu trúc, có nguồn, máy đọc được.

## Trên trang

| Mục | Quy tắc |
| --- | --- |
| `<title>` | tiêu đề bài (≤ 60 ký tự) + " | Site" |
| meta description | sapo 140–170 ký tự |
| canonical | địa chỉ của chính ngôn ngữ đó (VI không tham số, EN `?lang=en`) |
| hreflang | **chỉ khi bài có hai ngôn ngữ thật**: `vi`, `en`, `x-default`; bài một ngôn ngữ thì không khai alternates (gộp về canonical) |
| Open Graph | `og:type=article`, ảnh 1200×630 (ảnh bìa hoặc ảnh mặc định của site), `article:published_time`, `article:author` |
| H1 | một, bằng tiêu đề |
| Mở bài | định nghĩa 40–60 từ, thuật ngữ in đậm |
| Ảnh | `alt` mô tả, không nhồi từ khoá; credit dưới ảnh |
| Link nội bộ | 3 bài cùng cụm + trang sản phẩm liên quan (lọc theo style/chủ đề) |

## JSON-LD (một `@graph`)

- `BlogPosting`: `headline`, `description`, `image`, `datePublished`, `dateModified`, `author` (Person, hoặc Organization cho đội biên tập), `publisher`, `inLanguage`, `mainEntityOfPage`, `wordCount`, `keywords`, **`citation`** (mỗi nguồn một `CreativeWork` có `url`, `name`, `publisher`), `about`.
- `DefinedTerm` cho bài "X là gì?": `name`, `description` (đoạn định nghĩa), `inDefinedTermSet`; `BlogPosting.about` trỏ vào nó.
- `FAQPage` với 5 `Question`/`acceptedAnswer` đúng như chữ trên trang.
- `ItemList` các `MusicRecording` (hoặc `VideoObject`) cho bài nhạc: `name`, `url`, `byArtist`, `datePublished` khi chắc.
- `BreadcrumbList`: Blog › (bài cha ›) bài.

Công cụ MCP `blog_jsonld` dựng đúng graph này từ dữ liệu bài.

## Ngoài trang

- Sitemap: mỗi ngôn ngữ một URL khi có hai ngôn ngữ, `lastmod` = `dateModified`.
- `llms.txt`: mục "Blog" liệt kê bài trụ và bài vệ tinh, mỗi dòng tiêu đề + link + một câu.
- Bản `.md` của bài (`/blog/<slug>.md`): tiêu đề, định nghĩa, facts, thân bài, FAQ, nguồn; cho agent đọc nhanh.
- Không chặn bot AI trong robots.txt nếu muốn được trích.

## Checklist "điểm cao nhất"

- [ ] Tiêu đề ≤ 60 ký tự có từ khoá; sapo 140–170 ký tự.
- [ ] Đoạn định nghĩa 40–60 từ ở đầu, thuật ngữ in đậm.
- [ ] ≥ 4 mục `##`, ≥ 2 bảng, ≥ 1 danh sách đánh số (bài guide).
- [ ] 5–6 facts, 5 FAQ (25–80 từ mỗi câu trả lời), 4–5 nguồn trả 200.
- [ ] Mọi ảnh có alt, credit, giấy phép tự do; mọi video là kênh chính thức đã kiểm oEmbed.
- [ ] 3 link nội bộ tới bài cùng cụm, 1 tới trang sản phẩm.
- [ ] JSON-LD hợp lệ (Rich Results Test / validator.schema.org); hreflang chỉ khi hai ngôn ngữ.
- [ ] Có trong sitemap, `llms.txt`, có bản `.md`.

`blog_check` kiểm tự động phần chữ của checklist này.
