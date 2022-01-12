import { useNavigation, useRoute } from '@react-navigation/native'
import * as React from 'react'
import * as Yup from 'yup'
import { StyleSheet, Text, View } from 'react-native'
import PrimaryButton from '../components/button/primary'
import { ContinuationToggle } from '../components/inputs/continuation-toggle'
import { RatingSelector, RatingSelectorHandlers } from '../components/inputs/rating-selector'
import { ToggleArray, ToggleArrayHandlers } from '../components/inputs/toggle-array'
import { CreateFeedbackInput, useCreateFeedbackMutation } from '../generated/types'
import { AuthenticatedRootNavigationProp, AuthenticatedRootRouteProp } from '../services/navigation/types'
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

const sharedAttributesValidation = Yup.object({
  firstName: Yup.bool().required(),
  lastName: Yup.bool().required(),
  email: Yup.bool().required(),
  phoneNumber: Yup.bool().required()
}).required()

const Feedback = () => {
  const toggleArrayRef = React.useRef<ToggleArrayHandlers>(null)
  const peerRef = React.useRef<RatingSelectorHandlers>(null)
  const callQualityRef = React.useRef<RatingSelectorHandlers>(null)
  const [continuation, setContinuation] = React.useState(false)
  const navigation = useNavigation<AuthenticatedRootNavigationProp>()
  const route = useRoute<AuthenticatedRootRouteProp<'feedback'>>()
  const { colors } = useTheme()
  const [createFeedback, { loading }] = useCreateFeedbackMutation({
    onCompleted: (_) => afterSubmit()
  })

  const afterSubmit = () => {
    if (navigation.canGoBack()) {
      navigation.popToTop()
    }
  }

  const onSubmit = async () => {
    try {
      const sharedAttributes = await sharedAttributesValidation.validate(toggleArrayRef.current?.getValue())
      const createFeedbackInput: CreateFeedbackInput = {
        roomId: route.params.id,
        continuation,
        sharedAttributes,
        peerRating: peerRef.current?.getValue(),
        callQuality: callQualityRef.current?.getValue()
      }
      createFeedback({ variables: { createFeedbackInput } })
    } catch (err) {
      console.log(err)
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
            ref={toggleArrayRef}
            values={[
              { message: 'First Name', name: 'firstName' },
              { message: 'Last Name', name: 'lastName' },
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
        <RatingSelector ref={peerRef} stars={5} />
      </View>
      <Text style={[styles.title, { color: colors.text, alignSelf: 'center', paddingTop: 24 }]}>
        Rate the call quality
      </Text>
      <View style={styles.starRow}>
        <RatingSelector ref={callQualityRef} stars={5} />
      </View>
      <PrimaryButton loading={loading} title='Submit' color={colors.primary} onPress={onSubmit} />
    </View>
  )
}

export default Feedback