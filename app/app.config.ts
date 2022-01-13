export default {
  expo: {
    name: "Encounter",
    slug: "Encounter",
    version: "1.0.0",
    orientation: "default",
    icon: "./assets/icon.png",
    userInterfaceStyle: "automatic",
    scheme: "encounter",
    platforms: [
      "ios",
      "android",
      "web"
    ],
    jsEngine: "hermes",
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
      bundleIdentifier: "com.encounter.app"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF"
      },
      package: "com.encounter.app"
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    plugins: [
      [
        "@config-plugins/react-native-webrtc",
        {
          cameraPermission: "Allow $(PRODUCT_NAME) to access your camera",
          microphonePermission: "Allow $(PRODUCT_NAME) to access your microphone"
        }
      ],
      [
        "expo-community-flipper",
        {
          Flipper: "0.127.0",
          ios: {
            FlipperFolly: "2.6.10",
            FlipperRSocket: "1.4.3",
            FlipperDoubleConversion: "3.1.7",
            FlipperGlog: "0.3.9",
            FlipperPeerTalk: "0.0.4"
          }
        }
      ]
    ]
  },
  extra: {
    // Fall back to development URL when not set
    apiUrl: process.env.API_URL || 'encounter-dev-1.loca.lt/graphql'
  }
}

console.log(process.env)