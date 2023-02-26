const fs = require('fs');
const { createFFmpeg, fetchFile } = require('@ffmpeg/ffmpeg');

const ffmpeg = createFFmpeg({ log: true });

(async () => {
    const videoPath = './assets/video.m4s';
    const audioPath = './assets/audio.m4s';
    const videoName = 'video.m4s';
    const audioName = 'audio.m4s';
    await ffmpeg.load();
    const dataInputVideo = await fetchFile(videoPath);
    const dataInputAudio = await fetchFile(audioPath);
    ffmpeg.FS('writeFile', videoName, dataInputVideo);
    ffmpeg.FS('writeFile', audioName, dataInputAudio);
    await ffmpeg.run('-i', videoName, '-i', audioName, '-c:v', 'copy', '-c:a', 'aac', '-strict', 'experimental', '-map', '0:v:0', '-map', '1:a:0', 'test.mp4');
    await fs.promises.writeFile('test.mp4', ffmpeg.FS('readFile', 'test.mp4'));
    process.exit(0);
})();