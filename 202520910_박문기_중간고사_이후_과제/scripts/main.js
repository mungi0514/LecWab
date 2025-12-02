// main.js

document.addEventListener('DOMContentLoaded', () => {
    const displayArea = document.querySelector('iframe[name="display_area"]');
    const memoButton = document.getElementById('memo');
    const locationButton = document.getElementById('location');
    const locationOutput = document.getElementById('location-output');

    // 1. "메모하기" 버튼 숨기기 
    memoButton.style.display = 'none';

    // 2. 버튼 클릭 이벤트 핸들러
    document.getElementById('all').addEventListener('click', () => {
        displayArea.src = 'all_books.html'; 
    });

    document.getElementById('best').addEventListener('click', () => {
        displayArea.src = 'best_seller.html'; 
    });

    document.getElementById('recommend').addEventListener('click', () => {
        displayArea.src = 'recommend_books.html';
    });

    // 3. "현재위치" 버튼 클릭 시 위도, 경도 출력 
    locationButton.addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    locationOutput.innerHTML = `
                        <p style="margin-top: 5px;">
                            위도: ${latitude.toFixed(4)}<br>
                            경도: ${longitude.toFixed(4)}
                        </p>
                    `;
                },
                (error) => {
                    locationOutput.textContent = '위치 정보를 가져올 수 없습니다.';
                    console.error('Geolocation Error:', error);
                }
            );
        } else {
            locationOutput.textContent = '이 브라우저는 Geolocation을 지원하지 않습니다.';
        }
    });
});
