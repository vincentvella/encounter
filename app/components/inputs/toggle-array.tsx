import { MaterialIcons } from '@expo/vector-icons'
import * as React from 'react'
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native"
import { useTheme } from '../../services/theme'

export type ToggleArrayHandlers = {
  getValue: () => Record<string, boolean>
}

type Props = {
  values: { message: string, name: string }[]
}

export type RatingSelectorProps = ToggleArrayHandlers

const styles = StyleSheet.create({
  container: {
    paddingTop: 20
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    paddingVertical: 8,
    fontSize: 16,
    width: 200
  }
})

const getInitialValue = (values: { message: string, name: string }[]) => values.reduce((acc, v) => {
  acc[v.name] = false
  return acc
}, {} as Record<string, boolean>)

export const ToggleArray = React.forwardRef<RatingSelectorProps, Props>(({ values = [] }, ref) => {
  const { colors } = useTheme()
  const [value, setValue] = React.useState(getInitialValue(values))

  React.useImperativeHandle(ref, () => ({
    getValue: () => value
  }))

  return (
    <View style={styles.container}>
      {values.map(v => {
        const currentValue = value[v.name]
        const toggleValue = () => setValue(currVal => ({ ...currVal, [v.name]: !currVal[v.name] }))
        return (
          <View style={styles.rowContainer} key={v.name}>
            <Text style={[styles.text, { color: colors.text }]}>{v.message}</Text>
            <Switch onChange={toggleValue} value={currentValue} />
          </View>
        )
      })}
    </View>
  )
})
