import { RouteProp } from "@react-navigation/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type AuthenticatedStackParams = {
  tabs: undefined
  'sign-up/profile': undefined
  Call: undefined
}

type UnauthenticatedStackParams = {
  Landing: undefined
  'sign-in': undefined
  'sign-up/phone': undefined
  'sign-up/verification-code': { requestId: string, number: string }
}

export type StackParams = AuthenticatedStackParams & UnauthenticatedStackParams

export type RootStackParamList<Authenticated extends boolean> =
  Authenticated extends true ? AuthenticatedStackParams : UnauthenticatedStackParams

export type RootNavigationProps<Authenticated extends boolean> = NativeStackScreenProps<RootStackParamList<Authenticated>>;

// Extracted navigation prop variable types
// navigation.navigate
export type AuthenticatedRootNavigationProp = RootNavigationProps<true>['navigation'];
export type RootNavigationProp = RootNavigationProps<false>['navigation'];
// navigation.route
export type AuthenticatedRootRouteProp = RootNavigationProps<true>['route'];
export type RootRouteProp<R extends keyof UnauthenticatedStackParams> = RouteProp<UnauthenticatedStackParams, R>