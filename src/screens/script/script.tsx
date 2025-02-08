import React, { useState, useRef, useCallback } from 'react';
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
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProps } from '@/navigation/types';
import { Bot, Send } from 'lucide-react-native';

interface ChatMessage {
  id: number;
  text: string;
  isUser: boolean;
}

interface ScriptHistory {
  script: string;
  request: string;
}

const API_URL = 'https://port-0-soup-server-9zxht12blq9gr7pi.sel4.cloudtype.app';

const ScriptScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text: '안녕하세요! 스피킷입니다.\n사용자님의 대본을 요구사항에 맞춰서 수정해드릴게요',
      isUser: false,
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scriptHistoryRef = useRef<ScriptHistory>({ script: '', request: '' });
  const scrollViewRef = useRef<ScrollView>(null);
  const inputRef = useRef<TextInput>(null);
  const messageIdCounter = useRef(2);

  const actionButtons: string[] = [
    '유치원생들을 예상 청중으로 해석',
    '3분 분량으로 대본을 수정해줘',
    '문법에 맞게 정정하고 운영용 자연스럽게 바꿔줘',
  ];

  const handleActionButtonPress = (text: string) => {
    setMessage(text);
    inputRef.current?.focus();
  };

  const handleReset = () => {
    setMessages([
      {
        id: 1,
        text: '안녕하세요! 스피킷입니다.\n사용자님의 대본을 요구사항에 맞춰서 수정해드릴게요',
        isUser: false,
      }
    ]);
    messageIdCounter.current = 2;
    scriptHistoryRef.current = { script: '', request: '' };
  };

  const updateScriptHistory = (messageText: string) => {
    // 대본이 처음 입력되는 경우
    if (!scriptHistoryRef.current.script && messageText.length > 20) {
      scriptHistoryRef.current.script = messageText;
    }
    // 요청사항이 입력되는 경우
    else if (scriptHistoryRef.current.script && actionButtons.includes(messageText)) {
      scriptHistoryRef.current.request = messageText;
    }
  };

  const constructServerMessage = () => {
    const { script, request } = scriptHistoryRef.current;
    if (!script) return '';
    
    return `대본: ${script}${request ? `, 요청: ${request}` : ''}`;
  };

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    setIsLoading(true);
    const currentMessageId = messageIdCounter.current;
    messageIdCounter.current += 1;

    // Add user message to the chat
    const userMessage: ChatMessage = {
      id: currentMessageId,
      text: messageText,
      isUser: true,
    };
    setMessages(prev => [...prev, userMessage]);
    setMessage(''); // Clear input

    // Update script history before sending to server
    updateScriptHistory(messageText);

    try {
      const serverMessage = constructServerMessage();
      if (!serverMessage) {
        throw new Error('대본이 아직 입력되지 않았습니다.');
      }

      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: serverMessage,
        }),
      });

      if (response.ok) {
        const data = await response.text();
        const botMessage: ChatMessage = {
          id: messageIdCounter.current,
          text: data,
          isUser: false,
        };
        messageIdCounter.current += 1;
        setMessages(prev => [...prev, botMessage]);
      } else {
        Alert.alert('오류', '메시지 전송에 실패했습니다.');
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('오류', error.message);
      } else {
        Alert.alert('오류', '서버와의 통신 중 문제가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
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
          <TouchableOpacity onPress={handleReset}>
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
            editable={!isLoading}
          />
          <TouchableOpacity 
            style={styles.sendButton}
            onPress={() => sendMessage(message)}
            disabled={isLoading}
          >
            <Send size={24} color={isLoading ? '#CCCCCC' : '#6A8EF0'} />
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

export default ScriptScreen;