import * as React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { useColorScheme } from 'react-native';
import Home from '../../pages/home';
import Call from '../../pages/call';
import Landing from '../../pages/landing';
import ColorTheme from '../theme/color';

const useUser = () => {
  return false
}

const Stack = createStackNavigator()

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
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Landing" component={Landing}></Stack.Screen>
        </Stack.Navigator>
      }
    </NavigationContainer>
  );
}