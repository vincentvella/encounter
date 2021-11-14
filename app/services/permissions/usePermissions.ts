import * as React from 'react'
import { Camera } from "expo-camera";

export const usePermissions = () => {
  const [cameraEnabled, setCameraEnabled] = React.useState<boolean | undefined>(undefined)
  const [microphoneEnabled, setMicrophoneEnabled] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync()
      const { status: audioStatus } = await Camera.requestMicrophonePermissionsAsync();
      setCameraEnabled(cameraStatus === 'granted')
      setMicrophoneEnabled(audioStatus === 'granted')
    })();
  }, []);

  return cameraEnabled === undefined || microphoneEnabled === undefined
}
