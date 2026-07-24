import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

const LEVELS = [
  { id: 'g1', title: '山海的呼吸' },
  { id: 'g2', title: '橋上的人影' },
  { id: 'g3', title: '濕地故事館' },
  { id: 'g4', title: '蘭亭其序' },
  { id: 'g5', title: '西門町的\n暖心任務' },
  { id: 'g6', title: '爺爺的時鐘' },
];

const LEVELS_PER_PAGE = 6;

const pages = Array.from(
  { length: Math.ceil(LEVELS.length / LEVELS_PER_PAGE) },
  (_, i) =>
    LEVELS.slice(i * LEVELS_PER_PAGE, i * LEVELS_PER_PAGE + LEVELS_PER_PAGE)
);

export default function Levels() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <ImageBackground
      source={require('../assets/images/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>關卡選擇</Text>

        <FlatList
          data={pages}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => String(index)}
          onMomentumScrollEnd={(e) => {
            const page = Math.round(e.nativeEvent.contentOffset.x / width);
            setCurrentPage(page);
          }}
          renderItem={({ item: pageLevels }) => (
            <View style={styles.page}>
              {pageLevels.map((level) => (
                <TouchableOpacity
                  key={level.id}
                  style={styles.levelButton}
                  activeOpacity={0.8}
                  onPress={() => router.push(`/game/${level.id}`)}
                >
                  <Text
                    style={styles.levelText}
                    numberOfLines={2}
                    adjustsFontSizeToFit
                    minimumFontScale={0.75}
                  >
                    {level.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          style={styles.flatList}
        />

        <Text style={styles.pageCount}>
          {currentPage + 1}/{pages.length}
        </Text>

        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.8}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>返回</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  overlay: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 55,
    paddingBottom: 35,
    backgroundColor: 'rgba(2, 10, 18, 0.3)',
  },

  title: {
    color: '#ffffff',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 24,
    textShadowColor: 'rgba(0, 0, 0, 0.95)',
    textShadowOffset: {
      width: 2,
      height: 3,
    },
    textShadowRadius: 6,
  },

  flatList: {
    flexGrow: 0,
  },

  page: {
    width,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 15,
  },

  levelButton: {
    width: (width - 40 - 15) / 2,
    height: (width - 40 - 15) / 2,
    paddingHorizontal: 12,

    backgroundColor: 'rgba(18, 35, 48, 0.9)',
    borderWidth: 2,
    borderColor: '#d5ad63',
    borderRadius: 18,

    justifyContent: 'center',
    alignItems: 'center',

    elevation: 8,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.45,
    shadowRadius: 7,
  },

  levelText: {
    color: '#f6e3b4',
    fontSize: 22,
    fontWeight: 'bold',
    lineHeight: 31,
    textAlign: 'center',

    textShadowColor: 'rgba(0, 0, 0, 0.95)',
    textShadowOffset: {
      width: 1,
      height: 2,
    },
    textShadowRadius: 4,
  },

  pageCount: {
    marginTop: 15,
    marginBottom: 12,
    color: '#ffffff',
    fontSize: 17,
    fontWeight: 'bold',
  },

  backButton: {
    minWidth: 135,
    alignItems: 'center',
    backgroundColor: 'rgba(224, 217, 201, 0.94)',
    borderWidth: 1.5,
    borderColor: '#d5ad63',
    paddingHorizontal: 35,
    paddingVertical: 13,
    borderRadius: 14,
    elevation: 6,
  },

  backButtonText: {
    color: '#24211d',
    fontSize: 19,
    fontWeight: 'bold',
  },
});
