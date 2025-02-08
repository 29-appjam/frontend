import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import axios from 'axios';

interface Message {
  id: number;
  text: string;
}

const RelieveScreen = () => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (text: string) => {
    if (text.length <= 100) {
      setUserInput(text);
    }
  };

  const handleDiagnosis = async () => {
    if (userInput.trim().length === 0) {
      Alert.alert('알림', '텍스트를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    Keyboard.dismiss();

    try {
      const response = await axios.post(
        'http://172.16.1.110:8080/chat',
        {
          message: userInput,
        }
      );

      const botMessage: Message = {
        id: Date.now(),
        text: response.data,
      };
      
      setMessages([...messages, botMessage]);
      setUserInput('');
    } catch (error) {
      Alert.alert('오류', '서버 통신 중 오류가 발생했습니다.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <SafeAreaView style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>긴장감 완화</Text>
            <Text style={styles.wordCount}>{userInput.length}/100자</Text>
          </View>

          {/* Input Area */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={userInput}
              onChangeText={handleInputChange}
              placeholder="메시지를 입력하세요"
              multiline
              maxLength={100}
            />
          </View>

          {/* Messages */}
          <View style={styles.messageContainer}>
            {messages.map((msg) => (
              <View
                key={msg.id}
                style={styles.messageBubble}
              >
                <Text style={styles.messageText}>
                  {msg.text}
                </Text>
              </View>
            ))}
          </View>

          {/* Bottom Button */}
          <TouchableOpacity 
            style={[styles.diagnosisButton, isLoading && styles.disabledButton]}
            onPress={handleDiagnosis}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.diagnosisButtonText}>진단 받기</Text>
            )}
          </TouchableOpacity>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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
  inputContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  input: {
    height: 100,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 12,
    padding: 12,
    textAlignVertical: 'top',
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
    alignSelf: 'flex-start',
    backgroundColor: '#F8F8F8',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
    color: 'black',
  },
  diagnosisButton: {
    backgroundColor: '#6B89F5',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.7,
  },
  diagnosisButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default RelieveScreen;