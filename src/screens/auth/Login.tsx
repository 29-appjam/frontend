import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

const { width } = Dimensions.get('window');

const LoginScreen = () => {
  return (
    <LinearGradient
      colors={['#6A8EF0', '#FFFFFF']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 0.5 }}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>회원가입</Text>
            <Text style={styles.subtitle}>스피킷</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>아이디</Text>
              <Input 
                placeholder="아이디를 입력해주세요"
                leftIcon="user"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>비밀번호</Text>
              <Input 
                placeholder="비밀번호를 입력해주세요"
                leftIcon="lock"
                secureTextEntry
                rightIcon="eye"
              />
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.agreement}>
              계정을 생성함으로써,{'\n'}
              이용약관과 개인정보처리방침에 동의하였습니다.
            </Text>
            <Button
              title="다음으로"
              variant="primary"
              style={styles.button}
            />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: '30%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 40,
    paddingHorizontal: 24,
  },
  headerContainer: {
    marginBottom: 40,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: '#6A8EF0',
    fontFamily: 'Pretendard',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6A8EF0',
    marginTop: 8,
    fontFamily: 'Pretendard',
  },
  formContainer: {
    marginTop: 20,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
    fontFamily: 'Pretendard',
  },
  footer: {
    position: 'absolute',
    bottom: 48,
    width: width - 48,
    alignSelf: 'center',
  },
  agreement: {
    textAlign: 'center',
    fontSize: 12,
    color: '#666666',
    marginBottom: 16,
    lineHeight: 18,
    fontFamily: 'Pretendard',
  },
  button: {
    width: '100%',
  },
});

export default LoginScreen;