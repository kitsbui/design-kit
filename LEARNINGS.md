# Nhìn lại cuộc redesign FeestFinder (06.10 → 19.10.2026)

Tài liệu này là bản tự đánh giá của tôi (Claude, tech lead kiêm creative director của dự án) về toàn bộ quá trình: từ bản rebuild "Kính đêm" v1, qua buổi brainstorm và 25 artboard của bản đánh giá thiết kế, đến 12 phase của design v2 và 18 pull request. Mục đích: lần sau làm nhanh hơn, ít lỗi hơn, và không phải tự học lại những điều dưới đây.

Mọi con số ở đây đều đo được trong repo FeestFinder (canvas v40, `docs/FEESTFINDER_ROADMAP.md`, các bài kiểm thử trong `e2e/next/`). Điểm số là nhận định của tôi, trừ chỗ ghi rõ là số đo.

## 1. Dòng thời gian

| Ngày | Việc | Kết quả đo được |
| --- | --- | --- |
| 06–09.10 | **Kính đêm v1**: rebuild toàn bộ site từ các trang HTML do API phục vụ sang Next.js 16 + React 19 + Tailwind v4, 6 phase trong 4 ngày. Lên production 08.10. | Mọi màn hình chạy, bảng gập thành thẻ dưới 640 px, không cuộn ngang. Nhưng giao diện "trông như sinh tự động". |
| 14–16.10 | `/ops` gộp vào Console; ảnh liên kết, mix, đặt xe, góp ý. | 48 commit ngày 16.10. Tính năng đủ, hình thức chưa có người chăm. |
| 17.10 sáng | **Brainstorm và đánh giá thiết kế** theo yêu cầu "đánh giá hình khối, bố cục, thẩm mỹ, UX/UI, flow; kế hoạch lên enterprise level, bỏ mùi AI, điều hướng rõ trên mobile". 13 artboard: bảng điểm 7 tiêu chí (trung bình **5,0/10**), 10 dấu hiệu "mùi AI", kiến trúc điều hướng, mockup trang chủ và sự kiện ở 390 và 1440, nghệ sĩ, app, Studio, Console, hệ thống thiết kế v2, kế hoạch 6 phase / 10 tuần. | Chấm bằng mắt từ ảnh chụp production. Chưa có số đo nào. |
| 17.10 | Logo v2 (artboard 14–18), góc nhìn creative director (19), art direction ảnh (20). Màu nhấn đổi **4 lần trong ngày**: lime → turquoise→mint → turquoise→cam → turquoise→lime. | Quy ước màu ba lớp ra đời ở artboard 19 và được giữ tới cuối. |
| 17.10 | **Phase 0** (token theo vai trò, lint cấm hex, không cuộn ngang, axe mọi vai trò) + đội tester 4 agent (3 chặn, 10 lớn, 12 nhỏ) + artboard 21 "Lộ trình lên 9". | 261 bài trình duyệt, 405 bài API. Bài axe bắt được một crash có sẵn ở màn soát vé. |
| 17–18.10 | Phase 1 (điều hướng), 2 (trang chủ, sự kiện), 3 (nghệ sĩ, dự án), 4 (app gộp về web), 5 (Studio, Console), 6 (cổng QA: vùng chạm 44 px, so ảnh mỗi PR, checklist thiết kế). | 498 vùng chạm nhỏ → 0. PR #7, rồi #8 gộp phase 0–8. |
| 18.10 | Artboard 22 "Đánh giá lại sau phase 6": cổng tự động ≈ 9, tổng **8,5**; đo CLS 0,26–0,47 trên 4 màn, JS 260–320 KB. Artboard 23 "Trên 9". Phase 7 (nhanh và bền), 8 (ảnh và chuyển động), 9 (cá nhân), 10 (Thái, Nhật, Indonesia). | CLS ≤ 0,02; JS trang chủ 208 → 195 KB; ngân sách chỉ giảm. PR #9. |
| 18.10 | Lỗi production: **bản đồ không có pin** (mọi sự kiện thật do Radar tìm không có toạ độ; dữ liệu mẫu thì có). PR #10, #13. Quyền riêng tư bạn bè (#12), preview web (#11). | Lần đầu dữ liệu thật lộ ra thứ dữ liệu mẫu che. |
| 18.10 | Chủ dự án: "giao diện mobile khá khó dùng, không thân thiện với người mới". Artboard 24: tổng **≈ 7** (cổng 9, người mới 5,5–6). Phase 11 P0/P1/P2 (giá chưa rõ, thành phố trước, lưu không cần tài khoản, trang sự kiện gọn). PR #14, #15, #16. | Lần đầu có bài kiểm thử hành trình người mới trên dữ liệu kiểu Radar. |
| 18.10 | Chủ dự án: "flow vẫn lằng nhằng, thiếu tinh gọn". Artboard 25: đếm **22 nút** trong màn đầu trang chủ, **15 nút / 15 khái niệm** trên trang sự kiện, ≈ 30 khái niệm toàn sản phẩm. Phase 12: 4 tab, 4 khoảng thời gian, mục "Thêm". PR #17. | Màn đầu: trang chủ 22 → 19, sự kiện 15 → 10; trang sự kiện 13 màn → ≈ 4. Đo trên production sau khi merge. |
| 18–19.10 | Merge #14 → #17, kiểm tra production bằng iPhone 13 giả lập; công cụ ẩn hồ sơ nghệ sĩ (#18). | Tổng ≈ 7,8. Chưa có người thật nào thử. |

Tổng cộng: 25 artboard, canvas 40 phiên bản, 12 phase design v2, 18 PR, ≈ 320 bài kiểm thử trình duyệt và 418 bài API, CI ≈ 9 phút. Kế hoạch ghi 10 tuần, làm trong 3 ngày; nút thắt không phải là viết mã mà là **quyết định của chủ dự án và kiểm chứng trên dữ liệu thật**.

## 2. Cách suy luận: cái đúng và cái sai

### Đúng, nên giữ

1. **Chấm điểm theo tiêu chí, mỗi điểm một bằng chứng.** Bảng 7 tiêu chí ở artboard 01 cho chủ dự án thấy ngay vấn đề nằm ở đâu, và các artboard sau (21, 22, 24) chấm lại cùng bảng nên thấy được tiến bộ. Cột "bằng chứng" là thứ làm bảng điểm có giá trị.
2. **Định nghĩa điểm 9 bằng ba cột**: cổng tự động xanh, 5 người thật làm được việc, số thật sau hai tuần. Không cột nào thay cột nào. Điều này ngăn tôi tự chấm 9 cho mình, và cũng là lý do tổng điểm tụt từ 8,5 xuống 7 khi đo người mới.
3. **"Màu nói một câu"**: turquoise là thông tin, dải turquoise → lime là hành động duy nhất của màn hình, trạng thái chỉ là chấm kèm chữ. Một câu như vậy trả lời được 90% câu hỏi "chỗ này màu gì" mà không cần hỏi lại.
4. **Một màn một việc; ba khái niệm trước; một cách làm một việc; lùi chứ không bỏ** (artboard 25). Bốn nguyên tắc này sửa được "lằng nhằng" mà không xoá tính năng và không đổi API.
5. **Ghi quyết định của chủ dự án kèm ngày** trong CLAUDE.md và roadmap ("owner 2026-10-18"). Nhờ vậy phase 12 lật quyết định của phase 1 (5 tab → 4 tab) mà không ai thắc mắc.
6. **Hỏi bằng 2–4 lựa chọn cụ thể, mỗi lựa chọn kèm hệ quả, có một lựa chọn khuyến nghị.** Chủ dự án trả lời trong vài giây. Câu hỏi mở ("bạn muốn thế nào?") thì không.

### Sai hoặc chậm, lần sau tránh

1. **v1 tối ưu cho "đủ tính năng", không cho "một người mới hiểu ngay".** Kết quả là mọi màn hình đều muốn cho thấy mọi thứ sản phẩm có: 5 hàng điều khiển trước sự kiện đầu tiên, 7 bán kính, 7 màu nhấn, nhãn hoa khắp nơi. Chi phí sửa (phase 0–2) lớn hơn chi phí làm đúng từ đầu.
2. **13 artboard đầu chấm bằng mắt, không đo.** Mãi đến artboard 25 mới đếm số nút trong màn đầu. Nếu đếm từ ngày đầu, phase 11 và 12 đã nằm trong kế hoạch gốc thay vì phát sinh sau hai lần chủ dự án phàn nàn.
3. **Điểm của cổng tự động bị nhầm với điểm của người dùng.** Artboard 22 ghi 8,5 khi mọi cổng xanh; artboard 24 đo người mới chỉ 5,5–6. Cổng đo "đúng chuẩn", không đo "hiểu ngay". Cần cả hai ngay từ phase 0.
4. **Dữ liệu mẫu che lỗi.** Demo có toạ độ, giá, ảnh, mô tả tiếng Việt; production (Radar) thì không. Ba lỗi thật (bản đồ trống, "Miễn phí" cho giá chưa rõ, "All ages" bịa) đều do đây. Bộ dữ liệu thử phải có bản ghi xấu như thật.
5. **Màu nhấn đổi 4 lần trong một ngày** vì tôi đề xuất từng màu một và chủ dự án phản ứng từng lần. Lần sau: một artboard 3 phương án đặt cạnh nhau trên nền thật, chọn một lần, khoá lại.
6. **Quyết định kiến trúc điều hướng (5 tab, ô giữa là Tìm) ở phase 1 bị lật ở phase 12.** Nguyên nhân: tôi thiết kế thanh tab theo "sản phẩm có gì" chứ không theo "người mới cần gì". Thước đo "số khái niệm trong màn đầu" lẽ ra phải có trước khi vẽ thanh tab.
7. **Đội tester chạy sau khi code xong phase 0**, phát hiện 3 lỗi chặn. Nếu chạy trên mockup (như artboard 19 đã làm ở v21–22) thì rẻ hơn.
8. **Tôi chỉ dẫn chủ dự án làm một việc không tồn tại** ("xoá SPONGE BOB trong Console", trong khi Console không có chức năng đó). Lần sau: kiểm tra chức năng có thật trước khi giao việc cho người.
10. **Tôi coi một hồ sơ thật là bản thử.** "SPONGE BOB" với ảnh hoạt hình trông như dữ liệu thử nên tôi đề xuất gỡ, xây cả công cụ ẩn (PR #18); chủ dự án cho biết đó là hồ sơ của một người dùng thật. Nội dung lạ không phải là nội dung sai. Lần sau: hỏi chủ dự án trước khi đánh giá một bản ghi là rác, và không bao giờ đề xuất xoá hay ẩn nội dung của người dùng dựa trên cảm nhận.
9. **Làm thiếu một nửa lựa chọn của chủ dự án** ở phase 12: phương án "Thêm" họ chọn ghi rõ "Thêm lịch" nằm trong "Thêm" và nút chính cố định ở đáy, nhưng commit đầu vẫn để "Thêm lịch" và "Chỉ đường" ở phần thông tin, còn "Chọn vé" trùng với thanh "Mua vé". Phải sửa bằng commit thứ hai. Lần sau: chép nguyên văn lựa chọn đã chọn thành checklist trước khi code.

## 3. Cách thực hiện

### Quy trình đã hình thành và nên dùng lại

```
đo (ảnh chụp 390/1440 + đếm nút, khái niệm, chạm)
→ artboard: bảng điểm + bằng chứng + đề xuất + câu hỏi cho chủ dự án
→ chủ dự án chọn (2–4 lựa chọn, có khuyến nghị) → ghi vào CLAUDE.md và roadmap kèm ngày
→ nhánh riêng trong worktree riêng → code + test + docs trong cùng commit
→ typecheck, lint (kiểm tra mã thoát!), test khu vực, test đầy đủ
→ PR theo mẫu: checklist thiết kế đánh dấu thật; ô "ảnh so sánh" để trống
→ CI: Visual thất bại là bình thường → tải visual-diff, xem, gắn nhãn visual-ok, đánh dấu ô
→ "merge" của chủ dự án → merge theo thứ tự → chờ deploy → kiểm tra production bằng script điện thoại giả lập
→ cập nhật artboard với số thật, cập nhật memory
```

### Tốt

- **Worktree riêng** cho toàn bộ cuộc redesign, phiên khác dùng checkout chính. Không bao giờ giẫm nhau. (Lưu ý: Turbopack không chấp nhận `node_modules` symlink, phải copy thật.)
- **PR xếp chồng** (#14 → #15 → #16 → #17) cho phép review từng phần. Nhớ: sau khi merge PR gốc, `gh pr edit N --base main` rồi mới merge.
- **Nhãn `visual-ok` bị gỡ khi có push mới**: mọi lần duyệt đều là của ảnh mới nhất.
- **Ngân sách chỉ được giảm** (JS KB mỗi màn, số `[Npx]` lẻ, cảnh báo lint). Cổng JS bắt được +10 KB khi phase 8 thêm 12 icon Phosphor; thay bằng sprite SVG.
- **Auto-fix trên PR** thay cho việc poll CI. Chỉ thức dậy khi có lỗi.
- **Script kiểm tra production** sau mỗi merge (Playwright, iPhone 13 giả lập, chưa đăng nhập): đếm tab, nút, pin bản đồ, lỗi JS. 20 giây, bắt được lỗi bản đồ trống ngay sau deploy.

### Chưa tốt

- **Bộ kiểm thử trình duyệt 15–17 phút** một luồng, CI 9 phút với 3 shard. Giới hạn số lần thử trong ngày.
- **`WEB_SKIP_BUILD=1` dùng lại cache ISR** chứa id ngẫu nhiên của lần seed trước: 5 bài thất bại giả. Không bao giờ chụp baseline hay tin kết quả app-more/artist/health từ build cũ.
- **Lint có `--quiet` không in gì khi vượt ngân sách**; và một lần tôi nối `npm run lint | tail` trong chuỗi `&&` nên mã thoát bị nuốt, push lên CI mới biết. Luôn `echo $?`.
- **Bài kiểm thử phụ thuộc múi giờ máy** (đoán thành phố từ Asia/Ho_Chi_Minh): ghim `timezoneId: 'UTC'` trong cấu hình Playwright.
- **Các spec để lại dữ liệu cho nhau** (targets thấy hàng mà spec khác tạo; perf đọc hàng chờ đã rỗng): chạy cả bộ khi kiểm tra một cổng; nếu phải chạy lẻ, chạy spec tạo dữ liệu trước.
- **Ngưỡng so ảnh 1% toàn trang** bỏ lọt thay đổi nhỏ (hero trang sự kiện). Thêm ảnh vùng cho các phần quan trọng.
- **Sửa file test bằng script Python cắt chuỗi** để lại dòng thừa. Dùng Edit theo chuỗi chính xác.

## 4. Lỗi đã gặp và bài học

| Lỗi | Nguyên nhân | Bắt được nhờ | Bài học |
| --- | --- | --- | --- |
| Bản đồ production không có pin | Sự kiện thật không có toạ độ; demo có | Chủ dự án nhìn thấy | Seed phải có bản ghi thiếu toạ độ, thiếu giá, thiếu ảnh, mô tả tiếng Anh |
| "Miễn phí" cho sự kiện giá chưa rõ | `price_from = 0` bị hiểu là miễn phí | Artboard 24 trên dữ liệu thật | Trạng thái "chưa rõ" phải là một giá trị riêng, không phải 0 |
| "All ages" trên mọi tin Radar | Mặc định của importer hiển thị như dữ liệu | Artboard 24 | Mặc định của máy không được hiện như lời của nguồn |
| Màn soát vé sập sau lần quét đầu | API trả `{en, vi}` thay vì chuỗi | Bài axe chạy trên mọi vai trò | Cổng chạy trên mọi vai trò bắt được lỗi không thuộc về nó |
| Font Thái và Nhật tải trên mọi trang | Tên ngôn ngữ ở footer viết bằng chữ bản địa | Bài fonts.spec | Chữ bản địa trong chrome dùng system-ui qua `::before` |
| `useHere` trả `/th` trên trang rewrite | Server và client thấy đường dẫn khác nhau | Lỗi hydration | Mọi hook địa chỉ phải chuẩn hoá thư mục ngôn ngữ ở server |
| Address builder chỉ giữ `?lang=en` | Hard-code một ngôn ngữ | Phase 10 | Điều kiện là `lang !== mặc định`, không phải `=== 'en'` |
| Hai sheet cùng `id="kd-sheet-title"` | id tĩnh trong component dùng nhiều lần | axe | `useId()` cho mọi id trong component |
| JS trang sự kiện 228 > 227 KB | 12 icon Phosphor cho huy hiệu | Cổng perf | Icon lặp dùng sprite; ngân sách phải chạy trước khi push |
| ESLint vượt ngân sách mà vẫn push | `| tail` nuốt mã thoát | CI đỏ | Không nối lint với pipe; kiểm tra `$?` |
| Test thất bại theo múi giờ máy | Đoán thành phố từ time zone | Chạy local | Ghim `timezoneId` |
| 5 bài thất bại giả sau `WEB_SKIP_BUILD` | Cache ISR giữ id cũ | Chạy lại build mới | Build mới cho mọi kết quả dùng để quyết định |
| Thanh tab 5 mục rồi 4 mục | Thiết kế theo tính năng, không theo người mới | Chủ dự án phàn nàn | Đếm khái niệm trước khi vẽ điều hướng |
| Thiếu nửa lựa chọn "Thêm" ở phase 12 | Không chép nguyên văn lựa chọn đã chọn | Tự rà lại trước khi báo | Lựa chọn → checklist → code |
| Chỉ dẫn xoá hồ sơ trong Console (không có chức năng) | Không kiểm tra trước | Khi bắt tay làm | Kiểm tra route/chức năng tồn tại trước khi giao việc |
| Đề xuất ẩn một hồ sơ thật vì trông như bản thử | Đánh giá nội dung bằng cảm nhận | Chủ dự án nói | Hỏi trước khi gọi một bản ghi là rác; không đề xuất xoá nội dung của người dùng |
| Tên nghệ sĩ trong Console 38×52 px | Link co lại bằng nội dung khi có nhãn bên cạnh | Cổng vùng chạm | Link trong cell: `min-w-0 flex-1` |
| GitHub auto-merge bị từ chối | Chính sách của môi trường | — | Chờ chữ "merge" của chủ dự án; không tìm đường khác |

## 5. Phong cách thiết kế và layout

### Giữ nguyên cho dự án sau (đã chứng minh)

- **Token đặt tên theo vai trò**, không theo chất liệu: `surface-0/1/2`, `line-1/2`, `fg-1/2/3`, `info`, `accent`, `ok/warn/bad`. Một file duy nhất viết hex; lint cấm hex ở mọi chỗ khác. Đổi tên một lần bằng codemod (117 file), không đổi dần.
- **Một dải nhấn cho đúng một hành động mỗi màn hình**, có glow nhẹ trên nút dẫn trang; thông tin một màu; trạng thái là chấm 6 px kèm chữ, không bao giờ là nền nút hay viền.
- **Ba bán kính + pill** (4 tag, 8 nút/chip/ô/thẻ, 16 sheet/hero; pill cho avatar và chấm). Không bóng đổ; phân tầng bằng bề mặt và viền 1 px; kính mờ chỉ trên ảnh hoặc bản đồ.
- **Một họ chữ** (Noto Sans, tự host, biến thiên), 7 bước cỡ, tiêu đề 700/600, số `tabular-nums`. Icon Phosphor Regular, nhập từng icon.
- **Ba thời lượng chuyển động** (120 / 200 / 320 ms), một đường cong; lint từ chối transition có thời gian riêng.
- **Thiếu ảnh thì là chữ**: tile chữ (tên lớn, style, ngày), monogram dưới 160 px, poster ngày cho hero không ảnh. Không hình học lặp lại.
- **Không cuộn ngang ở đâu cả**; bảng gập thành thẻ dưới 640 px; rail tối đa 7 mục; vùng chạm ≥ 44 px (`kd-hit`, `kd-tap`); thanh cuộn overlay 3 px.
- **Copy**: tiêu đề là danh từ có dữ liệu, nút là động từ + đối tượng, không câu giải thích, chữ hoa chỉ ở đầu bảng và tag, trạng thái rỗng = một câu + một hành động; cặp `{en, vi}` ở mọi chuỗi, ngôn ngữ thêm theo khoá tiếng Anh.

### Mẫu layout đã chạy tốt

| Màn | Mẫu |
| --- | --- |
| Danh sách (trang chủ) | Thanh lệnh dính dưới nav; trên điện thoại: 4 khoảng thời gian một chạm, rồi thành phố + chip dòng nhạc có số; danh sách theo ngày: thẻ dẫn 16:9 + các hàng cạnh nó, mỗi sự kiện một hàng dưới 600 px; sự kiện đầu tiên luôn trong màn đầu. |
| Chi tiết (sự kiện) | Ảnh 16:9 → 4 dữ kiện chỉ là dữ kiện → lineup → giới thiệu → địa điểm (các nút đi) → mục "Thêm" gập phần phụ; một nút chính ở đáy trên điện thoại, tránh đường khi panel vé hiện. |
| Điện thoại, khung chung | Logo + biểu tượng tìm trên cùng; 4 tab dưới cùng (Sự kiện, Bản đồ, Đã lưu, Tôi); "Đăng" nằm trong Tôi và footer vì người mở app phần lớn là người đi chơi. |
| Máy tính, khung chung | Một thanh: logo, 4 đích, ô tìm ⌘K, ngôn ngữ, một nút nhấn, tài khoản; trang full width với gutter 16/32/64, chữ dài giữ `max-w-read`, lưới thêm cột chứ không rộng ra. |
| Back office | Rail ≤ 7 mục (nhóm gập/mở), gập thành thanh menu dưới 900 px; bảng là grid gập thành thẻ; drawer từ phải; hàng chờ chia đôi từ 1200 px; "Hôm nay" là danh sách việc có nút. |
| Wizard | 4 bước có tên dưới thanh tiến độ, một bước một màn, mở được trước khi đăng nhập, đăng nhập ở bước gửi. |

### Điểm theo thời gian (nhận định của tôi, cùng một bảng tiêu chí)

| | 17.10 (v1) | 18.10 sau phase 6 | 18.10 người mới | 19.10 |
| --- | --- | --- | --- | --- |
| Hình khối, hình ảnh | 5 | 7,5 | – | 8 |
| Bố cục | 5 | 8,5 | 6 (màn đầu) | 8 |
| Thẩm mỹ | 6 | 8,5 | – | 8,5 |
| UX/UI | 5 | 8,5 | – | 8 |
| Điều hướng | 4 | 9 | 5 | 7,5 |
| Flow | 5 | 8,5 | – | 8 |
| Mobile | 5 | 8,5 | 5,5–6 | 8 |
| Nội dung | – | – | 5 | 5 |
| **Tổng** | **5,0** | **8,5** | **≈ 7** | **≈ 7,8** |

Bài học của bảng này: 8,5 → 7 không phải là thụt lùi; đó là lần đầu đo đúng thứ cần đo.

## 6. Mười hai bài học chính

1. **Đo trước, vẽ sau.** Ngày đầu tiên: ảnh chụp 390/1440 của mọi màn chính, đếm số nút trong màn đầu, số khái niệm người mới gặp, số chạm tới việc chính. Đặt ngân sách chỉ được giảm. Mục tiêu tham khảo: ≤ 12 nút màn đầu danh sách, ≤ 7 màn đầu chi tiết, 1 chạm tới bộ lọc chính, 2 chạm từ thẻ tới hành động chính.
2. **Hai thang điểm từ đầu**: cổng tự động (đúng chuẩn) và người mới (hiểu ngay). Không gộp.
3. **Khoá màu trong một buổi**: 3 phương án trên nền thật trong một artboard, chọn một, ghi ngày. Quy ước "màu nói một câu" (thông tin / hành động / trạng thái) áp cho mọi dự án.
4. **Token theo vai trò + lint cấm hex + ngân sách px** trước khi viết màn hình đầu tiên. Chi phí: nửa ngày. Tiết kiệm: toàn bộ phase 0 (một ngày và 117 file codemod).
5. **Cổng trước phase**: layout 3 bề rộng, axe mọi vai trò, vùng chạm 44 px, CLS và JS có ngân sách, so ảnh PR với base, checklist trong PR. Bộ này bắt được 4 lỗi thật trong 3 ngày.
6. **Seed phải xấu như production**: bản ghi không toạ độ, không giá, không ảnh, sai ngôn ngữ, tên lạ. Cổng người mới chạy trên bộ này. Và ngược lại: một bản ghi thật trông lạ không phải là lỗi; hỏi trước khi đề xuất gỡ.
7. **Một màn một việc, ba khái niệm trước, một cách làm một việc, lùi chứ không bỏ.** Phần phụ vào một mục "Thêm" hoặc vào "Tôi"; chỉ hiện khi đã có dữ liệu.
8. **Điều hướng theo người mới**: thanh tab ≤ 4 chỗ; tìm kiếm là biểu tượng; "Đăng" không chiếm góc của người đi chơi; mọi tên nội bộ (Radar, Hype, Nguồn) không xuất hiện trong màn đầu.
9. **Quyết định của chủ dự án**: hỏi bằng 2–4 lựa chọn có hệ quả và một khuyến nghị; chép nguyên văn lựa chọn thành checklist; ghi vào CLAUDE.md kèm ngày; "merge" chỉ khi họ nói.
10. **Phase ≤ 1 ngày làm, một PR, checklist thật, visual-ok sau khi xem ảnh.** Phase lớn hơn thì chia P0/P1/P2 xếp chồng.
11. **Kiểm tra production sau mỗi merge bằng script điện thoại giả lập**, rồi ghi số thật lên artboard. Không có số thật thì phase chưa xong.
12. **Kỷ luật công cụ**: kiểm tra mã thoát của lint; không pipe trong chuỗi `&&`; ghim múi giờ; build mới cho kết quả dùng để quyết định; chạy cả bộ vì spec để lại dữ liệu cho nhau; kiểm tra chức năng có thật trước khi giao việc cho người.

## 7. Quy trình rút gọn cho dự án tiếp theo

Thời gian ước tính cho một dự án cỡ FeestFinder (≈ 60 màn, 5 vai trò). Với bộ kit này, bỏ được phase 0 (token, lint, cổng) và phần lớn artboard 01–13.

| Ngày | Việc | Lấy từ kit |
| --- | --- | --- |
| 0 | Chụp và đo mọi màn chính; viết artboard bảng điểm với bằng chứng; đặt câu hỏi màu, điều hướng, nguyên tắc cho chủ dự án | `skills/design-review`, `mcp: measure_first_screen`, `design-system/rubric.md`, `templates/artboard.html` |
| 1 | Chép `tokens.css`, `check-tokens.ts`, các gate và workflow; cài checklist vào PR template; seed xấu như production | `skills/design-system-setup`, `skills/design-gates`, `gates/` |
| 2–3 | Khung chung (nav máy tính, 4 tab điện thoại, rail back office); màn danh sách và màn chi tiết theo mẫu | `design-system/layout.md`, `parts.md` |
| 4–5 | Các màn còn lại theo cùng mẫu; bài kiểm thử hành trình người mới | `gates/first-screen.spec.ts`, `skills/newcomer-flow` |
| 6 | Đánh giá lại cùng bảng điểm trên production; 5 người thật | `design-system/rubric.md`, `templates/DESIGN_GOVERNANCE.md` |

## 8. Những gì chưa kiểm chứng

- Chưa có người thật nào thử (bài 5 người trong `DESIGN_GOVERNANCE.md`). Mọi điểm "người mới" ở trên là của tôi trên điện thoại giả lập.
- Chưa có số PostHog nào (phễu danh sách → sự kiện → vé, web vitals p75).
- Trang chủ vẫn 19 nút trong màn đầu, trên mục tiêu ≤ 12: mỗi thẻ có hai chỗ bấm (tên và trái tim), khung site chiếm 6.
- Bản dịch Thái, Nhật, Indonesia chưa được người bản ngữ duyệt.
- Nội dung production: 12 sự kiện, 11 do Radar tìm, TP.HCM có 1. Giao diện không bù được chỗ này.

## 9. Bổ sung 20.10.2026: một ngày làm theo yêu cầu trực tiếp

Sau redesign, chủ dự án gửi từng yêu cầu ngắn (bỏ rail trang chủ, dự án có waitlist, blog song ngữ, cờ thay VI · EN, trang nghệ sĩ như Spotify, bỏ mọi cột bên). Mẫu trang rút ra nằm ở `design-system/patterns.md`; cách viết blog ở `blog-kit/`.

### Đúng, nên giữ

- **Mượn ngữ pháp của một sản phẩm người dùng đã quen.** "Giống Spotify" cho ngay thứ tự (hero, Phát, nổi bật, giới thiệu, nhạc, khoảnh khắc) và mức "long trọng" (tên rất to, một nút nhấn). Không cần artboard để thống nhất.
- **Tính ở server một lần, vẽ ở client ngay.** Sóng âm MP3: server giải mã (WASM) lúc thêm bài, lưu 600 điểm; trang vẽ vạch SVG tức thì, tải thư viện player khi gần màn, stream file chỉ khi bấm. Không CORS, không CLS, không tải audio người ta không nghe.
- **Quyết định trước khi vẽ ở proxy, không trong effect.** Ngôn ngữ nhớ bằng cookie, proxy đọc trước khi render: không nhảy chữ, không chuyển ngược người đã chọn.
- **Ngân sách JS buộc kiến trúc tốt hơn.** Vượt 1 KB ở hai trang dẫn tới: cờ vẽ bằng CSS, tách file copy theo trang, component ít dùng thành dynamic. Không nâng ngân sách lần nào.
- **Nội dung là sản phẩm có quy trình.** "Tôi chỉ gửi tài liệu" → một skill đầu-cuối (nghiên cứu, song ngữ, nguồn đã kiểm, ảnh có giấy phép, video kiểm bằng oEmbed) + một memory; DB là nguồn thật để admin sửa, repo giữ content pack, job nhập không bao giờ ghi đè bản đã sửa.

### Sai hoặc chậm, lần sau tránh

- **Một yêu cầu gỡ bỏ thường là một quy tắc.** Chủ dự án bỏ rail trang chủ; vài giờ sau phải nói lại "bỏ cột bên phải… cho toàn bộ trang web". Lần sau: khi bị yêu cầu gỡ một mẫu ở một trang, liệt kê mọi trang có mẫu đó và hỏi (hoặc áp luôn) trong cùng lượt.
- **Đề xuất không có bằng chứng là nhiễu.** "Nghệ sĩ tương tự" (điểm tương đồng tự tính) bị bỏ. Chỉ hiện quan hệ đọc được từ dữ liệu thật (diễn cùng, nơi đã diễn).
- **Thông tin chính phải đứng cạnh thứ nó giải thích**, không bị đẩy xuống cuối khi gộp cột: dời cột bên xong, kiểm lại từng khối xem nó thuộc về đâu.

### Lỗi đã gặp

| Lỗi | Nguyên nhân | Bài học |
| --- | --- | --- |
| Một file `.tsx` phình thành 10 MB | Script Python `s.replace(s[a:b], new)` với `b` tìm từ đầu file nằm trước `a` → chuỗi rỗng → chèn `new` vào giữa mọi ký tự | Luôn tìm mốc kết thúc từ mốc đầu (`s.index(end, a)`), `assert` cả hai mốc và `old != ''`; cứu bằng cách xoá đúng chuỗi đã chèn |
| Trang dự án sập sau khi đổi API | Cache fetch của Next còn giữ JSON cũ thiếu trường mới | Trường mới đọc ở client có mặc định (`?? []`), guard cho object con |
| axe `label-content-name-mismatch` ×8 | `aria-label` trên nút hàng bảng thay chữ thấy được | Tên truy cập bắt đầu bằng chữ thấy được; bỏ `aria-label` khi nút đã có chữ |
| hreflang thiếu / thừa | Bài một ngôn ngữ vẫn khai hai bản | Chỉ khai `alternates` khi hai bản khác nhau thật; còn lại gộp về canonical |
| Không thử được MP3 thật trong preview | Sandbox chặn mạng của Node (curl vẫn chạy) | Test e2e chặn host bằng `page.route` + file mẫu; ghi rõ giới hạn trong báo cáo |
| Ngân sách `[Npx]` sắp vượt | Hero mới cần `clamp()` và kích thước avatar | Đặt vào class CSS; xoá code cũ thì hạ ngân sách ngay (104 → 98) |

### Mẫu mới đã chạy tốt

| Màn | Mẫu |
| --- | --- |
| Mọi trang công khai | Một cột; cột bên cũ gập ở cuối, trừ thứ cần ngay (đặt liền kề) |
| Hồ sơ nghệ sĩ | Hero ảnh bìa mờ dần + avatar chồng + tên `clamp` 800 + "Phát" → Sắp diễn (3 thẻ có Mua vé) → Giới thiệu → Nghe (playlist sóng âm, mix) → Khoảnh khắc |
| Trang sự kiện | Vé ngay sau hero, một hàng từ 760 px; địa điểm: chữ trên, bản đồ 16:9 dưới |
| Bài viết | Cột giữa 760 px; định nghĩa in đậm mở bài; thông tin nhanh; bảng thành thẻ dưới 560 px; FAQ; nguồn |
| Ngôn ngữ | Hai lá cờ vẽ bằng CSS; lần đầu một ngôn ngữ mặc định, sau đó ngôn ngữ cuối cùng đã chọn, ở proxy |
| Điện thoại | Cuộn xuống ẩn khung, cuộn lên hiện lại; dock rơi xuống mép |
