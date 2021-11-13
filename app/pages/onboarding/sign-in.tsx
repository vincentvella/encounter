import * as React from 'react'
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { useSetRecoilState } from 'recoil';
import PrimaryButton from '../../components/button/primary';
import { Input } from '../../components/inputs/input';
import { useLoginLazyQuery } from '../../generated/types';
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

const SignIn = () => {
  const { colors } = useTheme()
  const phoneNumberRef = React.useRef<Input>(null)
  const passwordRef = React.useRef<Input>(null)
  const setIsSignedIn = useSetRecoilState(isSignedIn)
  const toast = useToast()
  const [login, { loading }] = useLoginLazyQuery({
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      if (data.login?.accessToken) {
        Cookie.set('jwt', data.login.accessToken)
        setIsSignedIn(true)
      }
    },
    onError: (err) => {
      err.graphQLErrors.forEach(error => {
        if (error.extensions.code === '401') {
          toast.show('Error: Unsuccessful login, please check your credentials and try again.', { type: 'danger' })
        } else {
          console.log('Error handling login error status:', {
            message: err.message,
            extensions: error.extensions
          })
        }
      });
    }
  })

  const onSubmit = React.useCallback(() => {
    if (phoneNumberRef.current && passwordRef.current) {
      login({
        variables: {
          number: phoneNumberRef.current.getValue(),
          password: passwordRef.current.getValue()
        }
      })
    }
  }, [])
  const onSubmitPhoneNumber = () => passwordRef?.current?.focus()
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.innerContainer}>
        <View style={styles.inputContainer}>
          <Input ref={phoneNumberRef} name="Phone Number" autoFocus onSubmitEditing={onSubmitPhoneNumber} />
          <Input ref={passwordRef} name="Password" secureTextEntry onSubmitEditing={onSubmit} />
        </View>
        <PrimaryButton loading={loading} onPress={onSubmit} color={colors.primary} title="Sign In" />
      </View>
    </View>
  );
}

export default SignIn