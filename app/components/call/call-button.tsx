import * as React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import IconSet from '@expo/vector-icons/build/vendor/react-native-vector-icons/glyphmaps/MaterialIcons.json'

const styles = StyleSheet.create({
  btnCall: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

type IconProps = {
  icon: keyof typeof IconSet
  color: string
  onPress: () => void
  size: number
}

const CallButton: React.FC<IconProps> = ({ icon, color, onPress, size }) => (
  <TouchableOpacity
    style={[styles.btnCall, { backgroundColor: color }]}
    onPress={onPress}>
    <MaterialIcons
      size={size}
      name={icon}
      color={color}
      style={{ color: color === 'white' ? 'black' : 'white' }}
    />
  </TouchableOpacity>
)

export default CallButton