# Khung một bài (điền cả hai ngôn ngữ)

```yaml
key: <pack>/<slug>            # không bao giờ đổi sau khi nhập
slug: <slug>
category: styles | news | playlists | skills | venues
parent: <pack>/<slug-bài-trụ>  # bài vệ tinh
styles: [<khoá>, …]
cover:
  url: https://upload.wikimedia.org/…/1600px-….jpg
  credit: "[Tác giả](https://commons.wikimedia.org/wiki/File:…) · CC BY-SA 4.0 · Wikimedia Commons"
title:
  vi: "<Từ khoá> là gì? <lời hứa>"          # ≤ 60 ký tự
  en: "What is <keyword>? <promise>"
excerpt:
  vi: "<140–170 ký tự>"
  en: "<140–170 characters>"
facts:                                       # 5–6
  - { label: { vi: "Tempo", en: "Tempo" }, value: { vi: "120–135 BPM", en: "120–135 BPM" } }
faq:                                         # 5
  - q: { vi: "…?", en: "…?" }
    a: { vi: "30–80 từ, đứng một mình.", en: "30–80 words, standalone." }
sources:                                     # 4–5, đã kiểm 200
  - { title: "…", publisher: "…", url: "https://…" }
tracks:                                      # 5, kênh chính thức, đã kiểm oEmbed
  - { url: "https://www.youtube.com/watch?v=…", year: 1992, note: { vi: "Nghe …", en: "Listen for …" } }
```

## Thân bài (tiếng Việt; bản tiếng Anh cùng cấu trúc)

```markdown
**<Từ khoá> là … (40–60 từ trả lời thẳng câu hỏi, đứng một mình được).**

## <Từ khoá> nghe như thế nào

### Kick và trống
…

### Bass
…

## Lịch sử
…

![<alt mô tả>](https://upload.wikimedia.org/…/1600px-….jpg "<ảnh minh hoạ điều gì> · <Tác giả>, CC BY-SA 4.0, Wikimedia Commons")

## 5 nghệ sĩ nên nghe

| Nghệ sĩ | Quốc gia | Vì sao nên nghe | Hồ sơ |
| --- | --- | --- | --- |
| … | … | … | [Wikipedia](https://en.wikipedia.org/wiki/…) |

## Các nhánh

| Nhánh | Khác gì | BPM | Ví dụ |
| --- | --- | --- | --- |

## <Từ khoá> khác <thứ gần nhất> thế nào

| | <Từ khoá> | <Thứ gần nhất> |
| --- | --- | --- |

## Nhận ra <từ khoá> thế nào

1. …
2. …

## Nghe <từ khoá> ở đâu

[Các đêm <từ khoá> sắp tới](/?style=<khoá>) …

## Đọc tiếp

- [<bài 1>](/blog/<slug-1>)
- [<bài 2>](/blog/<slug-2>)
- [<bài 3>](/blog/<slug-3>)
```
