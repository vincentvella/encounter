import { useNavigation, useRoute } from '@react-navigation/core';
import * as React from 'react'
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import PrimaryButton from '../../components/button/primary';
import { Input } from '../../components/inputs/input';
import { useVerifyCodeLazyQuery } from '../../generated/types';
import { RootNavigationProp, RootRouteProp } from '../../services/navigation/types';
import { Storage } from '../../services/storage';
import Cookie from '../../services/storage/cookie';
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
  const verificationCodeRef = React.useRef<Input>(null)
  const route = useRoute<RootRouteProp<'sign-in/verification-code'>>()
  const navigation = useNavigation<RootNavigationProp>()

  const [verifyCode, { loading }] = useVerifyCodeLazyQuery({
    onCompleted: (data) => {
      if (data.verifyCode?.authToken) {
        Cookie.set('jwt', data.verifyCode.authToken)
        navigation.navigate('sign-up/profile')
      }
    }
  })

  const onSubmit = React.useCallback(() => {
    if (verificationCodeRef?.current?.getValue) {
      verifyCode({ variables: { code: verificationCodeRef.current.getValue(), requestId: route.params.requestId } })
    }
  }, [])
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.innerContainer}>
        <View style={styles.inputContainer}>
          <Input ref={verificationCodeRef} name="Verify Code" />
        </View>
        <PrimaryButton onPress={onSubmit} color={colors.primary} title="Verify Code" />
      </View>
    </View>
  );
}

export default VerificationCode