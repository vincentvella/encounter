import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useColorScheme } from 'react-native';
import Home from '../../pages/home';
import Call from '../../pages/call';
import Landing from '../../pages/landing';
import ColorTheme from '../theme/color';
import Phone from '../../pages/sign-in/phone';
import { StackParams } from './types';
import VerificationCode from '../../pages/sign-in/verification-code';
import Profile from '../../pages/sign-up/profile';
import { useRecoilValue } from 'recoil';
import { isSignedIn } from '../../states/authentication';

const Stack = createNativeStackNavigator<StackParams>()

export default function Navigator() {
  const scheme = useColorScheme();
  const signedIn = useRecoilValue(isSignedIn);
  return (
    <NavigationContainer theme={scheme === 'dark' ? ColorTheme.dark : ColorTheme.light}>
      {signedIn ?
        <Stack.Navigator>
          <Stack.Screen name="home" component={Home} options={{ title: 'Home' }} />
          <Stack.Screen name="sign-up/profile" component={Profile} options={{ title: "Profile" }} />
          <Stack.Screen name="Call" component={Call} />
        </Stack.Navigator>
        :
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name="Landing" component={Landing} />
          <Stack.Screen name="sign-in/phone" component={Phone} options={{ title: "Enter Phone Number" }} />
          <Stack.Screen name="sign-in/verification-code" component={VerificationCode} options={{ title: "Verify Code" }} />
        </Stack.Navigator>
      }
    </NavigationContainer>
  );
}