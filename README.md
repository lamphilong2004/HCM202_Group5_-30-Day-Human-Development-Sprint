# 30-Day Sprint Battle

**HCM202 – Tư tưởng Hồ Chí Minh · SE1823 · Nhóm 05 · Topic ID: HCM-TT-C6-03**
Chủ đề: *30-Day Human Development Sprint*

Web game tương tác ngắn (5–7 phút) dùng để demo trên lớp: hai đội lần lượt trải qua 5 mốc của một hành trình 30 ngày mô phỏng, mỗi mốc đưa ra một tình huống cần quyết định, sau đó trò chơi phân tích lựa chọn và liên hệ với nội dung xây dựng con người — “hồng”, “chuyên”, tự rèn luyện, tu dưỡng.

> **Lưu ý học thuật.** “30 ngày” là khung mô phỏng do Nhóm 05 thiết kế, **không** phải khoảng thời gian được Hồ Chí Minh quy định. Các tình huống là ví dụ vận dụng do nhóm xây dựng, không phải trích dẫn hay ví dụ lấy từ giáo trình. Điểm số chỉ là cơ chế trò chơi, không đánh giá phẩm chất của người chơi.

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
 → DAY 01 · Kỷ luật                    Team A (A1) → kết quả → Team B (B1) → kết quả → DAY 01 COMPLETE
 → DAY 07 · Phát triển năng lực/“Chuyên”  Team A (A2) → …           Team B (B2) → …           DAY 07 COMPLETE
 → DAY 15 · Trách nhiệm/“Hồng”          Team A (A3) → …           Team B (B3) → …           DAY 15 COMPLETE
 → DAY 22 · Cá nhân & tập thể           Team A (A4) → …           Team B (B4) → …           DAY 22 COMPLETE
 → DAY 30 · Tự nhìn lại (FINAL ×2)      Team A (A5) → …           Team B (B5) → …
 → FINAL RESULT → REFLECTION → CHƠI LẠI / VỀ MÀN HÌNH ĐẦU
```

- 5 Day × 2 đội = **10 tình huống khác nhau**; hai đội không bao giờ trả lời cùng một câu.
- Mỗi lượt: chọn A/B/C → **Xác nhận lựa chọn** → màn kết quả (mức phù hợp, điểm, *Vì sao?*, *Liên hệ lý luận*) → **Tiếp tục**.

### Tính điểm

| Mức phù hợp        | Day 01–22 | Day 30 (×2) |
| ------------------ | --------- | ----------- |
| Phù hợp nhất       | +100      | +200        |
| Khá phù hợp        | +50       | +100        |
| Cần cân nhắc thêm  | +20       | +40         |

Điểm tối đa mỗi đội: 4 × 100 + 200 = **600**.

## Hướng dẫn demo trên lớp

1. Mở app trên laptop nối projector, bật full screen trình duyệt (F11). Bố cục được tối ưu cho 1366×768 và 1920×1080.
2. Chia lớp thành Team A và Team B. Bấm **Bắt đầu**.
3. Đọc to tình huống; đội đang lượt (hiển thị rõ trên header và thẻ “Đang lượt”) thống nhất một phương án. Người điều khiển bấm chọn rồi bấm **Xác nhận lựa chọn**.
4. Dùng màn kết quả để thảo luận nhanh phần *Vì sao?* và *Liên hệ lý luận*.
5. Sau Day 30, xem kết quả chung cuộc, sau đó cho cả lớp chọn câu trả lời phản tỉnh.
6. Nút **Chơi lại** nhỏ ở góc phải header dùng để reset bất cứ lúc nào (bấm hai lần để xác nhận). Tải lại trang cũng khởi động lại game.

## Cấu trúc mã nguồn

```
src/
  App.tsx                    Điều phối màn hình theo state
  main.tsx                   Entry point
  index.css                  Tailwind v4 + design tokens + animation
  types/game.ts              Team, Suitability, Option, Scenario, GameState…
  data/scenarios.ts          10 tình huống, 5 Day, bảng điểm, câu phản tỉnh
  game/reducer.ts            State machine (START → QUESTION → FEEDBACK → DAY_COMPLETE → FINAL_RESULT → REFLECTION)
  hooks/useCountUp.ts        Hiệu ứng đếm điểm
  components/
    GameHeader.tsx           Thông tin môn học + bảng điểm + nút reset
    ScoreBoard.tsx           Điểm hai đội, highlight đội đang lượt
    ProgressTimeline.tsx     01 — 07 — 15 — 22 — 30
    StartScreen.tsx
    QuestionScreen.tsx       Kèm DayMeta, TurnBadge
    AnswerOption.tsx
    FeedbackScreen.tsx
    DayCompleteScreen.tsx
    FinalResultScreen.tsx
    ReflectionScreen.tsx
    ui.tsx                   Button, TeamMark, SuitabilityMeter, màu theo đội
```

Mọi chuyển trạng thái đi qua `gameReducer` và được chặn theo màn hình hiện tại, nên bấm đúp hay bấm lặp không thể cộng điểm hai lần cho cùng một câu.

Để sửa nội dung tình huống, chỉ cần chỉnh `src/data/scenarios.ts`.

### Nguồn tình huống

- **Team A (A1–A5):** 5 tình huống gốc trong bản đặc tả `gameproto.txt`. Ba phương án yếu được chỉnh câu chữ tối thiểu để có đủ ba mức phù hợp: A1-A, A3-A, A5-B.
- **Team B (B1–B5):** 5 tình huống bổ sung do nhóm xây dựng, cùng chủ đề với từng Day.

## Triển khai lên Vercel

Dự án là site tĩnh Vite, không cần biến môi trường.

- **Qua dashboard:** push repo lên GitHub → Vercel → *Add New Project* → import repo. Vercel tự nhận Vite:
  - Framework Preset: `Vite`
  - Build Command: `npm run build`
  - Output Directory: `dist`
  - Install Command: `npm install`
- **Qua CLI:** `npm i -g vercel` → `vercel` (preview) → `vercel --prod`.

`vercel.json` trong repo đã khai báo sẵn build command và output directory. Game chỉ có một route nên không cần cấu hình rewrite.
