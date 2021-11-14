import * as React from 'react'
import { StyleSheet, TextInput, TextInputProps, View } from "react-native"
import { CountrySelector } from './country-selector'
import { Input } from './input'

type InputHandlers = {
  getValue: () => string
}

interface InputProps extends TextInputProps {
  name: string
}

export type PhoneInput = InputHandlers & TextInput

const styles = StyleSheet.create({
  inputStyle: {
    marginLeft: 65,
    fontSize: 16,
    paddingBottom: 2
  }
})

const onModify = (text: string) => text.replace(/[^0-9]/gi, '').substring(0, 10)

export const PhoneInput = React.forwardRef<InputHandlers, InputProps>(({ ...props }, ref) => {
  const phoneNumberRef = React.useRef<Input | null>(null)
  const countryPickerRef = React.useRef<CountrySelector | null>(null)

  React.useImperativeHandle(ref, () => ({
    focus: () => phoneNumberRef?.current?.focus(),
    getValue: () => `${countryPickerRef?.current?.getValue()}${phoneNumberRef?.current?.getValue()}`
  }))

  return (
    <View style={{ flexDirection: 'row' }}>
      <CountrySelector ref={countryPickerRef} />
      <View style={{ flex: 1, marginLeft: -57 }}>
        <Input keyboardType="number-pad" {...props} ref={phoneNumberRef} onModify={onModify} style={styles.inputStyle} />
      </View>
    </View>
  )
})
