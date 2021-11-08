import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useColorScheme } from 'react-native';
import Home from '../../pages/tabs/home';
import Call from '../../pages/call';
import Landing from '../../pages/landing';
import ColorTheme from '../theme/color';
import Phone from '../../pages/sign-in/phone';
import { StackParams } from './types';
import VerificationCode from '../../pages/sign-in/verification-code';
import Profile from '../../pages/sign-up/profile';
import { useRecoilValue } from 'recoil';
import { isOnboarding, isSignedIn } from '../../states/authentication';
import Cookie from '../storage/cookie';
import Tabs from '../../pages/tabs';

const Stack = createNativeStackNavigator<StackParams>()

export default function Navigator() {
  const scheme = useColorScheme();
  const signedIn = useRecoilValue(isSignedIn);
  const onboarding = useRecoilValue(isOnboarding)

  React.useEffect(() => {
    if (!signedIn) {
      Cookie.remove('jwt')
    }
  }, [signedIn])

  return (
    <NavigationContainer theme={scheme === 'dark' ? ColorTheme.dark : ColorTheme.light}>
      {!!(signedIn && !onboarding) && (
        <Stack.Navigator>
          <Stack.Screen name="tabs" component={Tabs} options={{ headerShown: false }} />
          <Stack.Screen name="Call" component={Call} />
        </Stack.Navigator>
      )}
      {!signedIn && (
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name="Landing" component={Landing} />
          <Stack.Screen name="sign-in/phone" component={Phone} options={{ title: "Enter Phone Number" }} />
          <Stack.Screen name="sign-in/verification-code" component={VerificationCode} options={{ title: "Verify Code" }} />
        </Stack.Navigator>
      )}
      {onboarding && (
        <Stack.Navigator>
          <Stack.Screen name="sign-up/profile" component={Profile} options={{ title: "Create Profile" }} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}