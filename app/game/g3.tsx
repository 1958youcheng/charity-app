import { ResizeMode, Video } from 'expo-av';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { height, width } = Dimensions.get('window');

interface Lock {
  id: string;
  title: string;
  prompt: string;
  options: string[];
  correct: number;
  hint1: string;
  hint2: string;
  vizText: string;
}
interface Chapter {
  title: string;
  who?: 'boy' | 'girl';
  lines: string[];
  lock?: Lock;
  final?: boolean;
}

export default function Game3() {
  const router = useRouter();
  const coverVideo = require('../../assets/game3/cover.mp4');
  const images = [
    require('../../assets/game3/view+q1+end.jpg'),
    require('../../assets/game3/q2.jpg'),
    require('../../assets/game3/q3.jpg'),
    require('../../assets/game3/q4.jpg'),
    require('../../assets/game3/q5.jpg'),
    require('../../assets/game3/q6.jpg'),
    require('../../assets/game3/view+q1+end.jpg'),
  ];

  const [scene, setScene] = useState<'intro' | 'select' | 'story' | 'final'>(
    'intro'
  );
  const [track, setTrack] = useState<'both' | 'boy' | 'girl'>('both');
  const [chapterIndex, setChapterIndex] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);
  const [linesShown, setLinesShown] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const allChapters: Chapter[] = [
    {
      title: '走進濕地故事館',
      lines: [
        '在板橋 435 濕地故事館，有一位男孩，每天在戶外濕地邊巡查、維護環境。',
        '也有一位女孩，帶孩子們探索館內展區：認識大漢溪的故事、導覽模型、做蠟筆拓印。',
        '一開始，他們只是一起工作的夥伴：互相幫忙、互相鼓勵。',
      ],
      lock: {
        id: 'k1',
        title: '互動螢幕｜濕地小百科',
        prompt: '小百科：4/5 代表 1 的多少？（選小數）',
        options: ['0.45', '0.8', '0.25', '1.25'],
        correct: 1,
        hint1: '先把 4/5 換成小數或百分比。',
        hint2: '4 ÷ 5 = 0.8（也就是 80%）。',
        vizText: '4/5 = 80% (答案是 0.8)',
      },
    },
    {
      title: '男孩：戶外的巡查',
      who: 'boy',
      lines: [
        '男孩的工作，常常是沉默的。',
        '走在濕地邊，他看水色、看植物、看每一種回來的小生命。',
        '他把看見的都記錄下來——像是在為這片土地寫日記。',
      ],
      lock: {
        id: 'k2',
        title: '互動螢幕｜巡查紀錄分析',
        prompt: '今天巡查三段：18 分、22 分、20 分。平均每段幾分鐘？',
        options: ['19', '20', '21', '60'],
        correct: 1,
        hint1: '平均＝總和 ÷ 段數。',
        hint2: '(18+22+20)=60，60÷3=20。',
        vizText: '總和 ÷ 3 (18+22+20=60 → 60÷3=20)',
      },
    },
    {
      title: '女孩：館內的引導',
      who: 'girl',
      lines: [
        '女孩帶著孩子們，從「看懂」開始。',
        '在模型、在生態池、在拓印作品上——孩子們把理解，變成了記憶。',
      ],
      lock: {
        id: 'k3',
        title: '互動螢幕｜水質變清的比例',
        prompt: '混濁度降低 63%。原本 100 單位，降低後剩多少？',
        options: ['63', '37', '0.63', '1.63'],
        correct: 1,
        hint1: '「降低 63%」表示剩下多少％？',
        hint2: '剩下 100%-63%=37%，所以剩 37 單位。',
        vizText: '剩下 37% (100 → 37)',
      },
    },
    {
      title: '濕地的改變',
      lines: [
        '動物一個一個回來了：不是奇蹟，是日復一日的守護。',
        '互動螢幕前發亮的眼睛、手上沾著蠟筆的拓印作品，都讓女孩更相信這件事。',
      ],
      lock: {
        id: 'k4',
        title: '互動螢幕｜濕地淨化效率計算',
        prompt: '請計算：(0.63 + 4/5) ÷ 1.3 ＝ ?',
        options: ['1.0', '1.1', '1.2', '1.3'],
        correct: 1,
        hint1: '先算 4/5，再把 0.63 加起來。',
        hint2: '4/5=0.8；0.63+0.8=1.43；1.43÷1.3=1.1。',
        vizText: '分三步：4/5=0.8 → 0.63+0.8=1.43 → 1.43÷1.3=1.1',
      },
    },
    {
      title: '迷惘的那一年',
      lines: [
        '男孩開始迷惘：「也許我應該去外面找更穩定的工作吧……」',
        '女孩仍每天帶孩子拓印、認識濕地，安靜地相信這件事是值得的。',
      ],
      lock: {
        id: 'k5',
        title: '互動螢幕｜經費縮減推算',
        prompt: '經費原本 x 元，縮減後只剩 70% 且為 14,000 元。x 是多少？',
        options: ['18,000', '20,000', '22,000', '24,000'],
        correct: 1,
        hint1: '把題目寫成方程式：0.7x = 14000。',
        hint2: 'x = 14000 ÷ 0.7 = 20000。',
        vizText: '0.7x = 14000 → x=20000',
      },
    },
    {
      title: '一句話，讓守護不再孤單',
      lines: [
        '一個孩子捧著作品說：「謝謝你，我知道濕地不是來玩，是要保護的。」',
        '男孩明白──原來守護，從來不是孤單的。',
        '他回到女孩身旁，一起守護這裡。',
      ],
      lock: {
        id: 'k6',
        title: '互動螢幕｜濕地模型尺度',
        prompt: '模型比例 1:200。模型上 6 公分代表實際幾公尺？',
        options: ['1.2', '6', '12', '120'],
        correct: 2,
        hint1: '先把模型長度乘以 200，再換算單位。',
        hint2: '6×200=1200cm，1200cm=12m。',
        vizText: '單位換算：6×200=1200cm = 12m',
      },
    },
    {
      title: '接棒的人，是你',
      final: true,
      lines: [
        '現在，他們仍在這裡。',
        '你走進這裡，你就是下一位接棒的人。',
        '因為──守護，值得。',
      ],
    },
  ];

  const storyChapters = allChapters.filter((c) =>
    track === 'boy' && c.who === 'girl'
      ? false
      : track === 'girl' && c.who === 'boy'
        ? false
        : true
  );
  const currentChapter = storyChapters[chapterIndex];

  return (
    <SafeAreaView style={styles.container}>
      {scene === 'intro' && (
        <View style={styles.centerCard}>
          <Video
            source={coverVideo}
            style={styles.video}
            resizeMode={ResizeMode.COVER}
            isLooping
            shouldPlay
          />
          <View style={styles.textContainer}>
            <Text style={styles.h1}>濕地故事館</Text>
            <Text style={styles.p}>
              歡迎來到板橋 435 濕地故事館。{'\n'}
              在這裡，選擇視角，深入了解守護者的故事。
            </Text>
          </View>
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => setScene('select')}
          >
            <Text style={styles.primaryBtnText}>🌿 進入故事館</Text>
          </TouchableOpacity>
        </View>
      )}

      {scene === 'select' && (
        <View style={styles.centerCard}>
          <View style={styles.visualGroup}>
            <Image source={images[0]} style={styles.chapterImg} />
            <Text style={styles.h1}>選擇您的故事視角</Text>
            <Text style={styles.p}>
              請選擇一位陪伴您探索的夥伴，{'\n'}
              不同的角色將帶領您看見濕地不同的風貌。
            </Text>
          </View>
          <View style={styles.row}>
            {['both', 'boy', 'girl'].map((t) => (
              <TouchableOpacity
                key={t}
                style={[styles.trackBtn, track === t && styles.trackActive]}
                onPress={() => setTrack(t as any)}
              >
                <Text style={styles.trackText}>
                  {t === 'both' ? '雙視角' : t === 'boy' ? '男孩' : '女孩'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            style={[styles.primaryBtn, { marginTop: 30 }]}
            onPress={() => {
              setChapterIndex(0);
              setScene('story');
            }}
          >
            <Text style={styles.primaryBtnText}>開始旅程 ✨</Text>
          </TouchableOpacity>
        </View>
      )}

      {scene === 'story' && currentChapter && (
        <View style={styles.gameWrapper}>
          <View style={styles.imgContainer}>
            <Image
              source={images[chapterIndex] || images[0]}
              style={styles.chapterImg}
            />
          </View>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              if (lineIndex < currentChapter.lines.length) {
                setLinesShown(currentChapter.lines);
                setLineIndex(currentChapter.lines.length);
              }
            }}
            style={styles.card}
          >
            <Text style={styles.h1}>{currentChapter.title}</Text>
            <ScrollView style={styles.log}>
              <View>
                {linesShown.map((line, idx) => (
                  <Text key={idx} style={styles.logText}>
                    • {line}
                  </Text>
                ))}
              </View>
            </ScrollView>
          </TouchableOpacity>

          {/* 最後一頁顯示完成按鈕 */}
          {lineIndex >= currentChapter.lines.length && currentChapter.final && (
            <TouchableOpacity
              style={styles.submitBtn}
              onPress={() => setScene('final')}
            >
              <Text style={styles.submitText}>完成旅程</Text>
            </TouchableOpacity>
          )}

          {/* 題目邏輯 */}
          {lineIndex >= currentChapter.lines.length && currentChapter.lock && (
            <View style={styles.kiosk}>
              <Text style={styles.kTitle}>{currentChapter.lock.title}</Text>
              <Text style={styles.p}>{currentChapter.lock.prompt}</Text>
              <View style={styles.optionsGrid}>
                {currentChapter.lock.options.map((opt, idx) => (
                  <TouchableOpacity
                    key={idx}
                    style={[
                      styles.optBtn,
                      selectedOption === idx && styles.optSelected,
                    ]}
                    onPress={() => setSelectedOption(idx)}
                  >
                    <Text style={styles.optText}>{opt}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <TouchableOpacity
                style={styles.submitBtn}
                onPress={() => {
                  if (selectedOption === currentChapter.lock!.correct) {
                    setChapterIndex((prev) => prev + 1);
                    setLinesShown([]);
                    setLineIndex(0);
                    setSelectedOption(null);
                  }
                }}
              >
                <Text style={styles.submitText}>送出答案</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}

      {scene === 'final' && (
        <View style={styles.finalWrapper}>
          <View style={styles.finalHeader}>
            <Text style={styles.h1}>守護圓滿完成</Text>
          </View>
          <View style={styles.bottomBtnGroup}>
            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() => {
                setChapterIndex(0);
                setScene('select');
              }}
            >
              <Text style={styles.primaryBtnText}>🔁 重新遊玩</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.primaryBtn,
                {
                  marginTop: 15,
                  backgroundColor: 'transparent',
                  borderColor: '#fff',
                },
              ]}
              onPress={() => router.back()}
            >
              <Text style={styles.primaryBtnText}>🔙 返回上一頁</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0c1511' },
  gameWrapper: { flex: 1, padding: 10 },
  visualGroup: { alignItems: 'center', marginBottom: 30, width: '100%' },
  imgContainer: { height: height * 0.25, justifyContent: 'center' },
  video: { width: '100%', height: 220, borderRadius: 12 },
  chapterImg: {
    width: '100%',
    height: 180,
    borderRadius: 16,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  card: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 15,
    marginBottom: 10,
  },
  centerCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  finalWrapper: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
    backgroundColor: '#0c1511',
  },
  finalHeader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  bottomBtnGroup: { paddingBottom: 20, width: '100%' },
  textContainer: { marginVertical: 15, alignItems: 'center' },
  h1: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#eef6f1',
    marginBottom: 10,
    textAlign: 'center',
  },
  p: {
    fontSize: 15,
    color: '#bdc3c7',
    marginBottom: 10,
    textAlign: 'center',
    lineHeight: 22,
  },
  log: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 12,
    padding: 10,
  },
  logText: { color: '#eef6f1', fontSize: 15, marginBottom: 8, lineHeight: 22 },
  kiosk: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    padding: 15,
    borderRadius: 16,
    marginBottom: 10,
  },
  kTitle: { color: '#ffd166', fontWeight: 'bold', marginBottom: 5 },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginVertical: 10,
  },
  optBtn: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 10,
    borderRadius: 8,
    width: '47%',
    alignItems: 'center',
  },
  optSelected: {
    backgroundColor: 'rgba(168,219,190,0.3)',
    borderColor: '#a8dbbe',
    borderWidth: 1,
  },
  optText: { color: '#fff' },
  row: { flexDirection: 'row', gap: 10 },
  primaryBtn: {
    backgroundColor: 'rgba(168,219,190,0.2)',
    padding: 15,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#a8dbbe',
  },
  primaryBtnText: { color: '#fff', fontWeight: 'bold' },
  trackBtn: {
    padding: 15,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
  },
  trackActive: { backgroundColor: 'rgba(168,219,190,0.3)' },
  trackText: { color: '#fff' },
  submitBtn: {
    backgroundColor: '#a8dbbe',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitText: { color: '#0c1511', fontWeight: 'bold' },
});
