import * as React from 'react'
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { useSetRecoilState } from 'recoil';
import PrimaryButton from '../../components/button/primary';
import { Input } from '../../components/inputs/input';
import { useCreateProfileMutation } from '../../generated/types';
// import { useNavigation } from '@react-navigation/core';
// import { AuthenticatedRootNavigationProp } from '../../services/navigation/types';
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
  // const navigation = useNavigation<AuthenticatedRootNavigationProp>()
  const emailRef = React.useRef<Input>(null)
  const firstNameRef = React.useRef<Input>(null)
  const lastNameRef = React.useRef<Input>(null)
  const setIsOnboarding = useSetRecoilState(isOnboarding)

  const [createProfile, { loading, data }] = useCreateProfileMutation()

  const onSubmit = React.useCallback(() => {
    createProfile({
      variables: {
        data: {
          email: emailRef.current?.getValue() || '',
          firstName: firstNameRef.current?.getValue() || '',
          lastName: lastNameRef.current?.getValue() || '',
        }
      }
    })
  }, [])

  React.useEffect(() => {
    if (data?.createProfile?.id) {
      setIsOnboarding(false)
      // Eventually to support search criteria
      // navigation.navigate('home')
    }
  }, [data])

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.innerContainer}>
        <View style={styles.inputContainer}>
          <Input ref={emailRef} name="Email" />
          <Input ref={firstNameRef} name="First Name" />
          <Input ref={lastNameRef} name="Last Name" />
        </View>
        <PrimaryButton loading={loading} onPress={onSubmit} color={colors.primary} title="Verify Phone" />
      </View>
    </View>
  );
}

export default Profile