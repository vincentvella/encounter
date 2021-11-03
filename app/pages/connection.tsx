import * as React from 'react'
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';
import ConnectionForm from '../components/connection-form';
import { useTheme } from '../services/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
})

const Connection = () => {
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

export default Connection