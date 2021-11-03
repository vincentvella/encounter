import { useNavigation, useRoute } from '@react-navigation/core';
import * as React from 'react'
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { useSetRecoilState } from 'recoil';
import PrimaryButton from '../../components/button/primary';
import { Input } from '../../components/inputs/input';
import { useVerifyCodeLazyQuery } from '../../generated/types';
import { RootNavigationProp, RootRouteProp } from '../../services/navigation/types';
import { Storage } from '../../services/storage';
import Cookie from '../../services/storage/cookie';
import { useTheme } from '../../services/theme';
import { isSignedIn } from '../../states/authentication';

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
  const setIsSignedIn = useSetRecoilState(isSignedIn)

  const [verifyCode, { loading }] = useVerifyCodeLazyQuery({
    onCompleted: (data) => {
      if (data.verifyCode?.accessToken) {
        Cookie.set('jwt', data.verifyCode.accessToken)
        setIsSignedIn(true)
      }
    }
  })

  const onSubmit = React.useCallback(() => {
    if (verificationCodeRef?.current?.getValue) {
      verifyCode({
        variables: {
          code: verificationCodeRef.current.getValue(),
          requestId: route.params.requestId
        }
      })
    }
  }, [])

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.innerContainer}>
        <View style={styles.inputContainer}>
          <Input ref={verificationCodeRef} name="Verify Code" />
        </View>
        <PrimaryButton loading={loading} onPress={onSubmit} color={colors.primary} title="Verify Code" />
      </View>
    </View>
  );
}

export default VerificationCode