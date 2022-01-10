import * as React from 'react';
import { LinkingOptions, NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useFlipper } from '@react-navigation/devtools';
import { Text, useColorScheme } from 'react-native';
import Call from '../../pages/call';
import Landing from '../../pages/landing';
import ColorTheme from '../theme/color';
import Phone from '../../pages/onboarding/sign-up/phone';
import { StackParams } from './types';
import VerificationCode from '../../pages/onboarding/sign-up/verification-code';
import Profile from '../../pages/onboarding/profile';
import { useRecoilValue } from 'recoil';
import { isOnboarding, isSignedIn } from '../../states/authentication';
import Cookie from '../storage/cookie';
import Tabs from '../../pages/tabs';
import SignIn from '../../pages/onboarding/sign-in';
import Feedback from '../../pages/feedback';

const prefixes = [
  'http://localhost:19006',
  'encounter://'
]

const linking: LinkingOptions<ReactNavigation.RootParamList> = {
  prefixes,
  config: {
    screens: {
      Landing: '/',
      SignIn: 'sign-in',
      SignUpPhone: 'sign-up/phone',
      SignUpProfile: 'sign-up/profile',
      SignUpVerification: 'sign-up/verification-code',
      tabs: {}
    },
  },
}

const Stack = createNativeStackNavigator<StackParams>()

export default function Navigator() {
  const scheme = useColorScheme()
  const signedIn = useRecoilValue(isSignedIn)
  const onboarding = useRecoilValue(isOnboarding)
  const navigationRef = useNavigationContainerRef()

  useFlipper(navigationRef)

  React.useEffect(() => {
    if (!signedIn) {
      Cookie.remove('jwt')
    }
  }, [signedIn])

  return (
    <NavigationContainer
      ref={navigationRef}
      initialState={{ routes: [] }}
      fallback={<Text>Loading...</Text>}
      theme={scheme === 'dark' ? ColorTheme.dark : ColorTheme.light}
      linking={linking}
    >
      {!!(signedIn && !onboarding) && (
        <Stack.Navigator>
          <Stack.Screen name="tabs" component={Tabs} options={{ headerShown: false }} />
          <Stack.Screen name="call" component={Call} options={{ presentation: 'fullScreenModal', headerShown: false }} />
          <Stack.Screen name="feedback" component={Feedback} options={{ presentation: 'fullScreenModal', headerTitle: 'Feedback' }} />
        </Stack.Navigator>
      )}
      {!signedIn && (
        <Stack.Navigator>
          <Stack.Screen name="Landing" options={{ headerShown: false }} component={Landing} />
          <Stack.Screen name="SignIn" component={SignIn} options={{ title: "Sign In" }} />
          <Stack.Screen name="SignUpPhone" component={Phone} options={{ title: "Enter Phone Number" }} />
          <Stack.Screen name="SignUpVerificationCode" component={VerificationCode} options={{ title: "Verify Code" }} />
        </Stack.Navigator>
      )}
      {onboarding && (
        <Stack.Navigator>
          <Stack.Screen name="SignUpProfile" component={Profile} options={{ title: "Create Profile" }} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}