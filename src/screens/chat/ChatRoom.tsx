import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, TouchableOpacity, Alert, Animated, Platform } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { Bot, Play, Pause, X } from 'lucide-react-native';
import Svg, { Path } from 'react-native-svg';
import MicIcon from 'assets/icons/MicIcon';
import axios from 'axios';

const { width } = Dimensions.get('window');

const BackgroundSvg = () => (
  <Svg width={width} height={176} viewBox="0 0 353 176" fill="none" style={{ transform: [{ translateX: -20 }] }}>
    <Path
      d="M0 20C0 8.95428 8.95431 0 20 0H333C344.046 0 353 8.95431 353 20V124.966H272.044C254.923 124.966 239.024 133.835 230.028 148.403V148.403C223.877 158.365 214.386 165.817 203.249 169.43L195.568 171.921C182.173 176.267 167.774 176.439 154.279 172.415L142.666 168.952C131.712 165.686 122.593 158.04 117.467 147.823V147.823C110.438 133.812 96.1037 124.966 80.4278 124.966H0V20Z"
      fill="#E9F8FF"
    />
  </Svg>
);

const RippleEffect = ({ isRecording }) => {
  const rippleScale1 = useRef(new Animated.Value(1)).current;
  const rippleOpacity1 = useRef(new Animated.Value(1)).current;
  const rippleScale2 = useRef(new Animated.Value(1)).current;
  const rippleOpacity2 = useRef(new Animated.Value(1)).current;

  const startAnimation = () => {
    const anim1 = Animated.parallel([
      Animated.timing(rippleScale1, {
        toValue: 2,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(rippleOpacity1, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]);

    const anim2 = Animated.parallel([
      Animated.timing(rippleScale2, {
        toValue: 2,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(rippleOpacity2, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]);

    const sequence = Animated.stagger(1000, [anim1, anim2]);

    sequence.start(() => {
      rippleScale1.setValue(1);
      rippleOpacity1.setValue(1);
      rippleScale2.setValue(1);
      rippleOpacity2.setValue(1);
      startAnimation();
    });
  };

  useEffect(() => {
    startAnimation();
    return () => {
      rippleScale1.setValue(1);
      rippleOpacity1.setValue(1);
      rippleScale2.setValue(1);
      rippleOpacity2.setValue(1);
    };
  }, []);

  return (
    <View style={[styles.rippleContainer, { opacity: isRecording ? 1 : 0.3 }]}>
      <Animated.View
        style={[
          styles.ripple,
          {
            transform: [{ scale: rippleScale1 }],
            opacity: rippleOpacity1,
          },
        ]}
      />
      <Animated.View
        style={[
          styles.ripple,
          {
            transform: [{ scale: rippleScale2 }],
            opacity: rippleOpacity2,
          },
        ]}
      />
    </View>
  );
};

const AudioMessage = ({ audioUri, onDelete, index }) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    loadSound();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [audioUri]);

  const loadSound = async () => {
    try {
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioUri },
        { shouldPlay: false }
      );
      
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setIsPlaying(false);
        }
      });
      
      setSound(newSound);
    } catch (error) {
      console.error('Error loading sound:', error);
      Alert.alert('오류', '음성을 로드할 수 없습니다.');
    }
  };

  async function playSound() {
    try {
      if (sound) {
        if (isPlaying) {
          await sound.pauseAsync();
          setIsPlaying(false);
        } else {
          await sound.setPositionAsync(0);
          await sound.playAsync();
          setIsPlaying(true);
        }
      }
    } catch (error) {
      console.error('Error playing sound:', error);
      Alert.alert('오류', '음성을 재생할 수 없습니다.');
    }
  }

  return (
    <View style={styles.audioMessageContainer}>
      <TouchableOpacity onPress={playSound} style={styles.playButton}>
        {isPlaying ? (
          <Pause size={24} color="#6A8EF0" />
        ) : (
          <Play size={24} color="#6A8EF0" />
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <X size={20} color="#FF4A4A" />
      </TouchableOpacity>
    </View>
  );
};

const ChatRoom = () => {
  const [questions, setQuestions] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState(null);

  useEffect(() => {
    return () => {
      if (recording) {
        stopRecording();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      // 이전 녹음이 있다면 정리
      if (recording) {
        try {
          const recordingStatus = await recording.getStatusAsync();
          if (recordingStatus.isRecording) {
            await recording.stopAndUnloadAsync();
          }
        } catch (error) {
          console.log('Previous recording cleanup error:', error);
        }
        setRecording(null);
      }  

      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        playThroughEarpieceAndroid: true,
        staysActiveInBackground: true,
      });

      const { recording: newRecording } = await Audio.Recording.createAsync({
        android: {
          extension: '.aac',
          outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
          audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
          sampleRate: 48000,
          numberOfChannels: 1,
          bitRate: 128000,
        },
        ios: {
          extension: '.m4a',
          outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_MPEG4AAC,
          audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX,
          sampleRate: 48000,
          numberOfChannels: 1,
          bitRate: 128000,
          linearPCMBitDepth: 16,
          linearPCMIsBigEndian: false,
          linearPCMIsFloat: false,
        },
      });

      setRecording(newRecording);
      setIsRecording(true);
    } catch (err) {
      console.error('Failed to start recording', err);
      Alert.alert('녹음 오류', '녹음을 시작할 수 없습니다.');
      setIsRecording(false);
    }
  };

  const stopRecording = async () => {
    try {
      if (!recording) {
        setIsRecording(false);
        return;
      }

      await recording.stopAndUnloadAsync();
      setIsRecording(false);
      
      const uri = recording.getURI();
      console.log('Recording stopped and stored at', uri);

      // 파일이 실제로 존재하는지 확인
      const fileInfo = await FileSystem.getInfoAsync(uri);
      if (!fileInfo.exists) {
        throw new Error('Recorded file does not exist');
      }

      // FormData 생성 및 파일 첨부
      const formData = new FormData();
      const audioFile = {
        uri: Platform.OS === 'ios' ? uri.replace('file://', '') : uri,
        type: 'audio/m4a',
        name: 'recording.m4a'
      };
      
      formData.append('audioFile', audioFile);
      
      console.log('전송 시작');
      const response = await axios.post(
        'http://172.16.1.110:8080/transcribe', 
        formData,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          timeout: 10000,
        }
      );

      console.log('서버 응답:', response.data);
      
      // 응답 텍스트에서 숫자로 시작하는 줄만 추출
      const extractedQuestions = response.data
        .split('\n')
        .filter(line => /^\d+\./.test(line.trim()))
        .map(line => line.replace(/^\d+\.\s*/, '').trim());

      if (extractedQuestions.length > 0) {
        setQuestions(extractedQuestions);
      } else {
        console.log('추출된 질문이 없습니다');
        setQuestions([]);
      }

      setRecording(null);

    } catch (err) {
      console.error('Error details:', err.response?.data || err.message);
      Alert.alert('오류', '녹음 중지 중 오류가 발생했습니다.');
      setIsRecording(false);
      setRecording(null);
    }
  };

  const handleMicPress = async () => {
    if (isRecording) {
      await stopRecording();
    } else {
      await startRecording();
    }
  };

  // 초기화 함수
  const handleReset = () => {
    setQuestions([]);
    if (recording) {
      stopRecording();
    }
    setIsRecording(false);
    setRecording(null);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>예상 질문</Text>
          <TouchableOpacity onPress={handleReset}>
            <Text style={styles.headerRight}>초기화</Text>
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
            <View style={styles.micWrapper}>
              <RippleEffect isRecording={isRecording} />
              <TouchableOpacity 
                style={[styles.micContainer, isRecording && styles.micContainerRecording]}
                onPress={handleMicPress}
              >
                <View style={[styles.micCircle, isRecording && styles.micCircleRecording]}>
                  <MicIcon size={72} color={isRecording ? "#FF4A4A" : "#000000"} />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.messagesContainer}>
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
    fontWeight: '600',
    lineHeight: 21,
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
    shadowOffset: { width: 0, height: 2 },
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
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  micWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 160,
    marginTop: 0,
    marginBottom: 20,
  },
  rippleContainer: {
    position: 'absolute',
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ripple: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFE5E5',
  },
  micContainer: {
    alignItems: 'center',
    zIndex: 1,
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  micCircleRecording: {
    backgroundColor: '#FFE5E5',
  },
  messagesContainer: {
    gap: 12,
  },
  questionBubble: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  questionText: {
    fontSize: 15,
    color: '#333333',
    textAlign: 'center',
    lineHeight: 22,
  },
  headerRight: {
    fontSize: 16,
    color: '#6A8EF0',
  },
});

export default ChatRoom;
