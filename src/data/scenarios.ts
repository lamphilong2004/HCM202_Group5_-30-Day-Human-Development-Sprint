import type { DayInfo, Level, Option, OptionId, Outcome, Question, QuestionKind, Team } from '../types/game'

/*
 * Ngân hàng 20 tình huống của Nhóm 05, chấm theo bậc phù hợp 100 / 50 / 30 / 0.
 *
 * Mỗi câu giữ nguyên mục tiêu học tập (`objective`), đội, Day và loại câu của
 * ngân hàng 20 câu đã duyệt; câu hỏi được chuyển thành tình huống ra quyết định
 * để bốn phương án thể hiện bốn mức độ phù hợp khác nhau thật sự — không cho
 * điểm một phần cho một nhận định sai về kiến thức.
 *
 * Phần “Vì sao?” dựa trên các giải thích đã được nhóm đối chiếu với Giáo trình
 * Tư tưởng Hồ Chí Minh (Bộ GD&ĐT, 2019), Chương VI, mục III, tr. 131–133. Cách
 * chia hai mặt “hồng” (phẩm chất) / “chuyên” (năng lực) là khái quát diễn giải
 * của nhóm, không phải bảng phân loại nguyên văn của giáo trình.
 *
 * Các tình huống và “30 ngày” là ví dụ vận dụng do nhóm thiết kế, không phải
 * phương pháp do Hồ Chí Minh quy định.
 */

export const QUESTIONS_PER_TEAM = 10

/** The rubric. Points are never stored per option: they come only from here (see `pointsFor`). */
export const LEVEL_POINTS: Record<Level, number> = {
  BEST: 100,
  GOOD: 50,
  PARTIAL: 30,
  UNSUITABLE: 0,
}

export const LEVELS: Level[] = ['BEST', 'GOOD', 'PARTIAL', 'UNSUITABLE']
export const OUTCOMES: Outcome[] = [...LEVELS, 'TIMEOUT']

export const OUTCOME_LABEL: Record<Outcome, string> = {
  BEST: 'Phù hợp nhất',
  GOOD: 'Khá phù hợp',
  PARTIAL: 'Phù hợp một phần',
  UNSUITABLE: 'Chưa phù hợp',
  TIMEOUT: 'Hết giờ',
}

export const DAYS: DayInfo[] = [
  { day: 1, theme: 'Kỷ luật & khởi đầu xây dựng con người', journey: 'Khởi đầu xây dựng con người', multiplier: 1 },
  { day: 7, theme: 'Phát triển năng lực · “Chuyên”', journey: 'Phát triển năng lực', multiplier: 1 },
  { day: 15, theme: 'Phẩm chất, trách nhiệm · “Hồng”', journey: 'Phẩm chất & trách nhiệm', multiplier: 1 },
  { day: 22, theme: 'Cá nhân, tập thể & môi trường', journey: 'Cá nhân, tập thể & môi trường', multiplier: 1 },
  { day: 30, theme: 'Tự rèn luyện & nhìn lại', journey: 'Tự rèn luyện & nhìn lại', multiplier: 2 },
]

export const KIND_LABEL: Record<QuestionKind, string> = {
  THEORY: 'Nền tảng lý luận',
  APPLICATION: 'Vận dụng',
}

type DraftOption = Omit<Option, 'id'>
type Draft = Omit<Question, 'id' | 'options'> & { options: [DraftOption, DraftOption, DraftOption, DraftOption] }

/** One option: suitability level, text, and why it earns that level. */
const o = (level: Level, text: string, explanation: string): DraftOption => ({ level, text, explanation })

const q = (d: Draft): Question => ({
  ...d,
  id: `${d.team}${String(d.number).padStart(2, '0')}`,
  options: d.options.map((opt, i) => ({ ...opt, id: 'ABCD'[i] as OptionId })) as Question['options'],
})

export const QUESTIONS: Question[] = [
  // ─── DAY 01 · KHỞI ĐẦU XÂY DỰNG CON NGƯỜI ───────────────────────────
  q({
    team: 'A',
    number: 1,
    day: 1,
    kind: 'THEORY',
    objective:
      'Tầm quan trọng của xây dựng con người: yêu cầu khách quan của sự nghiệp cách mạng, vừa cấp bách, vừa lâu dài, có ý nghĩa chiến lược.',
    question:
      'Ban cán sự lớp bàn có nên đưa việc rèn luyện con người (kỷ luật, kỹ năng, trách nhiệm) vào kế hoạch năm học không. Quan điểm nào phù hợp nhất?',
    options: [
      o('GOOD', 'Triển khai ngay trong học kỳ này, các học kỳ sau tính tiếp.', 'Thấy được tính cấp bách, nhưng chưa xác định đây là việc lâu dài.'),
      o('BEST', 'Triển khai ngay và duy trì lâu dài, coi là nhiệm vụ trọng tâm song song với học tập.', 'Giữ được cả hai yêu cầu: cấp bách và lâu dài, mang tầm chiến lược.'),
      o('UNSUITABLE', 'Không cần, vì đó là việc riêng của nhà trường và từng cá nhân.', 'Phủ nhận vai trò của tập thể và thu hẹp việc xây dựng con người vào một cơ quan.'),
      o('PARTIAL', 'Đồng ý về nguyên tắc, nhưng để đến năm cuối khi sắp đi làm mới bắt đầu.', 'Có thấy ý nghĩa, nhưng trì hoãn nên mất tính cấp bách.'),
    ],
    explanation:
      'Xây dựng con người là yêu cầu khách quan của sự nghiệp cách mạng: vừa cấp bách, vừa lâu dài, mang ý nghĩa chiến lược. Phương án phù hợp nhất giữ được cả hai: làm ngay và làm bền bỉ.',
    theory: ['Xây dựng con người', 'Cấp bách & lâu dài', 'Ý nghĩa chiến lược'],
  }),
  q({
    team: 'B',
    number: 1,
    day: 1,
    kind: 'THEORY',
    objective: 'Chiến lược “trồng người”: Hồ Chí Minh dẫn luận điểm “trồng cây – trồng người” để nhấn mạnh tầm nhìn lâu dài.',
    question: 'Lớp muốn vận dụng tư tưởng “trồng người” khi thiết kế 30-Day Sprint. Cách hiểu nào phù hợp nhất?',
    options: [
      o('BEST', 'Coi bồi dưỡng con người là đầu tư lâu dài; 30 ngày chỉ là bước khởi đầu.', 'Nắm đúng tầm nhìn “trăm năm” của việc bồi dưỡng con người.'),
      o('PARTIAL', 'Tổ chức một buổi nói chuyện truyền cảm hứng rồi để mỗi người tự lo.', 'Có khởi động tích cực, nhưng thiếu quá trình bồi dưỡng tiếp theo.'),
      o('GOOD', 'Đầu tư nghiêm túc trong 30 ngày, kết thúc thì dừng.', 'Có đầu tư thật cho con người, nhưng chưa nhìn thấy quá trình lâu dài.'),
      o('UNSUITABLE', 'Ưu tiên việc thấy kết quả ngay; bồi dưỡng con người là việc chậm, để sau.', 'Đi ngược tinh thần “trồng người” vì đặt con người xuống sau.'),
    ],
    explanation:
      'Hồ Chí Minh dẫn luận điểm "Vì lợi ích mười năm thì phải trồng cây, vì lợi ích trăm năm thì phải trồng người" (giáo trình chú thích ý tưởng gốc của Quản Trọng) để nhấn mạnh tầm nhìn lâu dài: muốn có lợi ích bền vững thì phải đầu tư cho con người.',
    theory: ['Chiến lược “trồng người”', 'Giáo dục', 'Tầm nhìn lâu dài'],
  }),
  q({
    team: 'A',
    number: 2,
    day: 1,
    kind: 'APPLICATION',
    objective: 'Vì sao xây dựng con người phải đặt ra ngay từ đầu: đây là một bộ phận của chiến lược phát triển lâu dài.',
    question: 'Một câu lạc bộ sinh viên vừa thành lập. Ban chủ nhiệm nên đặt việc bồi dưỡng thành viên vào lúc nào?',
    options: [
      o('PARTIAL', 'Khi câu lạc bộ đã ổn định và có kinh phí thì mới tính.', 'Có ý định bồi dưỡng, nhưng đặt sau nên không còn là nền móng ban đầu.'),
      o('UNSUITABLE', 'Không cần; chỉ tuyển người đã giỏi sẵn hoặc dùng công cụ thay người.', 'Xem con người là thứ có thể thay thế, bỏ qua việc xây dựng con người.'),
      o('BEST', 'Ngay từ đầu, gắn vào kế hoạch phát triển dài hạn của câu lạc bộ.', 'Đặt con người làm trung tâm và là một phần của chiến lược lâu dài.'),
      o('GOOD', 'Ngay từ đầu, nhưng chỉ bằng một khóa đào tạo nhập môn.', 'Đúng thời điểm, nhưng làm một lần nên chưa thành quá trình.'),
    ],
    explanation:
      'Xây dựng con người là mối quan tâm trung tâm và là một bộ phận của chiến lược phát triển lâu dài, nên cần được đặt ra ngay từ đầu — không phải việc làm một lần, việc làm sau, hay việc giao riêng cho một bộ phận.',
    theory: ['Xây dựng con người', 'Chiến lược lâu dài'],
  }),
  q({
    team: 'B',
    number: 2,
    day: 1,
    kind: 'APPLICATION',
    objective: 'Tính chủ động trong tự rèn luyện, tu dưỡng: không chờ người khác nhắc nhở mới hành động.',
    question: 'Bạn biết mình hay trì hoãn phần việc trong bài nhóm. Cách xử lý nào thể hiện rõ nhất tính chủ động tự rèn luyện?',
    options: [
      o('UNSUITABLE', 'Chờ nhóm trưởng nhắc nhiều lần rồi mới bắt đầu làm.', 'Việc rèn luyện hoàn toàn phụ thuộc vào người khác nhắc nhở.'),
      o('GOOD', 'Nhờ bạn cùng nhóm nhắc hạn, nhưng tự hoàn thành phần việc của mình.', 'Có trách nhiệm hoàn thành, nhưng vẫn dựa vào nhắc nhở từ bên ngoài.'),
      o('PARTIAL', 'Hứa với bản thân sẽ cố gắng hơn, nhưng chưa có cách làm cụ thể.', 'Có ý thức thay đổi, nhưng chưa chuyển thành hành động.'),
      o('BEST', 'Tự đặt hạn chót sớm hơn, theo dõi mỗi ngày và tự điều chỉnh khi trễ.', 'Tự nhận ra vấn đề, tự hành động và tự điều chỉnh — đúng tinh thần tự rèn luyện.'),
    ],
    explanation:
      'Tự rèn luyện, tu dưỡng đòi hỏi cá nhân chủ động nhận ra điều cần thay đổi và tự hành động. Chờ người khác nhắc nhở cho thấy việc rèn luyện vẫn phụ thuộc vào tác động bên ngoài.',
    theory: ['Tự rèn luyện', 'Tu dưỡng', 'Tính chủ động'],
  }),

  // ─── DAY 07 · PHÁT TRIỂN NĂNG LỰC / “CHUYÊN” ────────────────────────
  q({
    team: 'A',
    number: 3,
    day: 7,
    kind: 'THEORY',
    objective: '“Chuyên” nhấn mạnh tri thức, năng lực, trình độ chuyên môn, nghiệp vụ, ngoại ngữ, sức khỏe.',
    question: 'Một sinh viên muốn phát triển mặt “chuyên” trong 30-Day Sprint. Kế hoạch nào phù hợp nhất?',
    options: [
      o('GOOD', 'Học sâu chuyên môn mỗi ngày, tạm gác ngoại ngữ và sức khỏe.', 'Tập trung đúng vào năng lực chuyên môn, nhưng bỏ sót các mặt khác của “chuyên”.'),
      o('PARTIAL', 'Xem video kỹ năng khi rảnh, không đặt mục tiêu cụ thể.', 'Có tiếp xúc kiến thức mới, nhưng rời rạc và thiếu lộ trình.'),
      o('BEST', 'Học sâu chuyên môn, luyện ngoại ngữ, giữ sức khỏe — có mục tiêu đo được mỗi tuần.', 'Bao quát các mặt của “chuyên” và có lộ trình kiểm chứng được.'),
      o('UNSUITABLE', 'Chỉ tập trung rèn đạo đức, vì năng lực sẽ tự đến sau.', 'Nhầm “chuyên” với “hồng”; năng lực không tự hình thành nếu không rèn luyện.'),
    ],
    explanation:
      '“Chuyên” nhấn mạnh mặt năng lực: tri thức, trình độ chuyên môn, nghiệp vụ, ngoại ngữ và sức khỏe để hoàn thành nhiệm vụ. Kế hoạch phù hợp nhất bao quát các mặt đó và có cách theo dõi tiến bộ.',
    theory: ['“Chuyên”', 'Năng lực', 'Con người toàn diện'],
  }),
  q({
    team: 'B',
    number: 3,
    day: 7,
    kind: 'THEORY',
    objective: 'Yêu cầu con người toàn diện: vừa “hồng” vừa “chuyên”.',
    question:
      'Lớp chọn tiêu chí bình xét “thành viên tiêu biểu” sau 30 ngày. Bộ tiêu chí nào phù hợp nhất với yêu cầu xây dựng con người toàn diện?',
    options: [
      o('PARTIAL', 'Chỉ xét ai tham gia nhiều hoạt động phong trào nhất.', 'Có ghi nhận tinh thần tham gia, nhưng phiến diện, bỏ qua năng lực.'),
      o('BEST', 'Xét cả phẩm chất (trách nhiệm, trung thực) lẫn năng lực (học tập, kỹ năng).', 'Thể hiện đúng yêu cầu vừa “hồng” vừa “chuyên”.'),
      o('UNSUITABLE', 'Ai được nhiều bạn bè yêu thích nhất thì được chọn.', 'Mức độ được yêu thích không phản ánh phẩm chất hay năng lực.'),
      o('GOOD', 'Chủ yếu xét điểm học tập, thêm một tiêu chí nhỏ về ý thức tập thể.', 'Có cả hai mặt, nhưng lệch hẳn về “chuyên”, mặt “hồng” còn mờ nhạt.'),
    ],
    explanation:
      'Trong nội dung xây dựng con người toàn diện, Hồ Chí Minh đặc biệt nhấn mạnh yêu cầu vừa “hồng” vừa “chuyên”: phẩm chất và năng lực gắn bó, không tách rời.',
    theory: ['Vừa “hồng” vừa “chuyên”', 'Con người toàn diện'],
  }),
  q({
    team: 'A',
    number: 4,
    day: 7,
    kind: 'APPLICATION',
    objective: 'Người có trách nhiệm, sống tích cực nhưng thiếu kiến thức chuyên môn cần bổ sung chủ yếu mặt “chuyên”.',
    question:
      'Một thành viên rất trách nhiệm, nhiệt tình với nhóm nhưng thường làm sai phần chuyên môn được giao. Lời khuyên nào phù hợp nhất?',
    options: [
      o('UNSUITABLE', 'Nhiệt tình là đủ; sai thì nhóm sẽ sửa giúp.', 'Bỏ qua mặt “chuyên” đang thiếu và đẩy gánh nặng cho tập thể.'),
      o('BEST', 'Giữ tinh thần trách nhiệm, đồng thời lập kế hoạch bù kiến thức còn thiếu.', 'Giữ mặt “hồng” đã có và bổ sung đúng mặt “chuyên” còn thiếu.'),
      o('GOOD', 'Học thêm chuyên môn, tạm nhận ít việc hơn cho đến khi vững.', 'Đúng hướng bổ sung năng lực, nhưng tạm giảm đóng góp cho nhóm.'),
      o('PARTIAL', 'Vẫn nhận việc như cũ, nhờ bạn khác kiểm tra lại phần của mình.', 'Giảm được lỗi trước mắt, nhưng chưa tự nâng năng lực.'),
    ],
    explanation:
      'Tinh thần trách nhiệm và lối sống tích cực là biểu hiện của mặt “hồng” — người này đã có. Điều còn thiếu là kiến thức và năng lực chuyên môn, tức mặt “chuyên”. Con người toàn diện cần cả hai.',
    theory: ['“Chuyên”', '“Hồng”', 'Con người toàn diện'],
  }),
  q({
    team: 'B',
    number: 4,
    day: 7,
    kind: 'APPLICATION',
    objective: 'Thử thách vừa cải thiện kỹ năng chuyên môn vừa duy trì trách nhiệm tập thể phản ánh sự kết hợp phẩm chất và năng lực.',
    question: 'Nhóm thiết kế thử thách 30 ngày cho các thành viên. Thiết kế nào phù hợp nhất với yêu cầu vừa “hồng” vừa “chuyên”?',
    options: [
      o('BEST', 'Mỗi ngày một mục tiêu kỹ năng và một việc làm có trách nhiệm với tập thể, có theo dõi.', 'Kết hợp phẩm chất và năng lực trong hành vi hằng ngày.'),
      o('UNSUITABLE', 'Chỉ chấm kết quả cuối; ai đạt bằng mọi cách đều được thưởng.', 'Bỏ qua quá trình và phẩm chất, có thể khuyến khích cách làm thiếu trung thực.'),
      o('PARTIAL', 'Chỉ chọn một thói quen tốt như dậy sớm rồi theo dõi.', 'Rèn được kỷ luật, nhưng chưa phát triển chuyên môn hay trách nhiệm tập thể.'),
      o('GOOD', 'Luyện kỹ năng chuyên môn mỗi ngày; trách nhiệm tập thể chỉ nhắc vào cuối tuần.', 'Có cả hai mặt, nhưng mặt “hồng” mới dừng ở lời nhắc.'),
    ],
    explanation:
      'Thiết kế phù hợp nhất kết hợp phẩm chất (“hồng”) và năng lực (“chuyên”) trong hành vi cụ thể hằng ngày. Thử thách 30 ngày ở đây là ví dụ vận dụng do nhóm thiết kế.',
    theory: ['Vừa “hồng” vừa “chuyên”', 'Phẩm chất & năng lực'],
  }),

  // ─── DAY 15 · PHẨM CHẤT, TRÁCH NHIỆM / “HỒNG” ───────────────────────
  q({
    team: 'A',
    number: 5,
    day: 15,
    kind: 'THEORY',
    objective: '“Hồng” đề cập phẩm chất, lý tưởng, đạo đức cách mạng, lối sống và bản lĩnh chính trị.',
    question: 'Trong 30-Day Sprint, một sinh viên muốn rèn luyện mặt “hồng”. Kế hoạch nào phù hợp nhất?',
    options: [
      o('PARTIAL', 'Đọc vài bài viết về đạo đức, chưa áp dụng vào việc làm hằng ngày.', 'Có tìm hiểu, nhưng chưa chuyển thành lối sống và hành động.'),
      o('GOOD', 'Giữ trung thực trong thi cử và đúng hẹn, chưa nghĩ tới lý tưởng, mục đích sống.', 'Rèn được đạo đức trong hành vi, nhưng chưa chạm tới lý tưởng và bản lĩnh.'),
      o('UNSUITABLE', 'Lấy thêm chứng chỉ để có vị trí tốt hơn trong lớp.', 'Bằng cấp hay vị trí không phải tiêu chí của “hồng”.'),
      o('BEST', 'Rèn lý tưởng sống, lối sống trung thực, trách nhiệm và bản lĩnh trước cám dỗ.', 'Bao quát lý tưởng, đạo đức, lối sống và bản lĩnh — các mặt của “hồng”.'),
    ],
    explanation:
      '“Hồng” đề cập mặt phẩm chất: lý tưởng, đạo đức cách mạng, lối sống và bản lĩnh chính trị. Bằng cấp hay vị trí xã hội không phải tiêu chí của “hồng”.',
    theory: ['“Hồng”', 'Đạo đức cách mạng', 'Bản lĩnh chính trị'],
  }),
  q({
    team: 'B',
    number: 5,
    day: 15,
    kind: 'THEORY',
    objective: 'Phương pháp nêu gương được Hồ Chí Minh đặc biệt đề cao, nhất là đối với người đứng đầu.',
    question: 'Bạn là nhóm trưởng và muốn cả nhóm nộp bài đúng hạn. Cách nào phù hợp nhất?',
    options: [
      o('GOOD', 'Lập lịch rõ ràng, nhắc nhở đều đặn, nhưng chưa làm gương bằng phần việc của mình.', 'Tổ chức tốt, nhưng thiếu yếu tố quyết định là người đứng đầu làm gương.'),
      o('UNSUITABLE', 'Dọa báo giảng viên trừ điểm ai nộp trễ.', 'Răn đe không tạo được sự tự giác bền vững.'),
      o('BEST', 'Tự hoàn thành phần việc của mình sớm, đúng hạn trước rồi mới yêu cầu nhóm.', 'Người đứng đầu làm gương bằng hành động cụ thể.'),
      o('PARTIAL', 'Thưởng cho người nộp sớm, ngoài ra không làm gì thêm.', 'Có khích lệ, nhưng chỉ dựa vào lợi ích vật chất đơn thuần.'),
    ],
    explanation:
      'Nêu gương là phương pháp được Hồ Chí Minh đặc biệt đề cao, nhất là với người đứng đầu: làm gương bằng hành động cụ thể thì yêu cầu mới có sức thuyết phục. Răn đe hay lợi ích vật chất đơn thuần không tạo chuyển biến bền vững.',
    theory: ['Nêu gương', 'Phương pháp xây dựng con người', 'Người đứng đầu'],
  }),
  q({
    team: 'A',
    number: 6,
    day: 15,
    kind: 'APPLICATION',
    objective: 'Người giỏi chuyên môn nhưng thiếu trách nhiệm tập thể: có “chuyên” nhưng chưa đáp ứng đầy đủ mặt “hồng”.',
    question:
      'Một thành viên giỏi chuyên môn nhất nhóm nhưng hay vắng họp và không chia sẻ tài liệu. Cách góp ý nào phù hợp nhất?',
    options: [
      o('BEST', 'Ghi nhận năng lực của bạn, đồng thời góp ý thẳng về trách nhiệm với tập thể.', 'Thừa nhận mặt “chuyên” và chỉ đúng mặt “hồng” còn thiếu.'),
      o('GOOD', 'Giao phần khó nhất cho bạn ấy để tận dụng năng lực, kèm hạn chót rõ ràng.', 'Phát huy được năng lực, nhưng chưa giải quyết vấn đề trách nhiệm.'),
      o('PARTIAL', 'Nhắc chung trong nhóm chat rằng mọi người nên họp đầy đủ.', 'Có lên tiếng, nhưng gián tiếp nên khó tạo thay đổi.'),
      o('UNSUITABLE', 'Bỏ qua, vì giỏi chuyên môn là quan trọng nhất.', 'Tách rời “chuyên” khỏi “hồng”, trái với yêu cầu con người toàn diện.'),
    ],
    explanation:
      'Chuyên môn tốt cho thấy mặt “chuyên” đã có; thiếu trách nhiệm với tập thể là hạn chế ở mặt “hồng” — phẩm chất, lối sống. Con người toàn diện đòi hỏi hai mặt đi cùng nhau.',
    theory: ['“Hồng”', '“Chuyên”', 'Trách nhiệm'],
  }),
  q({
    team: 'B',
    number: 6,
    day: 15,
    kind: 'APPLICATION',
    objective: 'Trưởng nhóm yêu cầu người khác đúng giờ nhưng bản thân đến muộn là trái nguyên tắc nêu gương.',
    question: 'Nhóm trưởng yêu cầu mọi người đúng giờ nhưng chính mình hay đến muộn. Nhóm trưởng nên làm gì?',
    options: [
      o('UNSUITABLE', 'Giữ nguyên yêu cầu; nhóm trưởng nhiều việc nên được ngoại lệ.', 'Lời nói không đi đôi với việc làm, làm mất uy tín người đứng đầu.'),
      o('PARTIAL', 'Nới lỏng yêu cầu đúng giờ cho cả nhóm để công bằng.', 'Nhận ra mâu thuẫn, nhưng giải quyết bằng cách hạ chuẩn chung.'),
      o('GOOD', 'Từ nay đến đúng giờ, nhưng không nhắc gì về những lần trước.', 'Sửa được hành vi, nhưng thiếu thẳng thắn nhìn nhận khuyết điểm.'),
      o('BEST', 'Nhận khuyết điểm trước nhóm và đến đúng giờ từ buổi sau.', 'Thẳng thắn nhận lỗi và làm gương bằng hành động.'),
    ],
    explanation:
      'Yêu cầu người khác mà bản thân không làm là lời nói không đi đôi với việc làm — trái với nguyên tắc nêu gương. Người đứng đầu cần làm gương trước thì yêu cầu mới có sức thuyết phục.',
    theory: ['Nêu gương', 'Người đứng đầu', 'Nói đi đôi với làm'],
  }),

  // ─── DAY 22 · CÁ NHÂN, TẬP THỂ & MÔI TRƯỜNG ─────────────────────────
  q({
    team: 'A',
    number: 7,
    day: 22,
    kind: 'THEORY',
    objective: 'Ý thức làm chủ thể hiện qua tư tưởng “mình vì mọi người, mọi người vì mình”.',
    question: 'Ký túc xá phân công trực vệ sinh khu vực chung. Thái độ nào thể hiện rõ nhất ý thức làm chủ?',
    options: [
      o('PARTIAL', 'Chỉ dọn khi khu vực chung bẩn đến mức ảnh hưởng phòng mình.', 'Có hành động, nhưng xuất phát từ lợi ích riêng.'),
      o('BEST', 'Làm tốt phần mình, sẵn sàng hỗ trợ bạn bận và góp ý cách giữ khu chung sạch.', 'Vừa làm tròn phần mình vừa chủ động vì lợi ích chung.'),
      o('GOOD', 'Làm đầy đủ, đúng lịch phần việc được phân công.', 'Có trách nhiệm cá nhân, nhưng chưa chủ động vì tập thể.'),
      o('UNSUITABLE', 'Việc ai nấy làm, phòng mình sạch là đủ.', 'Tách mình khỏi tập thể, trái với ý thức làm chủ.'),
    ],
    explanation:
      'Ý thức làm chủ gắn với tinh thần tập thể, thể hiện qua tư tưởng “mình vì mọi người, mọi người vì mình”: vừa làm tốt phần mình, vừa chủ động vì lợi ích chung.',
    theory: ['Ý thức làm chủ', 'Tinh thần tập thể'],
  }),
  q({
    team: 'B',
    number: 7,
    day: 22,
    kind: 'THEORY',
    objective:
      'Ngoài tự nỗ lực của cá nhân, xây dựng con người cần kết hợp môi trường, cơ chế, tính khoa học của bộ máy và tạo dựng nền dân chủ.',
    question: 'Lớp muốn nhiều bạn duy trì được 30-Day Sprint. Ban cán sự nên làm gì?',
    options: [
      o('GOOD', 'Lập nhóm hỗ trợ và lịch theo dõi chung, nhưng ban cán sự tự quyết mọi quy định.', 'Tạo được môi trường và cơ chế, nhưng thiếu dân chủ.'),
      o('PARTIAL', 'Gửi lời động viên mỗi tuần và để từng người tự cố gắng.', 'Có khích lệ, nhưng thiếu môi trường và cơ chế hỗ trợ.'),
      o('UNSUITABLE', 'Mặc kệ; ai có ý chí thì sẽ tự làm được.', 'Bỏ mặc cá nhân, tách việc rèn luyện khỏi tập thể.'),
      o('BEST', 'Khuyến khích nỗ lực cá nhân, tạo môi trường và cơ chế hỗ trợ, để mọi người cùng góp ý quy định.', 'Kết hợp nỗ lực cá nhân với môi trường, cơ chế và dân chủ.'),
    ],
    explanation:
      'Tự nỗ lực của cá nhân là quan trọng nhưng chưa đủ. Xây dựng con người cần kết hợp với môi trường, cơ chế, tính khoa học của bộ máy và việc tạo dựng nền dân chủ để con người có điều kiện phát triển.',
    theory: ['Môi trường', 'Cơ chế', 'Dân chủ'],
  }),
  q({
    team: 'A',
    number: 8,
    day: 22,
    kind: 'APPLICATION',
    objective: 'Mục tiêu “30 ngày” chỉ vì cá nhân, không quan tâm tập thể là xem nhẹ ý thức làm chủ và tinh thần tập thể.',
    question: 'Bạn đặt mục tiêu 30 ngày “mỗi ngày tự học 2 giờ”. Cách điều chỉnh nào gắn mục tiêu này với tập thể tốt nhất?',
    options: [
      o('BEST', 'Giữ mục tiêu, đồng thời chia sẻ tài liệu và hỗ trợ bạn học yếu hơn.', 'Mục tiêu cá nhân được gắn với lợi ích của tập thể.'),
      o('PARTIAL', 'Đăng tiến độ lên mạng xã hội mỗi ngày.', 'Tạo được cam kết công khai, nhưng chưa mang lại lợi ích cho tập thể.'),
      o('UNSUITABLE', 'Giữ kín tài liệu tốt để mình nổi bật hơn các bạn.', 'Đặt lợi ích cá nhân đối lập với tập thể.'),
      o('GOOD', 'Rủ vài bạn cùng học để giữ động lực cho nhau.', 'Có yếu tố tập thể, nhưng mục đích chủ yếu vẫn vì bản thân.'),
    ],
    explanation:
      'Mục tiêu cá nhân có ý nghĩa đầy đủ hơn khi gắn với lợi ích của tập thể và cộng đồng. Chỉ quan tâm mình có đạt hay không là xem nhẹ ý thức làm chủ và tinh thần tập thể.',
    theory: ['Ý thức làm chủ', 'Tinh thần tập thể'],
  }),
  q({
    team: 'B',
    number: 8,
    day: 22,
    kind: 'APPLICATION',
    objective: 'Ý chí cá nhân tốt nhưng thiếu điều kiện: cần kết hợp nỗ lực cá nhân với môi trường và cơ chế phù hợp.',
    question: 'Bạn quyết tâm tự học mỗi tối nhưng phòng trọ luôn ồn ào. Cách xử lý nào phù hợp nhất?',
    options: [
      o('UNSUITABLE', 'Bỏ kế hoạch, vì hoàn cảnh không cho phép.', 'Tuyệt đối hóa môi trường, buông bỏ nỗ lực của bản thân.'),
      o('GOOD', 'Chuyển sang học ở thư viện mỗi tối.', 'Giữ được ý chí và tìm môi trường tốt hơn, nhưng chưa cải thiện môi trường chung.'),
      o('BEST', 'Giữ quyết tâm, đồng thời bàn với bạn cùng phòng một khung giờ yên tĩnh chung.', 'Kết hợp ý chí cá nhân với việc cùng xây dựng môi trường và quy ước chung.'),
      o('PARTIAL', 'Đeo tai nghe và cố gắng chịu đựng.', 'Có nỗ lực cá nhân, nhưng bỏ qua vai trò của môi trường.'),
    ],
    explanation:
      'Ý chí cá nhân rất quan trọng, nhưng môi trường và cơ chế phù hợp tạo điều kiện để ý chí đó thành kết quả. Cần kết hợp cả hai; tuyệt đối hóa cá nhân hay tuyệt đối hóa môi trường đều phiến diện.',
    theory: ['Tự rèn luyện', 'Môi trường', 'Cơ chế'],
  }),

  // ─── DAY 30 · TỰ RÈN LUYỆN & NHÌN LẠI (×2) ──────────────────────────
  q({
    team: 'A',
    number: 9,
    day: 30,
    kind: 'THEORY',
    objective: 'Yếu tố giữ vai trò quyết định, thể hiện tính chủ động: cá nhân tự rèn luyện, tu dưỡng.',
    question: 'Sau 30 ngày, nhóm thấy kết quả mỗi người rất khác nhau dù cùng điều kiện. Cách nhìn nhận nào phù hợp nhất?',
    options: [
      o('GOOD', 'Khác biệt chủ yếu do mức độ tự giác; ai chưa đạt thì tự cố gắng hơn.', 'Nhận ra vai trò của tự giác, nhưng chưa kết hợp với hỗ trợ và rút kinh nghiệm chung.'),
      o('UNSUITABLE', 'Do may rủi; rèn luyện hay không cũng vậy.', 'Phủ nhận vai trò của tự rèn luyện.'),
      o('BEST', 'Môi trường có hỗ trợ, nhưng tự rèn luyện, tu dưỡng của mỗi người mới là yếu tố quyết định.', 'Nắm đúng vai trò quyết định của tự rèn luyện, không xem nhẹ môi trường.'),
      o('PARTIAL', 'Do nhóm chưa nhắc nhở đủ; tháng sau cần nhắc nhiều hơn.', 'Có ý hỗ trợ, nhưng đặt trọng tâm vào tác động bên ngoài.'),
    ],
    explanation:
      'Giáo dục, môi trường và tổ chức đều có vai trò, nhưng việc mỗi cá nhân tự rèn luyện, tu dưỡng mới là yếu tố quyết định, thể hiện tính chủ động. Không ai có thể rèn luyện thay mình.',
    theory: ['Tự rèn luyện', 'Tu dưỡng', 'Tính chủ động'],
  }),
  q({
    team: 'B',
    number: 9,
    day: 30,
    kind: 'THEORY',
    objective: 'Phương pháp làm việc của con người xã hội chủ nghĩa: khoa học, phong cách quần chúng, dân chủ, nêu gương.',
    question: 'Nhóm chuẩn bị báo cáo tổng kết 30-Day Sprint trước lớp. Cách làm việc nào phù hợp nhất?',
    options: [
      o('PARTIAL', 'Họp vui vẻ, ai thích làm gì thì làm, sát ngày mới ghép bài.', 'Cởi mở, nhưng thiếu kế hoạch và tính khoa học.'),
      o('BEST', 'Lập kế hoạch rõ, lắng nghe mọi người, quyết định dân chủ và nhóm trưởng làm gương.', 'Kết hợp khoa học, phong cách quần chúng, dân chủ và nêu gương.'),
      o('GOOD', 'Lập kế hoạch và phân công khoa học, nhóm trưởng tự quyết phần lớn nội dung.', 'Có tính khoa học, nhưng thiếu dân chủ và lắng nghe tập thể.'),
      o('UNSUITABLE', 'Nhóm trưởng tự làm hết và áp đặt, không cần ý kiến ai.', 'Áp đặt mệnh lệnh, trái với phong cách quần chúng và dân chủ.'),
    ],
    explanation:
      'Theo tư tưởng Hồ Chí Minh, con người xã hội chủ nghĩa cần phương pháp làm việc khoa học, có phong cách quần chúng, dân chủ và nêu gương. Làm việc tùy tiện hay áp đặt mệnh lệnh đều trái với yêu cầu đó.',
    theory: ['Phương pháp làm việc', 'Phong cách quần chúng', 'Dân chủ', 'Nêu gương'],
  }),
  q({
    team: 'A',
    number: 10,
    day: 30,
    kind: 'APPLICATION',
    objective: 'Không được coi một thử nghiệm 30 ngày là đã hoàn tất quá trình xây dựng con người.',
    question: 'Kết thúc 30 ngày, bạn đạt hầu hết mục tiêu đề ra. Cách nhìn nhận nào phù hợp nhất?',
    options: [
      o('UNSUITABLE', 'Coi như đã hoàn thiện bản thân, không cần rèn luyện thêm.', 'Coi 30 ngày là đã hoàn tất quá trình vốn lâu dài.'),
      o('PARTIAL', 'Tự thưởng một kỳ nghỉ dài rồi tính tiếp.', 'Có ghi nhận nỗ lực, nhưng dễ làm đứt mạch rèn luyện.'),
      o('GOOD', 'Ghi nhận tiến bộ, giữ lại vài thói quen tốt, chưa đặt mục tiêu tiếp theo.', 'Duy trì được kết quả, nhưng thiếu định hướng cho chặng sau.'),
      o('BEST', 'Ghi nhận tiến bộ, rút kinh nghiệm và đặt mục tiêu rèn luyện tiếp sau 30 ngày.', 'Xem 30 ngày là một chặng trong quá trình rèn luyện lâu dài.'),
    ],
    explanation:
      'Xây dựng con người là quá trình lâu dài. 30 ngày chỉ là khung thử nghiệm do nhóm thiết kế để theo dõi thay đổi và phản tỉnh; không thể coi đó là đã hoàn tất quá trình xây dựng con người.',
    theory: ['Tính lâu dài', 'Tự rèn luyện', 'Phản tỉnh'],
  }),
  q({
    team: 'B',
    number: 10,
    day: 30,
    kind: 'APPLICATION',
    objective:
      'Logic phù hợp của một 30-Day Sprint: chọn giá trị → chuyển thành hành vi cụ thể → thực hiện → theo dõi → phản tỉnh.',
    question: 'Bạn chuẩn bị bắt đầu một 30-Day Sprint mới. Cách thiết kế nào phù hợp nhất?',
    options: [
      o('BEST', 'Chọn giá trị cần rèn → chuyển thành hành vi cụ thể → thực hiện, theo dõi → phản tỉnh.', 'Gắn nhận thức với hành động, có theo dõi và tự điều chỉnh.'),
      o('PARTIAL', 'Đặt mục tiêu lớn, làm khi có hứng, cuối tháng đánh giá.', 'Có mục tiêu và đánh giá, nhưng thực hiện tùy hứng.'),
      o('UNSUITABLE', 'Chờ môi trường thuận lợi hơn rồi mới bắt đầu.', 'Trì hoãn, phó mặc cho hoàn cảnh bên ngoài.'),
      o('GOOD', 'Chọn một hành vi cụ thể và làm đều mỗi ngày, nhưng không ghi lại hay nhìn lại.', 'Có hành vi cụ thể và đều đặn, nhưng thiếu theo dõi và phản tỉnh.'),
    ],
    explanation:
      'Chuỗi hợp lý đi từ giá trị cần rèn luyện, cụ thể hóa thành hành vi, thực hiện, theo dõi rồi phản tỉnh — gắn nhận thức với hành động và tự điều chỉnh. Đây là cách nhóm vận dụng lý thuyết, không phải phương pháp do Hồ Chí Minh quy định.',
    theory: ['Tự rèn luyện', 'Lý luận gắn với thực tiễn', 'Phản tỉnh'],
  }),
]

/** Turn order inside each Day: A (1st) → B (1st) → A (2nd) → B (2nd). */
const DAY_TURNS: { team: Team; slot: 0 | 1 }[] = [
  { team: 'A', slot: 0 },
  { team: 'B', slot: 0 },
  { team: 'A', slot: 1 },
  { team: 'B', slot: 1 },
]

export const QUESTIONS_PER_DAY = DAY_TURNS.length
export const TOTAL_DAYS = DAYS.length

/** The full 20-step play order. */
export const QUESTION_SEQUENCE: Question[] = DAYS.flatMap(({ day }) =>
  DAY_TURNS.map(({ team, slot }) => {
    const found = QUESTIONS.filter((x) => x.day === day && x.team === team).sort((a, b) => a.number - b.number)[slot]
    if (!found) throw new Error(`Missing question: day ${day}, team ${team}, slot ${slot}`)
    return found
  }),
)

export const TOTAL_STEPS = QUESTION_SEQUENCE.length

export const dayIndexOf = (step: number) => Math.floor(step / QUESTIONS_PER_DAY)
export const isLastStepOfDay = (step: number) => step % QUESTIONS_PER_DAY === QUESTIONS_PER_DAY - 1

export function multiplierFor(question: Question): number {
  return DAYS.find((d) => d.day === question.day)?.multiplier ?? 1
}

export const bestOption = (question: Question) => question.options.find((x) => x.level === 'BEST')!

/** Highest score one team can reach: every answer at the BEST level. */
export const MAX_SCORE_PER_TEAM = QUESTIONS.filter((x) => x.team === 'A').reduce(
  (sum, x) => sum + LEVEL_POINTS.BEST * multiplierFor(x),
  0,
)

/**
 * The single scoring function. `null` means the team ran out of time (TIMEOUT → 0).
 * Response speed never affects the result.
 */
export function pointsFor(question: Question, optionId: OptionId | null): { outcome: Outcome; points: number } {
  const option = optionId ? question.options.find((x) => x.id === optionId) : undefined
  if (!option) return { outcome: 'TIMEOUT', points: 0 }
  return { outcome: option.level, points: LEVEL_POINTS[option.level] * multiplierFor(question) }
}

export const formatDay = (day: number) => String(day).padStart(2, '0')

export const REFLECTION_OPTIONS = [
  'Duy trì kỷ luật',
  'Phát triển năng lực',
  'Chịu trách nhiệm',
  'Cân bằng cá nhân và tập thể',
  'Điều chỉnh sau thất bại',
]
