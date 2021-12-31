import { mediaDevices } from 'react-native-webrtc-web-shim';
import { VideoConfigs } from './contains';

const startWebRTC = async (videoConfigs?: VideoConfigs) => {
  console.log('video configuration')
  let isFront = true;
  const sourceInfos = await mediaDevices.enumerateDevices()
  let videoSourceId;
  for (let i = 0; i < sourceInfos.length; i++) {
    const sourceInfo = sourceInfos[i];
    if (
      sourceInfo.kind === 'videoinput' &&
      sourceInfo.facing === (isFront ? 'front' : 'environment')
    ) {
      videoSourceId = sourceInfo.deviceId;
    }
  }

  console.log({ sourceInfos })
  const stream = await mediaDevices.getUserMedia({
    audio: true,
    video: {
      ...videoConfigs,
      facingMode: (isFront ? 'user' : 'environment'),
      // mandatory: {
      //   minFrameRate: 30,
      //   minWidth: 640,
      //   minHeight: 380
      // },
      optional: videoSourceId ? [{ sourceId: videoSourceId }] : []
    }
  })
  console.log({ stream })

  if (stream) {
    return stream;
  }

};

export { startWebRTC };