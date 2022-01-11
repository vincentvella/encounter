import { MaterialIcons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, View, Dimensions, Text } from 'react-native';
import { RTCView } from 'react-native-webrtc-web-shim';
import CallService from '../../services/call'
import { CallEvents } from '../../services/call/contains';
import CallButton from './call-button';
import CallTimer, { globalTimer, globalTimerRef } from './call-timer';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  callContainer: {
    flex: 1,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  manageCall: {
    flexDirection: 'row',
    marginVertical: 20,
    position: 'absolute',
    bottom: 10,
  },
  boxMyStream: {
    maxWidth: 150,
    position: 'absolute',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    bottom: 140,
    right: 10,
  },
  myStream: {
    width: 150,
    height: 180,
    backgroundColor: 'black'
  },
  iconCamera: {
    position: 'absolute',
    zIndex: 16,
    right: 10,
    bottom: 10,
  },
  stream: {
    width: width,
    height: height,
  },
  textTimer: {
    color: 'white',
    fontSize: 20
  },
});

export const globalCallRef = React.createRef<any>();
export const globalCall = {
  call: (sessionId: string, userData: object) => {
    globalCallRef?.current?.call(sessionId, userData);
  },
};

export interface Props {
  VideoChat: React.MutableRefObject<CallService>
  onEnd: () => void
  isCallee: boolean | null
  callLength?: number
}

const Call = React.forwardRef<unknown, Props>(({ VideoChat, onEnd, isCallee, callLength = 1 }, ref) => {
  const previouslyVisible = React.useRef(false)
  const stream = React.useRef(VideoChat.current.getLocalStream())
  const [visible, setVisible] = React.useState(false);
  const [remoteStream, setRemoteStream] = React.useState<any>(null);
  const [type, setType] = React.useState('');
  const [audioEnable, setAudioEnable] = React.useState(true);
  const [videoEnabled, setVideoEnable] = React.useState(true);
  const [cameraType, setCameraType] = React.useState<'front' | 'end'>('front');
  const [remoteCameraType, setRemoteCameraType] = React.useState<'front' | 'end'>('front');

  const call = (sessionId: string, userData: object) => {
    VideoChat.current.events.call(sessionId, userData);
  };

  React.useImperativeHandle(ref, () => ({ call }))

  React.useEffect(() => {
    let mounted = true

    VideoChat.current.listenings.getRemoteStream((remoteStream) => {
      if (!mounted) return
      stream.current = VideoChat.current.getLocalStream()
      setRemoteStream(remoteStream);
    });

    VideoChat.current.listenings.callEvents((type, userData: any) => {
      if (!mounted) return
      console.log(type, userData);

      if (type !== CallEvents.message) {
        setType(type);
      }

      if (type === CallEvents.received || type === CallEvents.start) {
        video(true);
        audio(true);
        if (type === CallEvents.received) {
          VideoChat.current.events.acceptCall();
        }
        setVisible(true);
      }

      if (type === CallEvents.end) {
        setVisible(false);
        setAudioEnable(true);
        setVideoEnable(true);
      }

      if (type === CallEvents.message) {
        if (userData?.message?.type === 'SWITCH_CAMERA') {
          setRemoteCameraType(userData?.message?.value);
        }
        if (userData?.message?.type === 'SET_END_TIMESTAMP') {
          if (typeof userData?.message?.value?.endsAt === 'string') {
            globalTimer.startTimer(userData.message.value.endsAt)
          }
        }
      }
    });
    return () => { mounted = false }
  }, [isCallee]);

  const endCall = () => {
    VideoChat.current.events.endCall();
  };

  React.useEffect(() => {
    if (globalTimerRef.current) {
      if (type === CallEvents.accept && isCallee !== null && isCallee) {
        let endsAt = new Date()
        endsAt = new Date(endsAt.getTime() + (1000 * 60 * callLength));
        VideoChat.current.events.message({ type: 'SET_END_TIMESTAMP', value: { endsAt } });
        globalTimer.startTimer(endsAt.toISOString())
      }
    }
  }, [globalTimerRef.current, type, isCallee, callLength])

  const switchCamera = () => {
    if (cameraType === 'front') {
      setCameraType('end');
      VideoChat.current.events.message({ type: 'SWITCH_CAMERA', value: 'end' });
    } else {
      setCameraType('front');
      VideoChat.current.events.message({ type: 'SWITCH_CAMERA', value: 'front' });
    }
    VideoChat.current.events.switchCamera();
  };

  const video = (enable: boolean) => {
    VideoChat.current.events.videoEnable(enable);
  };

  const audio = (enable: boolean) => {
    VideoChat.current.events.audioEnable(enable);
  };

  const onPressEnd = () => {
    setVisible(false)
    endCall()
  }

  const toggleAudio = () => {
    audio(!audioEnable);
    setAudioEnable(!audioEnable);
  }

  const toggleVideo = () => {
    video(!videoEnabled);
    setVideoEnable(!videoEnabled);
  }

  React.useEffect(() => {
    if (previouslyVisible.current === true && !visible) {
      onEnd()
    } else if (visible) {
      previouslyVisible.current = visible
    }
  }, [visible])

  if (!visible) {
    return null;
  }

  return (
    <View style={styles.callContainer}>
      {(type === CallEvents.start || type === CallEvents.received) && <Text style={styles.textTimer}>Connecting...</Text>}
      {!!(type === CallEvents.accept && remoteStream) && (
        <View style={{ flex: 1 }} pointerEvents="auto">
          <RTCView mirror={remoteCameraType === 'front' ? true : false} stream={remoteStream} style={styles.stream} objectFit="cover" />
          {stream.current && (
            <View style={styles.boxMyStream}>
              <View>
                <RTCView
                  mirror={cameraType === 'front' ? true : false}
                  stream={stream.current}
                  style={styles.myStream}
                  objectFit="cover"
                />
                <TouchableOpacity onPress={switchCamera} style={styles.iconCamera} >
                  <MaterialIcons name="switch-camera" color="white" size={30} />
                </TouchableOpacity>
              </View>
              <CallTimer ref={globalTimerRef} callLength={callLength} endCall={onPressEnd} />
            </View>
          )}
        </View>
      )}
      {type === CallEvents.start && (
        <View style={styles.manageCall}>
          <CallButton icon='call-end' color="red" onPress={onPressEnd} size={30} />
        </View>
      )}
      {type === CallEvents.accept && (
        <View style={styles.manageCall}>
          <CallButton icon='mic' color={audioEnable ? 'white' : 'red'} onPress={toggleAudio} size={30} />
          <CallButton icon={videoEnabled ? 'videocam' : 'videocam-off'} color={videoEnabled ? 'white' : 'red'} onPress={toggleVideo} size={30} />
          <CallButton icon='call-end' color="red" onPress={onPressEnd} size={30} />
        </View>
      )}
    </View>
  );
});

export default Call;