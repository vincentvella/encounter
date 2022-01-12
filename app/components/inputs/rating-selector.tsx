import { MaterialIcons } from '@expo/vector-icons'
import * as React from 'react'
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { useTheme } from '../../services/theme'

export type RatingSelectorHandlers = {
  getValue: () => number
}

type Props = {
  stars: number
}

export type RatingSelectorProps = RatingSelectorHandlers

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  }
})

function useStarIconName(star: number, rating: number) {
  const value = star - rating
  if (value === .5) {
    return 'star-half'
  } else if (value <= 0) {
    return 'star'
  } else {
    return 'star-outline'
  }
}

type StarPickerProps = {
  color: string
  selectLeft: () => void
  selectRight: () => void
  star: number
  rating: number
}

const StarPicker: React.FC<StarPickerProps> = ({ color, selectLeft, selectRight, star, rating }) => {
  const iconName = useStarIconName(star, rating)
  return (
    <View>
      <MaterialIcons name={iconName} color={color} size={50} />
      <TouchableOpacity onPress={selectLeft} style={{ width: '50%', height: 50, position: 'absolute' }} />
      <TouchableOpacity onPress={selectRight} style={{ width: '50%', height: 50, position: 'absolute', alignSelf: 'flex-end' }} />
    </View>
  )
}

type Stars = {
  stars: number
  color: string
  setter: (value: number) => void
  rating: number
}

const Stars: React.FC<Stars> = ({ stars, color, setter, rating }) => {
  const starComponents = []
  for (let star = 1; star <= stars; star++) {
    const setLeft = () => setter(star - .5)
    const setRight = () => setter(star)
    starComponents.push(<StarPicker key={star} star={star} rating={rating} color={color} selectLeft={setLeft} selectRight={setRight} />)
  }
  return (
    <>{starComponents}</>
  )
}

export const RatingSelector = React.forwardRef<RatingSelectorProps, Props>(({ stars }, ref) => {
  const [rating, setRating] = React.useState(0)
  const { colors } = useTheme()

  React.useImperativeHandle(ref, () => ({
    getValue: () => rating
  }))

  return (
    <View style={styles.container}>
      <Stars stars={stars} color={colors.text} setter={setRating} rating={rating} />
    </View>
  )
})
