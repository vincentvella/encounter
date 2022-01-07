import { SubscriptionResult } from '@apollo/client';
import { useNavigation } from '@react-navigation/core';
import * as React from 'react'
import { StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
import { useSetRecoilState } from 'recoil';
import PrimaryButton from '../../components/button/primary';
import { Room, RoomCreatedSubscription, useEnterRoomLazyQuery, useProfileQuery, useRoomCreatedSubscription, useRoomForUserQuery } from '../../generated/types';
import { AuthenticatedRootNavigationProp, AuthenticatedStackParams } from '../../services/navigation/types';
import { getRandomQuote } from '../../services/quotes';
import { useTheme } from '../../services/theme';
import { isOnboarding, isSignedIn } from '../../states/authentication';
import { HasValue } from '../../types/utils';

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
  const { data: profileData } = useProfileQuery({
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

  const navigation = useNavigation<AuthenticatedRootNavigationProp>()
  const { data: roomData, startPolling, stopPolling } = useRoomForUserQuery()
  const [enterRoom, { loading, data }] = useEnterRoomLazyQuery({
    onCompleted: () => {
      startPolling(5000)
    }
  })

  useRoomCreatedSubscription({
    skip: !data?.waitForRoom.waiting,
    shouldResubscribe: true,
    onSubscriptionData: ({ subscriptionData }) => {
      if (subscriptionData.data?.roomCreated?.id) {
        const peerId = profileData?.findProfile?.id
        stopPolling()
        navigation.push('call', {
          id: subscriptionData.data.roomCreated.id,
          peer: peerId === subscriptionData.data.roomCreated.calleeId
            ? subscriptionData.data.roomCreated.callerId
            : subscriptionData.data.roomCreated.calleeId
        })
      }
    }
  })

  React.useEffect(() => {
    if (roomData?.findRoomForUser) {
      const peerId = profileData?.findProfile?.id
      stopPolling()
      navigation.push('call', {
        id: roomData.findRoomForUser.id,
        peer: peerId === roomData.findRoomForUser.calleeId
          ? roomData.findRoomForUser.callerId
          : roomData.findRoomForUser.calleeId
      })
    }
  }, [roomData, stopPolling])

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.innerContainer}>
        <View>
          <Text style={[styles.quote, { color: colors.text }]}>{quote.current.quote}</Text>
          <View style={styles.buttonContainer}>
            <PrimaryButton color={colors.primary} title="Meet Someone New" onPress={enterRoom} loading={loading} />
          </View>
        </View>
      </View>
    </View>
  );
}

export default Home