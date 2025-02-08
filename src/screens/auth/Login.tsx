import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '@/navigation/types';
import Button from '@/components/common/Button';

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <LinearGradient
      colors={['#6A8EF0', '#FFFFFF']}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      locations={[0, 0.7]}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.subtitle}>발표를 압도적으로 편안하게</Text>
            <Text style={styles.title}>스피킷</Text>
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={require('@/assets/images/megaphone.png')}
                style={styles.backgroundImage}
                resizeMode="contain"
              />
              <Image
                source={require('@/assets/images/28788633_02june22_megaphone_icon_02 2.png')}
                style={styles.overlayImage}
                resizeMode="contain"
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="로그인"
                variant="primary"
                onPress={() => navigation.navigate('Login')}
              />
              <View style={styles.buttonSpacer} />
              <Button
                title="회원가입"
                variant="secondary"
                onPress={() => navigation.navigate('Register')}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  headerContainer: {
    position: 'absolute',
    top: 60,
    left: 24,
    zIndex: 1,
  },
  contentContainer: {
    flex: 1,
    marginTop: 180,
    justifyContent: 'space-between',
  },
  subtitle: {
    color: '#FFFFFF',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 21,
    letterSpacing: -0.32,
    paddingLeft: 10,
  },
  title: {
    color: '#FFFFFF',
    fontFamily: 'Pretendard',
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: -0.32,
    marginTop: 8,
    paddingLeft: 10,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'flex-start',
    marginTop: 40,
    position: 'relative',
    width: '100%',
  },
  overlayImage: {
    width: '90%',
    height: '90%',
    position: 'absolute',
    zIndex: 1,
    top: '-30%',
    left: -50, 
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    opacity: 1,
    position: 'absolute',
    zIndex: 2,
    left: 0, 
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 48,
  },
  buttonSpacer: {
    height: 16,
  },
});

export default LoginScreen;