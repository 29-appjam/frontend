import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Animated,
  Dimensions,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Pressable,
  Alert,
  ActivityIndicator,
  Keyboard
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '@/navigation/types';
import Button from '@/components/common/Button';
import { Ionicons } from '@expo/vector-icons';
import { UserIcon } from 'assets/icons';
import LockIcon from '../../../assets/icons/LockIcon';
import axios from 'axios';

const { height } = Dimensions.get('window');

type ModalType = 'login' | 'register' | null;

// API 인스턴스 생성
const api = axios.create({
  baseURL: 'https://port-0-soup-server-9zxht12blq9gr7pi.sel4.cloudtype.app',
});

const FirstView = () => {
  const navigation = useNavigation<NavigationProps>();
  const [modalType, setModalType] = useState<ModalType>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isBirthdayInput, setIsBirthdayInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // 폼 상태 관리
  const [loginForm, setLoginForm] = useState({
    userId: '',
    password: '',
  });
  
  const [registerForm, setRegisterForm] = useState({
    userId: '',
    password: '',
    confirmPassword: '',
    birthYear: '',
    birthMonth: '',
    birthDay: '',
  });
  
  const slideAnim = useRef(new Animated.Value(height)).current;

  const showModal = (type: ModalType) => {
    setModalType(type);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const hideModal = () => {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setModalType(null);
      setIsBirthdayInput(false);
      setLoginForm({ userId: '', password: '' });
      setRegisterForm({
        userId: '',
        password: '',
        confirmPassword: '',
        birthYear: '',
        birthMonth: '',
        birthDay: '',
      });
    });
  };

  const togglePasswordVisibility = (field: 'password' | 'confirmPassword') => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  // 에러 메시지 표시 함수
  const showError = (message: string) => {
    Alert.alert('오류', message);
  };

  // 로그인 처리 함수
  const handleLogin = async () => {
    if (!loginForm.userId || !loginForm.password) {
      showError('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post('/login', {
        userId: loginForm.userId,
        password: loginForm.password,
      });
      
      if (response.status === 200) {
        navigation.navigate('MainTabs');
        hideModal();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showError('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
      } else {
        showError('알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 회원가입 처리 함수
  const handleRegister = async () => {
    if (!isBirthdayInput) {
      if (!registerForm.userId || !registerForm.password || !registerForm.confirmPassword) {
        showError('모든 필드를 입력해주세요.');
        return;
      }
      
      if (registerForm.password !== registerForm.confirmPassword) {
        showError('비밀번호가 일치하지 않습니다.');
        return;
      }
      
      setIsBirthdayInput(true);
      return;
    }

    const { birthYear, birthMonth, birthDay } = registerForm;
    if (!birthYear || !birthMonth || !birthDay) {
      showError('생년월일을 모두 입력해주세요.');
      return;
    }

    // 생년월일 유효성 검사
    const year = parseInt(birthYear);
    const month = parseInt(birthMonth);
    const day = parseInt(birthDay);

    if (year < 1900 || year > new Date().getFullYear()) {
      showError('올바른 연도를 입력해주세요.');
      return;
    }

    if (month < 1 || month > 12) {
      showError('올바른 월을 입력해주세요.');
      return;
    }

    if (day < 1 || day > 31) {
      showError('올바른 일을 입력해주세요.');
      return;
    }

    const birthDate = parseInt(`${birthYear}${birthMonth.padStart(2, '0')}${birthDay.padStart(2, '0')}`);

    setIsLoading(true);
    try {
      const response = await api.post('/signup', {
        userId: registerForm.userId,
        password: registerForm.password,
        birth: birthDate,
      });
      
      if (response.status === 200) {
        Alert.alert('성공', '회원가입이 완료되었습니다.', [
          {
            text: '확인',
            onPress: () => {
              hideModal();
              setModalType('login');
            },
          },
        ]);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showError('회원가입에 실패했습니다. 다시 시도해주세요.');
      } else {
        showError('알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const renderBirthdayInput = () => {
    return (
      <View style={{ marginTop: 40 }}>
        <Text style={styles.inputLabel}>생년월일</Text>
        <View style={styles.birthdayContainer}>
          <TextInput
            style={styles.birthdayInput}
            placeholder="YYYY"
            placeholderTextColor="#999"
            keyboardType="numeric"
            maxLength={4}
            value={registerForm.birthYear}
            onChangeText={(text) => 
              setRegisterForm(prev => ({ ...prev, birthYear: text }))
            }
          />
          <TextInput
            style={styles.birthdayInput}
            placeholder="MM"
            placeholderTextColor="#999"
            keyboardType="numeric"
            maxLength={2}
            value={registerForm.birthMonth}
            onChangeText={(text) =>
              setRegisterForm(prev => ({ ...prev, birthMonth: text }))
            }
          />
          <TextInput
            style={styles.birthdayInput}
            placeholder="DD"
            placeholderTextColor="#999"
            keyboardType="numeric"
            maxLength={2}
            value={registerForm.birthDay}
            onChangeText={(text) =>
              setRegisterForm(prev => ({ ...prev, birthDay: text }))
            }
          />
        </View>
      </View>
    );
  };

  const renderModalContent = () => {
    if (modalType === 'login') {
      return (
        <View style={styles.modalContent}>
          <View style={styles.modalInputContainer}>
            <View style={[styles.inputContainer, { marginTop: 40 }]}>
              <Text style={styles.inputLabel}>아이디</Text>
              <View style={styles.inputWrapper}>
                <UserIcon size={20} color="#A7A7A7" />
                <TextInput
                  style={styles.input}
                  placeholder="아이디를 입력해주세요"
                  placeholderTextColor="#999"
                  value={loginForm.userId}
                  onChangeText={(text) => setLoginForm(prev => ({ ...prev, userId: text }))}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>비밀번호</Text>
              <View style={styles.inputWrapper}>
                <LockIcon size={20} color="#A7A7A7" />
                <TextInput
                  style={styles.input}
                  placeholder="비밀번호를 입력해주세요"
                  placeholderTextColor="#999"
                  secureTextEntry={!showPassword}
                  value={loginForm.password}
                  onChangeText={(text) => setLoginForm(prev => ({ ...prev, password: text }))}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => togglePasswordVisibility('password')}
                >
                  <Ionicons
                    name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                    size={20}
                    color="#999"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.modalFooter}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#6A8EF0" />
            ) : (
              <Button title="로그인" variant="primary" onPress={handleLogin} />
            )}
          </View>
        </View>
      );
    } else if (modalType === 'register') {
      return (
        <View style={styles.modalContent}>
          <View style={styles.modalInputContainer}>
            {!isBirthdayInput ? (
              <>
                <View style={[styles.inputContainer, { marginTop: 40 }]}>
                  <Text style={styles.inputLabel}>아이디</Text>
                  <View style={styles.inputWrapper}>
                    <UserIcon size={20} color="#A7A7A7" />
                    <TextInput
                      style={styles.input}
                      placeholder="아이디를 입력해주세요"
                      placeholderTextColor="#999"
                      value={registerForm.userId}
                      onChangeText={(text) =>
                        setRegisterForm(prev => ({ ...prev, userId: text }))
                      }
                    />
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>비밀번호</Text>
                  <View style={styles.inputWrapper}>
                    <LockIcon size={20} color="#A7A7A7" />
                    <TextInput
                      style={styles.input}
                      placeholder="비밀번호를 입력해주세요"
                      placeholderTextColor="#999"
                      secureTextEntry={!showPassword}
                      value={registerForm.password}
                      onChangeText={(text) =>
                        setRegisterForm(prev => ({ ...prev, password: text }))
                      }
                    />
                    <TouchableOpacity
                      style={styles.eyeIcon}
                      onPress={() => togglePasswordVisibility('password')}
                    >
                      <Ionicons
                        name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                        size={20}
                        color="#999"
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>비밀번호 확인</Text>
                  <View style={styles.inputWrapper}>
                    <LockIcon size={20} color="#A7A7A7" />
                    <TextInput
                      style={styles.input}
                      placeholder="비밀번호를 다시 입력해주세요"
                      placeholderTextColor="#999"
                      secureTextEntry={!showConfirmPassword}
                      value={registerForm.confirmPassword}
                      onChangeText={(text) =>
                        setRegisterForm(prev => ({ ...prev, confirmPassword: text }))
                      }
                    />
                    <TouchableOpacity
                      style={styles.eyeIcon}
                      onPress={() => togglePasswordVisibility('confirmPassword')}
                    >
                      <Ionicons
                        name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                        size={20}
                        color="#999"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            ) : (
              renderBirthdayInput()
            )}
          </View>

          <View style={styles.modalFooter}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#6A8EF0" />
            ) : (
              <Button
                title={!isBirthdayInput ? '다음으로' : '회원가입'}
                variant="primary"
                onPress={handleRegister}
              />
            )}
          </View>
        </View>
      );
    }
    return null;
  };

  return (
    <Pressable style={styles.pressable} onPress={modalType ? hideModal : undefined}>
      <LinearGradient
        colors={['#6A8EF0', '#FFFFFF']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        locations={[0, 0.7]}
      >
        <SafeAreaView style={styles.safeArea}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <Text style={styles.subtitle}>발표를 압도적으로 편안하게</Text>
              <Text style={styles.title}>스피킷</Text>
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.imageWrapper}>
                <Image
                  source={require('@/assets/images/megaphone.png')}
                  style={styles.megaphoneImage}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.buttonContainer}>
                <Button title="로그인" variant="primary" 
                onPress={() => showModal('login')} 
              />
                <View style={styles.buttonSpacer} />
                <Button
                  title="회원가입"
                  variant="secondary"
                  onPress={() => showModal('register')}
                />
              </View>
            </View>

            {modalType && (
              <Animated.View
                style={[
                  styles.modalContainer,
                  {
                    transform: [{ translateY: slideAnim }],
                  },
                ]}
              >
                <TouchableWithoutFeedback>
                  {renderModalContent()}
                </TouchableWithoutFeedback>
              </Animated.View>
            )}
          </View>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    flex: 1,
  },
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
    marginTop: 60,
    marginBottom: 40,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '700',
    marginTop: 8,
  },
  imageWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  megaphoneImage: {
    width: '100%',
    height: '80%',
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 48,
  },
  buttonSpacer: {
    height: 16,
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: 393,
    height: 620,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 42,
    borderTopRightRadius: 42,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    elevation: 4,
  },
  modalContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  modalInputContainer: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    color: '#A7A7A7',
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EDEDED',
    backgroundColor: '#FFF',
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
  },
  eyeIcon: {
    padding: 8,
  },
  modalFooter: {
    marginBottom: 34,
  },
  birthdayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6,
  },
  birthdayInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EDEDED',
    backgroundColor: '#FFF',
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
});

export default FirstView;