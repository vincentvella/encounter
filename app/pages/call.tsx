import { useNavigation, useRoute } from '@react-navigation/core'
import * as React from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TwilioVideo, TwilioVideoParticipantView } from 'react-native-twilio-video-webrtc';

const styles = StyleSheet.create({
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
  const Video = React.useRef<any>(null);
  const navigation = useNavigation()
  const [participants, setParticipants] = React.useState<Map<string, { participantSid: string, videoTrackSid: string }>>(new Map([]))
  const [isAudioEnabled, setIsAudioEnabled] = React.useState(true)
  const [connectionStatus, setConnectionStatus] = React.useState('connecting')
  const route = useRoute<any>()
  console.log(route.params)

  React.useEffect(() => {
    if (route.params.roomName && route.params.token) {
      Video.current.connect({
        roomName: route.params.roomName,
        accessToken: route.params.token,
      });
    }
    return () => {
      _onEndButtonPress();
    };
  }, [route.params]);

  const _onEndButtonPress = () => {
    Video.current.disconnect();
  };

  const _onMuteButtonPress = () => {
    Video.current
      .setLocalAudioEnabled(!isAudioEnabled)
      .then((isEnabled: boolean) => setIsAudioEnabled(isEnabled));
  };

  const _onFlipButtonPress = () => {
    Video.current.flipCamera();
  };

  console.log(participants)

  return (
    <>
      {(connectionStatus === 'connected' || connectionStatus === 'connecting') && (
        <View style={styles.callWrapper}>
          {connectionStatus === 'connected' && (
            <View style={styles.grid}>
              {Array.from(participants, ([trackSid, trackIdentifier]) => (
                <TwilioVideoParticipantView
                  style={styles.remoteVideo}
                  key={trackSid}
                  trackIdentifier={trackIdentifier}
                />
              ))}
            </View>
          )}
        </View>
      )}
      <View style={styles.optionsContainer}>
        <View style={styles.options}>
          <TouchableOpacity style={styles.button} onPress={_onMuteButtonPress}>
            <Text style={styles.buttonText}>
              {isAudioEnabled ? 'Mute' : 'Unmute'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={_onEndButtonPress}>
            <Text style={styles.buttonText}>End</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={_onFlipButtonPress}>
            <Text style={styles.buttonText}>Flip</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TwilioVideo
        ref={Video}
        onRoomDidConnect={() => {
          setConnectionStatus('connected')
        }}
        onRoomDidDisconnect={() => {
          setConnectionStatus('disconnected')
          navigation.goBack();
        }}
        onRoomDidFailToConnect={(error) => {
          Alert.alert('Error', error.error);
          setConnectionStatus('disconnected')
          navigation.goBack();
        }}
        onParticipantAddedVideoTrack={({ participant, track }) => {
          if (track.enabled) {
            setParticipants(p => new Map([
              ...p,
              [
                track.trackSid,
                {
                  participantSid: participant.sid,
                  videoTrackSid: track.trackSid,
                },
              ],
            ]))
          }
        }}
        onParticipantRemovedVideoTrack={({ track }) => {
          participants.delete(track.trackSid)
          setParticipants(participants)
        }}
      />
    </>
  )
}

export default Call