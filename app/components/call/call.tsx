import { MaterialIcons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';
import { RTCView } from 'react-native-webrtc-web-shim';
import CallService from '../../services/call'
import { CallEvents } from '../../services/call/contains';
import CallButton from './call-button';
import Timer from './timer'

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCall: {
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
    borderRadius: 10,
    padding: 3,
    position: 'absolute',
    zIndex: 99999,
    bottom: 140,
    backgroundColor: 'white',
    right: 10,
  },
  myStream: {
    width: 150,
    height: 180,
    borderRadius: 10,
    backgroundColor: 'black'
  },
  iconCamera: {
    position: 'absolute',
    zIndex: 999,
    right: 10,
    bottom: 10,
  },
  stream: {
    width: width,
    height: height,
  },
  name: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginTop: 20,
  },
  timer: {
    backgroundColor: 'transparent',
    minWidth: 70,
    minHeight: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50
  },
  textTimer: {
    fontSize: 20
  },
  timer2: {
    backgroundColor: 'transparent',
    minWidth: 70,
    minHeight: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    borderWidth: 2,
    borderColor: 'white',
    position: 'absolute',
    zIndex: 9,
    right: 10,
    top: 10
  },
  textTimer2: {
    fontSize: 12
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
}

const Call = React.forwardRef<unknown, Props>(({ VideoChat, onEnd }, ref) => {
  const previouslyVisible = React.useRef(false)
  const intervals = React.useRef<NodeJS.Timer[]>([])
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

  React.useImperativeHandle(ref, () => {
    return { call };
  });

  React.useEffect(() => {
    const ringtime = 20;

    VideoChat.current.listenings.getRemoteStream((remoteStream) => {
      stream.current = VideoChat.current.getLocalStream()
      setRemoteStream(remoteStream);
    });

    VideoChat.current.listenings.callEvents((type, userData: any) => {

      console.log(type, userData);

      if (type !== CallEvents.message) {
        setType(type);
      }

      if (type === CallEvents.received || type === CallEvents.start) {
        video(true);
        audio(true);
        let time = ringtime;
        intervals.current.push(setInterval(() => {
          time = time - 1;
          if (time === 0) {
            endCall();
            intervals.current.forEach(i => clearInterval(i))
          }
        }, 1000))

        if (type === CallEvents.received) {
          VideoChat.current.events.vibration.start();
        }
        setVisible(true);
      }

      if (type === CallEvents.accept) {
        intervals.current.forEach(i => clearInterval(i))
        VideoChat.current.events.vibration.cancel();
      }

      if (type === CallEvents.end) {
        intervals.current.forEach(i => clearInterval(i))
        VideoChat.current.events.vibration.cancel();
        setVisible(false);
        setAudioEnable(true);
        setVideoEnable(true);
      }

      if (type === CallEvents.message) {
        if (userData?.message?.type === 'SWITCH_CAMERA') {
          setRemoteCameraType(userData?.message?.value);
        }
      }
    });
  }, []);



  const acceptCall = () => {
    VideoChat.current.events.acceptCall();
  };

  const endCall = () => {
    VideoChat.current.events.endCall();
  };

  const switchCamera = () => {
    console.log('switching camera...')
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
    <View style={styles.modalCall}>
      {(type === CallEvents.start || type === CallEvents.received) && <Timer style={styles.timer} textStyle={styles.textTimer} start />}
      {!!(type === CallEvents.accept && remoteStream) && (
        <View style={{ flex: 1 }} pointerEvents="auto">
          <RTCView mirror={remoteCameraType === 'front' ? true : false} stream={remoteStream} style={styles.stream} objectFit="cover" />
          {stream.current && (
            <View style={styles.boxMyStream}>
              <RTCView mirror={cameraType === 'front' ? true : false} stream={stream.current} style={styles.myStream} objectFit="cover" />
              {type === CallEvents.accept &&
                <Timer
                  style={styles.timer2}
                  textStyle={styles.textTimer2} start
                />}
              <TouchableOpacity onPress={switchCamera} style={styles.iconCamera} >
                <MaterialIcons name="switch-camera" color="white" size={30} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
      {type === CallEvents.start && (
        <View style={styles.manageCall}>
          <CallButton icon='call-end' color="red" onPress={onPressEnd} size={30} />
        </View>
      )}
      {type === CallEvents.received && (
        <View style={styles.manageCall}>
          <CallButton icon='call' color="green" onPress={acceptCall} size={30} />
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