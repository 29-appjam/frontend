import React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootStackParamList, TabParamList } from './src/types/navigation';
import FirstView from './src/screens/onboarding/FirstView';
import ChatRoom from './src/screens/chat/ChatRoom';
import script from './src/screens/script/script';
import relieve from './src/screens/relieve/relieve';
import { HomeIcon, MessageIcon, HeartIcon } from './assets/icons';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#6A8EF0',
          tabBarInactiveTintColor: '#999999',
          tabBarStyle: {
            height: 60,
            paddingBottom: 10,
          },
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="script"
          component={script}
          options={{
            tabBarLabel: '대본',
            tabBarIcon: ({ color, size }) => <HomeIcon color={color} size={size} />,
          }}
        />
        <Tab.Screen
          name="chat"
          component={ChatRoom}
          options={{
            tabBarLabel: '예상 질문',
            tabBarIcon: ({ color, size }) => <MessageIcon color={color} size={size} />,
          }}
        />
        <Tab.Screen
          name="relieve"
          component={relieve}
          options={{
            tabBarLabel: '긴장감 완화',
            tabBarIcon: ({ color, size }) => <HeartIcon color={color} size={size} />,
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const HomeScreen: React.FC = () => null;
const AnxietyScreen: React.FC = () => null;

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="FirstView"
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: '#FFFFFF',
          },
        }}
      >
        <Stack.Screen name="FirstView" component={FirstView} />
        <Stack.Screen name="MainTabs" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;