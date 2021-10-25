import * as React from 'react'
import { StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
import PrimaryButton from '../../components/button/primary';
import { Input } from '../../components/inputs/input';
import { useTheme } from '../../services/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  innerContainer: {
    paddingHorizontal: 8,
  }
})

const Phone = () => {
  const { colors } = useTheme()
  const phoneNumberRef = React.useRef<Input>(null)
  const onSubmit = React.useCallback(() => {
    // console.log(phoneNumberRef?.current?.getValue())
  }, [])
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.innerContainer}>
        <Input ref={phoneNumberRef} name="Phone Number" />
        <PrimaryButton onPress={onSubmit} color={colors.primary} title="Verify Phone" />
      </View>
    </View>
  );
}

export default Phone