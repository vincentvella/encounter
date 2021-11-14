import * as React from 'react'
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { useSetRecoilState } from 'recoil';
import PrimaryButton from '../../components/button/primary';
import { Input } from '../../components/inputs/input';
import { useCreateProfileMutation } from '../../generated/types';
import { useTheme } from '../../services/theme';
import { isOnboarding } from '../../states/authentication';

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

const Profile = () => {
  const { colors } = useTheme()
  const emailRef = React.useRef<Input>(null)
  const firstNameRef = React.useRef<Input>(null)
  const lastNameRef = React.useRef<Input>(null)
  const setIsOnboarding = useSetRecoilState(isOnboarding)

  const [createProfile, { loading }] = useCreateProfileMutation({
    onCompleted: data => {
      if (data?.createProfile?.id) {
        setIsOnboarding(false)
        // Eventually to support search criteria
        // navigation.navigate('home')
      }
    }
  })

  const onSubmit = React.useCallback(() => {
    if (emailRef.current && firstNameRef.current && lastNameRef.current) {
      createProfile({
        variables: {
          data: {
            email: emailRef.current.getValue(),
            firstName: firstNameRef.current.getValue(),
            lastName: lastNameRef.current.getValue(),
          }
        }
      })
    }
  }, [])

  const onSubmitEmail = () => firstNameRef?.current?.focus()
  const onSubmitFirstName = () => lastNameRef?.current?.focus()

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.innerContainer}>
        <View style={styles.inputContainer}>
          <Input ref={emailRef} name="Email" onSubmitEditing={onSubmitEmail} autoFocus />
          <Input ref={firstNameRef} name="First Name" onSubmitEditing={onSubmitFirstName} />
          <Input ref={lastNameRef} name="Last Name" onSubmitEditing={onSubmit} />
        </View>
        <PrimaryButton loading={loading} onPress={onSubmit} color={colors.primary} title="Verify Phone" />
      </View>
    </View>
  );
}

export default Profile