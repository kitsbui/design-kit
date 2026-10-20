# design-kit MCP

Một MCP server (stdio, Node 22.6+ chạy TypeScript trực tiếp) đưa toàn bộ kit vào bất kỳ phiên agent nào: Claude Code, Claude Desktop, hoặc một client MCP khác.

## Cài

```bash
cd design-kit/mcp && npm install
```

Thêm vào `.mcp.json` của dự án (xem `.mcp.example.json`):

```json
{ "mcpServers": { "design-kit": { "command": "node", "args": ["/abs/path/design-kit/mcp/src/server.ts"] } } }
```

`measure_first_screen` cần Chromium: `npx playwright install chromium` trong `mcp/` một lần (Playwright đã nằm trong `optionalDependencies`). Hoặc đặt `DESIGN_KIT_PLAYWRIGHT` trỏ tới `node_modules/playwright/index.mjs` của một dự án đã cài để dùng chung bản của dự án đó.

## Công cụ

| Tool | Trả về |
| --- | --- |
| `design_principles` | năm câu của hệ thống, quy tắc người mới, cách dùng |
| `design_tokens` `{format: css\|vanilla\|json}` | token theo vai trò, tối và sáng |
| `design_parts` | danh mục phần tử và hợp đồng class |
| `design_layout` | khung trang, màn danh sách, màn chi tiết, back office, chống CLS |
| `design_patterns` | mẫu trang sau redesign: một cột không cột bên, hồ sơ kiểu dịch vụ nhạc, playlist sóng âm, bài viết ở giữa, cờ ngôn ngữ, điện thoại ẩn khung, ngân sách |
| `design_copy` | quy tắc chữ, cơ chế `{en, vi}`, microcopy |
| `design_checklist` `{lang}` | checklist PR |
| `design_rubric` `{part}` | bảng điểm, định nghĩa 9/9,5/10, số đo người mới, chọn màu, 16 mùi AI |
| `learnings` `{query?}` | tìm trong LEARNINGS.md theo từ khoá |
| `measure_first_screen` `{url, width?, height?, waitFor?}` | số chỗ bấm trong màn đầu (kèm tên), tab bar, tiêu đề, nhãn hoa, bộ lọc "Mọi X", số màn, lỗi JS |
| `scaffold` `{target, what[], dryRun?}` | chép gates / skills / governance / tokens / CLAUDE.md / artboard / blog-kit vào repo; không ghi đè |
| `blog_guide` `{part}` | cách viết (cấu trúc, độ dài, song ngữ, thuật ngữ), trình bày, SEO/AIO, nghiên cứu (`blog-kit/`) |
| `blog_template` | khung một bài hai ngôn ngữ |
| `blog_check` `{title, excerpt, body, lang, kind?, pillar?, faq?, sources?, facts?}` | chấm một bài: độ dài tiêu đề/sapo, định nghĩa mở bài, độ dài, mục, bảng, danh sách số, không HTML, link https và nội bộ, ảnh có credit, FAQ, nguồn, facts |
| `blog_jsonld` `{url, title, description, …}` | graph JSON-LD: BlogPosting (citation), DefinedTerm, FAQPage, ItemList, BreadcrumbList |

## Thử

```bash
npm test                                   # liệt kê tool, gọi các tool rẻ
MEASURE_URL=https://feestfinder.com npm test   # thêm một lần đo (cần Playwright)
```
