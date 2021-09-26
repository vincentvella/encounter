import * as React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { useColorScheme } from 'react-native';
import Home from '../../pages/home';
import Call from '../../pages/call';

const Stack = createStackNavigator()

export default function Navigator() {
  const scheme = useColorScheme();

  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Call" component={Call} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}