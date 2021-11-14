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
  indicator: {
    padding: 14.5
  }
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
    disabled={loading}
    onPress={onPress}
    style={({ pressed }) => [styles.button, { backgroundColor, opacity: pressed ? 0.9 : undefined }]}
  >
    {loading ? <ActivityIndicator color={color} style={styles.indicator} /> : <Text style={[styles.buttonText, { color }]}>{title}</Text>}
  </Pressable>
)

export default PrimaryButton