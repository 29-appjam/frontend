import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  FirstView: undefined;
  Login: undefined;
  Resister: undefined;
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;