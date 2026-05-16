import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

// Add your level IDs here as you create new game files
const LEVELS = ['g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8', 'g9'];

const LEVELS_PER_PAGE = 6;
const pages = Array.from(
  { length: Math.ceil(LEVELS.length / LEVELS_PER_PAGE) },
  (_, i) => LEVELS.slice(i * LEVELS_PER_PAGE, i * LEVELS_PER_PAGE + LEVELS_PER_PAGE)
);

export default function Levels() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <View style={styles.container}>

      {/* Title */}
      <Text style={styles.title}>關卡</Text>

      {/* Level Grid */}
      <FlatList
        data={pages}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, i) => String(i)}
        onMomentumScrollEnd={(e) => {
          const page = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentPage(page);
        }}
        renderItem={({ item: pageLevels }) => (
          <View style={styles.page}>
            {pageLevels.map((id) => (
              <TouchableOpacity
                key={id}
                style={styles.levelButton}
                onPress={() => router.push(`/game/${id}`)}
              >
                <Text style={styles.levelText}>{id.replace('g', '')}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        style={styles.flatList}
      />

      {/* Page Count */}
      <Text style={styles.pageCount}>{currentPage + 1}/{pages.length}</Text>

      {/* Back Button */}
      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>返回</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  flatList: {
    flexGrow: 0,
  },
  page: {
    width: width,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    paddingHorizontal: 20,
    gap: 15,
  },
  levelButton: {
    width: (width - 40 - 15) / 2,
    height: (width - 40 - 15) / 2,
    backgroundColor: '#3498db',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  pageCount: {
    marginTop: 15,
    marginBottom: 10,
    fontSize: 16,
    color: '#888',
  },
  button: {
    backgroundColor: '#3498db',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});