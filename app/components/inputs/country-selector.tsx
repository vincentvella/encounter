import * as React from 'react'
import CountryPicker, { Country, CountryCode, DARK_THEME } from 'react-native-country-picker-modal'
import { StyleSheet, Text, TextInputProps, TextStyle, useColorScheme, View } from "react-native"
import countryData from 'react-native-country-picker-modal/lib/assets/data/countries-emoji.json'
import { useTheme } from '../../services/theme'

const getCountryData = (country: CountryCode): Country => {
  const data = countryData[country] as unknown as Country
  return {
    ...data,
    cca2: `+${data.callingCode[0]}` as CountryCode,
  }
}

const styles = StyleSheet.create({
  container: {
    zIndex: 3,
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderBottomColor: 'gainsboro',
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 16,
    paddingVertical: 12,
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
  ref: React.ForwardedRef<InputHandlers>
}

export type CountrySelector = InputHandlers

export const CountrySelector = React.forwardRef<InputHandlers, InputProps>(({ }, ref) => {
  const [visible, setVisible] = React.useState(false)
  const [countryCode, setCountryCode] = React.useState<CountryCode>('US')
  const [country, setCountry] = React.useState<Country>()

  React.useImperativeHandle(ref, () => ({
    getValue: () => `+${country?.callingCode}`
  }))

  React.useEffect(() => {
    setCountry(getCountryData(countryCode))
  }, [])

  const theme = useColorScheme()
  const { colors: { text } } = useTheme()
  const textStyle = React.useMemo<TextStyle[]>(() => ([styles.text, { color: text }]), [text])

  const onSelect = (country: Country) => setCountryCode(country.cca2)
  const onOpen = () => setVisible(true)
  const onClose = () => setVisible(false)

  return (
    <View style={styles.container}>
      <CountryPicker
        theme={theme === 'dark' ? DARK_THEME : undefined}
        withCallingCode
        countryCode={countryCode}
        translation="common"
        onSelect={onSelect}
        countryCodes={["US"]}
        modalProps={{ visible }}
        onOpen={onOpen}
        onClose={onClose}
        withFilter={true}
      />
      <Text onPress={onOpen} style={textStyle}>+{country?.callingCode}</Text>
    </View>
  )
})
