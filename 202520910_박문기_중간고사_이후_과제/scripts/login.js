// login.js

document.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.getElementById('username');
    const loginButton = document.getElementById('login_button');
    const loginForm = document.getElementById('loginForm');

    loginButton.addEventListener('click', () => {
        const userId = usernameInput.value.trim();

    
        if (userId === "") {
            alert('사용자 아이디를 입력해주세요.'); 
            usernameInput.focus(); 
            return; // 이후 로직 실행 중단
        }

        localStorage.setItem('loggedInUser', userId); 
        alert(`${userId}님 로그인 되었습니다.`); 
        
        window.parent.location.href = 'main.html';
    });

    // 취소 버튼 (입력 필드 초기화)
    document.getElementById('reset').addEventListener('click', () => {
        loginForm.reset();
        usernameInput.focus();
    });
});