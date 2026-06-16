import { useRouter } from 'expo-router';
import React, { useState } from 'react';
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
  ep: string;
  title: string;
  narrator: string;
  dialogue: string;
  tag: string;
  question: string;
  choices: Choice[];
  bgImage: any;
}

export default function Game1() {
  const router = useRouter();

  const [currentLevelIndex, setCurrentLevelIndex] = useState<number>(-1);
  const [feedbackVisible, setFeedbackVisible] = useState<boolean>(false);
  const [feedbackText, setFeedbackText] = useState<string>('');

  // 🛠️ 這裡已經全部修正為小寫 .jpg，完美對齊你的圖片副檔名！
  const imgCoverQ1Q8 = require('../../assets/game1/cover+q1+q8.jpg');
  const imgQ2Q7 = require('../../assets/game1/q2+q7.jpg');
  const imgQ3 = require('../../assets/game1/q3.jpg');
  const imgQ4Q6 = require('../../assets/game1/q4+q6.jpg');
  const imgQ5 = require('../../assets/game1/q5.jpg');
  const imgQ9 = require('../../assets/game1/q9.jpg');

  const levels: Level[] = [
    {
      id: 1,
      ep: 'EP 01 | 意外的邂逅',
      title: '聽錯的地名',
      narrator:
        '命運的風，將你吹向了這片陌生的海岸。原本喧囂的計畫，被太平洋的浪濤聲輕輕抹去。',
      dialogue:
        '司機：「哎呀！我聽成『水璉』啦！但你看，這片深藍色的大海，難道不比城市更迷人嗎？」',
      tag: '減法計算',
      question: '旅行經費有 1200 元，付了車資 350 元後，還剩下多少錢？',
      bgImage: imgCoverQ1Q8,
      choices: [
        { text: 'A. 950 元', isCorrect: false, hint: '再算算看' },
        {
          text: 'B. 850 元',
          isCorrect: true,
          feedback: '1200 - 350 = 850\n答對了！經費管理是勇者的第一步。',
        },
        { text: 'C. 900 元', isCorrect: false, hint: '少扣了喔' },
        { text: 'D. 750 元', isCorrect: false, hint: '扣太多了' },
      ],
    },
    {
      id: 2,
      ep: 'EP 02 | 土地的姓名',
      title: '美麗的村落',
      narrator:
        '斑斕的色彩在圍牆上跳動，述說著古老的傳承。每一個字母，都是土地的呼吸。',
      dialogue:
        '老師：「sibilian，這是阿美語『美麗村落』的意思。當你讀出它的聲音，你就與土地有了連結。」',
      tag: '乘法計算',
      question:
        '地名「sibilian」共有 8 個字母，如果寫 40 遍，共需要寫幾個字母？',
      bgImage: imgQ2Q7,
      choices: [
        { text: 'A. 280 個', isCorrect: false, hint: '提示：8 × 40' },
        { text: 'B. 300 個', isCorrect: false, hint: '不對喔' },
        {
          text: 'C. 320 個',
          isCorrect: true,
          feedback: '8 × 40 = 320\n答對了！重複的練習讓記憶更深刻。',
        },
        { text: 'D. 350 個', isCorrect: false, hint: '再算一次' },
      ],
    },
    {
      id: 3,
      ep: 'EP 03 | 勇士的準備',
      title: '營火的物資',
      narrator: '綠竹在陽光下閃耀。每一根竹子、每一段繩結，都是與森林的契約。',
      dialogue:
        '教練：「孩子，獵人學校不只教狩獵。精確的準備，是對大地最好的報答。」',
      tag: '乘法應用',
      question:
        '搭建一組營火架要 15 根竹子，獵人學校準備做 30 組，共要幾根竹子？',
      bgImage: imgQ3,
      choices: [
        {
          text: 'A. 450 根',
          isCorrect: true,
          feedback: '15 × 30 = 450\n答對了！充足的準備是勇士的基石。',
        },
        { text: 'B. 400 根', isCorrect: false, hint: '差一點點' },
        { text: 'C. 500 根', isCorrect: false, hint: '算錯囉' },
        { text: 'D. 480 根', isCorrect: false, hint: '提示：15x3=45' },
      ],
    },
    {
      id: 4,
      ep: 'EP 04 | 歲月的教誨',
      title: '長度的感官',
      narrator: '耆老的身影與老樹交織。風掠過樹梢，彷彿遠古的低語。',
      dialogue:
        '耆老：「海有潮汐，就像呼吸一樣。懂得聽時間的人，才能讀懂大海的祕密。」',
      tag: '單位換算',
      question: '耆老的手杖長 1 公尺 45 公分，請問這等於多少「公分」？',
      bgImage: imgQ4Q6,
      choices: [
        { text: 'A. 14.5 公分', isCorrect: false, hint: '公尺比較大喔' },
        { text: 'B. 1045 公分', isCorrect: false, hint: '算錯了' },
        { text: 'C. 1450 公分', isCorrect: false, hint: '這是公釐' },
        {
          text: 'D. 145 公分',
          isCorrect: true,
          feedback: '100 + 45 = 145\n答對了！你對長度的掌握非常精準。',
        },
      ],
    },
    {
      id: 5,
      ep: 'EP 05 | 太平洋的結晶',
      title: '大海的恩賜',
      narrator: '海水在烈日下結晶。這是太陽與大海共同釀造的滋味。',
      dialogue:
        '阿姨：「每一粒鹽粒，都藏著太陽與海水的對話。我們必須仔細稱重裝袋。」',
      tag: '乘法計算',
      question: '一袋海鹽重 200 公克，阿姨裝了 8 袋，總共是多少公克？',
      bgImage: imgQ5,
      choices: [
        { text: 'A. 1000 公克', isCorrect: false, hint: '再算算看' },
        {
          text: 'B. 1600 公克',
          isCorrect: true,
          feedback: '200 × 8 = 1600\n答對了！大海的餽贈真豐富。',
        },
        { text: 'C. 1400 公克', isCorrect: false, hint: '少算囉' },
        { text: 'D. 1200 公克', isCorrect: false, hint: '不對喔' },
      ],
    },
    {
      id: 6,
      ep: 'EP 06 | 分享的滋味',
      title: '部落的香味',
      narrator: '裊裊煙霧升起，空氣中瀰漫著米飯香。在部落裡，美味從不獨享。',
      dialogue:
        '廚娘：「飯要平分着吃才香。把這 48 枝竹筒飯，平分給 4 組客人吧！」',
      tag: '除法應用',
      question: '48 枝竹筒飯平分給 4 組，每組可以拿到幾枝？',
      bgImage: imgQ4Q6,
      choices: [
        {
          text: 'A. 12 枝',
          isCorrect: true,
          feedback: '48 ÷ 4 = 12\n答對了！分享讓每個人都快樂。',
        },
        { text: 'B. 10 枝', isCorrect: false, hint: '算錯囉' },
        { text: 'C. 14 枝', isCorrect: false, hint: '不對' },
        { text: 'D. 8 枝', isCorrect: false, hint: '再加油' },
      ],
    },
    {
      id: 7,
      ep: 'EP 07 | 纖維的經緯',
      title: '手心的耐心',
      narrator: '靈巧的手指穿梭。一經一緯，交織出族人堅韌的生命美學。',
      dialogue:
        '織女：「編織籃子急不得。每一條葉子，都承載著我們對生活的耐心。」',
      tag: '加法計算',
      question:
        '上午編了 125 公分長的織帶，下午編了 148 公分，今天共編了幾公分？',
      bgImage: imgQ2Q7,
      choices: [
        { text: 'A. 263 公分', isCorrect: false, hint: '再算一次' },
        { text: 'B. 283 公分', isCorrect: false, hint: '算錯囉' },
        {
          text: 'C. 273 公分',
          isCorrect: true,
          feedback: '125 + 148 = 273\n答對了！一點一滴累積出美麗的作品。',
        },
        { text: 'D. 253 公分', isCorrect: false, hint: '不對' },
      ],
    },
    {
      id: 8,
      ep: 'EP 08 | 豐收的喜悅',
      title: '大地的慷慨',
      narrator: '剛採收的玉米帶著晨露。汗水凝結成的果實，訴說著土地的慷慨。',
      dialogue: '農夫：「這玉米特別甜！一袋賣 60 元，買 5 袋算你優惠點。」',
      tag: '乘法計算',
      question: '一袋玉米 60 元，買 5 袋總共需要多少錢？',
      bgImage: imgCoverQ1Q8,
      choices: [
        { text: 'A. 240 元', isCorrect: false, hint: '算錯囉' },
        {
          text: 'B. 300 元',
          isCorrect: true,
          feedback: '60 × 5 = 300\n答對了！農夫的辛苦有了回報。',
        },
        { text: 'C. 350 元', isCorrect: false, hint: '不對' },
        { text: 'D. 360 元', isCorrect: false, hint: '提示：6x5=30' },
      ],
    },
    {
      id: 9,
      ep: 'EP 09 | 智慧的足跡',
      title: '勇氣的證明',
      narrator: '泥土的芬芳交織。腳下的路，是祖先們用幾百年的勇氣踩踏出來的。',
      dialogue:
        '嚮導：「看，我們已經走了好遠。每一個腳印，都是你對這片山林的證明。」',
      tag: '減法應用',
      question:
        '步道總長 2000 公尺，我們已經走了 1350 公尺，還剩多少公尺到終點？',
      bgImage: imgQ9,
      choices: [
        { text: 'A. 750 公尺', isCorrect: false, hint: '算錯囉' },
        { text: 'B. 850 公尺', isCorrect: false, hint: '再算算' },
        {
          text: 'C. 650 公尺',
          isCorrect: true,
          feedback: '2000 - 1350 = 650\n答對了！終點就在前方了。',
        },
        { text: 'D. 550 公尺', isCorrect: false, hint: '不對' },
      ],
    },
  ];

  const handleChoicePress = (choice: Choice) => {
    if (choice.isCorrect) {
      setFeedbackText(choice.feedback || '答對了！');
      setFeedbackVisible(true);
    } else {
      Alert.alert('提示', choice.hint || '再算算看喔！');
    }
  };

  const handleNextLevel = () => {
    setFeedbackVisible(false);
    setCurrentLevelIndex((prev) => prev + 1);
  };

  const isEndScreen = currentLevelIndex >= levels.length;
  const currentLevel =
    currentLevelIndex >= 0 && currentLevelIndex < levels.length
      ? levels[currentLevelIndex]
      : null;

  return (
    <View style={styles.container}>
      <View style={gameStyles.gameBox}>
        {currentLevelIndex === -1 ? (
          <ImageBackground
            source={imgCoverQ1Q8}
            style={gameStyles.centerScreen}
          >
            <View style={gameStyles.darkOverlay}>
              <Text style={gameStyles.mainTitle}>山海的呼吸</Text>
              <Text style={gameStyles.subTitle}>
                在 sibilian 的浪潮中，尋找智慧的印記
              </Text>
              <TouchableOpacity
                style={gameStyles.startBtn}
                onPress={() => setCurrentLevelIndex(0)}
              >
                <Text style={gameStyles.startBtnText}>聽，山海在呼喚...</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        ) : isEndScreen ? (
          <ImageBackground source={imgQ9} style={gameStyles.centerScreen}>
            <View
              style={[
                gameStyles.darkOverlay,
                { padding: 25, backgroundColor: 'rgba(0,0,0,0.8)' },
              ]}
            >
              <Text style={gameStyles.endTitle}>山海的呼吸</Text>
              <Text style={gameStyles.endCore}>
                「美麗的村落，因為人、山、海{'\n'}相互守護與傾聽變得更加美好。」
              </Text>
              <View style={gameStyles.divider} />
              <Text style={gameStyles.endDesc}>
                帶著這份智慧與溫暖記憶，{'\n'}
                你已完成所有試煉，正式成為部落之友！
              </Text>

              <TouchableOpacity
                style={gameStyles.startBtn}
                onPress={() => setCurrentLevelIndex(-1)}
              >
                <Text style={gameStyles.startBtnText}>再玩一次</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[gameStyles.startBtn, { marginTop: 20 }]}
                onPress={() => router.back()}
              >
                <Text style={gameStyles.startBtnText}>返回關卡</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        ) : (
          <View style={{ flex: 1 }}>
            <ImageBackground
              source={currentLevel ? currentLevel.bgImage : imgCoverQ1Q8}
              style={gameStyles.safeAreaContainer}
            >
              <View style={gameStyles.imageOverlay}>
                <SafeAreaView style={{ flex: 1 }}>
                  <ScrollView style={gameStyles.storyPanel}>
                    <View style={gameStyles.labelRow}>
                      <Text style={gameStyles.introLabel}>
                        {currentLevel?.ep}
                      </Text>
                    </View>
                    <Text style={gameStyles.levelHeading}>
                      {currentLevel?.title}
                    </Text>
                    <Text style={gameStyles.narratorText}>
                      {currentLevel?.narrator}
                    </Text>
                    <View style={gameStyles.dialogueBox}>
                      <Text style={gameStyles.dialogueText}>
                        {currentLevel?.dialogue}
                      </Text>
                    </View>
                  </ScrollView>
                </SafeAreaView>
              </View>
            </ImageBackground>

            <View style={gameStyles.puzzleFooter}>
              <View style={gameStyles.questionArea}>
                <View style={gameStyles.tagRow}>
                  <Text style={gameStyles.challengeTag}>
                    {currentLevel?.tag}
                  </Text>
                </View>
                <Text style={gameStyles.questionText}>
                  {currentLevel?.question}
                </Text>
              </View>

              <View style={gameStyles.choicesGrid}>
                {currentLevel?.choices.map((choice, index) => (
                  <TouchableOpacity
                    key={index}
                    style={gameStyles.optBtn}
                    onPress={() => handleChoicePress(choice)}
                  >
                    <Text style={gameStyles.optText}>{choice.text}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        )}
      </View>

      <Modal visible={feedbackVisible} transparent animationType="fade">
        <View style={gameStyles.modalOverlay}>
          <View style={gameStyles.modalCard}>
            <Text style={gameStyles.modalSuccessTitle}>解題正確！</Text>
            <View style={gameStyles.mathLogicBox}>
              <Text style={gameStyles.mathLogicText}>{feedbackText}</Text>
            </View>
            <TouchableOpacity
              style={gameStyles.modalNextBtn}
              onPress={handleNextLevel}
            >
              <Text style={gameStyles.modalNextBtnText}>繼續旅程</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});

const gameStyles = StyleSheet.create({
  gameBox: { flex: 1, width: '100%', backgroundColor: '#000' },
  centerScreen: { flex: 1, width: '100%', height: '100%' },
  darkOverlay: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(5, 18, 18, 0.75)',
    padding: 20,
  },
  imageOverlay: { flex: 1, backgroundColor: 'rgba(15, 42, 42, 0.82)' },
  mainTitle: {
    fontSize: 36,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 10,
    marginBottom: 15,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 16,
    color: '#c69352',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 40,
  },
  startBtn: {
    backgroundColor: '#c69352',
    paddingVertical: 15,
    width: 250,
    borderRadius: 30,
    alignItems: 'center',
  },
  startBtnText: { color: '#000', fontSize: 18, fontWeight: 'bold' },
  safeAreaContainer: { flex: 1 },
  storyPanel: { flex: 1, paddingHorizontal: 20, paddingTop: 25 },
  labelRow: { alignItems: 'flex-start', marginBottom: 10 },
  introLabel: {
    backgroundColor: '#fff',
    color: '#0f2a2a',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 15,
    fontSize: 12,
    fontWeight: 'bold',
  },
  levelHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#c69352',
    marginBottom: 15,
  },
  narratorText: {
    fontSize: 15,
    lineHeight: 24,
    color: '#ddd',
    marginBottom: 15,
  },
  dialogueBox: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 15,
    borderRadius: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#c69352',
    marginBottom: 20,
  },
  dialogueText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#fff',
    fontStyle: 'italic',
  },
  puzzleFooter: {
    backgroundColor: '#0f2a2a',
    borderTopWidth: 2,
    borderTopColor: '#c69352',
    padding: 20,
    paddingBottom: 40,
  },
  questionArea: { marginBottom: 15 },
  tagRow: { alignItems: 'flex-start', marginBottom: 5 },
  challengeTag: {
    backgroundColor: '#e63946',
    color: '#fff',
    fontSize: 12,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
    fontWeight: 'bold',
  },
  questionText: { fontSize: 16, color: '#fff', lineHeight: 24 },
  choicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  optBtn: {
    width: '48%',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    padding: 12,
    borderRadius: 8,
    minHeight: 50,
    justifyContent: 'center',
  },
  optText: { color: '#fff', fontSize: 14 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    backgroundColor: '#fff',
    width: '85%',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    borderBottomWidth: 8,
    borderBottomColor: '#c69352',
  },
  modalSuccessTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f2a2a',
    marginBottom: 20,
  },
  mathLogicBox: {
    backgroundColor: '#f0f7f7',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    marginBottom: 25,
  },
  mathLogicText: { fontSize: 16, lineHeight: 24, color: '#333' },
  modalNextBtn: {
    backgroundColor: '#0f2a2a',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  modalNextBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  endTitle: {
    fontSize: 32,
    color: '#c69352',
    fontWeight: 'bold',
    letterSpacing: 6,
    marginBottom: 20,
  },
  endCore: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  divider: {
    width: 80,
    height: 2,
    backgroundColor: '#c69352',
    marginBottom: 20,
  },
  endDesc: {
    fontSize: 15,
    color: '#bbb',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
});
