import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { ActivityIndicator, Platform } from 'react-native';
import { useState } from 'react';
import { Camera } from 'expo-camera';
import Navigator from './services/navigation/navigator';
import client from './services/client';
import { ApolloProvider } from '@apollo/client';
import { RecoilRoot } from 'recoil';

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
    <ApolloProvider client={client}>
      <StatusBar style="auto" />
      <RecoilRoot>
        <Navigator />
      </RecoilRoot>
    </ApolloProvider>
  );
}

