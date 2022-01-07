import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useTheme } from '../../services/theme'

type CallTimerProps = {
  /**
   * Call Length in Minutes
   */
  callLength: number
  /**
   * Called to end the call
   */
  endCall: () => void
}

export type TimerHandlers = {
  startTimer: (timestamp: string) => void
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'black',
    justifyContent: 'center'
  },
  text: {
    padding: 4,
    color: 'rgb(229, 229, 231)'
  }
})

const getSecondsString = (secondsRemainder: number) => {
  if (secondsRemainder < 10) {
    return `0${Math.max(Math.floor(secondsRemainder), 0)}`
  }
  return Math.max(Math.floor(secondsRemainder), 0)
}

export const globalTimerRef = React.createRef<CallTimer>();
export const globalTimer = {
  startTimer: (timestamp: string) => {
    globalTimerRef?.current?.startTimer(timestamp);
  },
};

export type CallTimer = TimerHandlers & CallTimerProps

const CallTimer = React.forwardRef<TimerHandlers, CallTimerProps>(({ callLength, endCall }, ref) => {
  const [endTime, setEndTime] = React.useState<Date>()
  const [remainingTime, setRemainingTime] = React.useState(callLength * 60)
  React.useImperativeHandle(ref, () => ({
    startTimer: (timestamp: string) => setEndTime(new Date(timestamp))
  }))
  React.useEffect(() => {
    if (endTime) {
      let mounted = true
      const interval = setInterval(() => {
        if (mounted) {
          const now = new Date()
          setRemainingTime((endTime.getTime() - now.getTime()) / 1000)
          setRemainingTime(time => time - 1)
        }
      }, 100)
      return () => {
        mounted = false
        clearInterval(interval)
      }
    }
  }, [endTime])

  React.useEffect(() => {
    if (remainingTime <= 0 && endTime) {
      endCall()
    }
  }, [remainingTime, endTime, endCall])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{`${Math.max(Math.floor(remainingTime / 60), 0)}:${getSecondsString(remainingTime % 60)}`}</Text>
    </View>
  )
})

export default CallTimer