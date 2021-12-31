import { mediaDevices } from 'react-native-webrtc-web-shim';
import { VideoConfigs } from './contains';

const startWebRTC = async (videoConfigs?: VideoConfigs) => {
  const sourceInfos = await mediaDevices.enumerateDevices()
  let isFront = true
  let videoSourceId;
  for (let i = 0; i < sourceInfos.length; i++) {
    const sourceInfo = sourceInfos[i];
    if (sourceInfo.kind == "videoinput" && sourceInfo.facing == (isFront ? "front" : "back")) {
      videoSourceId = sourceInfo.deviceId;
    }
  }
  return mediaDevices.getUserMedia({
    audio: true,
    video: {
      mandatory: {
        minWidth: 500,
        minHeight: 300,
        minFrameRate: 30
      },
      facingMode: (isFront ? "user" : "environment"),
      optional: (videoSourceId ? [{ sourceId: videoSourceId }] : [])
    }
  })
    .then(stream => {
      return stream
    })
    .catch(error => {
      // Log error
    });

};

export { startWebRTC };