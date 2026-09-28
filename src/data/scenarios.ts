import type { DayInfo, Option, Scenario, Suitability, Team } from '../types/game'

/*
 * Toàn bộ tình huống dưới đây là nội dung game do Nhóm 05 thiết kế để vận dụng
 * lý luận về xây dựng con người. Không phải trích dẫn lời Hồ Chí Minh và không
 * phải ví dụ lấy từ giáo trình. “30 ngày” chỉ là khung mô phỏng của nhóm.
 *
 * - Team A: 5 tình huống gốc trong gameproto.txt (đã được duyệt).
 * - Team B: 5 tình huống bổ sung, cùng chủ đề với từng Day.
 */

export const BASE_POINTS: Record<Suitability, number> = {
  BEST: 100,
  GOOD: 50,
  CONSIDER: 20,
}

export const SUITABILITY_META: Record<Suitability, { label: string; level: 1 | 2 | 3 }> = {
  BEST: { label: 'Phù hợp nhất', level: 3 },
  GOOD: { label: 'Khá phù hợp', level: 2 },
  CONSIDER: { label: 'Cần cân nhắc thêm', level: 1 },
}

export const DAYS: DayInfo[] = [
  { day: 1, theme: 'Kỷ luật', journey: 'Kỷ luật', multiplier: 1 },
  { day: 7, theme: 'Phát triển năng lực · “Chuyên”', journey: 'Phát triển năng lực', multiplier: 1 },
  { day: 15, theme: 'Trách nhiệm · “Hồng”', journey: 'Trách nhiệm', multiplier: 1 },
  { day: 22, theme: 'Cá nhân & tập thể', journey: 'Tinh thần tập thể', multiplier: 1 },
  { day: 30, theme: 'Tự nhìn lại', journey: 'Tự nhìn lại', multiplier: 2 },
]

const opt = (id: string, text: string, suitability: Suitability, note: string): Option => ({
  id,
  text,
  suitability,
  score: BASE_POINTS[suitability],
  note,
})

export const SCENARIOS: Scenario[] = [
  // ─── DAY 01 · KỶ LUẬT ───────────────────────────────────────────────
  {
    id: 'A1',
    day: 1,
    team: 'A',
    theme: DAYS[0].theme,
    label: 'Kế hoạch tối nay',
    question:
      'Bạn đã lên kế hoạch học tập tối nay. Nhưng một người bạn rủ bạn đi chơi ngay trước giờ học. Bạn sẽ làm gì?',
    options: [
      opt(
        'A',
        'Đi chơi tối nay và định học bù vào ngày mai.',
        'GOOD',
        'Vẫn còn ý định học, nhưng kế hoạch bị đẩy lùi bởi một tác động ngắn hạn; lặp lại nhiều lần sẽ khó thành thói quen.',
      ),
      opt(
        'B',
        'Giữ kế hoạch học tập và sắp xếp thời gian đi chơi vào thời điểm phù hợp.',
        'BEST',
        'Giữ được mục tiêu đã đặt ra mà vẫn tôn trọng quan hệ bạn bè — kỷ luật không có nghĩa là cứng nhắc.',
      ),
      opt(
        'C',
        'Không làm gì cả và để ngày mai quyết định.',
        'CONSIDER',
        'Trì hoãn quyết định khiến cả thời gian học lẫn thời gian nghỉ đều không được dùng có chủ đích.',
      ),
    ],
    explanation:
      'Tự rèn luyện bắt đầu từ khả năng duy trì mục tiêu và điều chỉnh hành vi trước những tác động ngắn hạn. Kỷ luật không phải là từ chối mọi niềm vui, mà là chủ động sắp xếp để mục tiêu dài hạn không bị gián đoạn.',
    theory: ['Tự rèn luyện', 'Tu dưỡng', 'Kỷ luật'],
  },
  {
    id: 'B1',
    day: 1,
    team: 'B',
    theme: DAYS[0].theme,
    label: 'Cam kết 45 phút',
    question:
      'Bạn tự cam kết mỗi tối học tiếng Anh 45 phút trong suốt tháng này. Đến tối thứ tư, sau ca làm thêm, bạn rất mệt và chỉ muốn nghỉ. Bạn sẽ làm gì?',
    options: [
      opt(
        'A',
        'Vẫn học, nhưng rút xuống 15 phút để giữ nhịp; sau đó xem lại lịch để cam kết phù hợp hơn với sức mình.',
        'BEST',
        'Giữ được nhịp đều đặn trong ngày khó khăn, đồng thời điều chỉnh kế hoạch cho sát thực tế.',
      ),
      opt(
        'B',
        'Nghỉ tối nay và học bù gấp đôi vào cuối tuần.',
        'GOOD',
        'Vẫn giữ mục tiêu tổng, nhưng dồn việc dễ làm đứt nhịp và tạo áp lực cho những ngày sau.',
      ),
      opt(
        'C',
        'Tạm dừng kế hoạch đến khi lịch làm thêm bớt bận rồi bắt đầu lại.',
        'CONSIDER',
        'Điều kiện lý tưởng hiếm khi đến; tạm dừng không thời hạn dễ trở thành bỏ hẳn.',
      ),
    ],
    explanation:
      'Kỷ luật được thử thách rõ nhất vào những ngày không thuận lợi. Duy trì một mức tối thiểu và điều chỉnh kế hoạch hợp lý giúp việc tự rèn luyện trở thành thói quen bền bỉ, thay vì phụ thuộc vào hứng thú nhất thời.',
    theory: ['Tự rèn luyện', 'Kỷ luật', 'Phương pháp làm việc'],
  },

  // ─── DAY 07 · PHÁT TRIỂN NĂNG LỰC / “CHUYÊN” ────────────────────────
  {
    id: 'A2',
    day: 7,
    team: 'A',
    theme: DAYS[1].theme,
    label: 'Kỹ năng còn thiếu',
    question:
      'Bạn nhận ra mình đang yếu một kỹ năng quan trọng đối với việc học và công việc tương lai. Bạn sẽ làm gì?',
    options: [
      opt(
        'A',
        'Bỏ qua vì đó không phải điểm mạnh của mình.',
        'CONSIDER',
        'Né tránh điểm yếu khiến năng lực không được mở rộng, dù đó là kỹ năng cần cho tương lai.',
      ),
      opt(
        'B',
        'Chờ người khác chỉ cho mình cách làm.',
        'GOOD',
        'Học hỏi từ người khác là cần thiết, nhưng nếu chỉ chờ đợi thì quá trình phát triển vẫn bị động.',
      ),
      opt(
        'C',
        'Xác định điểm yếu và lập kế hoạch cải thiện từng bước.',
        'BEST',
        'Chủ động nhận diện và có lộ trình cụ thể — năng lực được xây dựng qua từng bước nhỏ.',
      ),
    ],
    explanation:
      '“Chuyên” không chỉ là có kiến thức mà còn là quá trình chủ động phát triển năng lực của bản thân. Nhận diện đúng điểm yếu và kiên trì cải thiện là biểu hiện của tinh thần tự học, tự rèn luyện.',
    theory: ['“Chuyên”', 'Năng lực', 'Tự rèn luyện'],
  },
  {
    id: 'B2',
    day: 7,
    team: 'B',
    theme: DAYS[1].theme,
    label: 'Phần việc chưa quen',
    question:
      'Nhóm bạn phải làm một dashboard phân tích dữ liệu cho môn học. Bạn chưa biết dùng công cụ này, còn một thành viên đã rất thạo và đề nghị làm hộ toàn bộ phần đó. Bạn sẽ làm gì?',
    options: [
      opt(
        'A',
        'Để bạn ấy làm cho nhanh, mình nhận phần thuyết trình thay thế.',
        'GOOD',
        'Phân công hợp lý giúp nhóm kịp tiến độ, nhưng bạn bỏ lỡ cơ hội bù đắp đúng kỹ năng mình đang thiếu.',
      ),
      opt(
        'B',
        'Nhận một phần vừa sức, nhờ bạn ấy hướng dẫn và tự học thêm để làm được.',
        'BEST',
        'Vừa đảm bảo tiến độ chung, vừa biến bài tập thành cơ hội nâng năng lực thật sự.',
      ),
      opt(
        'C',
        'Tự làm toàn bộ một mình để chứng minh năng lực, không cần hỏi ai.',
        'CONSIDER',
        'Tinh thần tự lập đáng quý, nhưng tự làm khi chưa có kỹ năng dễ ảnh hưởng chất lượng và tiến độ của cả nhóm.',
      ),
    ],
    explanation:
      'Phát triển năng lực chuyên môn cần sự chủ động của bản thân, nhưng không tách rời môi trường tập thể. Học từ người giỏi hơn trong khi vẫn góp phần vào việc chung là cách để “chuyên” tiến bộ một cách thực chất.',
    theory: ['“Chuyên”', 'Năng lực', 'Tinh thần tập thể'],
  },

  // ─── DAY 15 · TRÁCH NHIỆM / “HỒNG” ──────────────────────────────────
  {
    id: 'A3',
    day: 15,
    team: 'A',
    theme: DAYS[2].theme,
    label: 'Lỗi trong bài nhóm',
    question:
      'Bạn phát hiện mình đã làm sai một phần bài nhóm và khiến các thành viên khác phải sửa lại. Bạn sẽ làm gì?',
    options: [
      opt(
        'A',
        'Lặng lẽ tự sửa phần của mình, không nói lại với nhóm.',
        'GOOD',
        'Có sửa lỗi, nhưng thiếu sự thẳng thắn; nhóm không biết nguyên nhân để cùng rút kinh nghiệm.',
      ),
      opt(
        'B',
        'Đổ lỗi cho hoàn cảnh hoặc thành viên khác.',
        'CONSIDER',
        'Chuyển trách nhiệm sang người khác làm giảm lòng tin và khiến lỗi dễ lặp lại.',
      ),
      opt(
        'C',
        'Thừa nhận trách nhiệm và cùng nhóm sửa lỗi.',
        'BEST',
        'Thẳng thắn nhận lỗi và hành động để khắc phục — trách nhiệm được thể hiện bằng việc làm.',
      ),
    ],
    explanation:
      'Phẩm chất không chỉ thể hiện ở nhận thức mà còn thể hiện qua cách một người chịu trách nhiệm với hành động của mình. Dám nhận khuyết điểm và sửa chữa là một phần của quá trình tu dưỡng.',
    theory: ['“Hồng”', 'Trách nhiệm', 'Tu dưỡng'],
  },
  {
    id: 'B3',
    day: 15,
    team: 'B',
    theme: DAYS[2].theme,
    label: 'Đoạn văn không trích nguồn',
    question:
      'Bạn là nhóm trưởng. Một ngày trước hạn nộp, bạn phát hiện một thành viên đã chép gần như nguyên văn một đoạn từ Internet mà không trích dẫn nguồn. Bạn sẽ làm gì?',
    options: [
      opt(
        'A',
        'Trao đổi riêng với bạn ấy, cùng viết lại hoặc trích dẫn đúng nguồn trước khi nộp.',
        'BEST',
        'Giữ được sự trung thực của cả nhóm, đồng thời giúp thành viên hiểu vấn đề và tự sửa.',
      ),
      opt(
        'B',
        'Tự viết lại đoạn đó trong đêm, không nói gì để tránh căng thẳng.',
        'GOOD',
        'Bài nộp được đảm bảo, nhưng thành viên không nhận ra vấn đề và có thể lặp lại.',
      ),
      opt(
        'C',
        'Nộp nguyên như vậy vì thời gian gấp và đó không phải phần mình viết.',
        'CONSIDER',
        'Là nhóm trưởng, bạn cùng chịu trách nhiệm với sản phẩm chung; bỏ qua vi phạm ảnh hưởng đến cả nhóm.',
      ),
    ],
    explanation:
      '“Hồng” gắn với phẩm chất, đạo đức — trong học tập, đó là sự trung thực và trách nhiệm với sản phẩm chung. Người nhóm trưởng góp ý thẳng thắn, đúng cách vừa giữ nguyên tắc, vừa nêu gương và giúp người khác cùng tiến bộ.',
    theory: ['“Hồng”', 'Trung thực', 'Nêu gương'],
  },

  // ─── DAY 22 · CÁ NHÂN & TẬP THỂ ─────────────────────────────────────
  {
    id: 'A4',
    day: 22,
    team: 'A',
    theme: DAYS[3].theme,
    label: 'Khoảng thời gian rảnh',
    question: 'Bạn có một khoảng thời gian rảnh trong ngày. Bạn sẽ sử dụng nó như thế nào?',
    options: [
      opt(
        'A',
        'Chỉ sử dụng thời gian đó cho lợi ích cá nhân.',
        'GOOD',
        'Chăm lo cho bản thân là chính đáng, nhưng bạn bỏ qua cơ hội gắn sự phát triển của mình với người xung quanh.',
      ),
      opt(
        'B',
        'Giúp đỡ một người đang cần hỗ trợ nhưng vẫn đảm bảo hoàn thành trách nhiệm của mình.',
        'BEST',
        'Cân bằng được trách nhiệm cá nhân và sự quan tâm tới người khác.',
      ),
      opt(
        'C',
        'Để thời gian trôi qua vì không biết làm gì.',
        'CONSIDER',
        'Thời gian không được sử dụng có mục đích — cho cả bản thân lẫn người khác.',
      ),
    ],
    explanation:
      'Xây dựng con người không chỉ hướng đến sự phát triển cá nhân mà còn gắn với trách nhiệm đối với người khác và cộng đồng.',
    theory: ['Ý thức làm chủ', 'Tinh thần tập thể', 'Trách nhiệm'],
  },
  {
    id: 'B4',
    day: 22,
    team: 'B',
    theme: DAYS[3].theme,
    label: 'Tuần thi và buổi tình nguyện',
    question:
      'Tuần này bạn có bài kiểm tra quan trọng. Câu lạc bộ tình nguyện bạn tham gia đang thiếu người cho buổi dạy học miễn phí cho trẻ em vào cuối tuần. Bạn sẽ làm gì?',
    options: [
      opt(
        'A',
        'Nhận lời tham gia cả ngày, việc ôn bài tính sau.',
        'CONSIDER',
        'Tinh thần vì tập thể rất đáng quý, nhưng bỏ ngỏ trách nhiệm học tập khiến sự đóng góp khó bền vững.',
      ),
      opt(
        'B',
        'Từ chối lần này vì đang bận thi, hẹn tham gia các đợt sau.',
        'GOOD',
        'Ưu tiên hợp lý và trung thực với khả năng của mình, nhưng chưa tìm cách đóng góp trong phạm vi có thể.',
      ),
      opt(
        'C',
        'Lên lịch ôn tập trước, đăng ký hỗ trợ một ca phù hợp và báo rõ khả năng của mình cho ban tổ chức.',
        'BEST',
        'Vừa giữ trách nhiệm với việc học, vừa đóng góp cho tập thể một cách có kế hoạch.',
      ),
    ],
    explanation:
      'Cá nhân và tập thể không đối lập. Con người toàn diện biết hoàn thành trách nhiệm của bản thân, đồng thời chủ động đóng góp cho cộng đồng bằng khả năng thực tế của mình — có kế hoạch, không cực đoan về phía nào.',
    theory: ['Con người toàn diện', 'Tinh thần tập thể', 'Trách nhiệm'],
  },

  // ─── DAY 30 · TỰ NHÌN LẠI (FINAL DAY ×2) ────────────────────────────
  {
    id: 'A5',
    day: 30,
    team: 'A',
    theme: DAYS[4].theme,
    label: 'Mục tiêu chưa đạt',
    question: 'Bạn đặt một mục tiêu quan trọng nhưng cuối cùng không đạt được. Bạn sẽ làm gì?',
    options: [
      opt(
        'A',
        'Bỏ cuộc vì mình đã thất bại.',
        'CONSIDER',
        'Coi một lần chưa đạt là điểm kết thúc khiến quá trình rèn luyện dừng lại.',
      ),
      opt(
        'B',
        'Cho rằng nguyên nhân chủ yếu do hoàn cảnh, chờ điều kiện thuận lợi hơn rồi thử lại.',
        'GOOD',
        'Vẫn muốn tiếp tục, nhưng khi chỉ nhìn ra nguyên nhân bên ngoài thì cách làm của bản thân khó được cải thiện.',
      ),
      opt(
        'C',
        'Nhìn lại nguyên nhân, điều chỉnh cách làm và tiếp tục rèn luyện.',
        'BEST',
        'Biến lần chưa thành công thành bài học để điều chỉnh — cốt lõi của tự rèn luyện.',
      ),
    ],
    explanation:
      'Tự rèn luyện không phải là không bao giờ thất bại, mà là biết nhìn lại, điều chỉnh và tiếp tục hoàn thiện bản thân.',
    theory: ['Tự rèn luyện', 'Tu dưỡng', 'Kiên trì'],
    multiplier: 2,
  },
  {
    id: 'B5',
    day: 30,
    team: 'B',
    theme: DAYS[4].theme,
    label: 'Góp ý sau 30 ngày',
    question:
      'Kết thúc 30 ngày, nhóm góp ý rằng bạn thường nhận việc rồi nộp trễ hạn, dù chất lượng khá tốt. Bạn sẽ phản hồi thế nào?',
    options: [
      opt(
        'A',
        'Cảm ơn góp ý, cùng nhóm xem lại những lần trễ hạn và đặt cách theo dõi tiến độ cụ thể cho dự án tiếp theo.',
        'BEST',
        'Tiếp nhận cởi mở và chuyển góp ý thành một thay đổi cụ thể, có thể kiểm chứng.',
      ),
      opt(
        'B',
        'Giải thích rằng chất lượng quan trọng hơn thời hạn, nên trễ một chút là chấp nhận được.',
        'CONSIDER',
        'Chất lượng là điểm mạnh, nhưng bảo vệ thói quen trễ hạn bỏ qua ảnh hưởng tới các thành viên khác.',
      ),
      opt(
        'C',
        'Ghi nhận góp ý và tự nhắc mình lần sau cố gắng đúng hạn hơn.',
        'GOOD',
        'Thái độ tiếp nhận là tốt, nhưng thiếu phương pháp cụ thể nên thay đổi dễ chỉ dừng ở ý định.',
      ),
    ],
    explanation:
      'Tự nhìn lại hiệu quả cần cả thái độ cầu thị lẫn phương pháp làm việc cụ thể. Biết lắng nghe góp ý và biến nó thành hành động là cách để phẩm chất và năng lực — “hồng” và “chuyên” — cùng được hoàn thiện.',
    theory: ['Tự rèn luyện', 'Phương pháp làm việc', '“Vừa hồng, vừa chuyên”'],
    multiplier: 2,
  },
]

export const TOTAL_DAYS = DAYS.length

export function getScenario(dayIndex: number, team: Team): Scenario {
  const { day } = DAYS[dayIndex]
  const scenario = SCENARIOS.find((s) => s.day === day && s.team === team)
  if (!scenario) throw new Error(`Missing scenario for day ${day}, team ${team}`)
  return scenario
}

export function pointsFor(option: Option, scenario: Scenario): number {
  return option.score * (scenario.multiplier ?? 1)
}

export const formatDay = (day: number) => String(day).padStart(2, '0')

export const REFLECTION_OPTIONS = [
  'Duy trì kỷ luật',
  'Phát triển năng lực',
  'Chịu trách nhiệm',
  'Cân bằng cá nhân và tập thể',
  'Điều chỉnh sau thất bại',
]
