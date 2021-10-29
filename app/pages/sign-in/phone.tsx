import { useNavigation } from '@react-navigation/core';
import * as React from 'react'
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import PrimaryButton from '../../components/button/primary';
import { Input } from '../../components/inputs/input';
import { RootNavigationProp } from '../../services/navigation/types';
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

const Phone = () => {
  const { colors } = useTheme()
  const navigation = useNavigation<RootNavigationProp>()
  const phoneNumberRef = React.useRef<Input>(null)
  const onSubmit = React.useCallback(() => {
    navigation.navigate('sign-in/verification-code')
    // console.log(phoneNumberRef?.current?.getValue())
  }, [])
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.innerContainer}>
        <View style={styles.inputContainer}>
          <Input ref={phoneNumberRef} name="Phone Number" />
        </View>
        <PrimaryButton onPress={onSubmit} color={colors.primary} title="Verify Phone" />
      </View>
    </View>
  );
}

export default Phone