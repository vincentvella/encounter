import { useTheme } from '@react-navigation/native';
import * as React from 'react'
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';
import ConnectionForm from '../components/connection-form';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center'
  },
})

const Home = () => {
  const { dark } = useTheme()
  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: dark ? 'rgba(255,255,255,.15)' : 'rgba(0,0,0,.5)' }
      ]}
    >
      <ConnectionForm />
    </ScrollView>
  );
}

export default Home