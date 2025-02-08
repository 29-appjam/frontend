import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
}

const RelieveScreen = () => {
  const messages: Message[] = [
    {
      id: 1,
      text: '목도 바쁘 마르고, 목소리까지 떨릴 것 같아. 숨도 좀 가빠지고, 머릿속이 하얘지는 것이야.',
      isUser: false,
    },
    {
      id: 2,
      text: '괜찮아, 긴장하면 원래 그래. 특히 마르는 건 좋이 될 텐데서 그런 거고, 목소리가 떨리는 것도 성대가 긴장해서 그래. 숨이 가빠지는 건 천천히 숨 쉬면 나아질 거야. 머릿속이 하얘지는 것도 차근스러운 반응이니까, 천개 숨 쉬고 조금만 여유를 가져봐.',
      isUser: true,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>긴장감 완화</Text>
        <Text style={styles.wordCount}>52/100자</Text>
      </View>

      {/* Messages */}
      <View style={styles.messageContainer}>
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageBubble,
              msg.isUser ? styles.userBubble : styles.botBubble,
            ]}
          >
            <Text style={[
              styles.messageText,
              msg.isUser ? styles.userMessageText : styles.botMessageText,
            ]}>
              {msg.text}
            </Text>
          </View>
        ))}
      </View>

      {/* Bottom Button */}
      <TouchableOpacity style={styles.diagnosisButton}>
        <Text style={styles.diagnosisButtonText}>진단 받기</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  wordCount: {
    fontSize: 14,
    color: '#8E8E8E',
  },
  messageContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  messageBubble: {
    maxWidth: '85%',
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#6B89F5',
  },
  botBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#F8F8F8',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userMessageText: {
    color: 'white',
  },
  botMessageText: {
    color: 'black',
  },
  diagnosisButton: {
    backgroundColor: '#6B89F5',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  diagnosisButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default RelieveScreen;