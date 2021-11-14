import * as React from 'react'
import { Platform } from "react-native"

export const StyleShim = () => {
  if (Platform.OS !== 'web') return null
  return (
    <style type="text/css" > {`
    .js-focus-visible :focus:not(.focus-visible) {
      outline: none;
    }
    textarea, select, input, button {
      -webkit-appearance: none;
      outline: none!important;
    }
    textarea:focus, select:focus, input:focus, button:focus {
      -webkit-appearance: none;
      outline: none!important;
    }
    `}</style>
  )
}
