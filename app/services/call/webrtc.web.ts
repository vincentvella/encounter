import { mediaDevices, MediaStream } from 'react-native-webrtc-web-shim';

const startWebRTC = async (): Promise<MediaStream> => {
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

  return await mediaDevices.getUserMedia({
    audio: true,
    video: {
      facingMode: (isFront ? 'user' : 'environment'),
      // mandatory: {
      //   minFrameRate: 30,
      //   minWidth: 640,
      //   minHeight: 380
      // },
      optional: videoSourceId ? [{ sourceId: videoSourceId }] : []
    }
  })
};

export { startWebRTC };