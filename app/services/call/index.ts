import { Vibration } from 'react-native';
import {
  ACCEPT_CALL,
  END_CALL,
  JOIN_GROUP_CALL,
  LEAVE_GROUP_CALL,
  MESSAGE,
  RECEIVED_CALL,
  RECEIVED_GROUP_CALL,
  REMOTE_STREAM,
  SEND_MESSAGE,
  START_CALL,
  START_GROUP_CALL,
  SetupPeer,
  TypeProps,
  UserDataProps,
  VideoConfigs
} from './contains';
import {
  callToUser,
  joinGroup,
  leaveGroup,
  listeningRemoteCall,
  peerConnection,
  reconnect,
  destroy,
  startGroup,
  startStream
} from './peer';
import { startWebRTC } from './webrtc';


class Call {
  private stream: MediaStream | null = null;
  private peerServer: any = null;
  private arrPeerConn: any[] = [];
  private arrCurrentCall: any[] = [];
  private sessionId: string | null = null;

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
    groupCall: (groupSessionId: string[], userData: object = {}) => {
      if (this.sessionId) {
        this.events.streamEnable(true);
        startGroup(this.sessionId, groupSessionId, userData);
      } else {
        console.log('Error: Session is null');
      }
    },
    joinGroup: (arrSessionId: string[]) => {
      if (this.sessionId) {
        this.events.streamEnable(true);
        joinGroup(this.sessionId, arrSessionId);
      } else {
        console.log('Error: Session is null');
      }
    },
    leaveGroup: () => {
      if (this.sessionId) {
        this.events.streamDisable();
        leaveGroup({ sessionId: this.sessionId, arrCurrentCall: this.arrCurrentCall, peerConn: this.arrPeerConn });
      } else {
        console.log('Error: Session is null');
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

  async start(configPeer: SetupPeer, videoConfigs?: VideoConfigs) {
    console.log('this...', this.sessionId)
    if (this.sessionId === null) {
      const myStream = await startWebRTC(videoConfigs);
      console.log('myStream', myStream)
      this.stream = myStream;
      this.events.streamEnable(false);
      if (myStream) {
        console.log('setting up mystream', myStream)
        const peer = await peerConnection(configPeer);
        console.log('setting up stream', configPeer)
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
          console.log('here', id)
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
      });

      REMOTE_STREAM.subscribe((data: any) => {
        this.arrCurrentCall.push(data.call);
      });

      MESSAGE.subscribe((data: any) => {
        const sessionId = data?.sessionId;
        callback('MESSAGE', sessionId ? data : null);
      });

      START_GROUP_CALL.subscribe((data: any) => {
        this.arrPeerConn.push(data.peerConn);
        callback('START_GROUP_CALL', null);
      });

      RECEIVED_GROUP_CALL.subscribe((data: any) => {
        this.events.streamEnable(true);
        this.arrPeerConn.push(data.peerConn);
        const userData = data?.userData;
        callback('RECEIVED_GROUP_CALL', userData);
      });

      JOIN_GROUP_CALL.subscribe((data: any) => {
        this.arrPeerConn.push(data.peerConn);
        const sessionId = data?.sessionId;
        callback('JOIN_GROUP_CALL', sessionId ? { sessionId } : null);
      });
      LEAVE_GROUP_CALL.subscribe((data: any) => {
        const sessionId = data?.sessionId;
        callback('LEAVE_GROUP_CALL', sessionId ? { sessionId } : null);
        if (!sessionId) {
          this.arrCurrentCall = [];
          this.arrPeerConn = [];
        }
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