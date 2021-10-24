import { DefaultTheme, DarkTheme, Theme } from "@react-navigation/native";

export type SemanticTheme = Theme & {
  colors: Theme['colors'] & {
    info: string
    success: string
    warning: string
    danger: string
    default: string
  }
}

type CompoundTheme = {
  dark: Theme
  light: Theme
}

// Casted to please react navigation
type CastedTheme = {
  dark: Theme
  light: Theme
}

const ThemeColors: Partial<SemanticTheme['colors']> = {
  primary: '#426988',
  default: '#999999',
  info: '#15151c',
  success: '#499a61',
  warning: '#c68a29',
  danger: '#f44336'
} as const

const ColorTheme: CompoundTheme = {
  light: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      ...ThemeColors,
      background: '#ece8ea',
    }
  },
  dark: {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      ...ThemeColors,
      background: '#16151c',
    }
  }
} as CastedTheme

export default ColorTheme