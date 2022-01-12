import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Account from './account';
import Encounters from './encounters';
import Home from './home';

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator initialRouteName="home">
      <Tab.Screen name="encounters" component={Encounters} options={{ title: 'Encounters' }} />
      <Tab.Screen name="home" component={Home} options={{ title: 'Home', headerTitle: 'Encounter' }} />
      <Tab.Screen name="account" component={Account} options={{ title: 'Account' }} />
    </Tab.Navigator>
  );
}

export default Tabs