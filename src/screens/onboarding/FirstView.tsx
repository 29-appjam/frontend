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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '@/navigation/types';
import Button from '@/components/common/Button';
import { Ionicons } from '@expo/vector-icons';
import { UserIcon } from '@/components/icons';
import LockIcon from '@/components/icons/LockIcon';

const { height } = Dimensions.get('window');

type ModalType = 'login' | 'register' | null;

const FirstView = () => {
  const navigation = useNavigation<NavigationProps>();
  const [modalType, setModalType] = useState<ModalType>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isBirthdayInput, setIsBirthdayInput] = useState(false);
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
    }).start(() => setModalType(null));
  };

  const togglePasswordVisibility = (field: 'password' | 'confirmPassword') => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const renderBirthdayInput = () => {
    return (
      <View style={{ marginTop: 40 }}>
        <Text style={styles.inputLabel}>생년월일</Text>
        <View style={styles.birthdayContainer}>
          <View style={styles.birthdayInput}>
            <TextInput
              style={styles.birthdayText}
              placeholder="YYYY"
              placeholderTextColor="#A7A7A7"
              keyboardType="numeric"
              maxLength={4}
            />
            <Ionicons name="chevron-down" size={16} color="#A7A7A7" />
          </View>
          <View style={styles.birthdayInput}>
            <TextInput
              style={styles.birthdayText}
              placeholder="MM"
              placeholderTextColor="#A7A7A7"
              keyboardType="numeric"
              maxLength={2}
            />
            <Ionicons name="chevron-down" size={16} color="#A7A7A7" />
          </View>
          <View style={styles.birthdayInput}>
            <TextInput
              style={styles.birthdayText}
              placeholder="DD"
              placeholderTextColor="#A7A7A7"
              keyboardType="numeric"
              maxLength={2}
            />
            <Ionicons name="chevron-down" size={16} color="#A7A7A7" />
          </View>
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
            <Button title="로그인" variant="primary" onPress={() => {}} />
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
            <Button
              title={!isBirthdayInput ? '다음으로' : '완료'}
              variant="primary"
              onPress={() => {
                if (!isBirthdayInput) {
                  setIsBirthdayInput(true);
                } else {
                  // 완료 버튼 로직 추가
                }
              }}
            />
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
                <Button title="로그인" variant="primary" onPress={() => showModal('login')} />
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
                <TouchableWithoutFeedback>{renderModalContent()}</TouchableWithoutFeedback>
              </Animated.View>
            )}
          </View>
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
  },
  birthdayText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    textAlign: 'left',
  },
});

export default FirstView;
