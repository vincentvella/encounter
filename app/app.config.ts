import fs from 'fs'
import { ExpoConfig } from '@expo/config';
import { withDangerousMod, withAppBuildGradle, AndroidConfig, Mod, withSettingsGradle } from '@expo/config-plugins';

const addAfterLine = (data: string[], line: string, newLine: string) => {
  const lineIndex = data.findIndex(d => d === line)
  const newLineIndex = data.findIndex(d => d === newLine)
  if (newLineIndex === -1) {
    data.splice(lineIndex, 0, newLine)
  }
  return data
}

const buildGradleMod: Mod<AndroidConfig.Paths.GradleProjectFile> = (config) => {
  let data = config.modResults.contents.split("\n")
  data = addAfterLine(data, '    implementation "androidx.swiperefreshlayout:swiperefreshlayout:1.0.0"', "    implementation project(':react-native-twilio-video-webrtc')")
  config.modResults.contents = data.join("\n")
  return config
}

const settingsGradleMod: Mod<AndroidConfig.Paths.GradleProjectFile> = (config) => {
  let data = config.modResults.contents.split("\n")
  console.log(data)
  data = addAfterLine(data, 'applyNativeModulesSettingsGradle(settings)', "project(':react-native-twilio-video-webrtc').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-twilio-video-webrtc/android')")
  data = addAfterLine(data, "project(':react-native-twilio-video-webrtc').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-twilio-video-webrtc/android')", "include ':react-native-twilio-video-webrtc'")
  config.modResults.contents = data.join("\n")
  return config
}

const mainApplicationPath = 'android/app/src/main/java/com/encounter/app/MainApplication.java'
const withMainApplication = (config: ExpoConfig) => {
  return withDangerousMod(config, ['android', config => {
    let data = fs.readFileSync(mainApplicationPath).toString().split("\n");
    data = addAfterLine(data, 'import com.swmansion.reanimated.ReanimatedJSIModulePackage;', 'import com.twiliorn.library.TwilioPackage;')
    data = addAfterLine(data, '      packages.add(new ModuleRegistryAdapter(mModuleRegistryProvider));', '      packages.add(new TwilioPackage());    ')
    const text = data.join("\n");
    fs.writeFileSync(mainApplicationPath, text)
    return config
  }])
};

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

export default withSettingsGradle(withAppBuildGradle(withMainApplication(config), buildGradleMod), settingsGradleMod)