import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getMessaging, getToken } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging.js";

const firebaseConfig = {
apiKey: "AIzaSyDA4bWOMeJOAFN4KYnFGf6KFmxkAGOH-QE",
authDomain: "ak-webpush.firebaseapp.com",
projectId: "ak-webpush",
storageBucket: "ak-webpush.firebasestorage.app",
messagingSenderId: "47700861302",
appId: "1:47700861302:web:e2f2ebad20b8d5d0d49a57",
measurementId: "G-R5W22V3HK4"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);


//토큰 재시도 함수 (최대 3회)
async function fetchTokenWithRetry(swReg, retries = 3, initialDelay = 300) {
  let delay = initialDelay;
  for (let i = 0; i < retries; i++) {
    try {
      const token = await getToken(messaging, {
        vapidKey: "BM4kD5RrbNKbVnufzquL448_OySvtdfxAieHrG4zSsU7wwOKvtL6t4azu3G748pKfXakLDpyBe92_91uTVPycbI",
         serviceWorkerRegistration: swReg
      });

      if (token) {
        //console.log(`[FCM] 토큰 획득 성공`);
        return token;
      } else {
        console.warn(`[FCM] 토큰 없음, 재시도 (${i + 1})`);
      }
    } catch (err) {
      console.error(`[FCM] getToken 실패 (${i + 1})`, err);
    }
    await new Promise((res) => setTimeout(res, delay));
    delay *= 2; // Exponential backoff
  }
  return null;
}


// 사용자 권한 요청 + 토큰 획득
if ('Notification' in window && 'serviceWorker' in navigator) {
	//ios filter
	const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.userAgent.includes('Macintosh') && 'ontouchend' in document);
	if (!isIOS)
	{
		Notification.requestPermission().then(async (permission) => {
		if (permission === "granted") {		
		  if(document.cookie.includes('_ptk')) return;

		  const swReg = await navigator.serviceWorker.getRegistration() 
				  || await navigator.serviceWorker.register('/firebase-messaging-sw.js');

			  await navigator.serviceWorker.ready;

			  const token = await fetchTokenWithRetry(swReg);
		  if (token) {
				fetch('https://www.asiae.co.kr/web-push/push_save.php', {
				  method: 'POST',
				  headers: {
					'Content-Type': 'application/json'
				  },
				  body: JSON.stringify({ token: token}),
          credentials: 'include'
				})
				.then(response => response.json())
				.then(data => {
				  console.log('Success:', data);
				})
				.catch(error => {
				  console.error('Fetch failed:', error);
				});
			} else {
			  console.warn('토큰 없음');
			}           
		} else {
		  console.warn("알림 권한이 거부됨");
		}
	  });
	}
}





