import * as React from 'react'
import { StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
import PrimaryButton from '../../components/button/primary';
import { useTheme } from '../../services/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})

const Phone = () => {
  const { colors } = useTheme()
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
    </View>
  );
}

export default Phone