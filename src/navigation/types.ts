// navigation/types.ts
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  FirstView: undefined;
  MainTabs: undefined;
  Login: undefined;
  Register: undefined;
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;