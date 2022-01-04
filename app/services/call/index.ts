import { Vibration } from 'react-native';
import { MediaStream } from 'react-native-webrtc';
import {
  ACCEPT_CALL,
  END_CALL,
  MESSAGE,
  RECEIVED_CALL,
  REMOTE_STREAM,
  SEND_MESSAGE,
  START_CALL,
  SetupPeer,
  TypeProps,
  UserDataProps,
} from './contains';
import {
  callToUser,
  listeningRemoteCall,
  peerConnection,
  reconnect,
  destroy,
  startStream
} from './peer';
import { startWebRTC } from './webrtc';

class Call {
  private stream: MediaStream | null = null;
  private peerServer: any = null;
  private arrPeerConn: any[] = [];
  private arrCurrentCall: any[] = [];
  private sessionId: string | null = null;
  private onEnd: () => void = () => { }

  constructor() { }

  public events = {
    call: (receiverId: string, userData: object = {}) => {
      if (this.sessionId) {
        callToUser(this.sessionId, receiverId, userData);
      } else {
        console.log('Error: Session is null');
      }
    },
    acceptCall: () => {
      if (this.arrPeerConn.length > 0) {
        ACCEPT_CALL.next({ peerConn: this.arrPeerConn });
      }
    },
    endCall: () => {
      END_CALL.next({ arrCurrentCall: this.arrCurrentCall, peerConn: this.arrPeerConn });
    },
    switchCamera: () => {
      this.stream?.getVideoTracks().map((track: any) => {
        track._switchCamera();
      });
    },
    videoEnable: (enable: boolean) => {
      this.stream?.getVideoTracks().map((track: any) => {
        track.enabled = enable;
      });
    },
    streamEnable: (enabled: boolean) => {
      this.stream?.getTracks().map((track) => {
        track.enabled = enabled;
      });
    },
    streamDisable: () => {
      this.stream?.getTracks().map((track) => {
        track.stop()
      });
      this.stream = null
    },
    audioEnable: (enable: boolean) => {
      this.stream?.getAudioTracks().map((track: any) => {
        track.enabled = enable;
      });
    },
    vibration: {
      start: () => {
        Vibration.vibrate(2000, true);
      },
      cancel: () => {
        Vibration.cancel();
      }
    },
    message: (message: any) => {
      if (this.arrPeerConn.length > 0) {
        SEND_MESSAGE.next({ peerConn: this.arrPeerConn, message });
      }
    },
    addStream: (callId: string) => {
      if (this.sessionId) {
        startStream(callId, this.stream, this.sessionId);
      } else {
        console.log('Error: Session is null');
      }
    },
  }

  async start(configPeer: SetupPeer) {
    if (this.sessionId === null) {
      const myStream = await startWebRTC();
      this.stream = myStream;
      this.events.streamEnable(false);
      if (myStream) {
        const peer = await peerConnection(configPeer);
        if (peer) {
          this.peerServer = peer;
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  }

  end() {
    this.events.streamDisable();
    this.arrCurrentCall = [];
    this.arrPeerConn = [];
  }

  stop() {
    this.sessionId = null;
    destroy();
  }

  reconnect() {
    reconnect();
  }

  getLocalStream() {
    return this.stream;
  }

  getSessionId(callback: (id: string) => void) {
    if (this.sessionId) {
      callback(this.sessionId);
    } else {
      if (this.peerServer) {
        this.peerServer.on('open', (id: string) => {
          this.sessionId = id;
          listeningRemoteCall(this.sessionId, this.stream);
          callback(id);
        });
        this.peerServer.on('disconnected', async () => {
          reconnect();
        });
      }
    }
  }

  public listenings = {
    callEvents: (callback: (type: TypeProps, userdata?: UserDataProps) => void) => {
      START_CALL.subscribe((data: any) => {
        this.events.streamEnable(true);
        this.arrPeerConn.push(data.peerConn);
        const userData = data?.userData;
        callback('START_CALL', userData);
      });

      RECEIVED_CALL.subscribe((data: any) => {
        this.events.streamEnable(true);
        this.arrPeerConn.push(data.peerConn);
        const userData = data?.userData;
        callback('RECEIVED_CALL', userData);
      });

      ACCEPT_CALL.subscribe((data: any) => {
        callback('ACCEPT_CALL', null);
      });

      END_CALL.subscribe((data: any) => {
        this.events.streamDisable();
        callback('END_CALL', null);
        this.arrCurrentCall = [];
        this.arrPeerConn = [];
        this.onEnd()
      });

      REMOTE_STREAM.subscribe((data: any) => {
        this.arrCurrentCall.push(data.call);
      });

      MESSAGE.subscribe((data: any) => {
        const sessionId = data?.sessionId;
        callback('MESSAGE', sessionId ? data : null);
      });
    },
    getRemoteStream: (callback: (remoteStream: any, sessionId?: string) => void) => {
      REMOTE_STREAM.subscribe((data: any) => {
        callback(data?.remoteStream, data?.sessionId);
      });
    }
  }
};

export default Call;