import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import { Mic } from 'lucide-react-native';
import Svg, { Path } from 'react-native-svg';
import { BotIcon } from 'assets/icons';
import MicIcon from 'assets/icons/MicIcon';

const { width } = Dimensions.get('window');

const BackgroundSvg = () => (
  <Svg width={width} height={176} viewBox="0 0 353 176" fill="none" style={{ transform: [{ translateX: -20 }] }}>
    <Path
      d="M0 20C0 8.95428 8.95431 0 20 0H333C344.046 0 353 8.95431 353 20V124.966H272.044C254.923 124.966 239.024 133.835 230.028 148.403V148.403C223.877 158.365 214.386 165.817 203.249 169.43L195.568 171.921C182.173 176.267 167.774 176.439 154.279 172.415L142.666 168.952C131.712 165.686 122.593 158.04 117.467 147.823V147.823C110.438 133.812 96.1037 124.966 80.4278 124.966H0V20Z"
      fill="#E9F8FF"
    />
  </Svg>
);

const ChatRoom = () => {
  const defaultQuestions = [
    "미래산업에 대한 준비는 어떻게 해야 할까요?",
    "이런 기술들이 우리 삶을 개선한다고 했는데, 구체적인 예시를 들 수 있나요?",
    "미래산업에서 일자리를 찾기 위한 준비 방법은 무엇인가요?"
  ];

  const [questions, setQuestions] = useState(defaultQuestions);

  const resetQuestions = () => {
    setQuestions(defaultQuestions);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>예상 질문</Text>
          <TouchableOpacity onPress={resetQuestions}>
            <Text style={styles.headerButton}>초기화</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.chatContent}>
          <View style={styles.botContainer}>
            <View style={styles.botIconWrapper}>
              <BotIcon color="#4A7DFF" size={10} />
              <Text style={styles.botName}>스피킷</Text>
            </View>
          </View>
          <View style={styles.chatBubble}>
            <View style={styles.backgroundContainer}>
              <BackgroundSvg />
            </View>
            <View style={styles.micContainer}>
              <View style={styles.micCircle}>
                <MicIcon size={72}/>
              </View>
            </View>
            <View style={styles.questionsContainer}>
              {questions.map((question, index) => (
                <View key={index} style={styles.questionBubble}>
                  <Text style={styles.questionText}>{question}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EDF3FF',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    flex: 1, 
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 21, 
    marginLeft: 30,
    letterSpacing: -0.32,
  },
  headerButton: {
    color: '#6A8EF0', 
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 21,
    letterSpacing: -0.32,
},
  chatContent: {
    flex: 1,
    paddingHorizontal: 19,
    backgroundColor: '#CCE9F6',
  },
  botContainer: {
    marginTop: 16,
    marginBottom: -15,
    width: 85,
    height: 45,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
    justifyContent: 'center',
  },
  botIconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginLeft: 4, 
    marginTop: -15,
  },
  botName: {
    fontSize: 14,
    color: '#000000',
    marginLeft: 8, 
  },
  chatBubble: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    marginHorizontal: 0, 
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  micContainer: {
    alignItems: 'center',
    marginVertical: 32,
  },
  micCircle: {
    width: 100,
    height: 100,
    borderRadius: 76,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  questionsContainer: {
    marginTop: 40,
    gap: 12,
  },
  questionBubble: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  questionText: {
    fontSize: 15,
    color: '#333333',
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default ChatRoom;