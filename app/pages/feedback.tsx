import { useNavigation } from '@react-navigation/native'
import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ContinuationToggle } from '../components/inputs/continuation-toggle'
import { RatingSelector } from '../components/inputs/rating-selector'
import { ToggleArray } from '../components/inputs/toggle-array'
import { AuthenticatedRootNavigationProp } from '../services/navigation/types'
import { useTheme } from '../services/theme'

const styles = StyleSheet.create({
  container: {
    padding: 12,
    paddingHorizontal: 24
  },
  title: {
    fontSize: 20
  },
  subtitle: {
    fontSize: 16,
  },
  starRow: {
    alignItems: 'center'
  }
})

const Feedback = () => {
  const [continuation, setContinuation] = React.useState(false)
  const navigation = useNavigation<AuthenticatedRootNavigationProp>()
  const { colors } = useTheme()

  const afterSubmit = () => {
    if (navigation.canGoBack()) {
      navigation.popToTop()
    }
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>
        Would you like to continue this encounter?
      </Text>
      <ContinuationToggle select={setContinuation} value={continuation} />
      {continuation && (
        <>
          <Text style={[styles.title, { color: colors.text, paddingTop: 24 }]}>
            Build your contact card
          </Text>
          <Text style={[styles.subtitle, { color: colors.text, paddingTop: 4 }]}>
            We will share this information with the person you just met
          </Text>
          <ToggleArray
            values={[
              { message: 'Name', name: 'name' },
              { message: 'Email', name: 'email' },
              { message: 'Phone Number', name: 'phoneNumber' }
            ]}
          />
        </>
      )}
      <Text style={[styles.title, { color: colors.text, alignSelf: 'center', paddingTop: 24 }]}>
        Rate the person you met
      </Text>
      <View style={styles.starRow}>
        <RatingSelector stars={5} />
      </View>
      <Text style={[styles.title, { color: colors.text, alignSelf: 'center', paddingTop: 24 }]}>
        Rate the call quality
      </Text>
      <View style={styles.starRow}>
        <RatingSelector stars={5} />
      </View>
    </View>
  )
}

export default Feedback