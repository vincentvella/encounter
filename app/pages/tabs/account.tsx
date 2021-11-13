import * as React from 'react'
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { useSetRecoilState } from 'recoil';
import PrimaryButton from '../../components/button/primary';
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

const Account = () => {
  const { colors } = useTheme()
  const setIsSignedIn = useSetRecoilState(isSignedIn)
  const signOut = () => setIsSignedIn(false)
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.innerContainer}>
        <PrimaryButton onPress={signOut} color={colors.primary} title="Log Out" />
      </View>
    </View>
  );
}

export default Account