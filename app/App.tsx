import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { Camera } from 'expo-camera';
import Navigator from './services/navigation/navigator';

export default function App() {
  const [cameraEnabled, setCameraEnabled] = useState<boolean | undefined>(undefined)
  const [microphoneEnabled, setMicrophoneEnabled] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync()
      const { status: audioStatus } = await Camera.requestMicrophonePermissionsAsync();
      setCameraEnabled(cameraStatus === 'granted')
      setMicrophoneEnabled(audioStatus === 'granted')
    })();
  }, []);

  if (cameraEnabled === undefined || microphoneEnabled === undefined) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />
  }

  return (
    <>
      <StatusBar style="auto" />
      <Navigator />
    </>
  );
}

