import { useRouter } from 'expo-router';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  PlayfairDisplay_700Bold,
  useFonts,
} from '@expo-google-fonts/playfair-display';

export default function Home() {
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ImageBackground
      source={require('../assets/images/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.centerContent}>
          <Text style={styles.title}>HUMATH</Text>

          <Text style={styles.subtitle}>Humanism × Math</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/levels')}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>前往遊戲選擇</Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.18)',
  },

  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateY: -20 }],
  },

  title: {
    color: '#ffffff',
    fontSize: 58,
    fontFamily: 'PlayfairDisplay_700Bold',
    letterSpacing: -1.5,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: {
      width: 2,
      height: 3,
    },
    textShadowRadius: 6,
  },

  subtitle: {
    color: '#ffffff',
    fontSize: 23,
    fontFamily: 'PlayfairDisplay_700Bold',
    marginTop: 12,
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: {
      width: 1,
      height: 2,
    },
    textShadowRadius: 4,
  },

  button: {
    backgroundColor: 'rgba(245, 245, 245, 0.95)',
    paddingHorizontal: 28,
    paddingVertical: 17,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.3)',
    elevation: 6,
  },

  buttonText: {
    color: '#202020',
    fontSize: 28,
    fontFamily: 'serif',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
