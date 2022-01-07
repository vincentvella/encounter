import * as React from 'react'
import { useRoute, useNavigation } from '@react-navigation/core'
import { useFocusEffect } from '@react-navigation/native'
import { Text, View } from 'react-native';
import { AuthenticatedRootNavigationProp, AuthenticatedRootRouteProp, } from '../services/navigation/types';
import VideoChat, { globalCall, globalCallRef } from '../components/call/call'
import CallService from '../services/call'
import { useDeleteRoomMutation, useFindRoomQuery, useProfileQuery, useRoomForUserQuery } from '../generated/types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../services/theme';

const Call = () => {
  const { colors } = useTheme()
  const Chat = React.useRef(new CallService())
  const { data } = useProfileQuery()
  const { top } = useSafeAreaInsets()
  const route = useRoute<AuthenticatedRootRouteProp<'call'>>()
  const { data: roomData } = useFindRoomQuery({ variables: { id: route.params.id } })
  const navigation = useNavigation<AuthenticatedRootNavigationProp>()
  const [deleteRoom] = useDeleteRoomMutation()
  const [isCalling, setIsCalling] = React.useState(true)

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


  const onCleanup = () => {
    if (navigation.canGoBack()) {
      navigation.pop()
    }
  }

  const onEnd = () => {
    Chat.current.end()
    setIsCalling(false)
  }

  return (
    <View style={{ flex: 1 }}>
      {isCalling ? (

        <VideoChat
          ref={globalCallRef}
          VideoChat={Chat}
          onEnd={onEnd}
          isCallee={(roomData?.room?.calleeId && data?.findProfile?.id) ? roomData?.room.calleeId === data?.findProfile?.id : null}
        />
      ) : (
        <View>
          <View style={{ backgroundColor: 'red', height: top, width: 40 }} />
          <Text style={{ fontSize: 20, color: colors.text }}>How was it?</Text>
        </View>
      )}
    </View>
  )
}

export default Call