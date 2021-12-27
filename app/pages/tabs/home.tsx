import * as React from 'react'
import { StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
import { useRecoilState, useSetRecoilState } from 'recoil';
import PrimaryButton from '../../components/button/primary';
import { useEnterRoomLazyQuery, useProfileQuery, useRoomCreatedSubscription } from '../../generated/types';
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

// const config = { appId: 'encount-6b3b9-default-rtdb' }

const Home = () => {
  const { colors } = useTheme()
  const quote = React.useRef(getRandomQuote())
  const [signedIn, setIsSignedIn] = useRecoilState(isSignedIn)
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

  // useSubscription
  const [enterRoom, { loading, data }] = useEnterRoomLazyQuery()
  const { loading: subLoading, data: subData } = useRoomCreatedSubscription({ skip: !data?.waitForRoom.waiting })
  console.log({ loading, data })
  console.log({ subData, subLoading })

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.innerContainer}>
        <View>
          <Text style={[styles.quote, { color: colors.text }]}>{quote.current.quote}</Text>
          <View style={styles.buttonContainer}>
            <PrimaryButton color={colors.primary} title="Meet Someone New" onPress={enterRoom} loading={loading} />
            {subData?.roomCreated?.id && <Text style={[{ color: colors.text }]}>{subData?.roomCreated?.id}</Text>}
          </View>
        </View>
      </View>
    </View>
  );
}

export default Home