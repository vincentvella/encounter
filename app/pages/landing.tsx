import { useNavigation } from '@react-navigation/native';
import * as React from 'react'
import { StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
import PrimaryButton from '../components/button/primary';
import { RootNavigationProp } from '../services/navigation/types';
import { brand, useTheme } from '../services/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 40
  },
  buttonSection: {
    flex: 1,
    padding: 12,
  },
  footerSection: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 12,
  },
  footer: {
    fontSize: 20
  },
  link: {
    fontWeight: '700',
    textDecorationLine: 'underline'
  }
})

const Landing = () => {
  const { colors } = useTheme()
  const navigation = useNavigation<RootNavigationProp>()
  const phoneSignUp = () => navigation.navigate('sign-up/phone')
  const phoneSignIn = () => navigation.navigate('sign-in')
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>{brand.name}</Text>
      </View>
      <View style={styles.buttonSection}>
        <View>
          <PrimaryButton color={colors.primary} title="Sign up with Facebook" />
          <PrimaryButton color={colors.default} onPress={phoneSignUp} title="Sign up with Phone Number" />
        </View>
      </View>
      <View style={styles.footerSection}>
        <Text style={[styles.footer, { color: colors.text }]}>Already have an account? <Text onPress={phoneSignIn} style={styles.link}>Sign In</Text></Text>
      </View>
    </View>
  );
}

export default Landing