import * as React from 'react'
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { useTheme } from '../../services/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  innerContainer: {
    paddingHorizontal: 8,
  },
  inputContainer: {
    paddingVertical: 16
  }
})

const Dates = () => {
  const { colors } = useTheme()

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.innerContainer}>
      </View>
    </View>
  );
}

export default Dates