import type { DayInfo, Option, OptionId, Question, QuestionKind, Team } from '../types/game'

/*
 * Ngân hàng 20 câu hỏi đã được Nhóm 05 duyệt (câu hỏi, phương án, đáp án giữ
 * nguyên văn). Phần “Vì sao?” do nhóm soạn và đã được nhóm đối chiếu với
 * Giáo trình Tư tưởng Hồ Chí Minh (Bộ GD&ĐT, 2019), Chương VI, mục III,
 * tr. 131–133. Cách chia hai mặt “hồng” (phẩm chất) / “chuyên” (năng lực) là
 * khái quát diễn giải của nhóm, không phải bảng phân loại nguyên văn.
 *
 * “30 ngày” là khung mô phỏng do nhóm thiết kế, không phải phương pháp do
 * Hồ Chí Minh quy định.
 */

export const CORRECT_POINTS = 100
export const QUESTIONS_PER_TEAM = 10

export const DAYS: DayInfo[] = [
  { day: 1, theme: 'Kỷ luật & khởi đầu xây dựng con người', journey: 'Khởi đầu xây dựng con người', multiplier: 1 },
  { day: 7, theme: 'Phát triển năng lực · “Chuyên”', journey: 'Phát triển năng lực', multiplier: 1 },
  { day: 15, theme: 'Phẩm chất, trách nhiệm · “Hồng”', journey: 'Phẩm chất & trách nhiệm', multiplier: 1 },
  { day: 22, theme: 'Cá nhân, tập thể & môi trường', journey: 'Cá nhân, tập thể & môi trường', multiplier: 1 },
  { day: 30, theme: 'Tự rèn luyện & nhìn lại', journey: 'Tự rèn luyện & nhìn lại', multiplier: 2 },
]

export const KIND_LABEL: Record<QuestionKind, string> = {
  THEORY: 'Lý thuyết',
  APPLICATION: 'Vận dụng',
}

type Draft = Omit<Question, 'id' | 'options'> & { options: [string, string, string, string] }

const q = (d: Draft): Question => ({
  ...d,
  id: `${d.team}${String(d.number).padStart(2, '0')}`,
  options: d.options.map((text, i) => ({ id: 'ABCD'[i] as OptionId, text })) as Question['options'],
})

export const QUESTIONS: Question[] = [
  // ─── DAY 01 · KHỞI ĐẦU ──────────────────────────────────────────────
  q({
    team: 'A',
    number: 1,
    day: 1,
    kind: 'THEORY',
    question: 'Tầm quan trọng của việc xây dựng con người được Hồ Chí Minh xác định như thế nào?',
    options: [
      'Là nhiệm vụ tạm thời trong thời kỳ chiến tranh',
      'Là yêu cầu khách quan của sự nghiệp cách mạng, vừa cấp bách, vừa lâu dài, có ý nghĩa chiến lược',
      'Là công việc phụ thuộc hoàn toàn vào sự phát triển kinh tế',
      'Là nhiệm vụ riêng của các cơ quan giáo dục',
    ],
    correct: 'B',
    explanation:
      'Xây dựng con người không phải việc nhất thời hay của riêng một ngành. Đó là yêu cầu khách quan của sự nghiệp cách mạng: vừa cấp bách trước mắt, vừa lâu dài, mang ý nghĩa chiến lược. Các phương án còn lại thu hẹp vai trò ấy vào một thời kỳ, một điều kiện hoặc một cơ quan.',
    theory: ['Xây dựng con người', 'Cấp bách & lâu dài', 'Ý nghĩa chiến lược'],
  }),
  q({
    team: 'B',
    number: 1,
    day: 1,
    kind: 'THEORY',
    question: 'Bác Hồ đã trích dẫn luận điểm nổi tiếng nào để nhấn mạnh chiến lược "trồng người"?',
    options: [
      '"Vì lợi ích mười năm thì phải trồng cây, vì lợi ích trăm năm thì phải trồng người"',
      '"Nhất nghệ tinh, nhất thân vinh"',
      '"Học, học nữa, học mãi"',
      '"Có chí thì nên"',
    ],
    correct: 'A',
    explanation:
      'Hồ Chí Minh dẫn luận điểm “trồng cây – trồng người” (giáo trình chú thích ý tưởng gốc của Quản Trọng) để đặt việc bồi dưỡng con người vào tầm nhìn trăm năm: muốn có lợi ích lâu dài thì phải đầu tư cho con người. Các câu còn lại là những châm ngôn quen thuộc về nghề nghiệp, học tập hay ý chí, không nói về chiến lược “trồng người”.',
    theory: ['Chiến lược “trồng người”', 'Giáo dục', 'Tầm nhìn lâu dài'],
  }),
  q({
    team: 'A',
    number: 2,
    day: 1,
    kind: 'APPLICATION',
    question: 'Vì sao việc xây dựng con người cần được đặt ra ngay từ đầu trong quá trình xây dựng xã hội?',
    options: [
      'Vì con người là yếu tố có thể thay thế bằng công nghệ',
      'Vì xây dựng con người là một bộ phận của chiến lược phát triển lâu dài',
      'Vì con người chỉ cần được đào tạo trong giai đoạn đầu',
      'Vì đây là nhiệm vụ riêng của nhà trường',
    ],
    correct: 'B',
    explanation:
      'Xây dựng con người là mối quan tâm trung tâm và là một bộ phận của chiến lược phát triển lâu dài, nên cần được đặt ra ngay từ đầu, chứ không phải việc làm một lần, việc làm sau, hay việc giao riêng cho nhà trường.',
    theory: ['Xây dựng con người', 'Chiến lược lâu dài'],
  }),
  q({
    team: 'B',
    number: 2,
    day: 1,
    kind: 'APPLICATION',
    question:
      'Một người biết mình cần thay đổi nhưng luôn chờ người khác nhắc nhở mới hành động. Điều này chưa phù hợp với yêu cầu nào?',
    options: [
      'Tính chủ động trong tự rèn luyện và tu dưỡng',
      'Tinh thần quốc tế',
      'Phong cách quần chúng',
      'Tính khoa học của bộ máy',
    ],
    correct: 'A',
    explanation:
      'Tự rèn luyện, tu dưỡng đòi hỏi cá nhân chủ động nhận ra điều cần thay đổi và tự hành động. Chờ người khác nhắc nhở cho thấy việc rèn luyện vẫn phụ thuộc vào tác động bên ngoài. Các phương án còn lại thuộc những nội dung khác, không trực tiếp nói về tính chủ động của cá nhân.',
    theory: ['Tự rèn luyện', 'Tu dưỡng', 'Tính chủ động'],
  }),

  // ─── DAY 07 · PHÁT TRIỂN NĂNG LỰC ───────────────────────────────────
  q({
    team: 'A',
    number: 3,
    day: 7,
    kind: 'THEORY',
    question: 'Yếu tố "Chuyên" trong con người toàn diện nhấn mạnh vào mặt nào?',
    options: [
      'Phẩm chất đạo đức và lòng khiêm tốn',
      'Lòng yêu nước và tinh thần quốc tế',
      'Tri thức, năng lực, trình độ chuyên môn, nghiệp vụ, ngoại ngữ, sức khỏe',
      'Tác phong khiêm tốn và lòng vị tha',
    ],
    correct: 'C',
    explanation:
      '“Chuyên” nhấn mạnh mặt năng lực: tri thức, trình độ chuyên môn, nghiệp vụ, ngoại ngữ và sức khỏe để hoàn thành nhiệm vụ. Các phương án A, B, D nói về phẩm chất, đạo đức, lý tưởng — những nội dung trò chơi khái quát vào mặt “hồng”.',
    theory: ['“Chuyên”', 'Năng lực', 'Con người toàn diện'],
  }),
  q({
    team: 'B',
    number: 3,
    day: 7,
    kind: 'THEORY',
    question: 'Trong nội dung xây dựng con người toàn diện, Hồ Chí Minh đặc biệt nhấn mạnh yêu cầu nào?',
    options: ['Vừa "giàu" vừa "sang"', 'Vừa "mạnh" vừa "khéo"', 'Vừa "hồng" vừa "chuyên"', 'Vừa "nhanh" vừa "chắc"'],
    correct: 'C',
    explanation:
      'Con người toàn diện phải vừa có phẩm chất (“hồng”) vừa có năng lực (“chuyên”); hai mặt gắn bó, không tách rời. Các cặp “giàu – sang”, “mạnh – khéo”, “nhanh – chắc” không phải cách diễn đạt của nội dung này.',
    theory: ['Vừa “hồng” vừa “chuyên”', 'Con người toàn diện'],
  }),
  q({
    team: 'A',
    number: 4,
    day: 7,
    kind: 'APPLICATION',
    question:
      'Một sinh viên có tinh thần trách nhiệm, sống tích cực nhưng lại thiếu kiến thức và năng lực chuyên môn để hoàn thành công việc. Người này đang cần bổ sung chủ yếu yếu tố nào?',
    options: ['“Hồng”', '“Chuyên”', 'Ý thức tập thể', 'Tinh thần quốc tế'],
    correct: 'B',
    explanation:
      'Tinh thần trách nhiệm và lối sống tích cực là biểu hiện của mặt “hồng” — người này đã có. Điều còn thiếu là kiến thức và năng lực chuyên môn, tức mặt “chuyên”. Con người toàn diện cần cả hai.',
    theory: ['“Chuyên”', '“Hồng”', 'Con người toàn diện'],
  }),
  q({
    team: 'B',
    number: 4,
    day: 7,
    kind: 'APPLICATION',
    question:
      'Một thử thách 30 ngày yêu cầu người tham gia vừa cải thiện kỹ năng chuyên môn, vừa duy trì một thói quen thể hiện trách nhiệm với tập thể. Cách thiết kế này phản ánh rõ nhất:',
    options: [
      'Chỉ phát triển “chuyên”',
      'Chỉ phát triển “hồng”',
      'Kết hợp phẩm chất và năng lực',
      'Chỉ tập trung vào kết quả cuối cùng',
    ],
    correct: 'C',
    explanation:
      'Thử thách vừa rèn kỹ năng chuyên môn (“chuyên”) vừa duy trì thói quen trách nhiệm với tập thể (“hồng”), nên phản ánh sự kết hợp phẩm chất và năng lực. Thử thách 30 ngày ở đây là ví dụ vận dụng do nhóm thiết kế.',
    theory: ['Vừa “hồng” vừa “chuyên”', 'Phẩm chất & năng lực'],
  }),

  // ─── DAY 15 · PHẨM CHẤT VÀ TRÁCH NHIỆM ──────────────────────────────
  q({
    team: 'A',
    number: 5,
    day: 15,
    kind: 'THEORY',
    question: 'Yếu tố "Hồng" trong con người toàn diện đề cập đến khía cạnh nào?',
    options: [
      'Trình độ khoa học - kỹ thuật và ngoại ngữ',
      'Phẩm chất, lý tưởng, đạo đức cách mạng, lối sống và bản lĩnh chính trị',
      'Sức khỏe thể chất và khả năng lao động chân tay',
      'Bằng cấp chuyên môn và vị trí xã hội',
    ],
    correct: 'B',
    explanation:
      '“Hồng” đề cập mặt phẩm chất: lý tưởng, đạo đức cách mạng, lối sống và bản lĩnh chính trị. Trình độ, ngoại ngữ, sức khỏe gần với mặt năng lực mà trò chơi khái quát là “chuyên”; bằng cấp hay vị trí xã hội không phải tiêu chí của “hồng”.',
    theory: ['“Hồng”', 'Đạo đức cách mạng', 'Bản lĩnh chính trị'],
  }),
  q({
    team: 'B',
    number: 5,
    day: 15,
    kind: 'THEORY',
    question:
      'Trong các phương pháp xây dựng con người, Hồ Chí Minh đặc biệt đề cao phương pháp nào, nhất là đối với người đứng đầu?',
    options: [
      'Răn đe và trừng phạt',
      'Nêu gương',
      'Tuyên truyền lý thuyết suông',
      'Khuyến khích bằng lợi ích vật chất đơn thuần',
    ],
    correct: 'B',
    explanation:
      'Nêu gương là phương pháp được đặc biệt đề cao: người đi trước, người đứng đầu làm gương bằng hành động cụ thể thì lời nói mới có sức thuyết phục. Răn đe, lý thuyết suông hay lợi ích vật chất đơn thuần không tạo được chuyển biến bền vững.',
    theory: ['Nêu gương', 'Phương pháp xây dựng con người', 'Người đứng đầu'],
  }),
  q({
    team: 'A',
    number: 6,
    day: 15,
    kind: 'APPLICATION',
    question:
      'Một sinh viên có chuyên môn rất tốt nhưng thiếu trách nhiệm với tập thể. Điều này cho thấy vấn đề gì trong yêu cầu xây dựng con người toàn diện?',
    options: [
      'Thiếu cả “hồng” và “chuyên”',
      'Có “hồng” nhưng thiếu “chuyên”',
      'Có “chuyên” nhưng chưa đáp ứng đầy đủ mặt “hồng”',
      'Không liên quan đến xây dựng con người',
    ],
    correct: 'C',
    explanation:
      'Chuyên môn tốt cho thấy mặt “chuyên” đã có. Thiếu trách nhiệm với tập thể là hạn chế ở mặt “hồng” — phẩm chất, lối sống. Con người toàn diện đòi hỏi hai mặt đi cùng nhau.',
    theory: ['“Hồng”', '“Chuyên”', 'Trách nhiệm'],
  }),
  q({
    team: 'B',
    number: 6,
    day: 15,
    kind: 'APPLICATION',
    question:
      'Một trưởng nhóm yêu cầu các thành viên đúng giờ nhưng bản thân thường xuyên đến muộn. Vấn đề này trái với nguyên tắc nào?',
    options: ['Tự rèn luyện', 'Nêu gương', 'Phong cách quần chúng', 'Tinh thần quốc tế'],
    correct: 'B',
    explanation:
      'Yêu cầu người khác đúng giờ trong khi bản thân thường đến muộn là lời nói không đi đôi với việc làm — trái với nguyên tắc nêu gương. Người đứng đầu cần làm gương trước thì yêu cầu mới có sức thuyết phục.',
    theory: ['Nêu gương', 'Người đứng đầu', 'Nói đi đôi với làm'],
  }),

  // ─── DAY 22 · CÁ NHÂN VÀ TẬP THỂ ────────────────────────────────────
  q({
    team: 'A',
    number: 7,
    day: 22,
    kind: 'THEORY',
    question: 'Trong các khía cạnh chủ yếu của con người toàn diện, ý thức làm chủ được thể hiện qua tư tưởng nào?',
    options: [
      '"Mỗi người tự lo cho bản thân mình"',
      '"Mình vì mọi người, mọi người vì mình"',
      '"Việc ai nấy làm, nhà ai nấy ở"',
      '"Lợi ích cá nhân là trên hết"',
    ],
    correct: 'B',
    explanation:
      'Ý thức làm chủ gắn với tinh thần tập thể: mỗi người có trách nhiệm với cộng đồng và cộng đồng quan tâm tới mỗi người. Các phương án còn lại đề cao lối sống cá nhân, tách rời tập thể.',
    theory: ['Ý thức làm chủ', 'Tinh thần tập thể'],
  }),
  q({
    team: 'B',
    number: 7,
    day: 22,
    kind: 'THEORY',
    question: 'Ngoài sự tự nỗ lực của cá nhân, quá trình xây dựng con người cần kết hợp chặt chẽ với các yếu tố nào?',
    options: [
      'Môi trường, cơ chế, tính khoa học của bộ máy và tạo dựng nền dân chủ',
      'Sự may mắn và hoàn cảnh ngẫu nhiên',
      'Tách biệt hoàn toàn khỏi cộng đồng xã hội',
      'Dựa hoàn toàn vào viện trợ nước ngoài',
    ],
    correct: 'A',
    explanation:
      'Tự nỗ lực của cá nhân là quan trọng nhưng chưa đủ. Xây dựng con người cần kết hợp với môi trường, cơ chế, tính khoa học của bộ máy và việc tạo dựng nền dân chủ để con người có điều kiện phát triển. Các phương án còn lại phó mặc cho may rủi, tách khỏi cộng đồng hoặc dựa hoàn toàn vào bên ngoài.',
    theory: ['Môi trường', 'Cơ chế', 'Dân chủ'],
  }),
  q({
    team: 'A',
    number: 8,
    day: 22,
    kind: 'APPLICATION',
    question:
      'Một người đặt mục tiêu “30 ngày” nhưng chỉ quan tâm mình có đạt mục tiêu hay không, không quan tâm hành vi đó có ích cho tập thể hay cộng đồng. Điểm nào của nội dung xây dựng con người đang bị xem nhẹ?',
    options: ['Ý thức làm chủ và tinh thần tập thể', 'Năng lực chuyên môn', 'Phương pháp làm việc', 'Trình độ ngoại ngữ'],
    correct: 'A',
    explanation:
      'Mục tiêu cá nhân có ý nghĩa đầy đủ hơn khi gắn với lợi ích của tập thể và cộng đồng. Chỉ quan tâm mình có đạt hay không là đang xem nhẹ ý thức làm chủ và tinh thần tập thể. Năng lực, phương pháp hay ngoại ngữ không phải vấn đề được nêu trong tình huống.',
    theory: ['Ý thức làm chủ', 'Tinh thần tập thể'],
  }),
  q({
    team: 'B',
    number: 8,
    day: 22,
    kind: 'APPLICATION',
    question:
      'Nếu một cá nhân có ý chí rèn luyện rất tốt nhưng sống trong môi trường thiếu những điều kiện hỗ trợ, điều gì có thể được rút ra?',
    options: [
      'Cá nhân không cần môi trường',
      'Chỉ cần thay đổi cá nhân là đủ',
      'Xây dựng con người cần kết hợp nỗ lực cá nhân với môi trường và cơ chế phù hợp',
      'Môi trường quyết định hoàn toàn con người',
    ],
    correct: 'C',
    explanation:
      'Ý chí cá nhân rất quan trọng, nhưng môi trường và cơ chế phù hợp tạo điều kiện để ý chí đó thành kết quả. Vì vậy cần kết hợp cả hai; tuyệt đối hóa cá nhân (A, B) hay tuyệt đối hóa môi trường (D) đều phiến diện.',
    theory: ['Tự rèn luyện', 'Môi trường', 'Cơ chế'],
  }),

  // ─── DAY 30 · FINAL CHALLENGE ×2 ────────────────────────────────────
  q({
    team: 'A',
    number: 9,
    day: 30,
    kind: 'THEORY',
    question:
      'Yếu tố giữ vai trò quyết định và thể hiện tính chủ động của cá nhân trong phương pháp xây dựng con người là gì?',
    options: [
      'Sự áp đặt hoàn toàn từ môi trường xung quanh',
      'Cá nhân tự rèn luyện, tu dưỡng ý thức',
      'Chờ đợi sự giúp đỡ thụ động từ tổ chức',
      'Chỉ phụ thuộc vào bằng cấp giáo dục',
    ],
    correct: 'B',
    explanation:
      'Giáo dục, môi trường và tổ chức đều có vai trò, nhưng việc mỗi cá nhân tự rèn luyện, tu dưỡng mới là yếu tố quyết định, thể hiện tính chủ động. Không ai rèn luyện thay mình được; áp đặt từ bên ngoài, chờ đợi thụ động hay chỉ dựa vào bằng cấp đều không thay thế được điều đó.',
    theory: ['Tự rèn luyện', 'Tu dưỡng', 'Tính chủ động'],
  }),
  q({
    team: 'B',
    number: 9,
    day: 30,
    kind: 'THEORY',
    question: 'Theo tư tưởng Hồ Chí Minh, đâu là phương pháp làm việc cần có của con người xã hội chủ nghĩa?',
    options: [
      'Làm việc tự do, không cần kế hoạch hay khuôn khổ',
      'Phương pháp làm việc khoa học, phong cách quần chúng, dân chủ, nêu gương',
      'Áp đặt mệnh lệnh từ trên xuống, không nghe ý kiến tập thể',
      'Chỉ tập trung lý thuyết, không coi trọng thực tiễn',
    ],
    correct: 'B',
    explanation:
      'Con người xã hội chủ nghĩa cần phương pháp làm việc khoa học, có phong cách quần chúng, dân chủ và nêu gương. Làm việc tùy tiện, áp đặt mệnh lệnh hay xa rời thực tiễn đều trái với yêu cầu đó.',
    theory: ['Phương pháp làm việc', 'Phong cách quần chúng', 'Dân chủ', 'Nêu gương'],
  }),
  q({
    team: 'A',
    number: 10,
    day: 30,
    kind: 'APPLICATION',
    question: 'Một thử nghiệm phát triển bản thân chỉ kéo dài 30 ngày. Điều nào cần tránh khi diễn giải kết quả?',
    options: [
      'Xem đây là một khoảng thời gian để thử nghiệm',
      'Theo dõi những thay đổi trong hành vi',
      'Cho rằng chỉ cần 30 ngày là hoàn tất quá trình xây dựng con người',
      'Dùng kết quả để phản tỉnh và rút kinh nghiệm',
    ],
    correct: 'C',
    explanation:
      'Xây dựng con người là quá trình lâu dài. 30 ngày chỉ là khung thử nghiệm do nhóm thiết kế để theo dõi thay đổi và phản tỉnh; không thể coi đó là đã hoàn tất quá trình xây dựng con người. Các phương án A, B, D đều là cách diễn giải phù hợp.',
    theory: ['Tính lâu dài', 'Tự rèn luyện', 'Phản tỉnh'],
  }),
  q({
    team: 'B',
    number: 10,
    day: 30,
    kind: 'APPLICATION',
    question:
      'Một “30-Day Human Development Sprint” phù hợp với logic của lý thuyết nhất khi chuỗi hoạt động được xây dựng theo hướng nào?',
    options: [
      'Đọc lý thuyết → kiểm tra → kết thúc',
      'Đặt mục tiêu lớn → thực hiện tùy hứng → đánh giá',
      'Chọn giá trị cần rèn luyện → chuyển thành hành vi cụ thể → thực hiện trong 30 ngày → theo dõi → phản tỉnh',
      'Chờ môi trường thay đổi → bắt đầu rèn luyện',
    ],
    correct: 'C',
    explanation:
      'Chuỗi hợp lý bắt đầu từ giá trị cần rèn luyện, cụ thể hóa thành hành vi, thực hiện, theo dõi rồi phản tỉnh — gắn nhận thức với hành động và tự điều chỉnh. Đây là cách nhóm vận dụng lý thuyết vào một thử nghiệm 30 ngày, không phải phương pháp do Hồ Chí Minh quy định.',
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

export function pointsFor(question: Question, optionId: Option['id']): number {
  return optionId === question.correct ? CORRECT_POINTS * multiplierFor(question) : 0
}

export const formatDay = (day: number) => String(day).padStart(2, '0')

export const REFLECTION_OPTIONS = [
  'Duy trì kỷ luật',
  'Phát triển năng lực',
  'Chịu trách nhiệm',
  'Cân bằng cá nhân và tập thể',
  'Điều chỉnh sau thất bại',
]
