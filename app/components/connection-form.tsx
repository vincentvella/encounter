import * as React from 'react'
import { StyleSheet, TextInput, TextStyle, TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import token from '../services/token';
import { useTheme } from '../services/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center'
  },
  form: {
    padding: 8,
    borderRadius: 8,
    minWidth: '80%',
  },
  formGroup: {
    padding: 8
  },
  text: {
    fontSize: 16,
  },
  textInput: {
    borderBottomWidth: 1,
    height: 40,
    borderBottomColor: 'gainsboro'
  },
  button: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  buttonText: {
    color: 'white'
  }
})

const ConnectionForm = () => {
  const { colors: { text, card, primary } } = useTheme()
  const textStyle = React.useMemo<TextStyle[]>(() => ([styles.text, { color: text }]), [text])
  const textInputStyle = React.useMemo<TextStyle[]>(() => ([styles.textInput, { color: text }]), [text])
  const [username, setUsername] = React.useState('')
  const [roomName, setRoomName] = React.useState('')
  const navigation = useNavigation<any>()
  const validateCall = React.useCallback(async () => {
    const { jwt } = await token.get(username)
    navigation.navigate('Call', { roomName, token: jwt })

  }, [username, roomName])
  return (
    <View style={[styles.form, { backgroundColor: card }]}>
      <View style={styles.formGroup}>
        <Text style={textStyle}>User Name</Text>
        <TextInput
          style={textInputStyle}
          autoCapitalize="none"
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={textStyle}>Room Name</Text>
        <TextInput
          style={textInputStyle}
          autoCapitalize="none"
          value={roomName}
          onChangeText={setRoomName}
        />
      </View>
      <View style={styles.formGroup}>
        <TouchableOpacity
          disabled={false}
          style={[styles.button, { backgroundColor: primary }]}
          onPress={validateCall}
        >
          <Text style={styles.buttonText}>Connect to Video Call</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ConnectionForm