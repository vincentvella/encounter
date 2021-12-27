import * as React from 'react'
import { useRoute } from '@react-navigation/core'
import { StyleSheet, Text, View } from 'react-native';
import { AuthenticatedRootRouteProp, } from '../services/navigation/types';
import { useTheme } from '../services/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  callWrapper: {
    flex: 1,
    width: '100%',
  },
  grid: {
    flex: 1
  },
  remoteVideo: {
    flex: 1
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 40, // todo - drive off of safe area inset
  },
  options: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  button: {
    borderColor: 'black',
    borderRadius: 12,
    borderWidth: 1,
    padding: 20
  },
  buttonText: {
    fontSize: 12,
  }
})

const Call = () => {
  // const Video = React.useRef<any>(null);
  // const navigation = useNavigation()
  // const [participants, setParticipants] = React.useState<Map<string, { participantSid: string, videoTrackSid: string }>>(new Map([]))
  // const [isAudioEnabled, setIsAudioEnabled] = React.useState(true)
  // const [connectionStatus, setConnectionStatus] = React.useState('connecting')
  // const route = useRoute<any>()
  // console.log(route.params)

  // React.useEffect(() => {
  //   if (route.params.roomName && route.params.token) {
  //     Video.current.connect({
  //       roomName: route.params.roomName,
  //       accessToken: route.params.token,
  //     });
  //   }
  //   return () => {
  //     _onEndButtonPress();
  //   };
  // }, [route.params]);

  // const _onEndButtonPress = () => {
  //   Video.current.disconnect();
  // };

  // const _onMuteButtonPress = () => {
  //   Video.current
  //     .setLocalAudioEnabled(!isAudioEnabled)
  //     .then((isEnabled: boolean) => setIsAudioEnabled(isEnabled));
  // };

  // const _onFlipButtonPress = () => {
  //   Video.current.flipCamera();
  // };

  // console.log(participants)
  const { colors } = useTheme()
  const route = useRoute<AuthenticatedRootRouteProp<'call'>>()
  console.log({ route })


  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.innerContainer}>
        <Text style={{ color: colors.text }}>Call: {route.params.id}</Text>
      </View>
    </View>
  )
}

export default Call