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
    justifyContent: 'space-evenly'
  },
})

const Landing = () => {
  const { colors } = useTheme()
  const navigation = useNavigation<RootNavigationProp>()
  const phoneSignIn = () => navigation.navigate('sign-in/phone')
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>{brand.name}</Text>
      </View>
      <View style={styles.buttonSection}>
        <View>
          <PrimaryButton color={colors.primary} title="Continue with Facebook" />
          <PrimaryButton color={colors.default} onPress={phoneSignIn} title="Enter Phone Number" />
        </View>
      </View>
    </View>
  );
}

export default Landing