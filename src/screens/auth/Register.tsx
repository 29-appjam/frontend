import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Button from '@components/common/Button';
import Input from '@components/common/Input';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const RegisterScreen = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity 
      style={styles.overlay} 
      activeOpacity={1}
      onPress={() => navigation.goBack()}
    >
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>회원가입</Text>
          <Text style={styles.subtitle}>d</Text>
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  contentContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: height * 0.05,
    height: height * 0.85,
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

export default RegisterScreen;