import * as React from 'react'
import { StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
import { useSetRecoilState } from 'recoil';
import PrimaryButton from '../../components/button/primary';
import { useProfileQuery } from '../../generated/types';
import { getRandomQuote } from '../../services/quotes';
import { useTheme } from '../../services/theme';
import { isOnboarding, isSignedIn } from '../../states/authentication';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quote: {
    fontSize: 24,
    paddingHorizontal: 16,
    maxWidth: 400,
  },
  buttonContainer: {
    margin: 16,
    marginVertical: 8
  }
})

const Home = () => {
  const { colors } = useTheme()
  const quote = React.useRef(getRandomQuote())
  const setIsSignedIn = useSetRecoilState(isSignedIn)
  const setIsOnboarding = useSetRecoilState(isOnboarding)
  useProfileQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: (data) => {
      if (data.findProfile === null) {
        setIsOnboarding(true)
      }
    },
    onError: (err) => {
      if (err.message === 'User not found') {
        setIsSignedIn(false)
      }
      if (err.message.includes('Unauthorized')) {
        setIsSignedIn(false)
      }
    }
  })

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.innerContainer}>
        <View>
          <Text style={[styles.quote, { color: colors.text }]}>{quote.current.quote}</Text>
          <View style={styles.buttonContainer}>
            <PrimaryButton color={colors.primary} title="Meet Someone New" />
          </View>
        </View>
      </View>
    </View>
  );
}

export default Home