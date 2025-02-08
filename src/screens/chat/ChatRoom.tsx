import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { Bot } from 'lucide-react-native';
import Svg, { Path } from 'react-native-svg';
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
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState(null);

  useEffect(() => {
    return () => {
      if (recording) {
        recording.stopAndUnloadAsync();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      console.log('Requesting permissions..');
      const { granted } = await Audio.requestPermissionsAsync();
      
      if (!granted) {
        Alert.alert('권한 오류', '마이크 권한이 필요합니다.');
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        playThroughEarpieceAndroid: true,
        staysActiveInBackground: true,
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync({
        android: {
          extension: '.wav',
          outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_DEFAULT,
          audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_DEFAULT,
          sampleRate: 44100,
          numberOfChannels: 1,
          bitRate: 128000,
        },
        ios: {
          extension: '.wav',
          audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
          sampleRate: 44100,
          numberOfChannels: 1,
          bitRate: 128000,
          linearPCMBitDepth: 16,
          linearPCMIsBigEndian: false,
          linearPCMIsFloat: false,
        },
      });

      setRecording(recording);
      setIsRecording(true);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
      Alert.alert('녹음 오류', '녹음을 시작할 수 없습니다.');
    }
  };

  const stopRecording = async () => {
    try {
      if (!recording) {
        return;
      }

      console.log('Stopping recording..');
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      console.log('Recording stopped and stored at', uri);
      
      setRecording(null);
      setIsRecording(false);

      // 오디오 파일을 base64로 변환
      const base64Audio = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Google Cloud Speech-to-Text API 호출
      try {
        const response = await fetch('YOUR_GOOGLE_CLOUD_FUNCTION_URL', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            audio: {
              content: base64Audio
            },
            config: {
              encoding: 'LINEAR16',
              sampleRateHertz: 44100,
              languageCode: 'ko-KR',
              model: 'default',
              audioChannelCount: 1,
            }
          }),
        });

        const result = await response.json();
        
        if (result.transcript) {
          setQuestions(prev => [...prev, result.transcript]);
        } else {
          Alert.alert('인식 오류', '음성을 텍스트로 변환하지 못했습니다. 다시 시도해주세요.');
        }
      } catch (speechError) {
        console.error('Speech recognition failed:', speechError);
        Alert.alert('변환 오류', '음성 인식에 실패했습니다. 다시 시도해주세요.');
      }

      // 임시 파일 삭제
      try {
        await FileSystem.deleteAsync(uri);
      } catch (deleteError) {
        console.error('Failed to delete temporary file:', deleteError);
      }

    } catch (err) {
      console.error('Failed to stop recording', err);
      Alert.alert('오류', '음성 처리 중 오류가 발생했습니다.');
    }
  };

  const resetQuestions = () => {
    setQuestions(defaultQuestions);
  };

  const handleMicPress = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
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
              <Bot size={20} color="#6A8EF0" />
              <Text style={styles.botName}>스피킷</Text>
            </View>
          </View>
          <View style={styles.chatBubble}>
            <View style={styles.backgroundContainer}>
              <BackgroundSvg />
            </View>
            <TouchableOpacity 
              style={[styles.micContainer, isRecording && styles.micContainerRecording]}
              onPress={handleMicPress}
            >
              <View style={[styles.micCircle, isRecording && styles.micCircleRecording]}>
                <MicIcon size={72} color={isRecording ? "#FF4A4A" : "#000000"}/>
              </View>
            </TouchableOpacity>
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
    marginTop: -15,
  },
  botName: {
    fontSize: 14,
    color: '#000000',
    marginLeft: 4, 
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
  micContainerRecording: {
    opacity: 0.8,
  },
  micCircle: {
    width: 100,
    height: 100,
    borderRadius: 76,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  micCircleRecording: {
    backgroundColor: '#FFE5E5',
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