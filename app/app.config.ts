import { ExpoConfig } from '@expo/config';

const config: ExpoConfig = {
  name: "Encounter",
  slug: "Encounter",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "automatic",
  scheme: "encounter",
  platforms: ["android", "ios", "web"],
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff"
  },
  updates: {
    fallbackToCacheTimeout: 0
  },
  assetBundlePatterns: [
    "**/*"
  ],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.encounter.app",
    infoPlist: {
      NSCameraUsageDescription: "We need to access your camera in order to start video chats.",
      NSMicrophoneUsageDescription: "We need to access your microphone to send audio to other users."
    }
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#FFFFFF"
    },
    permissions: [
      "CAMERA",
      "RECORD_AUDIO",
    ],
    package: "com.encounter.app"
  },
  web: {
    favicon: "./assets/favicon.png"
  }
}

export default config