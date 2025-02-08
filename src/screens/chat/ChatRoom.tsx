import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { Mic } from 'lucide-react-native';

const ChatRoom = () => {
  const questions = [
    "미래산업에 대한 준비는 어떻게 해야 할까요?",
    "이런 기술들이 우리 삶을 개선한다고 했는데, 구체적인 예시를 들 수 있나요?",
    "미래산업에서 일자리를 찾기 위한 준비 방법은 무엇인가요?"
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>예상 질문</Text>
          <Text style={styles.headerButton}>초기화</Text>
        </View>

        {/* Chat content */}
        <View style={styles.chatContent}>
          {/* Bot icon and name */}
          <View style={styles.botContainer}>
            <View style={styles.botIcon}>
              <Text>🤖</Text>
            </View>
            <Text style={styles.botName}>스피킷</Text>
          </View>

          {/* Microphone circle */}
          <View style={styles.micContainer}>
            <View style={styles.micCircle}>
              <Mic size={24} color="#4A7DFF" />
            </View>
          </View>

          {/* Questions */}
          <View style={styles.questionsContainer}>
            {questions.map((question, index) => (
              <View key={index} style={styles.questionBubble}>
                <Text style={styles.questionText}>{question}</Text>
              </View>
            ))}
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
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  headerButton: {
    color: '#4A7DFF',
  },
  chatContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  botContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  botIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  botName: {
    fontSize: 16,
  },
  micContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },
  micCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionsContainer: {
    gap: 12,
  },
  questionBubble: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  questionText: {
    fontSize: 15,
    color: '#333',
    textAlign: 'center',
  },
});

export default ChatRoom;