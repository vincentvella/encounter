import { useTheme } from '@react-navigation/native';
import * as React from 'react'
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';
import ConnectionForm from '../components/connection-form';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
})

const Home = () => {
  const { colors } = useTheme()
  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colors.background }
      ]}
    >
      <ConnectionForm />
    </ScrollView>
  );
}

export default Home