import * as React from 'react';
import {
  Image, Modal, StyleSheet, Text,
  TouchableOpacity, View, Dimensions
} from 'react-native';
import { RTCView } from 'react-native-webrtc-web-shim';
import { CallEvents } from '../../services/call/contains';
import Timer from './timer'

const { width, height } = Dimensions.get('window');


let interval: any = null;
const ringtime = 20;

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
  btnCall: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3
  },
  icon: {
    width: 35,
    height: 35,
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
    zIndex: 999,
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
    width: 30,
    height: 30,
    position: 'absolute',
    zIndex: 999,
    tintColor: 'white',
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
  name?: string;
}

const Call = React.forwardRef(({ VideoChat }, ref) => {

  const [visible, setVisible] = React.useState<boolean>(false);
  const stream = VideoChat.current.getLocalStream();
  const [remoteStream, setRemoteStream] = React.useState<any>(null);
  const [type, setType] = React.useState('');
  const [audioEnable, setAudioEnable] = React.useState(true);
  const [videoEnabled, setVideoEnable] = React.useState(true);
  const [cameraType, setCameraType] = React.useState<'front' | 'end'>('front');
  const [remoteCameraType, setRemoteCameraType] = React.useState<'front' | 'end'>('front');
  const [name, setName] = React.useState('');
  const [avatar, setAvatar] = React.useState('');

  const call = (sessionId: string, userData: object) => {
    VideoChat.current.events.call(sessionId, userData);
  };

  React.useImperativeHandle(ref, () => {
    return { call };
  });

  React.useEffect(() => {

    VideoChat.current.listenings.getRemoteStream((remoteStream) => {
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
        interval = setInterval(() => {
          time = time - 1;
          if (time === 0) {
            endCall();
            clearInterval(interval);
          }
        }, 1000);

        if (type === CallEvents.received) {
          VideoChat.current.events.vibration.start();

          if (userData?.sender_name && userData?.sender_avatar) {
            setName(userData.sender_name);
            setAvatar(userData.sender_avatar);
          }
        } else {
          if (userData?.receiver_name && userData?.receiver_avatar) {
            setName(userData.receiver_name);
            setAvatar(userData.receiver_avatar);
          }
        }
        setVisible(true);
      }

      if (type === CallEvents.accept) {
        clearInterval(interval);
        VideoChat.current.events.vibration.cancel();
      }

      if (type === CallEvents.end) {
        clearInterval(interval);
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

  const renderIcon = (icon: any, color: string, onPress: () => void) => {
    return (<View>
      <TouchableOpacity
        style={[styles.btnCall, { backgroundColor: color }]}
        onPress={() => {
          onPress();
        }}>
        <Image style={[styles.icon, { tintColor: color === 'white' ? 'black' : 'white' }]} source={icon} />
      </TouchableOpacity>
    </View>)
  }

  if (!visible) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      transparent
      onRequestClose={() => {
        setVisible(false);
      }}>
      <View style={styles.modalCall}>
        {name.length > 0 && type !== CallEvents.accept && <Text style={styles.name}>{name}</Text>}
        {avatar.length > 0 && type !== CallEvents.accept && (
          <Image style={styles.avatar} source={{ uri: avatar }} />
        )}
        {(type === CallEvents.start || type === CallEvents.received) && <Timer style={styles.timer} textStyle={styles.textTimer} start />}
        {type === CallEvents.accept && remoteStream && (
          <View style={{ flex: 1 }}>

            <RTCView mirror={remoteCameraType === 'front' ? true : false} stream={remoteStream} style={styles.stream} objectFit="cover" />
            {stream && (
              <View style={styles.boxMyStream}>
                <RTCView mirror={cameraType === 'front' ? true : false} stream={stream} style={styles.myStream} objectFit="cover" />
                {type === CallEvents.accept &&
                  <Timer
                    style={styles.timer2}
                    textStyle={styles.textTimer2} start
                  />}
                <TouchableOpacity onPress={() => switchCamera()}>
                  <Image style={styles.iconCamera} source={require('./icons/camera.png')} />
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
        {type === CallEvents.start && (
          <View style={styles.manageCall}>
            {renderIcon(require('./icons/endcall.png'), 'red', () => {
              setVisible(false);
              endCall();
            })}
          </View>
        )}
        {type === CallEvents.received && (
          <View style={styles.manageCall}>
            {renderIcon(require('./icons/call.png'), 'green', () => {
              acceptCall();
            })}
            {renderIcon(require('./icons/endcall.png'), 'red', () => {
              setVisible(false);
              endCall();
            })}
          </View>
        )}
        {type === CallEvents.accept && (
          <View style={styles.manageCall}>
            {renderIcon(require('./icons/micro.png'), audioEnable ? 'white' : 'red', () => {
              audio(!audioEnable);
              setAudioEnable(!audioEnable);
            })}

            {renderIcon(require('./icons/video.png'), videoEnabled ? 'white' : 'red', () => {
              video(!videoEnabled);
              setVideoEnable(!videoEnabled);
            })}

            {renderIcon(require('./icons/endcall.png'), 'red', () => {
              setVisible(false);
              endCall();
            })}

          </View>
        )}
      </View>
    </Modal>
  );
});

export default Call;