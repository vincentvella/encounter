import { atom } from "recoil";
import { Cookies } from "../services/storage";

export const isSignedIn = atom({
  key: 'isSignedIn',
  default: !!Cookies.get('jwt'), // default value (aka initial value)
});

export const isOnboarding = atom({
  key: 'isOnboarding',
  default: false,
});