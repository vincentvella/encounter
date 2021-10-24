import * as React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack'
import { useColorScheme } from 'react-native';
import Home from '../../pages/home';
import Call from '../../pages/call';
import Landing from '../../pages/landing';
import ColorTheme from '../theme/color';
import Phone from '../../pages/sign-in/phone';
import { StackParams } from './types';

const useUser = () => {
  return false
}

const Stack = createNativeStackNavigator<StackParams>()

export default function Navigator() {
  const scheme = useColorScheme();
  const user = useUser();
  return (
    <NavigationContainer theme={scheme === 'dark' ? ColorTheme.dark : ColorTheme.light}>
      {user ?
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Call" component={Call} />
        </Stack.Navigator>
        :
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name="Landing" component={Landing} />
          <Stack.Screen name="sign-in/phone" component={Phone} options={{ title: "Enter Phone Number" }} />
        </Stack.Navigator>
      }
    </NavigationContainer>
  );
}