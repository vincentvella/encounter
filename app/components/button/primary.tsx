import * as React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'

const styles = StyleSheet.create({
  button: {
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12
  },
  buttonText: {
    padding: 16,
    fontWeight: '700'
  },
})

type ButtonProps = {
  title: string,
  color: string,
  textColor?: string,
  onPress?: () => void
}

const PrimaryButton: React.FC<ButtonProps> = ({ title, textColor: color = 'white', color: backgroundColor, onPress = () => { } }) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [styles.button, { backgroundColor, opacity: pressed ? 0.9 : undefined }]}
  >
    <Text style={[styles.buttonText, { color }]}>{title}</Text>
  </Pressable>
)

export default PrimaryButton