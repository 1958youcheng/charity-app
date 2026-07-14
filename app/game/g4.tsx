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

export default function GameYilan() {
  const router = useRouter();

  const [currentLevelIndex, setCurrentLevelIndex] = useState<number>(-1);
  const [feedbackVisible, setFeedbackVisible] = useState<boolean>(false);
  const [feedbackText, setFeedbackText] = useState<string>('');

  // 🛠️ 圖片資源引入（可根據你的 assets 實際路徑與副檔名做調整）
  const imgCover = require('../../assets/game4/cover.jpg');
  const imgYilan1 = require('../../assets/game4/q1.jpg'); // 丟丟噹森林廣場/宜蘭火車站
  const imgYilan2 = require('../../assets/game4/q2.jpg'); // 獻馘碑
  const imgYilan3 = require('../../assets/game4/q3.jpg'); // 市民之森廣場
  const imgYilan4 = require('../../assets/game4/q4.jpg'); // 設治紀念館
  const imgYilan5 = require('../../assets/game4/q5.jpg'); // 九芎埕
  const imgYilan6 = require('../../assets/game4/q6.jpg'); // 宜蘭美術館

  const levels: Level[] = [
    {
      id: 1,
      ep: 'EP 01 | 啟航的紅色列車',
      title: '丟丟噹森林廣場',
      narrator:
        '陽光灑在宜蘭火車站旁的綠色鋼骨森林中，巨大的飛天火車正懸掛在半空中，彷彿隨時準備載著冒險小隊出發。',
      dialogue:
        '阿蘭：「傳說中，當這輛魔法列車的速度與時間達到完美比例時，時空之門就會開啟。快看車票背後的謎題！」',
      tag: '速度計算',
      question:
        '飛天火車行駛的時速是 72 公里。如果從「丟丟噹森林」到下一個歷史遺址的軌道長度為 2.4 公里，請問飛天火車需要行駛幾分鐘才能抵達？',
      bgImage: imgYilan1,
      choices: [
        {
          text: 'A. 1.5 分鐘',
          isCorrect: false,
          hint: '時速 72 公里換算成分速是多少呢？再算算看',
        },
        {
          text: 'B. 2 分鐘',
          isCorrect: true,
          feedback:
            '分速：72 ÷ 60 = 1.2 (公里/分)\n時間：2.4 ÷ 1.2 = 2 分鐘。\n恭喜答對！時空之門開啟了！',
        },
        {
          text: 'C. 3 分鐘',
          isCorrect: false,
          hint: '算得太慢囉，列車會錯過星空',
        },
        {
          text: 'D. 12 分鐘',
          isCorrect: false,
          hint: '注意單位，是問「分鐘」而不是「小時」喔',
        },
      ],
    },
    {
      id: 2,
      ep: 'EP 02 | 歲月的和解印記',
      title: '獻馘碑',
      narrator:
        '穿過宜蘭中山公園，一座莊嚴的石碑聳立在眼前。這裡記錄了泰雅族與漢人從衝突走向和平的歷史印記。',
      dialogue:
        '小雅：「石碑基座與老地圖上隱藏著比例尺密碼，我們得算出兩地在現實中的實際距離，才能繼續前進！」',
      tag: '比例尺與縮圖',
      question:
        '在一張比例尺為 1 : 5000 的宜蘭古地圖上，從「獻馘碑」到「市民之森廣場」的圖上距離是 6.4 公分。請問兩地的實際距離是多少公尺？',
      bgImage: imgYilan2,
      choices: [
        {
          text: 'A. 32 公尺',
          isCorrect: false,
          hint: '提示：1 公尺等於 100 公分，不要少算囉',
        },
        {
          text: 'B. 128 公尺',
          isCorrect: false,
          hint: '再算一次，比例尺是 1:5000 喔',
        },
        {
          text: 'C. 320 公尺',
          isCorrect: true,
          feedback:
            '實際距離：6.4 × 5000 = 32000 公分 = 320 公尺。\n答對了！你成功解鎖了地圖上的和平軌跡。',
        },
        {
          text: 'D. 3200 公尺',
          isCorrect: false,
          hint: '單位換算錯囉，多看一個零',
        },
      ],
    },
    {
      id: 3,
      ep: 'EP 03 | 紅磚與綠意的交響',
      title: '市民之森廣場',
      narrator:
        '舊宜蘭農林學校的紅磚倉庫與老樹在此交織。廣場中央的圓形噴水池在陽光下折射出彩虹般的光芒。',
      dialogue:
        '阿強：「這裡好舒服啊！不過水池邊的石牌上有玄機。算出這個圓形噴水池的面積，就能開啟秘密通道！」',
      tag: '圓面積計算',
      question:
        '市民之森廣場的圓形噴水池直徑為 10 公尺。請問這個圓形噴水池的面積是多少平方公尺？（圓周率請以 3.14 計算）',
      bgImage: imgYilan3,
      choices: [
        {
          text: 'A. 78.5 平方公尺',
          isCorrect: true,
          feedback:
            '半徑：10 ÷ 2 = 5 公尺\n圓面積：5 × 5 × 3.14 = 78.5 平方公尺。\n答對了！噴水池發出了清脆的樂音！',
        },
        {
          text: 'B. 314 平方公尺',
          isCorrect: false,
          hint: '提示：公式是「半徑 × 半徑 × 3.14」，不是直徑喔',
        },
        {
          text: 'C. 31.4 平方公尺',
          isCorrect: false,
          hint: '算錯囉，再仔細確認一次半徑的長度',
        },
        { text: 'D. 15.7 平方公尺', isCorrect: false, hint: '太小囉！再加油' },
      ],
    },
    {
      id: 4,
      ep: 'EP 04 | 百年檜木與老樟樹',
      title: '設治紀念館',
      narrator:
        '踏入日式木造官邸，濃郁的檜木香氣撲鼻而來。一棵歷經百年的老樟樹在庭園靜靜佇立。',
      dialogue:
        '阿蘭：「這座歷史悠久的官邸中藏有一個裝歷史文獻的長方體木箱。要打開它，必須解開它的容積密碼！」',
      tag: '長方體容積與單位換算',
      question:
        '長方體木箱的內側長為 60 公分、寬為 40 公分、高為 30 公分。請問這個木箱的容量是多少公升？',
      bgImage: imgYilan4,
      choices: [
        {
          text: 'A. 720 公升',
          isCorrect: false,
          hint: '體積是 72000 立方公分，想一想 1 公升等於幾立方公分？',
        },
        {
          text: 'B. 7.2 公升',
          isCorrect: false,
          hint: '不對喔，小數點點錯位置了',
        },
        {
          text: 'C. 72 公升',
          isCorrect: true,
          feedback:
            '體積：60 × 40 × 30 = 72000 (立方公分)\n換算：72000 ÷ 1000 = 72 公升。\n答對了！木箱卡嗒一聲打開了！',
        },
        {
          text: 'D. 72000 公升',
          isCorrect: false,
          hint: '這是立方公分的數值，題目是問「公升」喔',
        },
      ],
    },
    {
      id: 5,
      ep: 'EP 05 | 音樂與老樹的對話',
      title: '九芎埕',
      narrator:
        '九芎埕四周環繞著古樸的紅磚牆，微風吹過老九芎樹梢，傳來陣陣優雅的樂音。',
      dialogue:
        '守護婆婆：「孩子們，九芎樹是宜蘭（舊稱九芎城）的象徵。只要能平分這些平安糖，就能得到通往美術館的關鍵石板暗示！」',
      tag: '分數除法應用',
      question:
        '守護婆婆給了冒險小隊 15/2 公斤的平安糖。阿強想把這些糖果每 3/4 公斤裝成一袋，請問總共可以裝成多少袋？',
      bgImage: imgYilan5,
      choices: [
        {
          text: 'A. 8 袋',
          isCorrect: false,
          hint: '分數除法：除以一個分數，等於乘以它的倒數喔',
        },
        {
          text: 'B. 10 袋',
          isCorrect: true,
          feedback:
            '(15/2) ÷ (3/4) = (15/2) × (4/3) = 10 袋。\n答對了！大家開心地平分了糖果。',
        },
        {
          text: 'C. 12 袋',
          isCorrect: false,
          hint: '不對喔，再用筆在紙上算算看',
        },
        { text: 'D. 5 袋', isCorrect: false, hint: '算得太少囉，小朋友不夠分' },
      ],
    },
    {
      id: 6,
      ep: 'EP 06 | 噶瑪蘭之心的誕生',
      title: '宜蘭美術館',
      narrator:
        '冒險小隊來到了最後一站──宜蘭美術館。在古典的美術館展廳中央，放著一個閃耀著光芒的藍色結晶體，那正是「噶瑪蘭之心」。',
      dialogue:
        '小雅：「等等！寶物外面有一道雷射防護網，上面寫著最後一個未知數謎題。如果算錯，警報器就會響！」',
      tag: '等式與未知數 (x)',
      question:
        '雷射防護網的謎題寫著：『噶瑪蘭守護神的年齡乘以 3，再減去 25，剛好會是 185。』如果我們用 x 代表守護神的年齡，求出 x 是多少？',
      bgImage: imgYilan6,
      choices: [
        {
          text: 'A. x = 60',
          isCorrect: false,
          hint: '提示方程式：3x - 25 = 185',
        },
        {
          text: 'B. x = 65',
          isCorrect: false,
          hint: '代入算算看，3 × 65 - 25 是多少呢？',
        },
        {
          text: 'C. x = 70',
          isCorrect: true,
          feedback:
            '列式：3x - 25 = 185\n移項：3x = 210\n得：x = 70。\n太棒了！防護網消失了，你得到了「噶瑪蘭之心」！',
        },
        {
          text: 'D. x = 75',
          isCorrect: false,
          hint: '算太大囉，再重新解一次方程式',
        },
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
          <ImageBackground source={imgCover} style={gameStyles.centerScreen}>
            <View style={gameStyles.darkOverlay}>
              <Text style={gameStyles.mainTitle}>尋找噶瑪蘭之心</Text>
              <Text style={gameStyles.subTitle}>
                穿梭宜蘭古今地標，用智慧解開歷史密碼
              </Text>
              <TouchableOpacity
                style={gameStyles.startBtn}
                onPress={() => setCurrentLevelIndex(0)}
              >
                <Text style={gameStyles.startBtnText}>開啟宜蘭冒險旅程</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        ) : isEndScreen ? (
          <ImageBackground source={imgYilan6} style={gameStyles.centerScreen}>
            <View
              style={[
                gameStyles.darkOverlay,
                { padding: 25, backgroundColor: 'rgba(0,0,0,0.85)' },
              ]}
            >
              <Text style={gameStyles.endTitle}>冒險圓滿落幕</Text>
              <Text style={gameStyles.endCore}>
                「噶瑪蘭之心在美術館金庫中甦醒，{'\n'}
                它與宜蘭的土地、歷史與智慧緊緊相連。」
              </Text>
              <View style={gameStyles.divider} />
              <Text style={gameStyles.endDesc}>
                你帶領著冒險小隊，成功破解了六大地標的數學謎題，{'\n'}
                這片土地的百年歲月，已深深烙印在你們的智慧之中！
              </Text>

              <TouchableOpacity
                style={gameStyles.startBtn}
                onPress={() => setCurrentLevelIndex(-1)}
              >
                <Text style={gameStyles.startBtnText}>重新體驗</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  gameStyles.startBtn,
                  { marginTop: 20, backgroundColor: '#3a5f5f' },
                ]}
                onPress={() => router.back()}
              >
                <Text style={[gameStyles.startBtnText, { color: '#fff' }]}>
                  返回主選單
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        ) : (
          <View style={{ flex: 1 }}>
            <ImageBackground
              source={currentLevel ? currentLevel.bgImage : imgCover}
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
            <Text style={gameStyles.modalSuccessTitle}>解題正確！ 🎉</Text>
            <View style={gameStyles.mathLogicBox}>
              <Text style={gameStyles.mathLogicText}>{feedbackText}</Text>
            </View>
            <TouchableOpacity
              style={gameStyles.modalNextBtn}
              onPress={handleNextLevel}
            >
              <Text style={gameStyles.modalNextBtnText}>前往下一站</Text>
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
  imageOverlay: { flex: 1, backgroundColor: 'rgba(15, 28, 28, 0.82)' },
  mainTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 6,
    marginBottom: 15,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 15,
    color: '#c69352',
    letterSpacing: 1.5,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 22,
  },
  startBtn: {
    backgroundColor: '#c69352',
    paddingVertical: 15,
    width: 250,
    borderRadius: 30,
    alignItems: 'center',
  },
  startBtnText: { color: '#000', fontSize: 16, fontWeight: 'bold' },
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
    backgroundColor: '#0f2626',
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
