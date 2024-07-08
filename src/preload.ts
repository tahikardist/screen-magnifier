import { ipcRenderer } from "electron";

ipcRenderer.on("SET_SOURCE", async (event, sourceId) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        mandatory: {
          chromeMediaSource: "desktop",
          chromeMediaSourceId: sourceId,
          minWidth: 1920,
          maxWidth: 1920,
          minHeight: 1080,
          maxHeight: 1080,
        },
      },
    });
    handleStream(stream);
  } catch (e) {}
});

async function handleStream(stream: MediaStream) {
  const video = document.querySelector("video");
  video.srcObject = stream;
  let [tracks] = stream.getTracks();
  await tracks.applyConstraints({
    frameRate: { ideal: 60 },
  });
  video.onloadedmetadata = async (e) => {
    video.play();
  };
}
