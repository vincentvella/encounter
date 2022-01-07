import * as React from 'react'
import { StyleSheet, Text, TextInput, TextInputProps } from "react-native"
import { useTheme } from '../../services/theme'

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    paddingTop: 12,
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

type InputHandlers = {
  getValue: () => string
}

interface InputProps extends TextInputProps {
  name: string
  onModify?: (text: string) => string
  ref: React.ForwardedRef<InputHandlers>
}

export type Input = InputHandlers & TextInput

export const Input = React.forwardRef<InputHandlers, InputProps>(({ name, onModify = f => f, style = {}, ...props }, ref) => {
  const inputRef = React.useRef<TextInput | null>(null)
  const [value, setValue] = React.useState('')

  const onChangeValue = (text: string) => setValue(onModify(text))

  React.useImperativeHandle(ref, () => ({
    getValue: () => value,
    focus: () => inputRef?.current?.focus()
  }))

  const { colors: { text } } = useTheme()
  const textStyle = React.useMemo<TextInputProps['style']>(() => ([styles.text, { color: text }]), [text])
  const textInputStyle = React.useMemo<TextInputProps['style']>(() => ([styles.textInput, { color: text }, style]), [text])
  return (
    <>
      <Text style={textStyle}>{name}</Text>
      <TextInput
        {...props}
        ref={inputRef}
        style={textInputStyle}
        autoCapitalize="none"
        value={value}
        onChangeText={onChangeValue}
      />
    </>
  )
})
