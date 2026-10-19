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

`measure_first_screen` cần Playwright: `npm i playwright && npx playwright install chromium` trong `mcp/`, hoặc đặt `DESIGN_KIT_PLAYWRIGHT` trỏ tới `node_modules/playwright/index.mjs` của một dự án đã cài.

## Công cụ

| Tool | Trả về |
| --- | --- |
| `design_principles` | năm câu của hệ thống, quy tắc người mới, cách dùng |
| `design_tokens` `{format: css\|vanilla\|json}` | token theo vai trò, tối và sáng |
| `design_parts` | danh mục phần tử và hợp đồng class |
| `design_layout` | khung trang, màn danh sách, màn chi tiết, back office, chống CLS |
| `design_copy` | quy tắc chữ, cơ chế `{en, vi}`, microcopy |
| `design_checklist` `{lang}` | checklist PR |
| `design_rubric` `{part}` | bảng điểm, định nghĩa 9/9,5/10, số đo người mới, chọn màu, 16 mùi AI |
| `learnings` `{query?}` | tìm trong LEARNINGS.md theo từ khoá |
| `measure_first_screen` `{url, width?, height?, waitFor?}` | số chỗ bấm trong màn đầu (kèm tên), tab bar, tiêu đề, nhãn hoa, bộ lọc "Mọi X", số màn, lỗi JS |
| `scaffold` `{target, what[], dryRun?}` | chép gates / skills / governance / tokens / CLAUDE.md / artboard vào repo; không ghi đè |

## Thử

```bash
npm test                                   # liệt kê tool, gọi các tool rẻ
MEASURE_URL=https://feestfinder.com npm test   # thêm một lần đo (cần Playwright)
```
