import * as React from 'react'
import { useRoute, useNavigation, useNavigationState } from '@react-navigation/core'
import { useFocusEffect } from '@react-navigation/native'
import { View } from 'react-native';
import { AuthenticatedRootNavigationProp, AuthenticatedRootRouteProp, } from '../services/navigation/types';
import { useTheme } from '../services/theme';
import VideoChat, { globalCall, globalCallRef } from '../components/call/call'
import CallService from '../services/call'
import { useDeleteRoomMutation, useProfileQuery } from '../generated/types';

const Call = () => {
  const { colors } = useTheme()
  const Chat = React.useRef(new CallService())
  const { data } = useProfileQuery()
  const route = useRoute<AuthenticatedRootRouteProp<'call'>>()
  const navigation = useNavigation<AuthenticatedRootNavigationProp>()

  const [deleteRoom] = useDeleteRoomMutation()

  useFocusEffect(React.useCallback(() => {
    return () => {
      try {
        deleteRoom({ variables: { id: route.params.id } })
      } catch (_) { }
    }
  }, [deleteRoom, route.params]))

  React.useEffect(() => {
    if (data) {
      Chat.current.start({
        optional: {},
        key: `encounter-${route.params.id}-${data.findProfile?.id}`,
      }).then(status => {
        if (status) {
          Chat.current.getSessionId(() => {
            if (data.findProfile?.id !== route.params.peer) {
              globalCall.call(`encounter-${route.params.id}-${route.params.peer}`, {})
            }
          });
        }
      })
        .catch();
    }
    return () => {
      Chat.current.end()
    }
  }, [data]);


  const onEnd = () => {
    if (navigation.canGoBack()) {
      navigation.pop()
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <VideoChat ref={globalCallRef} VideoChat={Chat} onEnd={onEnd} />
    </View>
  )
}

export default Call