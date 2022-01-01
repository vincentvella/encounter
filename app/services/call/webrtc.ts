import { MediaStream } from 'react-native-webrtc';
import { mediaDevices } from 'react-native-webrtc-web-shim';

const startWebRTC = async (): Promise<MediaStream> => {
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
};

export { startWebRTC };