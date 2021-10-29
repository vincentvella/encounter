import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { ActivityIndicator, Platform } from 'react-native';
import { useState } from 'react';
import { Camera } from 'expo-camera';
import Navigator from './services/navigation/navigator';
import { QueryClientProvider } from 'react-query';
import queryClient from './services/client';
import DevTools from './services/client/devtools.native';

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
    <QueryClientProvider client={queryClient}>
      {Platform.OS === 'web' && <DevTools initialIsOpen={true} />}
      <StatusBar style="auto" />
      <Navigator />
    </QueryClientProvider>
  );
}

