import * as React from 'react'
import { StyleSheet } from 'react-native';
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
  },
  inputContainer: {
    paddingVertical: 16
  }
})

const VerificationCode = () => {
  const { colors } = useTheme()
  const phoneNumberRef = React.useRef<Input>(null)
  const onSubmit = React.useCallback(() => {
    // console.log(phoneNumberRef?.current?.getValue())
  }, [])
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.innerContainer}>
        <View style={styles.inputContainer}>
          <Input ref={phoneNumberRef} name="Verify Code" />
        </View>
        <PrimaryButton onPress={onSubmit} color={colors.primary} title="Verify Code" />
      </View>
    </View>
  );
}

export default VerificationCode