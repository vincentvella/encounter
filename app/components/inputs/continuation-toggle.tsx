import { MaterialIcons } from '@expo/vector-icons'
import * as React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useTheme } from '../../services/theme'


type Props = {
  value: boolean
  select: (value: boolean) => void
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  selectorContainer: {
    padding: 24,
    margin: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  }
})

type SelectorProps = {
  color: string
  selected: boolean
  text: string
  onSelect: () => void
}

const Selector: React.FC<SelectorProps> = ({ text, color, selected, onSelect }) => {
  const { colors } = useTheme()
  return (
    <TouchableOpacity
      onPress={onSelect}
      style={[
        styles.selectorContainer,
        selected ? { backgroundColor: color } : { borderColor: color, borderWidth: 1 }
      ]}>
      <MaterialIcons style={{ padding: 12 }} size={25} color={selected ? colors.text : color} name={text === "Yes" ? 'check' : 'close'} />
      <Text style={{ color: selected ? colors.text : color }}>{text}</Text>
    </TouchableOpacity>
  )
}

export const ContinuationToggle: React.FC<Props> = ({ select, value }) => {
  const { colors } = useTheme()

  const setNo = () => select(false)
  const setYes = () => select(true)

  return (
    <View style={styles.container}>
      <Selector text="No" onSelect={setNo} color={colors.danger} selected={value === false} />
      <Selector text="Yes" onSelect={setYes} color={colors.success} selected={value === true} />
    </View>
  )
}
