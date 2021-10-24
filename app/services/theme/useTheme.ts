import { useTheme as useNavTheme } from "@react-navigation/native"
import { SemanticTheme } from "./color"

function useTheme() {
  return useNavTheme() as SemanticTheme
}

export default useTheme