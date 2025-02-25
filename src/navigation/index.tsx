import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FirstView from '@/screens/onboarding/FirstView';
import LoginScreen from '@/screens/auth/Login';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="FirstView"
        screenOptions={{ 
          headerShown: false,
        }}
      >
        <Stack.Screen name="FirstView" component={FirstView} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;