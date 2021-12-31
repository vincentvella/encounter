import * as React from 'react'
import Socket from 'socket.io-client';
import { useRoute } from '@react-navigation/core'
import { View } from 'react-native';
import { AuthenticatedRootRouteProp, } from '../services/navigation/types';
import { useTheme } from '../services/theme';
import VideoChat, { globalCall, globalCallRef } from '../components/call/call'
import CallService from '../services/call'
import { useProfileQuery } from '../generated/types';

// const videoStream = await mediaDevices.getUserMedia({
//   audio: true,
//   video: {
//     facingMode: (isFrontByDefault ? 'user' : 'environment'),
//     // mandatory: {
//     //   minFrameRate: 30,
//     //   minWidth: 640,
//     //   minHeight: 380
//     // },
//     // optional: videoSourceId ? [{ sourceId: videoSourceId }] : []
//   }
// })

// const connectionBuffer = new RTCPeerConnection({
//   iceServers: [
//     { url: 'stun:stun.l.google.com:19302' },
//     { url: 'stun:stun1.l.google.com:19302' },
//     { url: 'stun:stun2.l.google.com:19302' },
//     { url: 'stun:stun3.l.google.com:19302' },
//     { url: 'stun:stun4.l.google.com:19302' },
//   ],
// })

const Call = () => {
  const { colors } = useTheme()
  const Chat = React.useRef(new CallService())
  const [sessionId, setSessionId] = React.useState('');
  const { data } = useProfileQuery()
  const route = useRoute<AuthenticatedRootRouteProp<'call'>>()

  React.useEffect(() => {
    if (data) {
      console.log('setting: ', `encounter-${route.params.id}-${data.findProfile?.id}`)
      Chat.current.start({
        optional: {},
        key: `encounter-${route.params.id}-${data.findProfile?.id}`,
      }, {})
        .then(status => {
          if (status) {
            Chat.current.getSessionId((id: string) => {
              console.log('setting session: ', id)
              setSessionId(id);
              console.log('calling: ', `encounter-${route.params.id}-${route.params.peer}`)
              globalCall.call(`encounter-${route.params.id}-${route.params.peer}`, {})
            });
          }
        })
        .catch();
    }
    return () => {
      Chat.current.end()
    }
  }, [data]);

  // React.useEffect(() => {
  //   if (data && sessionId) {

  //   }
  // }, [data, sessionId])

  if (!sessionId) return null

  return (
    <View style={{ flex: 1 }}>
      <VideoChat ref={globalCallRef} VideoChat={Chat} />
    </View>
  )
}

export default Call