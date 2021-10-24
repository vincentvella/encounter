import { useTheme } from '@react-navigation/native';
import * as React from 'react'
import { Pressable, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native';

const styles = StyleSheet.create({
  button: {
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    padding: 16,
    fontWeight: '700'
  },
  title: {
    fontSize: 40
  }
})

type ButtonProps = {
  title: string,
  color: string,
  textColor?: string,
  onPress?: () => void
}

const Button: React.FC<ButtonProps> = ({ title, textColor: color, color: backgroundColor, onPress = () => { } }) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [styles.button, { backgroundColor, opacity: pressed ? 0.9 : undefined }]}
  >
    <Text style={[styles.buttonText, { color: color ? color : 'white' }]}>{title}</Text>
  </Pressable>
)

const Landing = () => {
  const { colors } = useTheme()
  return (
    <View style={{ backgroundColor: colors.background, flex: 1 }}>
      <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={[styles.title, { color: colors.text }]}>Encounter</Text>
      </View>
      <View style={{ flex: 1, padding: 12, justifyContent: 'space-evenly' }}>
        <View>
          <Button color={colors.primary} title="Continue with Facebook" />
        </View>
        <View>
          <Button color={colors.background} textColor={colors.text} title="Enter Phone Number" />
        </View>
      </View>
    </View>
  );
}

export default Landing