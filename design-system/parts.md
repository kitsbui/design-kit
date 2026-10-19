# Danh mục phần tử

Mỗi phần có một class gốc `kd-*` (CSS trong dự án) và một component React mỏng gọi nó. Phần mới vào `/kit` trước khi vào màn hình. Kích thước chạm: mọi thứ bấm được ≥ 44 × 44 px (`kd-btn`, `kd-chip`, `kd-tab`, segment, ô nhập đã đủ; chữ bấm được thêm `kd-hit`; điều khiển nhỏ cố định thêm `kd-tap`).

## Chữ

| Class | Cỡ / đậm | Dùng cho |
| --- | --- | --- |
| `kd-d1` | clamp(36–56) / 700, tracking −0,04em | h1 trang chi tiết |
| `kd-d2` | 32 / 700 | h1 trang danh sách ("Cuối tuần này ở TP.HCM"), tên địa điểm |
| `kd-d3` | 24 / 700 | h2 mục |
| `kd-h` | 17 / 600 | tên thẻ, summary accordion |
| `kd-hs` | 15 / 600 | tên hàng, tên trong rail |
| `kd-t` | 15 / 400, fg-2 | thân |
| `kd-s` | 13 / 400, fg-3 | meta |
| `kd-m` | 11 / 400, hoa, tracking 0,06em, fg-3 | đầu bảng, nhãn dữ kiện, tag |
| `kd-mb` | 13 / 500, fg-1, tabular | giá, số nổi bật |
| `kd-num` | tabular-nums | mọi số trong bảng và giá |
| `kd-ell` | nowrap + ellipsis + min-width 0 | dòng một hàng |

## Nút: 4 giọng, 1 hình

`buttonClass({ tone, size, pill, block, glow })` → `kd-btn kd-btn-{acc|ghost|danger} kd-btn-{sm|lg} kd-btn-glow`.

| Giọng | Hình | Dùng |
| --- | --- | --- |
| `acc` | dải nhấn, chữ nền tối 600, glow tuỳ chọn | **một** mỗi màn; `glow` chỉ cho nút dẫn trang (dock, panel vé) |
| `default` | viền `line-2`, chữ fg-1 | hành động phụ, nhiều được, đứng cạnh nút chính |
| `ghost` | không nền | tiện ích trong dòng (menu, lịch khác) |
| `danger` | nền `bad` | chỉ trong dialog xác nhận |

Cao: `sm` 36 (+ hit area 44), `md` 44, `lg` 52. Bo 8; `pill` chỉ cho avatar-button. Tắt: opacity 0,38; nút chính tắt thành bề mặt 2 với viền (không mờ dải).

## Bộ lọc và chọn

| Phần | Class | Quy tắc |
| --- | --- | --- |
| Chip | `kd-chip` (+ `aria-pressed`) | bo 8, cao 36 + hit 44; bật = nền info 14% + viền info; số đếm `kd-chip-n`; hàng chip **xuống dòng** (`kd-hscroll` là flex-wrap) |
| Picker | nút "Trường: Giá trị ▾" + `Menu` với `menuitemradio` | tên trường luôn hiện; giá trị đang chọn đậm |
| Segmented | `kd-seg` (+ `kd-seg-full` trên điện thoại) | 2–4 lựa chọn ngang hàng, một chạm; tên nhóm qua `aria-label` |
| Tab link | `nav` + `.kd-tabs` | tab là đường dẫn; `aria-current` |
| Tab tại chỗ | `tablist` + phím mũi tên | chỉ khi đổi nội dung tại chỗ |
| Switch | `kd-switch` `role="switch"` | trạng thái bằng màu track **và** vị trí núm |
| Ô nhập | `kd-field` | cao 44, focus = viền lime 2 px, lỗi = viền bad; `font-size: 16px` dưới 760 để iOS không zoom |

## Tag và trạng thái

| Phần | Class | Quy tắc |
| --- | --- | --- |
| Tag | `kd-tag` (+ `-glass` trên ảnh, `-featured` dải nhấn, `-line` viền, `-bad` chấm đỏ) | bo 4, 11 px hoa; một thẻ **tối đa một** tag |
| Trạng thái | `kd-st kd-{ok|warn|bad|live}` | chấm 7 px + chữ; `live` nhấp nháy |
| Marker nhóm | `kd-mk` | 7 px bo 2, màu info, trước tên nhóm |
| Pill (Console) | `Pill tone` | như trạng thái, trong bảng |

## Hình ảnh

| Phần | Class | Quy tắc |
| --- | --- | --- |
| Art | `kd-art` + `layout` card/banner/hero/mono/poster | ảnh, hoặc tile chữ từ `data-t`/`data-k`/`data-m` (CSS vẽ, không lặp text trong DOM); dưới 160 px: monogram; `kd-off` cho hết vé/đã qua |
| Avatar | `Avatar size ring org` | pill cho người, bo 8 cho tổ chức; thiếu ảnh: hai chữ cái |
| Ảnh liên kết | `referrerPolicy="no-referrer"`, hỏng thì initials | `#ff=x,y,z` mang khung ảnh (điểm giữ, zoom) |
| Emblem (huy hiệu, dấu) | `kd-emb` | vòng info + icon riêng; không năm ô giống nhau |

## Hàng, thẻ, bảng

| Phần | Class | Quy tắc |
| --- | --- | --- |
| Hàng có thumb | `kd-row` | grid 52 px + chữ + phải; viền dưới `line-1`; cao ≥ 68 |
| Hàng danh sách | `kd-lrow` | flex, cao ≥ 56; icon fg-3 + chữ + chevron; là `<a>` cả hàng |
| Thẻ sự kiện | `kd-ev` (+ `-lead`, `-row`) | một markup ba dáng (lưới, dẫn 16:9, hàng) |
| Card panel | `kd-card` | bề mặt 1 + viền 1; không bóng |
| Table / Row | `Table cols head` + `Row` | grid; dưới 640 px (hoặc `fold`) mỗi hàng thành thẻ với `role="cell"` và nhãn cột |
| Accordion | `kd-acc` (`<details>`) | summary 56 px, `aside` số đếm phải; `open` từ hash |

## Khung và lớp phủ

| Phần | Class | Quy tắc |
| --- | --- | --- |
| Wrap | `kd-wrap` | full width + gutter |
| Thanh lệnh | `kd-cmd` | sticky dưới nav, nền surface-0, viền dưới |
| Split | `kd-split` / `kd-main` / `kd-side` | chi tiết + cột dính (aside `desk:sticky`) |
| Tab bar | `TabBar edge` | cố định đáy, đặc, safe-area, 4 mục, `aria-current` |
| Dock | `kd-buy-dock` / `kd-dock` | trên tab bar; `data-away` khi panel chính trong tầm nhìn; `aria-hidden` theo |
| Sheet | `Sheet` + `useId()` cho tiêu đề | từ đáy, bo 16 trên, trả focus khi đóng, tải khi mở |
| Drawer | `Drawer` | từ phải, nền mờ, back office |
| Menu | `kd-menu` | gần đục (không blur trong blur) |
| Rail | `SideNav` | ≤ 7 mục, nhóm `sub`, số đếm khi gập |
| Toast | `kd-toast[popover]` | trên dock; một dòng, có "Đổi…" khi hợp lý |
| Skip link | `SkipLink` | Tab đầu tiên của mọi trang |
| Scrollbars | `scrollbars.tsx` | hệ thống ẩn; thumb 3 px vẽ khi cuộn; không style per-screen |
