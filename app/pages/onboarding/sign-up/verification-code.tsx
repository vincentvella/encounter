import { useRoute } from '@react-navigation/core';
import * as React from 'react'
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { useSetRecoilState } from 'recoil';
import PrimaryButton from '../../../components/button/primary';
import { Input } from '../../../components/inputs/input';
import { useVerifyCodeLazyQuery } from '../../../generated/types';
import { RootRouteProp } from '../../../services/navigation/types';
import Cookie from '../../../services/storage/cookie';
import { useTheme } from '../../../services/theme';
import { isSignedIn } from '../../../states/authentication';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  innerContainer: {
    paddingHorizontal: 8,
  },
  buttonContainer: {
    paddingVertical: 12
  }
})

const VerificationCode = () => {
  const { colors } = useTheme()
  const verificationCodeRef = React.useRef<Input>(null)
  const route = useRoute<RootRouteProp<'sign-up/verification-code'>>()
  const setIsSignedIn = useSetRecoilState(isSignedIn)

  const [verifyCode, { loading }] = useVerifyCodeLazyQuery({
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      if (data.verifyCode?.accessToken) {
        Cookie.set('jwt', data.verifyCode.accessToken)
        setIsSignedIn(true)
      }
    }
  })

  const onSubmit = React.useCallback(() => {
    if (verificationCodeRef.current) {
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
        <Input ref={verificationCodeRef} name="Verify Code" autoFocus onSubmitEditing={onSubmit} />
        <View style={styles.buttonContainer}>
          <PrimaryButton loading={loading} onPress={onSubmit} color={colors.primary} title="Verify Code" />
        </View>
      </View>
    </View>
  );
}

export default VerificationCode