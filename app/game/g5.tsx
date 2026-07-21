import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  Alert,
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
  ep: string;
  title: string;
  place: string;
  narrator: string;
  dialogue: string;
  tag: string;
  question: string;
  choices: Choice[];
  backgroundColor: string;
  accentColor: string;
  symbol: string;
}

const levels: Level[] = [
  {
    id: 1,
    ep: 'EP 01｜初入迷宮',
    title: '出口前的選擇',
    place: '西門捷運站',
    narrator: '人潮像潮水般湧出月台。霓虹還沒亮起，城市已經先用腳步聲迎接你。',
    dialogue:
      '站務員：「一位迷路的旅客想去紅樓。先幫他算清楚時間，再一起找對出口吧！」',
    tag: '加減法',
    question: '現在是下午 2:35，走到西門紅樓需要 18 分鐘，抵達時是幾點？',
    choices: [
      {
        text: 'A. 下午 2:43',
        isCorrect: false,
        hint: '35 分再加 18 分，會超過 60 分。',
      },
      {
        text: 'B. 下午 2:53',
        isCorrect: true,
        feedback: '2:35＋18 分鐘＝2:53\n你順利帶旅客找到方向！',
      },
      {
        text: 'C. 下午 3:03',
        isCorrect: false,
        hint: '再檢查是否多加了 10 分鐘。',
      },
      {
        text: 'D. 下午 3:13',
        isCorrect: false,
        hint: '這個答案加得太多了。',
      },
    ],
    backgroundColor: '#394867',
    accentColor: '#F7D85C',
    symbol: 'M',
  },
  {
    id: 2,
    ep: 'EP 02｜現代驛站',
    title: '書頁裡的善意',
    place: '誠品書店',
    narrator: '安靜的書架隔開了街上的喧鬧。一本本書，像替城市保存下來的思想。',
    dialogue:
      '店員：「我們要把 144 張閱讀卡平均分給 12 個班級，你願意幫忙嗎？」',
    tag: '除法',
    question: '144 張閱讀卡平均分給 12 個班級，每班可以分到幾張？',
    choices: [
      {
        text: 'A. 10 張',
        isCorrect: false,
        hint: '12 × 10 只有 120。',
      },
      {
        text: 'B. 11 張',
        isCorrect: false,
        hint: '12 × 11 是 132。',
      },
      {
        text: 'C. 12 張',
        isCorrect: true,
        feedback: '144 ÷ 12＝12\n每個班級都公平拿到閱讀卡。',
      },
      {
        text: 'D. 14 張',
        isCorrect: false,
        hint: '12 × 14 已超過 144。',
      },
    ],
    backgroundColor: '#356859',
    accentColor: '#B8E8D0',
    symbol: '書',
  },
  {
    id: 3,
    ep: 'EP 03｜溫飽的渴望',
    title: '共享的一餐',
    place: '西門町美食街',
    narrator:
      '香氣從攤位間飄散。一份食物，除了填飽肚子，也能成為陌生人之間的溫暖。',
    dialogue:
      '老闆：「這盒點心剩下四分之三，我想平均分給 3 位正在服務的志工。」',
    tag: '分數運算',
    question: '把一盒點心的 3/4 平均分給 3 人，每人可以得到整盒的多少？',
    choices: [
      {
        text: 'A. 1/12',
        isCorrect: false,
        hint: '3/4 ÷ 3，要乘以 1/3。',
      },
      {
        text: 'B. 1/4',
        isCorrect: true,
        feedback: '3/4 ÷ 3＝3/4 × 1/3＝1/4\n分享之後，每個人都得到剛好的份量。',
      },
      {
        text: 'C. 1/3',
        isCorrect: false,
        hint: '原本只有四分之三盒。',
      },
      {
        text: 'D. 3/7',
        isCorrect: false,
        hint: '分數除法不是分母直接相加。',
      },
    ],
    backgroundColor: '#A44A3F',
    accentColor: '#FFD166',
    symbol: '食',
  },
  {
    id: 4,
    ep: 'EP 04｜歲月的守護者',
    title: '模型櫃的整理',
    place: '萬年大樓',
    narrator:
      '老店、模型與收藏品堆疊出不同世代的記憶。有人守著商品，也守著一段青春。',
    dialogue:
      '店主：「這一排展示櫃長 2.4 公尺，另一排比它短 0.65 公尺。請幫我算出長度。」',
    tag: '小數運算',
    question: '2.4－0.65 等於多少？',
    choices: [
      {
        text: 'A. 1.65',
        isCorrect: false,
        hint: '把小數點對齊後再減一次。',
      },
      {
        text: 'B. 1.75',
        isCorrect: true,
        feedback: '2.40－0.65＝1.75\n展示櫃終於能整齊排進空間。',
      },
      {
        text: 'C. 1.85',
        isCorrect: false,
        hint: '十分位與百分位需要分開計算。',
      },
      {
        text: 'D. 2.05',
        isCorrect: false,
        hint: '相減後結果應該比 2.4 小。',
      },
    ],
    backgroundColor: '#66545E',
    accentColor: '#E8C4D7',
    symbol: '年',
  },
  {
    id: 5,
    ep: 'EP 05｜新舊對話',
    title: '櫥窗中的幾何',
    place: '西門町時尚街區',
    narrator:
      '潮流招牌與老建築並肩而立。新的設計沒有抹去過去，而是與它展開對話。',
    dialogue:
      '設計師：「我要做一面長方形展示牆，長 8 公尺、寬 3.5 公尺，需要多少面積？」',
    tag: '幾何面積',
    question: '長 8 公尺、寬 3.5 公尺的長方形，面積是多少平方公尺？',
    choices: [
      {
        text: 'A. 11.5 平方公尺',
        isCorrect: false,
        hint: '這是把長和寬相加。',
      },
      {
        text: 'B. 23 平方公尺',
        isCorrect: false,
        hint: '再計算一次 8 × 3.5。',
      },
      {
        text: 'C. 28 平方公尺',
        isCorrect: true,
        feedback: '8 × 3.5＝28\n你替街區完成了一面兼具新意與秩序的展示牆。',
      },
      {
        text: 'D. 32 平方公尺',
        isCorrect: false,
        hint: '3.5 不是 4。',
      },
    ],
    backgroundColor: '#347D8C',
    accentColor: '#BDE7E8',
    symbol: '形',
  },
  {
    id: 6,
    ep: 'EP 06｜紅磚記憶',
    title: '歷史的票券',
    place: '西門紅樓',
    narrator:
      '紅磚牆在夕陽下慢慢變深。建築留下的不只是年代，也留下無數人的相遇。',
    dialogue:
      '志工：「公益導覽成人票 120 元、學生票 80 元。今天來了 5 位成人和 8 位學生。」',
    tag: '生活應用',
    question: '這一團的總票價是多少元？',
    choices: [
      {
        text: 'A. 1,040 元',
        isCorrect: false,
        hint: '成人票與學生票要分別計算。',
      },
      {
        text: 'B. 1,160 元',
        isCorrect: false,
        hint: '再檢查 8 × 80。',
      },
      {
        text: 'C. 1,240 元',
        isCorrect: true,
        feedback:
          '5 × 120＋8 × 80＝600＋640＝1,240\n每張票都支持文化繼續被看見。',
      },
      {
        text: 'D. 1,360 元',
        isCorrect: false,
        hint: '總額算得太高了。',
      },
    ],
    backgroundColor: '#8C2F39',
    accentColor: '#F5C2C7',
    symbol: '紅',
  },
  {
    id: 7,
    ep: 'EP 07｜夢想的舞台',
    title: '掌聲之前',
    place: '街頭藝人廣場',
    narrator: '夜色亮起，表演者用音樂、舞步和勇氣圍出一座沒有牆的舞台。',
    dialogue:
      '少年：「三位表演者依序上台：小安不在第一位，小哲在小安之前，小晴在最後。誰是第一位？」',
    tag: '邏輯推理',
    question: '根據條件，第一位上台的是誰？',
    choices: [
      {
        text: 'A. 小安',
        isCorrect: false,
        hint: '題目已說小安不在第一位。',
      },
      {
        text: 'B. 小哲',
        isCorrect: true,
        feedback: '小晴最後，小哲又在小安之前。\n因此順序是小哲、小安、小晴。',
      },
      {
        text: 'C. 小晴',
        isCorrect: false,
        hint: '小晴已確定在最後。',
      },
      {
        text: 'D. 無法判斷',
        isCorrect: false,
        hint: '三個條件已足以排出唯一順序。',
      },
    ],
    backgroundColor: '#44355B',
    accentColor: '#D9B8F4',
    symbol: '夢',
  },
];

export default function XimenWarmMission() {
  const router = useRouter();

  const [currentLevelIndex, setCurrentLevelIndex] = useState<number>(-1);

  const [feedbackVisible, setFeedbackVisible] = useState<boolean>(false);

  const [feedbackText, setFeedbackText] = useState<string>('');

  const [score, setScore] = useState<number>(0);

  const currentLevel =
    currentLevelIndex >= 0 && currentLevelIndex < levels.length
      ? levels[currentLevelIndex]
      : null;

  const isEndScreen = currentLevelIndex >= levels.length;

  const progress = useMemo(() => {
    if (currentLevelIndex < 0) {
      return 0;
    }

    return Math.min(100, ((currentLevelIndex + 1) / levels.length) * 100);
  }, [currentLevelIndex]);

  const handleChoicePress = (choice: Choice) => {
    if (choice.isCorrect) {
      setFeedbackText(choice.feedback || '答對了！');
      setFeedbackVisible(true);
    } else {
      Alert.alert('提示', choice.hint || '再想一想喔！');
    }
  };

  const handleNextLevel = () => {
    setFeedbackVisible(false);
    setScore((previousScore) => previousScore + 100);
    setCurrentLevelIndex((previousIndex) => previousIndex + 1);
  };

  const restartGame = () => {
    setCurrentLevelIndex(-1);
    setFeedbackVisible(false);
    setFeedbackText('');
    setScore(0);
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      restartGame();
    }
  };

  return (
    <View style={styles.container}>
      {currentLevelIndex === -1 ? (
        <SafeAreaView style={styles.coverScreen}>
          <View style={styles.coverCircleTop} />
          <View style={styles.coverCircleBottom} />

          <View style={styles.coverCard}>
            <Text style={styles.coverEnglish}>XIMEN WARM MISSION</Text>

            <View style={styles.coverSymbolBox}>
              <Text style={styles.coverSymbol}>西</Text>
            </View>

            <Text style={styles.coverTitle}>西門町的{'\n'}暖心任務</Text>

            <Text style={styles.coverDescription}>
              在七個城市場景中， 用數學解開任務， 也替陌生人留下一點溫暖。
            </Text>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.mainButton}
              onPress={() => setCurrentLevelIndex(0)}
            >
              <Text style={styles.mainButtonText}>走進西門町</Text>
            </TouchableOpacity>

            <Text style={styles.coverNote}>
              七個場景・七道挑戰・一段暖心旅程
            </Text>
          </View>
        </SafeAreaView>
      ) : isEndScreen ? (
        <SafeAreaView style={styles.endScreen}>
          <View style={styles.endCard}>
            <View style={styles.heartBox}>
              <Text style={styles.heartText}>♥</Text>
            </View>

            <Text style={styles.endEnglish}>MISSION COMPLETE</Text>

            <Text style={styles.endTitle}>你讓城市{'\n'}多了一點溫暖</Text>

            <Text style={styles.endQuote}>
              「真正完成任務的， 不只是算出答案，
              而是願意看見身邊需要幫助的人。」
            </Text>

            <View style={styles.scoreCard}>
              <Text style={styles.scoreLabel}>最終積分</Text>

              <Text style={styles.scoreNumber}>{score}</Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.mainButton}
              onPress={restartGame}
            >
              <Text style={styles.mainButtonText}>再走一次</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.backButton}
              onPress={handleBack}
            >
              <Text style={styles.backButtonText}>返回關卡</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      ) : (
        <SafeAreaView
          style={[
            styles.gameScreen,
            {
              backgroundColor: currentLevel?.backgroundColor || '#394867',
            },
          ]}
        >
          <View style={styles.topBar}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.topBackButton}
              onPress={restartGame}
            >
              <Text style={styles.topBackText}>‹</Text>
            </TouchableOpacity>

            <View style={styles.progressArea}>
              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${progress}%`,
                      backgroundColor: currentLevel?.accentColor || '#F7D85C',
                    },
                  ]}
                />
              </View>

              <Text style={styles.progressText}>
                {currentLevelIndex + 1} / {levels.length}
              </Text>
            </View>

            <View
              style={[
                styles.scorePill,
                {
                  backgroundColor: currentLevel?.accentColor || '#F7D85C',
                },
              ]}
            >
              <Text style={styles.scorePillText}>{score} pts</Text>
            </View>
          </View>

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.storySection}>
              <Text style={styles.watermark}>{currentLevel?.symbol}</Text>

              <Text
                style={[
                  styles.episodeText,
                  {
                    color: currentLevel?.accentColor || '#F7D85C',
                  },
                ]}
              >
                {currentLevel?.ep}
              </Text>

              <Text style={styles.levelTitle}>{currentLevel?.title}</Text>

              <View style={styles.placeTag}>
                <Text style={styles.placeTagText}>● {currentLevel?.place}</Text>
              </View>

              <Text style={styles.narratorText}>{currentLevel?.narrator}</Text>

              <View
                style={[
                  styles.dialogueBox,
                  {
                    borderLeftColor: currentLevel?.accentColor || '#F7D85C',
                  },
                ]}
              >
                <Text style={styles.dialogueText}>
                  {currentLevel?.dialogue}
                </Text>
              </View>
            </View>

            <View style={styles.questionSection}>
              <View
                style={[
                  styles.challengeTag,
                  {
                    backgroundColor: currentLevel?.accentColor || '#F7D85C',
                  },
                ]}
              >
                <Text style={styles.challengeTagText}>{currentLevel?.tag}</Text>
              </View>

              <Text style={styles.questionText}>{currentLevel?.question}</Text>

              <View style={styles.choicesGrid}>
                {currentLevel?.choices.map((choice, index) => (
                  <TouchableOpacity
                    key={`${currentLevel.id}-${index}`}
                    activeOpacity={0.75}
                    style={styles.choiceButton}
                    onPress={() => handleChoicePress(choice)}
                  >
                    <Text style={styles.choiceText}>{choice.text}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}

      <Modal
        visible={feedbackVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setFeedbackVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.successIcon}>✓</Text>

            <Text style={styles.modalSmallTitle}>解題正確</Text>

            <Text style={styles.modalTitle}>任務完成！</Text>

            <View style={styles.feedbackBox}>
              <Text style={styles.feedbackText}>{feedbackText}</Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.modalButton}
              onPress={handleNextLevel}
            >
              <Text style={styles.modalButtonText}>繼續旅程</Text>
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
    backgroundColor: '#F4C7D3',
  },

  coverScreen: {
    flex: 1,
    backgroundColor: '#F4C7D3',
    justifyContent: 'center',
    paddingHorizontal: 20,
    overflow: 'hidden',
  },

  coverCircleTop: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#B8E8D0',
    top: -40,
    left: -50,
  },

  coverCircleBottom: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#F7D85C',
    right: -45,
    bottom: -35,
  },

  coverCard: {
    backgroundColor: '#FFFDF8',
    borderWidth: 4,
    borderColor: '#171717',
    paddingHorizontal: 24,
    paddingVertical: 36,
    alignItems: 'center',
    shadowColor: '#171717',
    shadowOffset: {
      width: 8,
      height: 8,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 10,
  },

  coverEnglish: {
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 2,
    color: '#171717',
    marginBottom: 22,
  },

  coverSymbolBox: {
    width: 90,
    height: 90,
    backgroundColor: '#B8E8D0',
    borderWidth: 4,
    borderColor: '#171717',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    transform: [{ rotate: '-4deg' }],
  },

  coverSymbol: {
    fontSize: 48,
    fontWeight: '900',
    color: '#171717',
  },

  coverTitle: {
    fontSize: 42,
    lineHeight: 50,
    fontWeight: '900',
    textAlign: 'center',
    color: '#171717',
    marginBottom: 20,
  },

  coverDescription: {
    fontSize: 16,
    lineHeight: 27,
    color: '#505050',
    textAlign: 'center',
    marginBottom: 28,
  },

  coverNote: {
    marginTop: 22,
    fontSize: 12,
    fontWeight: '800',
    color: '#171717',
    textAlign: 'center',
  },

  mainButton: {
    minWidth: 220,
    backgroundColor: '#171717',
    borderWidth: 3,
    borderColor: '#171717',
    paddingVertical: 15,
    paddingHorizontal: 24,
    alignItems: 'center',
  },

  mainButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '900',
  },

  backButton: {
    minWidth: 220,
    borderWidth: 3,
    borderColor: '#171717',
    paddingVertical: 13,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginTop: 18,
  },

  backButtonText: {
    color: '#171717',
    fontSize: 16,
    fontWeight: '900',
  },

  gameScreen: {
    flex: 1,
  },

  topBar: {
    minHeight: 72,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 3,
    borderBottomColor: '#171717',
    flexDirection: 'row',
    alignItems: 'center',
  },

  topBackButton: {
    width: 43,
    height: 43,
    borderWidth: 3,
    borderColor: '#171717',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  topBackText: {
    fontSize: 35,
    lineHeight: 36,
    color: '#171717',
    fontWeight: '500',
  },

  progressArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  progressTrack: {
    flex: 1,
    height: 13,
    borderWidth: 3,
    borderColor: '#171717',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
  },

  progressText: {
    marginLeft: 8,
    fontSize: 12,
    fontWeight: '900',
    color: '#171717',
  },

  scorePill: {
    borderWidth: 3,
    borderColor: '#171717',
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginLeft: 10,
  },

  scorePillText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#171717',
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
  },

  storySection: {
    minHeight: 390,
    paddingHorizontal: 22,
    paddingTop: 38,
    paddingBottom: 35,
    overflow: 'hidden',
  },

  watermark: {
    position: 'absolute',
    right: -10,
    bottom: -30,
    fontSize: 190,
    fontWeight: '900',
    color: 'rgba(255,255,255,0.08)',
  },

  episodeText: {
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 12,
  },

  levelTitle: {
    fontSize: 38,
    lineHeight: 45,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 14,
  },

  placeTag: {
    alignSelf: 'flex-start',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 22,
  },

  placeTagText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },

  narratorText: {
    fontSize: 16,
    lineHeight: 27,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 22,
  },

  dialogueBox: {
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderLeftWidth: 6,
    paddingHorizontal: 17,
    paddingVertical: 16,
  },

  dialogueText: {
    fontSize: 16,
    lineHeight: 26,
    color: '#FFFFFF',
    fontStyle: 'italic',
  },

  questionSection: {
    backgroundColor: '#FFF8F1',
    borderTopWidth: 3,
    borderTopColor: '#171717',
    paddingHorizontal: 20,
    paddingTop: 27,
    paddingBottom: 38,
  },

  challengeTag: {
    alignSelf: 'flex-start',
    borderWidth: 2,
    borderColor: '#171717',
    paddingVertical: 5,
    paddingHorizontal: 9,
    marginBottom: 12,
  },

  challengeTagText: {
    color: '#171717',
    fontSize: 12,
    fontWeight: '900',
  },

  questionText: {
    fontSize: 22,
    lineHeight: 32,
    fontWeight: '900',
    color: '#171717',
    marginBottom: 20,
  },

  choicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  choiceButton: {
    width: '48%',
    minHeight: 67,
    backgroundColor: '#FFFFFF',
    borderWidth: 3,
    borderColor: '#171717',
    paddingHorizontal: 13,
    paddingVertical: 13,
    justifyContent: 'center',
    marginBottom: 13,
    shadowColor: '#B8E8D0',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },

  choiceText: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '800',
    color: '#171717',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.78)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  modalCard: {
    width: '100%',
    maxWidth: 520,
    backgroundColor: '#FFFFFF',
    borderWidth: 4,
    borderColor: '#171717',
    paddingHorizontal: 25,
    paddingVertical: 32,
    alignItems: 'center',
    shadowColor: '#B8E8D0',
    shadowOffset: {
      width: 9,
      height: 9,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 12,
  },

  successIcon: {
    fontSize: 52,
    lineHeight: 58,
    color: '#2C8B6D',
    fontWeight: '900',
    marginBottom: 8,
  },

  modalSmallTitle: {
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 2,
    color: '#555555',
    marginBottom: 8,
  },

  modalTitle: {
    fontSize: 30,
    fontWeight: '900',
    color: '#171717',
    marginBottom: 20,
  },

  feedbackBox: {
    width: '100%',
    backgroundColor: '#F2F8F6',
    paddingHorizontal: 18,
    paddingVertical: 18,
    marginBottom: 24,
  },

  feedbackText: {
    fontSize: 16,
    lineHeight: 27,
    color: '#333333',
    textAlign: 'center',
  },

  modalButton: {
    minWidth: 200,
    backgroundColor: '#171717',
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
  },

  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },

  endScreen: {
    flex: 1,
    backgroundColor: '#F4C7D3',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  endCard: {
    backgroundColor: '#FFFDF8',
    borderWidth: 4,
    borderColor: '#171717',
    paddingHorizontal: 24,
    paddingVertical: 38,
    alignItems: 'center',
    shadowColor: '#171717',
    shadowOffset: {
      width: 8,
      height: 8,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 10,
  },

  heartBox: {
    width: 80,
    height: 80,
    backgroundColor: '#F4C7D3',
    borderWidth: 4,
    borderColor: '#171717',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    transform: [{ rotate: '-4deg' }],
  },

  heartText: {
    color: '#D9485F',
    fontSize: 43,
    lineHeight: 48,
  },

  endEnglish: {
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 2,
    color: '#171717',
    marginBottom: 17,
  },

  endTitle: {
    fontSize: 38,
    lineHeight: 47,
    fontWeight: '900',
    color: '#171717',
    textAlign: 'center',
  },

  endQuote: {
    marginTop: 24,
    marginBottom: 24,
    fontSize: 16,
    lineHeight: 27,
    color: '#505050',
    textAlign: 'center',
  },

  scoreCard: {
    width: 230,
    backgroundColor: '#F7D85C',
    borderWidth: 3,
    borderColor: '#171717',
    paddingHorizontal: 18,
    paddingVertical: 15,
    marginBottom: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  scoreLabel: {
    fontSize: 15,
    fontWeight: '800',
    color: '#171717',
  },

  scoreNumber: {
    fontSize: 28,
    fontWeight: '900',
    color: '#171717',
  },
});
