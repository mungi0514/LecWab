// music.js

document.addEventListener('DOMContentLoaded', () => {
    // Media Player Setup (Audio Player 예시)
    const player = document.getElementById('audioPlayer');
    const playPauseBtn = document.getElementById('audioPlayPause');
    const timeDisplay = document.getElementById('audioTime');
    const volumeRange = document.getElementById('audioVolume');

    // 시간 포맷팅 함수
    const formatTime = (seconds) => {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    };

    // 1. 재생/일시 정지 버튼 기능 
    playPauseBtn.addEventListener('click', () => {
        if (player.paused || player.ended) {
            player.play(); 
            playPauseBtn.textContent = '일시 정지'; 
        } else {
            player.pause();
            playPauseBtn.textContent = '재생'; 
        }
    });

    // 2. 재생 시간 표시 기능 
    player.addEventListener('loadedmetadata', () => {
        // 전체 영상 시간 설정
        timeDisplay.textContent = `0:00 / ${formatTime(player.duration)}`;
    });

    player.addEventListener('timeupdate', () => {
        // 현재 진행 시간 업데이트
        timeDisplay.textContent = `${formatTime(player.currentTime)} / ${formatTime(player.duration)}`;
    });

    // 3. 볼륨 변경 기능 (Range 사용) 
    volumeRange.addEventListener('input', () => {
        player.volume = volumeRange.value;
    });

});

document.addEventListener('DOMContentLoaded', () => {
    // Media Player Setup (Audio Player 예시)
    const player = document.getElementById('videoPlayer');
    const playPauseBtn = document.getElementById('videoPlayPause');
    const timeDisplay = document.getElementById('videoTime');
    const volumeRange = document.getElementById('videoVolume');

    // 시간 포맷팅 함수
    const formatTime = (seconds) => {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    };

    // 1. 재생/일시 정지 버튼 기능 
    playPauseBtn.addEventListener('click', () => {
        if (player.paused || player.ended) {
            player.play(); 
            playPauseBtn.textContent = '일시 정지'; 
        } else {
            player.pause();
            playPauseBtn.textContent = '재생'; 
        }
    });

    // 2. 재생 시간 표시 기능 
    player.addEventListener('loadedmetadata', () => {
        // 전체 영상 시간 설정
        timeDisplay.textContent = `0:00 / ${formatTime(player.duration)}`;
    });

    player.addEventListener('timeupdate', () => {
        // 현재 진행 시간 업데이트
        timeDisplay.textContent = `${formatTime(player.currentTime)} / ${formatTime(player.duration)}`;
    });

    // 3. 볼륨 변경 기능 (Range 사용) 
    volumeRange.addEventListener('input', () => {
        player.volume = volumeRange.value;
    });

});