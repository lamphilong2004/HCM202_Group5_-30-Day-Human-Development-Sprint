# 30-Day Sprint Battle

**HCM202 – Tư tưởng Hồ Chí Minh · SE1823 · Nhóm 05 · Topic ID: HCM-TT-C6-03**
Chủ đề: *30-Day Human Development Sprint*

Web game tương tác dùng để demo trên lớp: hai đội lần lượt trải qua 5 mốc của một hành trình 30 ngày mô phỏng, giải quyết 20 tình huống ra quyết định, mỗi tình huống có 4 phương án ứng với 4 mức độ phù hợp (100 / 50 / 30 / 0 điểm). Sau mỗi câu, MC phân tích lựa chọn và liên hệ với nội dung xây dựng con người — “hồng”, “chuyên”, tự rèn luyện, tu dưỡng, nêu gương, môi trường.

> **Lưu ý học thuật.** “30 ngày” là khung mô phỏng do Nhóm 05 thiết kế, **không** phải khoảng thời gian hay phương pháp được Hồ Chí Minh quy định. Tham chiếu lý luận: Giáo trình HCM202 (2019), Chương VI, mục III. Điểm số chỉ là cơ chế trò chơi, không đánh giá phẩm chất của người chơi.

## Chạy local

Yêu cầu: Node.js ≥ 20.19 (hoặc ≥ 22.12).

```bash
npm install
npm run dev
```

Mở địa chỉ Vite in ra (mặc định `http://localhost:5173`).

Build production:

```bash
npm run build
npm run preview
```

`npm run build` chạy `tsc --noEmit` (kiểm tra kiểu) rồi `vite build`, xuất ra thư mục `dist/`.

Không cần backend, database, đăng nhập hay API ngoài. Font chữ (Be Vietnam Pro, Fraunces) được bundle cục bộ, nên sau khi build app chạy được hoàn toàn offline.

## Luồng chơi

```
START
 → DAY 01 · Kỷ luật & khởi đầu xây dựng con người   A01 → B01 → A02 → B02 → DAY 01 COMPLETE
 → DAY 07 · Phát triển năng lực / “Chuyên”          A03 → B03 → A04 → B04 → DAY 07 COMPLETE
 → DAY 15 · Phẩm chất, trách nhiệm / “Hồng”         A05 → B05 → A06 → B06 → DAY 15 COMPLETE
 → DAY 22 · Cá nhân, tập thể & môi trường           A07 → B07 → A08 → B08 → DAY 22 COMPLETE
 → DAY 30 · Tự rèn luyện & nhìn lại (FINAL ×2)      A09 → B09 → A10 → B10
 → FINAL RESULT → REFLECTION → CHƠI LẠI / VỀ MÀN HÌNH ĐẦU
```

- 20 câu, 5 Day × 4 câu. Mỗi đội 10 câu khác nhau (5 câu nền tảng lý luận, 5 câu vận dụng); hai đội không bao giờ trả lời cùng một câu.
- Màn câu hỏi hiển thị Day, đội đang lượt, *Câu X/10* của đội, *Tiến độ X/20* và đồng hồ đếm ngược.

### 30-Second Battle Mode

Mỗi lượt diễn ra như sau:

```
Câu hỏi hiện ra → đồng hồ 00:30 tự chạy
   ├─ Đội bấm A/B/C/D  → chốt ngay (không có bước xác nhận) → chấm theo bậc phù hợp 100/50/30/0
   └─ Về 00:00 chưa bấm → tự khóa câu, ghi HẾT GIỜ, +0 điểm
→ Màn kết quả (bậc phù hợp, điểm, phương án phù hợp nhất, Vì sao?, Liên hệ lý luận) — KHÔNG giới hạn thời gian, MC giảng giải
→ MC bấm “Tiếp tục” → câu tiếp theo với đồng hồ 00:30 mới
   (sau câu thứ 4 của mỗi Day: màn Day Complete → MC bấm “Chặng tiếp theo”)
```

- **Mỗi câu một đồng hồ 30 giây riêng**, kể cả khi Team A và Team B nối tiếp nhau; thời gian dư không được cộng dồn.
- **Lần bấm hợp lệ đầu tiên là đáp án cuối cùng.** Bấm sớm không ảnh hưởng điểm; thời gian còn lại không tạo điểm thưởng.
- **Hết giờ** không chọn ngẫu nhiên đáp án; câu được tính là đã hoàn thành, 0 điểm, và được thống kê riêng là “hết giờ”.
- Đồng hồ đổi màu: 30–11 giây bình thường · 10–6 giây vàng hổ phách · 5–1 giây đỏ (nhấp nháy nhẹ, tắt khi hệ điều hành bật *giảm chuyển động*) · 00:00 hết giờ. Không phát âm thanh.
- Đồng hồ không dừng khi chuyển tab hay thu nhỏ trình duyệt; đồng hồ chỉ chạy trên màn câu hỏi, không chạy ở màn kết quả, Day Complete, kết quả chung cuộc hay phản tỉnh.
- **Không có chuyển màn tự động nào ngoài cơ chế hết giờ của câu hỏi.** Màn kết quả đứng yên cho tới khi MC bấm **Tiếp tục**; Day Complete đứng yên cho tới khi MC bấm **Chặng tiếp theo**.

Kỹ thuật: reducer lưu thời điểm hết hạn của câu hỏi (`questionDeadline`) và mọi hành động có thời gian đều mang `at = Date.now()` cùng `step` của câu. Cú bấm xử lý tại hoặc sau hạn được tính là hết giờ; cú bấm hoặc hẹn giờ cũ của câu trước bị bỏ qua, và bấm đúp **Tiếp tục** chỉ chuyển màn một lần, nên không thể cộng điểm hai lần hay nhảy cóc lượt. Các nút phương án bị vô hiệu hóa (disabled) trong 0,4 giây đầu sau khi câu hỏi hiện ra, để lần bấm thứ hai của một cú bấm đúp **Tiếp tục** không vô tình trả lời câu mới.

### Tính điểm theo bậc phù hợp (100 / 50 / 30 / 0)

**Vì sao chấm nhiều bậc?** Tự rèn luyện trong đời sống hiếm khi là chuyện “đúng/sai” tuyệt đối: một lựa chọn có thể có điểm mạnh rõ ràng nhưng còn hạn chế, hoặc có yếu tố tích cực nhưng còn thiếu nhiều. Vì vậy mỗi câu là một **tình huống ra quyết định**, và bốn phương án thể hiện bốn mức độ phù hợp khác nhau thật sự. Nhóm **không** cho điểm một phần cho một nhận định sai về kiến thức: các câu trắc nghiệm kiến thức trước đây đã được chuyển thành tình huống, giữ nguyên mục tiêu học tập.

| Bậc | Nhãn | Day 01–22 | Day 30 (×2) | Tiêu chí |
| --- | --- | ---: | ---: | --- |
| BEST | Phù hợp nhất | 100 | 200 | Đáp ứng đầy đủ yêu cầu lý luận của tình huống |
| GOOD | Khá phù hợp | 50 | 100 | Có điểm mạnh rõ ràng nhưng còn hạn chế đáng kể |
| PARTIAL | Phù hợp một phần | 30 | 60 | Có yếu tố tích cực nhưng còn thiếu nhiều |
| UNSUITABLE | Chưa phù hợp | 0 | 0 | Đi ngược yêu cầu của tình huống |
| TIMEOUT | Hết giờ | 0 | 0 | Nhóm chưa trả lời trong 30 giây |

- Mỗi câu có **đúng một** phương án ở mỗi bậc; vị trí A/B/C/D của các bậc được xáo trộn (mỗi bậc nằm ở mỗi vị trí đúng 5 lần).
- Điểm chỉ được tính bởi một hàm duy nhất `pointsFor()` trong `src/data/scenarios.ts` (bậc × hệ số Day). Không có điểm thưởng tốc độ.
- Điểm tối đa mỗi đội: 8 × 100 + 2 × 200 = **1200**. Mọi câu “Khá phù hợp”: 600; mọi câu “Phù hợp một phần”: 360.

Ví dụ — câu A03 (Day 07, mục tiêu học tập: nội dung của “chuyên”): *“Một sinh viên muốn phát triển mặt ‘chuyên’ trong 30-Day Sprint. Kế hoạch nào phù hợp nhất?”*

| Phương án | Bậc | Điểm |
| --- | --- | ---: |
| Học sâu chuyên môn, luyện ngoại ngữ, giữ sức khỏe — có mục tiêu đo được mỗi tuần | Phù hợp nhất | 100 |
| Học sâu chuyên môn mỗi ngày, tạm gác ngoại ngữ và sức khỏe | Khá phù hợp | 50 |
| Xem video kỹ năng khi rảnh, không đặt mục tiêu cụ thể | Phù hợp một phần | 30 |
| Chỉ tập trung rèn đạo đức, vì năng lực sẽ tự đến sau | Chưa phù hợp | 0 |

Màn kết quả luôn hiển thị: phương án đội đã chọn, bậc phù hợp, số điểm, **vì sao phương án đó được số điểm ấy**, phương án phù hợp nhất (100 điểm), *Vì sao?* và *Liên hệ lý luận HCM202*. Kết quả chung cuộc thống kê số câu ở từng bậc và số câu hết giờ của mỗi đội.

## Hướng dẫn demo trên lớp

1. Mở app trên laptop nối projector, bật full screen trình duyệt (F11). Bố cục được tối ưu cho 1366×768 và 1920×1080.
2. Chia lớp thành Team A và Team B. Bấm **Bắt đầu**.
3. Đồng hồ 30 giây bắt đầu ngay khi câu hỏi hiện ra. Đội đang lượt (hiển thị rõ trên header và thẻ “Đang lượt”) thống nhất một phương án; người điều khiển bấm **một lần** vào phương án đó — lần bấm đầu tiên được chốt ngay.
4. Màn kết quả đứng yên, không giới hạn thời gian: MC giảng giải đáp án, phần *Vì sao?* và *Liên hệ lý luận*, rồi bấm **Tiếp tục** khi lớp đã sẵn sàng. Ở màn Day Complete, bấm **Chặng tiếp theo** để sang Day mới.
5. Sau Day 30, xem kết quả chung cuộc, sau đó cho cả lớp chọn câu trả lời phản tỉnh.
6. Nút **Chơi lại** nhỏ ở góc phải header dùng để reset bất cứ lúc nào (bấm hai lần để xác nhận). Tải lại trang cũng khởi động lại game.

## Cấu trúc mã nguồn

```
src/
  App.tsx                    Điều phối màn hình theo state
  main.tsx                   Entry point
  index.css                  Tailwind v4 + design tokens + animation
  types/game.ts              Team, Level, Outcome, Option, Question, AnswerRecord, GameState…
  data/scenarios.ts          20 tình huống + thang 100/50/30/0, 5 Day, thứ tự A→B→A→B, pointsFor(), câu phản tỉnh
  game/reducer.ts            State machine (START → QUESTION → FEEDBACK → DAY_COMPLETE → FINAL_RESULT → REFLECTION), chấm điểm, hạn giờ
  game/timing.ts             30 giây/câu, định dạng 00:SS
  hooks/useDeadline.ts       Đếm ngược theo mốc thời gian thực (không trôi, kiểm tra lại khi quay lại tab)
  hooks/useCountUp.ts        Hiệu ứng đếm điểm
  components/
    GameHeader.tsx           Thông tin môn học + bảng điểm + nút reset
    ScoreBoard.tsx           Điểm hai đội, highlight đội đang lượt
    ProgressTimeline.tsx     01 — 07 — 15 — 22 — 30
    StartScreen.tsx
    QuestionScreen.tsx       Kèm DayMeta, TurnBadge
    QuestionTimer.tsx        Đồng hồ vòng tròn + 00:SS, trạng thái thường / cảnh báo / khẩn / hết giờ
    AnswerOption.tsx
    FeedbackScreen.tsx
    DayCompleteScreen.tsx
    FinalResultScreen.tsx
    ReflectionScreen.tsx
    ui.tsx                   Button, TeamMark, ResultMark (5 kết quả), LevelMeter, màu theo đội
```

Mọi chuyển trạng thái đi qua `gameReducer` và được chặn theo màn hình hiện tại, nên bấm đúp hay bấm lặp không thể cộng điểm hai lần cho cùng một câu.

Để sửa nội dung câu hỏi, chỉ cần chỉnh `src/data/scenarios.ts`.

### Nguồn câu hỏi

- 20 tình huống được Nhóm 05 phát triển từ ngân hàng 20 câu đã duyệt: mỗi câu giữ nguyên **mục tiêu học tập** (lưu trong trường `objective`), đội, Day và loại câu; phần câu hỏi và bốn phương án được viết lại thành tình huống ra quyết định để chấm theo bậc.
- Phần *Vì sao?* dùng lại các giải thích đã được nhóm đối chiếu với nguồn học thuật bên dưới; mỗi phương án có thêm một câu giải thích vì sao được số điểm đó.
- Các tình huống, thang điểm và mô hình “30 ngày” là thiết kế vận dụng của nhóm, không phải nội dung hay phương pháp do Hồ Chí Minh quy định. Lý luận gốc là phần nội dung xây dựng con người trong giáo trình; trò chơi chỉ là cách nhóm đưa lý luận đó vào các lựa chọn cụ thể.

### Nguồn học thuật

Bộ Giáo dục và Đào tạo, *Giáo trình Tư tưởng Hồ Chí Minh*, Hà Nội, 2019 — Chương VI, mục III, tr. 131–133.

- Luận điểm “trồng cây – trồng người” (câu B01): giáo trình chú thích ý tưởng gốc của Quản Trọng, được Hồ Chí Minh dẫn lại.
- Cách chia hai mặt “hồng” (phẩm chất) và “chuyên” (năng lực) trong phần giải thích là khái quát diễn giải của nhóm, không phải bảng phân loại nguyên văn của giáo trình.
- Repo không chứa bản scan giáo trình; vui lòng tra cứu bản in hoặc bản do trường cung cấp.

## Triển khai lên Vercel

Dự án là site tĩnh Vite, không cần biến môi trường.

- **Qua dashboard:** push repo lên GitHub → Vercel → *Add New Project* → import repo. Vercel tự nhận Vite:
  - Framework Preset: `Vite`
  - Build Command: `npm run build`
  - Output Directory: `dist`
  - Install Command: `npm install`
- **Qua CLI:** `npm i -g vercel` → `vercel` (preview) → `vercel --prod`.

`vercel.json` trong repo đã khai báo sẵn build command và output directory. Game chỉ có một route nên không cần cấu hình rewrite.
