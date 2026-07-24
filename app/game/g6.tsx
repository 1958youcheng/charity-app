import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  Alert,
  ImageBackground,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Choice {
  text: string;
  isCorrect: boolean;
  feedback?: string;
  hint?: string;
}

interface Level {
  id: number;
  chapter: number;
  ep: string;
  title: string;
  narrator: string;
  dialogue: string;
  tag: string;
  question: string;
  choices: Choice[];
  bgImage: string;
}

const IMAGES = {
  bomb: 'https://drive.google.com/thumbnail?id=1uXbw-pcDKiQ-ZMQE5c6fL83Lu3eEf_L1&sz=w1400',
  map: 'https://lh3.googleusercontent.com/d/1PsPlw9qdjfA4YYgFOEnZqPYT80vL-zI7',
  alley:
    'https://lh3.googleusercontent.com/d/19YKmQFKf0-xUe1tiQcEMAvVgnceHZRU7',
  plum: 'https://lh3.googleusercontent.com/d/11RkVDhfLYQY370VlYrxNsd55VkTtEcr_',
  basement:
    'https://lh3.googleusercontent.com/d/1wxFitp8DPpSFclt2Ord4q2UPWwR8IXj5',
  wedding:
    'https://lh3.googleusercontent.com/d/1wxFitp8DPpSFclt2Ord4q2UPWwR8IXj5',
};

const levels: Level[] = [
  // 第一章：鏽蝕炸彈
  {
    id: 1,
    chapter: 1,
    ep: 'CHAPTER 01 | 黑暗之中',
    title: '鏽蝕裝置',
    narrator:
      '你在一片漆黑中醒來。空氣裡滿是霉味與鐵鏽味，手邊傳來冰冷的金屬觸感。',
    dialogue:
      'SYSTEM：「滴、答、滴、答……這不是普通的箱子，而是一枚正在倒數的炸彈。」',
    tag: '函數運算',
    question:
      '已知 f(x) = x² − 1900，且 f(70) = y。啟動密碼 CODE = y + 49。密碼是多少？',
    bgImage: IMAGES.bomb,
    choices: [
      { text: 'A. 2949', isCorrect: false, hint: '先算 70²，再減去 1900。' },
      {
        text: 'B. 3049',
        isCorrect: true,
        feedback:
          '70² = 4900\n4900 − 1900 = 3000\n3000 + 49 = 3049\n\n保護蓋已解鎖！',
      },
      {
        text: 'C. 3094',
        isCorrect: false,
        hint: '最後是加 49，不是把數字倒過來。',
      },
      { text: 'D. 4949', isCorrect: false, hint: '你漏掉了減去 1900。' },
    ],
  },
  {
    id: 2,
    chapter: 1,
    ep: 'CHAPTER 01 | 最後十秒',
    title: '剪線順序',
    narrator:
      '保護蓋彈開，紅、藍、黃三條電線在計時器下方微微震動。光譜文件指出：黃線是陷阱。',
    dialogue:
      'SYSTEM：「順序錯誤會立即引爆。藍線可以降低計時速度，紅線則會終止裝置。」',
    tag: '邏輯推理',
    question: '正確的拆彈順序是哪一個？',
    bgImage: IMAGES.bomb,
    choices: [
      { text: 'A. 紅線 → 藍線', isCorrect: false, hint: '紅線不能先剪。' },
      {
        text: 'B. 藍線 → 紅線',
        isCorrect: true,
        feedback:
          '先剪藍線降低計時速度，再剪紅線終止裝置。\n炸彈停止，第一章完成！',
      },
      { text: 'C. 黃線 → 紅線', isCorrect: false, hint: '黃線會觸發陷阱。' },
      {
        text: 'D. 藍線 → 黃線',
        isCorrect: false,
        hint: '黃線無論何時都不能剪。',
      },
    ],
  },

  // 第二章：年輕的爺爺與四四南村
  {
    id: 3,
    chapter: 2,
    ep: 'CHAPTER 02 | 年輕的爺爺',
    title: '地圖位置 A',
    narrator:
      '門緩緩推開，一名清瘦少年提著煤油燈走進來。那張臉，竟與相簿中的爺爺一模一樣。',
    dialogue: '楊大勇：「你不會真的以為那是炸彈吧？來，我帶你看看四四南村。」',
    tag: '二元一次聯立方程',
    question: '位置 A：x + y = 14，x − y = 4，(x, y) 是多少？',
    bgImage: IMAGES.map,
    choices: [
      { text: 'A. (8, 6)', isCorrect: false, hint: '兩式相加後再除以 2。' },
      {
        text: 'B. (9, 5)',
        isCorrect: true,
        feedback: '兩式相加：2x = 18，所以 x = 9；代回得 y = 5。',
      },
      { text: 'C. (10, 4)', isCorrect: false, hint: 'x − y 必須等於 4。' },
      { text: 'D. (7, 7)', isCorrect: false, hint: '這組答案的差是 0。' },
    ],
  },
  {
    id: 4,
    chapter: 2,
    ep: 'CHAPTER 02 | 手繪地圖',
    title: '地圖位置 B',
    narrator:
      '少年攤開一張手繪眷村簡圖，幾個紅點像時間留下的座標，等待你逐一破解。',
    dialogue: '楊大勇：「找得到位置，才不會在巷子裡迷路。」',
    tag: '二元一次聯立方程',
    question: '位置 B：x + y = 20，x − y = 6，(x, y) 是多少？',
    bgImage: IMAGES.map,
    choices: [
      { text: 'A. (12, 8)', isCorrect: false, hint: '差應該是 6。' },
      {
        text: 'B. (13, 7)',
        isCorrect: true,
        feedback: '兩式相加：2x = 26，所以 x = 13；代回得 y = 7。',
      },
      {
        text: 'C. (14, 6)',
        isCorrect: false,
        hint: '和雖然是 20，但差不是 6。',
      },
      { text: 'D. (10, 10)', isCorrect: false, hint: '差不能是 0。' },
    ],
  },
  {
    id: 5,
    chapter: 2,
    ep: 'CHAPTER 02 | 巷弄深處',
    title: '地圖位置 C',
    narrator: '煤油燈的光沿著紙面移動。最後一處座標，指向眷村深處的表演場。',
    dialogue: '楊大勇：「再解開這一個，我就帶你去看梅花樁。」',
    tag: '二元一次聯立方程',
    question: '位置 C：x + y = 10，x − y = 2，(x, y) 是多少？',
    bgImage: IMAGES.map,
    choices: [
      {
        text: 'A. (6, 4)',
        isCorrect: true,
        feedback: '兩式相加：2x = 12，所以 x = 6；代回得 y = 4。',
      },
      { text: 'B. (5, 5)', isCorrect: false, hint: '差應該是 2。' },
      { text: 'C. (7, 3)', isCorrect: false, hint: '這組數字的差是 4。' },
      { text: 'D. (8, 2)', isCorrect: false, hint: '這組數字的差是 6。' },
    ],
  },
  {
    id: 6,
    chapter: 2,
    ep: 'CHAPTER 02 | 梅花樁',
    title: '等距的木樁',
    narrator:
      '轉過最後一個角，高腳梅花樁在陽光下靜靜立著，正是老相簿中出現過無數次的背景。',
    dialogue: '楊大勇：「第二根到第五根相距 6 公尺，而且每兩根木樁間距相等。」',
    tag: '等差與間距',
    question: '從第一根木樁到第八根木樁，共有多長？',
    bgImage: IMAGES.plum,
    choices: [
      {
        text: 'A. 12 公尺',
        isCorrect: false,
        hint: '第一根到第八根共有 7 個間隔。',
      },
      {
        text: 'B. 14 公尺',
        isCorrect: true,
        feedback:
          '第二根到第五根共有 3 個間隔，因此每格 6 ÷ 3 = 2 公尺。\n第一根到第八根共有 7 格：7 × 2 = 14 公尺。',
      },
      {
        text: 'C. 16 公尺',
        isCorrect: false,
        hint: '不要把木樁數當成間隔數。',
      },
      { text: 'D. 18 公尺', isCorrect: false, hint: '先求每一格的距離。' },
    ],
  },

  // 第三章：地下室
  {
    id: 7,
    chapter: 3,
    ep: 'CHAPTER 03 | 地下室的秘密',
    title: '被反鎖的門',
    narrator: '劇團成員將你拖進地下室。門鎖喀一聲扣上，黑暗中浮現三把密碼鎖。',
    dialogue:
      '舊帳本：「每張票 x 元，賣出 20 張，扣掉 150 元便當費後，剩下 850 元。」',
    tag: '一元一次方程',
    question: '一張票 x 是多少元？',
    bgImage: IMAGES.basement,
    choices: [
      { text: 'A. 40 元', isCorrect: false, hint: '20x − 150 = 850。' },
      {
        text: 'B. 50 元',
        isCorrect: true,
        feedback: '20x − 150 = 850\n20x = 1000\nx = 50',
      },
      { text: 'C. 55 元', isCorrect: false, hint: '先把 150 加回去。' },
      { text: 'D. 60 元', isCorrect: false, hint: '代回檢查總額。' },
    ],
  },
  {
    id: 8,
    chapter: 3,
    ep: 'CHAPTER 03 | 雜亂的儲物間',
    title: '紙箱規律',
    narrator: '紅黃交錯的紙箱堆滿房間，卻隱約呈現固定規律：3、7、11……',
    dialogue: 'SYSTEM：「第二把鎖需要第十堆紙箱的數量。」',
    tag: '等差數列',
    question:
      '第 1 堆有 3 個，第 2 堆有 7 個，第 3 堆有 11 個。第 10 堆有幾個？',
    bgImage: IMAGES.basement,
    choices: [
      { text: 'A. 35 個', isCorrect: false, hint: '公差是 4。' },
      {
        text: 'B. 39 個',
        isCorrect: true,
        feedback: 'a₁₀ = 3 + (10 − 1) × 4 = 39。',
      },
      { text: 'C. 40 個', isCorrect: false, hint: '第一項不是 4。' },
      { text: 'D. 43 個', isCorrect: false, hint: '這是第 11 項。' },
    ],
  },
  {
    id: 9,
    chapter: 3,
    ep: 'CHAPTER 03 | 斷裂木樁',
    title: '三角形光紋',
    narrator: '門縫外的斷裂木樁浮現直角三角形光紋，底邊 50 公分，高 120 公分。',
    dialogue: 'SYSTEM：「第三把鎖，需要支撐架斜邊的長度。」',
    tag: '畢氏定理',
    question: '直角三角形兩股為 50 與 120 公分，斜邊是多少公分？',
    bgImage: IMAGES.plum,
    choices: [
      { text: 'A. 125 公分', isCorrect: false, hint: '計算 50² + 120²。' },
      {
        text: 'B. 130 公分',
        isCorrect: true,
        feedback: '50² + 120² = 2500 + 14400 = 16900\n√16900 = 130',
      },
      { text: 'C. 150 公分', isCorrect: false, hint: '不是直接相加。' },
      { text: 'D. 170 公分', isCorrect: false, hint: '使用畢氏定理。' },
    ],
  },

  // 第四章：修復時間線
  {
    id: 10,
    chapter: 4,
    ep: 'CHAPTER 04 | 被破壞的木樁',
    title: '實際使用天數',
    narrator:
      '時空再次回溯。你發現木樁斷口粗糙，顯然不是自然耗損，而是有人刻意破壞。',
    dialogue: '師傅：「它頂多用了三個月。每天耐用度下降 0.1%，現在還剩 91%。」',
    tag: '小數除法',
    question: '木樁從 100% 降至 91%，大約實際使用了多少天？',
    bgImage: IMAGES.plum,
    choices: [
      {
        text: 'A. 9 天',
        isCorrect: false,
        hint: '下降了 9%，每天只下降 0.1%。',
      },
      {
        text: 'B. 90 天',
        isCorrect: true,
        feedback: '(100% − 91%) ÷ 0.1% = 9 ÷ 0.1 = 90 天。',
      },
      { text: 'C. 91 天', isCorrect: false, hint: '91% 是剩餘耐用度。' },
      { text: 'D. 100 天', isCorrect: false, hint: '實際下降量是 9%。' },
    ],
  },
  {
    id: 11,
    chapter: 4,
    ep: 'CHAPTER 04 | 修復時間線',
    title: '最短修復時數',
    narrator:
      '你拿出膠水、鋼釘與纏繞繩。要讓修復結果在時間線中穩固，時數 T 必須符合三項條件。',
    dialogue: '條件：T > 5；T 是 2 或 3 的倍數；T 比某個質數小 1。',
    tag: '倍數與質數',
    question: '符合條件的最小 T 是多少？',
    bgImage: IMAGES.plum,
    choices: [
      { text: 'A. 5 小時', isCorrect: false, hint: '條件要求 T > 5。' },
      {
        text: 'B. 6 小時',
        isCorrect: true,
        feedback:
          '6 > 5；6 是 2、3 的倍數；6 比質數 7 小 1。\n最短修復時間為 6 小時。',
      },
      {
        text: 'C. 8 小時',
        isCorrect: false,
        hint: '雖可能符合部分條件，但不是最小值。',
      },
      { text: 'D. 10 小時', isCorrect: false, hint: '再找更小的數。' },
    ],
  },

  // 第五章：婚禮與回歸
  {
    id: 12,
    chapter: 5,
    ep: 'CHAPTER 05 | 最後的電話',
    title: '電話末四碼',
    narrator:
      '昏暗的儲物間不再陰森。茶几上有一台舊式電話，你想打給爺爺求救，卻忘了末四碼。',
    dialogue:
      '提示：「末四碼由 1、3、5、7 排列組成，能被 77 整除，而且不能被 5 整除。」',
    tag: '整除與排列',
    question: '電話末四碼是哪一組？',
    bgImage: IMAGES.basement,
    choices: [
      { text: 'A. 1357', isCorrect: false, hint: '檢查是否能被 77 整除。' },
      {
        text: 'B. 3157',
        isCorrect: true,
        feedback: '3157 ÷ 77 = 41，且末位不是 5，因此符合全部條件。',
      },
      { text: 'C. 3517', isCorrect: false, hint: '檢查 77 的整除結果。' },
      { text: 'D. 7135', isCorrect: false, hint: '末位為 5，不符合條件。' },
    ],
  },
  {
    id: 13,
    chapter: 5,
    ep: 'CHAPTER 05 | 消失的時間',
    title: '手錶上的時間差',
    narrator:
      '電話接通後，你抬手看錶：現在是 6 月 1 日 13:14，而進入儲物室時是 5 月 30 日 17:20。',
    dialogue: '楊大勇：「我正急著找你參加婚禮呢！你到底去了哪裡？」',
    tag: '時間計算',
    question: '從 5/30 17:20 到 6/1 13:14，共經過多久？',
    bgImage: IMAGES.basement,
    choices: [
      {
        text: 'A. 1 天 18 小時 54 分',
        isCorrect: false,
        hint: '再核對 5/31 的完整一天。',
      },
      {
        text: 'B. 1 天 19 小時 54 分',
        isCorrect: true,
        feedback:
          '5/30 17:20 到 5/31 17:20 是 1 天；\n再到 6/1 13:14 是 19 小時 54 分。\n合計 1 天 19 小時 54 分。',
      },
      {
        text: 'C. 2 天 19 小時 54 分',
        isCorrect: false,
        hint: '未滿兩個完整日。',
      },
      {
        text: 'D. 1 天 20 小時 06 分',
        isCorrect: false,
        hint: '分鐘需要借位計算。',
      },
    ],
  },
  {
    id: 14,
    chapter: 5,
    ep: 'CHAPTER 05 | 新娘的照片',
    title: '黃金比例',
    narrator:
      '小林拿出一張泛黃相片。新娘曉慧的上半身長 63 公分，腿長 102 公分。',
    dialogue: '小林：「聽說她的身材比例接近黃金比例，你看得出來嗎？」',
    tag: '比值估算',
    question: '102 ÷ 63 約等於多少，最接近黃金比例？',
    bgImage: IMAGES.wedding,
    choices: [
      { text: 'A. 1.414', isCorrect: false, hint: '這比較接近 √2。' },
      {
        text: 'B. 1.619',
        isCorrect: true,
        feedback: '102 ÷ 63 ≈ 1.619，十分接近黃金比例 1.618。',
      },
      { text: 'C. 2.000', isCorrect: false, hint: '102 並不是 63 的兩倍。' },
      { text: 'D. 3.140', isCorrect: false, hint: '這比較接近圓周率。' },
    ],
  },
  {
    id: 15,
    chapter: 5,
    ep: 'CHAPTER 05 | 愛的密碼',
    title: '520 與 1314',
    narrator:
      '婚宴進入高潮，爺爺與奶奶突然用兩串質因數向彼此告白，賓客們全都滿頭問號。',
    dialogue:
      '楊大勇：「2 × 2 × 2 × 5 × 13！」\n李曉慧：「我也會陪你走過 2 × 3 × 3 × 73。」',
    tag: '質因數乘法',
    question: '兩個算式的乘積分別代表哪兩個數字？',
    bgImage: IMAGES.wedding,
    choices: [
      {
        text: 'A. 510、1314',
        isCorrect: false,
        hint: '第一個算式請重新相乘。',
      },
      {
        text: 'B. 520、1314',
        isCorrect: true,
        feedback:
          '2³ × 5 × 13 = 520\n2 × 3² × 73 = 1314\n\n「我愛你，一生一世。」五章全部完成！',
      },
      {
        text: 'C. 520、1341',
        isCorrect: false,
        hint: '第二個數字的順序不對。',
      },
      {
        text: 'D. 250、1314',
        isCorrect: false,
        hint: '第一個算式是 8 × 5 × 13。',
      },
    ],
  },
];

export default function TimePileGame() {
  const router = useRouter();
  const [currentLevelIndex, setCurrentLevelIndex] = useState<number>(-1);
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [completed, setCompleted] = useState<number[]>([]);

  const currentLevel =
    currentLevelIndex >= 0 && currentLevelIndex < levels.length
      ? levels[currentLevelIndex]
      : null;

  const isEndScreen = currentLevelIndex >= levels.length;

  const chapterProgress = useMemo(() => {
    if (!currentLevel) return '';
    const sameChapter = levels.filter(
      (level) => level.chapter === currentLevel.chapter
    );
    const position =
      sameChapter.findIndex((level) => level.id === currentLevel.id) + 1;
    return `第 ${currentLevel.chapter} 章・${position}/${sameChapter.length}`;
  }, [currentLevel]);

  const handleChoicePress = (choice: Choice) => {
    if (choice.isCorrect) {
      setFeedbackText(choice.feedback || '答對了！');
      setFeedbackVisible(true);
      if (currentLevel) {
        setCompleted((prev) =>
          prev.includes(currentLevel.id) ? prev : [...prev, currentLevel.id]
        );
      }
    } else {
      Alert.alert('提示', choice.hint || '再想一想。');
    }
  };

  const handleNextLevel = () => {
    setFeedbackVisible(false);
    setCurrentLevelIndex((prev) => prev + 1);
  };

  const restartGame = () => {
    setFeedbackVisible(false);
    setCompleted([]);
    setCurrentLevelIndex(-1);
  };

  return (
    <View style={styles.container}>
      {currentLevelIndex === -1 ? (
        <ImageBackground
          source={{ uri: IMAGES.bomb }}
          style={styles.fullScreen}
          resizeMode="cover"
        >
          <View style={styles.coverOverlay}>
            <Text style={styles.coverEyebrow}>四四南村實境解謎</Text>
            <Text style={styles.mainTitle}>爺爺的時鐘</Text>
            <Text style={styles.subTitle}>地下室的秘密・五章連續遊戲</Text>
            <Text style={styles.coverDescription}>
              從鏽蝕炸彈、年輕的爺爺，到被破壞的梅花樁與最後的婚禮，
              以數學解開一段被封存在四四南村的時間。
            </Text>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => setCurrentLevelIndex(0)}
            >
              <Text style={styles.primaryButtonText}>進入時空</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      ) : isEndScreen ? (
        <ImageBackground
          source={{ uri: IMAGES.wedding }}
          style={styles.fullScreen}
          resizeMode="cover"
        >
          <View style={styles.endOverlay}>
            <Text style={styles.endTitle}>時光修復完成</Text>
            <Text style={styles.endCore}>
              你解開了全部 {levels.length}{' '}
              道謎題，修復了木樁，也改寫了爺爺受傷的命運。
            </Text>
            <View style={styles.divider} />
            <Text style={styles.endDescription}>
              四四南村的老屋、梅花樁與婚禮照片，不再只是泛黃的記憶。
              {'\n'}數學讓散落的線索重新連成一段完整的人生。
            </Text>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={restartGame}
            >
              <Text style={styles.primaryButtonText}>再玩一次</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => router.back()}
            >
              <Text style={styles.secondaryButtonText}>返回關卡</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      ) : (
        <View style={styles.gameScreen}>
          <ImageBackground
            source={{ uri: currentLevel?.bgImage }}
            style={styles.storyImage}
            resizeMode="cover"
          >
            <View style={styles.imageOverlay}>
              <SafeAreaView style={styles.safeArea}>
                <ScrollView contentContainerStyle={styles.storyPanel}>
                  <View style={styles.topRow}>
                    <Text style={styles.episodeLabel}>{currentLevel?.ep}</Text>
                    <Text style={styles.progressLabel}>{chapterProgress}</Text>
                  </View>

                  <Text style={styles.levelHeading}>{currentLevel?.title}</Text>
                  <Text style={styles.narratorText}>
                    {currentLevel?.narrator}
                  </Text>

                  <View style={styles.dialogueBox}>
                    <Text style={styles.dialogueText}>
                      {currentLevel?.dialogue}
                    </Text>
                  </View>
                </ScrollView>
              </SafeAreaView>
            </View>
          </ImageBackground>

          <ScrollView
            style={styles.puzzleFooter}
            contentContainerStyle={styles.puzzleContent}
          >
            <View style={styles.questionArea}>
              <View style={styles.tagRow}>
                <Text style={styles.challengeTag}>{currentLevel?.tag}</Text>
                <Text style={styles.totalProgress}>
                  {currentLevelIndex + 1} / {levels.length}
                </Text>
              </View>
              <Text style={styles.questionText}>{currentLevel?.question}</Text>
            </View>

            <View style={styles.choicesGrid}>
              {currentLevel?.choices.map((choice, index) => (
                <TouchableOpacity
                  key={`${currentLevel.id}-${index}`}
                  style={styles.optionButton}
                  onPress={() => handleChoicePress(choice)}
                  activeOpacity={0.75}
                >
                  <Text style={styles.optionText}>{choice.text}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      )}

      <Modal visible={feedbackVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalSuccessTitle}>解題正確</Text>
            <View style={styles.mathLogicBox}>
              <Text style={styles.mathLogicText}>{feedbackText}</Text>
            </View>
            <TouchableOpacity
              style={styles.modalNextButton}
              onPress={handleNextLevel}
            >
              <Text style={styles.modalNextButtonText}>
                {currentLevelIndex === levels.length - 1
                  ? '查看結局'
                  : '繼續旅程'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07090a',
  },
  fullScreen: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  coverOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(8, 10, 10, 0.82)',
    paddingHorizontal: 28,
  },
  coverEyebrow: {
    color: '#d6a45c',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 4,
    marginBottom: 16,
  },
  mainTitle: {
    color: '#ffffff',
    fontSize: 42,
    fontWeight: '900',
    letterSpacing: 10,
    textAlign: 'center',
  },
  subTitle: {
    color: '#d6a45c',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 2,
    marginTop: 12,
    marginBottom: 28,
    textAlign: 'center',
  },
  coverDescription: {
    maxWidth: 500,
    color: '#d7d7d7',
    fontSize: 15,
    lineHeight: 25,
    textAlign: 'center',
    marginBottom: 36,
  },
  primaryButton: {
    width: 250,
    backgroundColor: '#c98d3c',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#111',
    fontSize: 17,
    fontWeight: '800',
  },
  secondaryButton: {
    width: 250,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#c98d3c',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#f1d2a0',
    fontSize: 16,
    fontWeight: '700',
  },
  gameScreen: {
    flex: 1,
  },
  storyImage: {
    flex: 1,
    minHeight: 320,
  },
  imageOverlay: {
    flex: 1,
    backgroundColor: 'rgba(12, 18, 18, 0.76)',
  },
  safeArea: {
    flex: 1,
  },
  storyPanel: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 24,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  episodeLabel: {
    flexShrink: 1,
    backgroundColor: '#f3f0e8',
    color: '#1e2828',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 16,
    fontSize: 11,
    fontWeight: '800',
  },
  progressLabel: {
    color: '#e2bd82',
    fontSize: 12,
    fontWeight: '700',
  },
  levelHeading: {
    color: '#d6a45c',
    fontSize: 27,
    fontWeight: '900',
    marginBottom: 14,
  },
  narratorText: {
    color: '#e1e1e1',
    fontSize: 15,
    lineHeight: 25,
    marginBottom: 16,
  },
  dialogueBox: {
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderLeftWidth: 5,
    borderLeftColor: '#d6a45c',
    borderRadius: 10,
    padding: 15,
  },
  dialogueText: {
    color: '#ffffff',
    fontSize: 15,
    lineHeight: 23,
    fontStyle: 'italic',
  },
  puzzleFooter: {
    flexGrow: 0,
    maxHeight: '48%',
    backgroundColor: '#152525',
    borderTopWidth: 2,
    borderTopColor: '#c98d3c',
  },
  puzzleContent: {
    padding: 20,
    paddingBottom: 38,
  },
  questionArea: {
    marginBottom: 16,
  },
  tagRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  challengeTag: {
    backgroundColor: '#b9443f',
    color: '#fff',
    fontSize: 12,
    fontWeight: '800',
    paddingVertical: 3,
    paddingHorizontal: 9,
    borderRadius: 5,
  },
  totalProgress: {
    color: '#b9c8c8',
    fontSize: 12,
    fontWeight: '700',
  },
  questionText: {
    color: '#ffffff',
    fontSize: 16,
    lineHeight: 25,
    fontWeight: '600',
  },
  choicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  optionButton: {
    width: '48%',
    minHeight: 58,
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    borderRadius: 9,
    padding: 12,
  },
  optionText: {
    color: '#ffffff',
    fontSize: 14,
    lineHeight: 20,
  },
  endOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.84)',
    paddingHorizontal: 28,
  },
  endTitle: {
    color: '#d6a45c',
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 4,
    textAlign: 'center',
    marginBottom: 20,
  },
  endCore: {
    color: '#ffffff',
    fontSize: 18,
    lineHeight: 29,
    fontWeight: '700',
    textAlign: 'center',
    maxWidth: 520,
  },
  divider: {
    width: 80,
    height: 2,
    backgroundColor: '#d6a45c',
    marginVertical: 22,
  },
  endDescription: {
    color: '#c9c9c9',
    fontSize: 15,
    lineHeight: 25,
    textAlign: 'center',
    marginBottom: 36,
    maxWidth: 520,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.88)',
    padding: 20,
  },
  modalCard: {
    width: '88%',
    maxWidth: 480,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    borderBottomWidth: 8,
    borderBottomColor: '#c98d3c',
  },
  modalSuccessTitle: {
    color: '#173030',
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 18,
  },
  mathLogicBox: {
    width: '100%',
    backgroundColor: '#eef5f3',
    borderRadius: 10,
    padding: 18,
    marginBottom: 24,
  },
  mathLogicText: {
    color: '#333333',
    fontSize: 16,
    lineHeight: 25,
  },
  modalNextButton: {
    backgroundColor: '#173030',
    paddingVertical: 13,
    paddingHorizontal: 42,
    borderRadius: 25,
  },
  modalNextButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },
});
