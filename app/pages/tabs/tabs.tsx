import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Account from './account';
import Dates from './dates';
import Home from './home';

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator initialRouteName="home">
      <Tab.Screen name="dates" component={Dates} options={{ title: 'Dates' }} />
      <Tab.Screen name="home" component={Home} options={{ title: 'Home', headerTitle: 'Encounter' }} />
      <Tab.Screen name="account" component={Account} options={{ title: 'Account' }} />
    </Tab.Navigator>
  );
}

export default Tabs