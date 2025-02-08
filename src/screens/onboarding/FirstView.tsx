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
  Pressable
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '@/navigation/types';
import Button from '@/components/common/Button';
import { Ionicons } from '@expo/vector-icons';
import { UserIcon } from '@/components/icons';
import LockIcon from '@/components/icons/LockIcon';

const { height } = Dimensions.get('window');

const FirstView = () => {
  const navigation = useNavigation<NavigationProps>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const slideAnim = useRef(new Animated.Value(height)).current;

  const showModal = () => {
    setIsModalVisible(true);
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
    }).start(() => setIsModalVisible(false));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Pressable style={styles.pressable} onPress={isModalVisible ? hideModal : undefined}>
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
              {isModalVisible ? (
                <>
                  <Text style={styles.subtitle}>로그인</Text>
                  <Text style={styles.title}>스피킷</Text>
                </>
              ) : (
                <>
                  <Text style={styles.subtitle}>발표를 압도적으로 편안하게</Text>
                  <Text style={styles.title}>스피킷</Text>
                </>
              )}
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
                <Button
                  title="로그인"
                  variant="primary"
                  onPress={showModal}
                />
                <View style={styles.buttonSpacer} />
                <Button
                  title="회원가입"
                  variant="secondary"
                  onPress={() => navigation.navigate('Register')}
                />
              </View>
            </View>

            {isModalVisible && (
              <Animated.View 
                style={[
                  styles.modalContainer,
                  {
                    transform: [{ translateY: slideAnim }]
                  }
                ]}
              >
                <TouchableWithoutFeedback>
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
                            onPress={togglePasswordVisibility}
                          >
                            <Ionicons 
                              name={showPassword ? "eye-outline" : "eye-off-outline"} 
                              size={20} 
                              color="#999" 
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>

                    <View style={styles.modalFooter}>
                      <Button
                        title="로그인"
                        variant="primary"
                        onPress={() => {}}
                      />
                    </View>
                  </View>
                </TouchableWithoutFeedback>
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
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 21,
    letterSpacing: -0.32,
  },
  title: {
    color: '#FFFFFF',
    fontFamily: 'Pretendard',
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: -0.32,
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
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 42,
    borderTopRightRadius: 42,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 4,
  },
  modalContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',  // Changed to space-between
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
    color: '#333',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    marginLeft: 12,
  },
  eyeIcon: {
    padding: 8,
  },
  modalFooter: {
    marginBottom: 34,
  },
});

export default FirstView;