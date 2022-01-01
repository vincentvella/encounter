import {
  SetupPeer,
  CallEvents,
  ACCEPT_CALL,
  END_CALL,
  MESSAGE,
  RECEIVED_CALL,
  REMOTE_STREAM,
  SEND_MESSAGE,
  START_CALL,
} from '../contains';
import Peer from './peer';

let peer: any = null;
const peerConnection = async (configPeer: SetupPeer) => {
  peer = new Peer(configPeer?.key ? configPeer.key : undefined, configPeer.optional ? configPeer.optional : undefined);
  return peer;
};

const listeningRemoteCall = (sessionId: string, myStream: any) => {
  // listening event connect
  peer.on('connection', (peerConn: any) => {
    if (peerConn) {
      peerConn.on('error', (e: any) => {
        console.log(e);
        END_CALL.next();
      });
      peerConn.on('open', () => {
        peerConn.on('data', (data: any) => {
          // the other person call to you
          if (data.type === CallEvents.start) {
            RECEIVED_CALL.next({ peerConn, userData: data.userData });
          }
          // events send message
          if (data.type === CallEvents.message) {
            MESSAGE.next({ sessionId: data.sessionId, message: data.message });
          }
        });
      });
    }
  });

  // listening events accept call
  ACCEPT_CALL.subscribe((data: any) => {
    try {
      if (data?.sessionId) {
        startStream(data.sessionId, myStream, sessionId);
      } else {
        if (data?.peerConn) {
          data.peerConn.map((item: any) => {
            if (item) {
              item.send({ type: CallEvents.accept, sessionId });
            }
          });
        }
      }
    } catch (error) {
      console.log(error);
    }

  });

  // listenings events end call 
  END_CALL.subscribe((data: any) => {
    try {
      if (data) {
        if (data?.arrCurrentCall) {
          data.arrCurrentCall.map((item: any) => {
            if (item) {
              item.close();
            }
          });
        }

        if (data?.peerConn) {
          data.peerConn.map((item: any) => {
            if (item) {
              item.close();
            }
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  });


  // listenings events message
  SEND_MESSAGE.subscribe((data: any) => {
    try {
      if (data && data?.peerConn) {
        data.peerConn.map((item: any) => {
          if (item) {
            item.send({ type: CallEvents.message, sessionId, message: data.message });
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  });

  // listenings events start stream
  peer.on('call', (call: any) => {
    const id = call?.metadata?.sessionId;
    call.answer(myStream);
    call.on('stream', (remoteStream: any) => {
      REMOTE_STREAM.next({ remoteStream, call, sessionId: id });
    });

    call.on('close', function () {
    });
  });
};

const callToUser = (sessionId: string, receiverId: string, userData: any) => {
  // create connection peer to peer
  const peerConn = peer.connect(receiverId);
  if (peerConn) {
    peerConn.on('error', (e: any) => {
      // when connect error then close call
      console.log(e)
      END_CALL.next();
    });
    peerConn.on('open', () => {
      // send a message to the other
      userData.sessionId = sessionId;
      const data = {
        type: CallEvents.start,
        userData,
      }
      peerConn.send(data);
      // save current connection
      START_CALL.next({ peerConn, userData });

      peerConn.on('data', (data: any) => {
        // the other person accept call
        if (data.type === CallEvents.accept) {
          ACCEPT_CALL.next({ peerConn, sessionId: data.sessionId });
        }
      });
    });
  }
};

const startStream = (sessionId: string, myStream: any, mySessionId?: string) => {
  if (peer) {
    const options = { metadata: { "sessionId": mySessionId } };
    const call = peer.call(sessionId, myStream, options);
    call.on('stream', (remoteStream: any) => {
      REMOTE_STREAM.next({ remoteStream, call, sessionId });
    });

    call.on('close', function () {
    });
  }

};

const disconnect = () => {
  peer.disconnect();
}

const reconnect = () => {
  peer.reconnect();
}

const destroy = () => {
  peer.destroy();
}

export {
  peerConnection,
  listeningRemoteCall,
  callToUser,
  startStream,
  disconnect,
  reconnect,
  destroy
};