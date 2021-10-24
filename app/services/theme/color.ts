import { DefaultTheme, DarkTheme } from "@react-navigation/native";

const ColorTheme = {
  light: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'rgba(255,255,255,.15)'
    }
  },
  dark: {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: 'rgba(0,0,0,.5)'
    }
  }
} as const

export default ColorTheme