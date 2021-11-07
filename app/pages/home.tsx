import { useNavigation } from '@react-navigation/core';
import * as React from 'react'
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { useSetRecoilState } from 'recoil';
import { useProfileQuery } from '../generated/types';
import { AuthenticatedRootNavigationProp, RootNavigationProp } from '../services/navigation/types';
import { useTheme } from '../services/theme';
import { isOnboarding, isSignedIn } from '../states/authentication';

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

const Home = () => {
  const { colors } = useTheme()
  const setIsSignedIn = useSetRecoilState(isSignedIn)
  const setIsOnboarding = useSetRecoilState(isOnboarding)

  const navigation = useNavigation<AuthenticatedRootNavigationProp>()
  const { error } = useProfileQuery({
    onCompleted: (data) => {
      if (data?.findProfile === null) {
        setIsOnboarding(true)
      }
    }
  })
  React.useEffect(() => {
    if (error && error.message.includes('Unauthorized')) {
      setIsSignedIn(false)
    }
  }, [error])

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.innerContainer}>
      </View>
    </View>
  );
}

export default Home