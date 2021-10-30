import * as React from 'react'
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native'

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
  loading?: boolean
  textColor?: string,
  onPress?: () => void
}

const PrimaryButton: React.FC<ButtonProps> = ({ title, textColor: color = 'white', color: backgroundColor, onPress = () => { }, loading = false }) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [styles.button, { backgroundColor, opacity: pressed ? 0.9 : undefined }]}
  >
    {loading ? <ActivityIndicator color={color} /> : <Text style={[styles.buttonText, { color }]}>{title}</Text>}
  </Pressable>
)

export default PrimaryButton