import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProps } from '@/navigation/types';
import { Bot, Send } from 'lucide-react-native';

interface ChatMessage {
  id: number;
  text: string;
  isUser: boolean;
}

const ScriptScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const [message, setMessage] = useState<string>('');
  const scrollViewRef = useRef<ScrollView>(null);
  const inputRef = useRef<TextInput>(null);
  
  const messages: ChatMessage[] = [
    {
      id: 1,
      text: '안녕하세요! 스피킷입니다.\n사용자님의 대본을 요구사항에 맞춰서 수정해드릴게요',
      isUser: false,
    },
    {
      id: 2,
      text: '미레신언은 인공지능, 로봇, 지속 가능한 에너지 등 혁신적 기술로 변화하고 있습니다. 이러한 기술들은 새로운 일자리 창출과 효율적인 자원 관리를 가능하게 하여, 우리 삶의 질을 향상시킬 것입니다.',
      isUser: true,
    },
    {
      id: 3,
      text: '대본이 입력 되었습니다!',
      isUser: false,
    },
  ];

  const actionButtons: string[] = [
    '유치원생들을 예상 청중으로 해석',
    '3분 분량으로 대본을 수정해줘',
    '문법에 맞게 정정하고 운영용 자연스럽게 바꿔줘',
  ];

  const handleActionButtonPress = (text: string) => {
    setMessage(text);
    inputRef.current?.focus();
  };

  const renderMessage = (msg: ChatMessage) => (
    <View
      key={msg.id}
      style={[
        styles.messageBubble,
        msg.isUser ? styles.userBubble : styles.botBubble,
      ]}
    >
      {!msg.isUser && (
        <View style={styles.avatar}>
          <Bot size={20} color="#6A8EF0" />
        </View>
      )}
      <View style={[
        styles.messageContent,
        msg.isUser ? styles.userMessageContent : styles.botMessageContent
      ]}>
        <Text style={[
          styles.messageText,
          msg.isUser ? styles.userMessageText : styles.botMessageText
        ]}>
          {msg.text}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>스피킷</Text>
          <TouchableOpacity>
            <Text style={styles.headerRight}>초기화</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView 
          style={styles.messageContainer}
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map(renderMessage)}
          
          <View style={styles.actionButtonsContainer}>
            {actionButtons.map((text, index) => (
              <TouchableOpacity
                key={index}
                style={styles.actionButton}
                onPress={() => handleActionButtonPress(text)}
              >
                <Text style={styles.actionButtonText}>{text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            ref={inputRef}
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="스피킷에게 메세지 보내기"
            placeholderTextColor="#8E8E8E"
            multiline
          />
          <TouchableOpacity style={styles.sendButton}>
            <Send size={24} color="#6A8EF0" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  headerRight: {
    fontSize: 16,
    color: '#6A8EF0',
  },
  messageContainer: {
    flex: 1,
    padding: 16,
  },
  messageBubble: {
    flexDirection: 'row',
    marginBottom: 16,
    maxWidth: '80%',
  },
  userBubble: {
    alignSelf: 'flex-end',
  },
  botBubble: {
    alignSelf: 'flex-start',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  messageContent: {
    padding: 12,
    borderRadius: 20,
  },
  userMessageContent: {
    backgroundColor: '#6A8EF0',
  },
  botMessageContent: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E5E5E5',
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
  actionButtonsContainer: {
    marginVertical: 16,
  },
  actionButton: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 20,
    marginBottom: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  actionButtonText: {
    color: '#6A8EF0',
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    padding: Platform.select({ ios: 12, android: 8 }),
    marginRight: 8,
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default ScriptScreen