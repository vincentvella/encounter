import * as React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import token from '../services/token';
import { useTheme } from '../services/theme';
import { Input } from './inputs/input';

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
  const { colors: { card, primary } } = useTheme()
  const userNameRef = React.useRef<Input>(null)
  const roomNameRef = React.useRef<Input>(null)
  const navigation = useNavigation<any>()
  const validateCall = React.useCallback(async () => {
    const username = userNameRef.current?.getValue()
    const roomName = roomNameRef.current?.getValue()
    if (username && roomName) {
      const { jwt } = await token.get(username)
      navigation.navigate('Call', { roomName, token: jwt })
    }
  }, [])
  return (
    <View style={[styles.form, { backgroundColor: card }]}>
      <View style={styles.formGroup}>
        <Input ref={userNameRef} name="User Name" />
      </View>
      <View style={styles.formGroup}>
        <Input ref={roomNameRef} name="Room Name" />
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