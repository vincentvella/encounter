import { useNavigation } from '@react-navigation/core';
import * as React from 'react'
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { useSetRecoilState } from 'recoil';
import PrimaryButton from '../../../components/button/primary';
import { Input } from '../../../components/inputs/input';
import { useSignUpLazyQuery } from '../../../generated/types';
import { RootNavigationProp } from '../../../services/navigation/types';
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
    paddingTop: 12
  }
})

const Phone = () => {
  const { colors } = useTheme()
  const toast = useToast()
  const navigation = useNavigation<RootNavigationProp>()
  const phoneNumberRef = React.useRef<Input>(null)
  const passwordRef = React.useRef<Input>(null)
  const setIsSignedIn = useSetRecoilState(isSignedIn)
  const onSubmitPhone = () => phoneNumberRef?.current?.focus()
  const [requestCode, { loading }] = useSignUpLazyQuery({
    fetchPolicy: 'no-cache',
    onError: (err) => {
      err.graphQLErrors.forEach(error => {
        if (error.extensions.code === '401') {
          toast.show('Error: Unsuccessful login, incorrect password', { type: 'danger' })
        } else {
          console.log('Error handling login error status:', {
            message: err.message,
            extensions: error.extensions
          })
        }
      });
    },
    onCompleted: (data) => {
      console.log(data)
      if (data.signUp?.__typename === 'Login' && data.signUp?.accessToken) {
        Cookie.set('jwt', data.signUp.accessToken)
        setIsSignedIn(true)
      }
      if (data.signUp?.__typename === 'RequestResponse' && data.signUp?.requestId && phoneNumberRef.current) {
        navigation.navigate('sign-up/verification-code', {
          requestId: data.signUp.requestId,
          number: phoneNumberRef.current.getValue()
        })
      }
    }
  })

  const onSubmit = React.useCallback(() => {
    if (phoneNumberRef.current && passwordRef.current) {
      requestCode({
        variables: {
          number: phoneNumberRef.current.getValue(),
          password: passwordRef.current.getValue()
        }
      })
    }
  }, [])
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.innerContainer}>
        <Input ref={phoneNumberRef} name="Phone Number" autoFocus onSubmitEditing={onSubmitPhone} />
        <Input ref={passwordRef} name="Password" secureTextEntry onSubmitEditing={onSubmit} />
        <View style={styles.buttonContainer}>
          <PrimaryButton loading={loading} onPress={onSubmit} color={colors.primary} title="Sign Up" />
        </View>
      </View>
    </View>
  );
}

export default Phone