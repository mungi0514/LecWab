// --- [1] 가상 회원 데이터베이스 ---
const USER_DB = {
    "202520910": { pw: "0000", name: "박문기", days: 23 },
    "202520907": { pw: "1111", name: "김태현", days: 48 }
};

// --- 전역 변수 ---
let currentPrice = 10000;
let currentSelectedLocker = null; 
let currentLockerPrice = 5000;

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus(); 
    drawCalendar();     
    setupAccordion();   
});

// --- [2] 로그인 로직 ---
function login() {
    const idInput = document.getElementById('userid').value;
    const pwInput = document.getElementById('userpw').value;

    if (USER_DB.hasOwnProperty(idInput)) {
        const user = USER_DB[idInput];
        if (user.pw === pwInput) {
            localStorage.setItem('smu_user_id', idInput);
            localStorage.setItem('smu_user_name', user.name);
            
            // 잔여 기간 초기화 (없을 경우에만 DB값 사용, 있다면 유지)
            // *테스트 편의를 위해 로그인 시마다 DB값으로 리셋하려면 아래 if문 제거하고 내부 코드만 남기세요*
            if (!localStorage.getItem('smu_expire_days_' + idInput)) {
                localStorage.setItem('smu_expire_days_' + idInput, user.days); 
            }

            alert(`${user.name}님 환영합니다.`);
            updateLoginUI(idInput);
        } else {
            alert("비밀번호가 일치하지 않습니다.");
        }
    } else {
        alert("존재하지 않는 회원 정보입니다.");
    }
}

function logout() {
    if(confirm("로그아웃 하시겠습니까?")) {
        localStorage.removeItem('smu_user_id');
        localStorage.removeItem('smu_user_name');
        // 개인별 기간/사물함 정보는 삭제하지 않음 (서버 저장 효과)
        alert("로그아웃 되었습니다.");
        window.location.reload(); 
    }
}

function checkLoginStatus() {
    const savedId = localStorage.getItem('smu_user_id');
    const loginSection = document.getElementById('login-section');
    const mypageSection = document.getElementById('mypage-section');

    if (savedId) {
        if (loginSection && mypageSection) {
            loginSection.style.display = 'none';
            mypageSection.style.display = 'block';
            loadUserData(savedId); 
        }
        updateHeaderLinks(true);
    } else {
        if (loginSection && mypageSection) {
            loginSection.style.display = 'block';
            mypageSection.style.display = 'none';
        }
        updateHeaderLinks(false);
    }
}

function updateHeaderLinks(isLoggedIn) {
    const utilLinks = document.querySelector('.util-links');
    if(utilLinks) {
        if(isLoggedIn) {
            utilLinks.innerHTML = `<a href="#">KOR</a> | <a href="#" onclick="logout()">로그아웃</a>`;
        } else {
            utilLinks.innerHTML = `<a href="#">KOR</a> | <a href="mypage.html">로그인</a>`;
        }
    }
}

function updateLoginUI(id) {
    const loginSection = document.getElementById('login-section');
    const mypageSection = document.getElementById('mypage-section');
    if (loginSection && mypageSection) {
        loginSection.style.display = 'none';
        mypageSection.style.display = 'block';
        loadUserData(id);
    }
    updateHeaderLinks(true);
}

// --- [3] 마이페이지 데이터 로드 (개인화) ---
function loadUserData(userId) {
    // 1. 이름 표시
    const savedName = localStorage.getItem('smu_user_name') || userId;
    const userNameElements = document.getElementsByClassName('user-name');
    if(userNameElements.length > 0) {
        userNameElements[0].innerHTML = `<strong style="font-size:1.2em;">${savedName}</strong> 님`;
    }

    // 2. 남은 일수 (ID별로 분리 저장된 키 사용)
    let savedDays = localStorage.getItem('smu_expire_days_' + userId);
    savedDays = savedDays ? parseInt(savedDays) : 0;

    const daysElement = document.getElementById('days-remaining');
    if(daysElement) {
        if (savedDays > 0) {
            daysElement.innerHTML = `<span style="font-size:1.5em; color:#003E7E; font-weight:bold;">${savedDays}</span>일 남았습니다.`;
            daysElement.style.background = "#eaf2ff"; 
        } else {
            daysElement.innerHTML = `<span style="color:#e74c3c; font-weight:bold;">이용 기간이 만료되었습니다.</span>`;
            daysElement.style.background = "#fff0f0"; 
        }
    }

    updateLockerUI(userId); // ID 전달
}

// --- [4] 사물함 로직 (개별 배정 핵심) ---

// 통합 사물함 데이터 가져오기
function getAllLockers() {
    const data = localStorage.getItem('smu_all_lockers');
    return data ? JSON.parse(data) : {};
}

function updateLockerUI(userId) {
    const lockerDiv = document.getElementById('locker-info');
    if (!lockerDiv) return;

    // 전체 사물함 목록에서 내 ID로 된 게 있는지 확인
    const allLockers = getAllLockers();
    const myLocker = allLockers[userId]; // 내 사물함 정보

    if (!myLocker) {
        // 미등록 상태
        lockerDiv.innerHTML = `
            <div class="locker-status-box">
                <p style="color:#666; font-size:13px; margin-bottom:10px;">현재 이용 중인 사물함이 없습니다.</p>
                <button onclick="openLockerModal()" class="btn-primary" style="padding: 8px 15px; font-size:13px;">사물함 신청</button>
            </div>
        `;
    } else {
        // 등록 상태
        lockerDiv.innerHTML = `
            <div class="locker-status-box" style="border: 1px solid #e1e1e1; background: #fff;">
                <p style="font-size:14px; margin-bottom:5px; color:#003E7E;"><strong>No. ${myLocker.no}</strong> (사용 중)</p>
                <p style="font-size:12px; color:#666; margin-bottom:5px;">이용기간: ${myLocker.month}개월</p>
                <p style="font-size:13px;">비밀번호: <span class="locker-pw-text">${myLocker.pw}</span></p>
                <button onclick="resetLocker('${userId}')" style="margin-top:10px; font-size:11px; color:#999; border:none; background:none; cursor:pointer; text-decoration:underline;">반납하기</button>
            </div>
        `;
    }
}

function calculateLockerPrice() {
    const month = parseInt(document.getElementById('locker-month-select').value);
    const priceTable = { 1: 5000, 3: 13000, 5: 20000, 12: 40000 };
    currentLockerPrice = priceTable[month] || 5000;
    document.getElementById('locker-final-price').innerText = currentLockerPrice.toLocaleString();
}

function openLockerModal() {
    const modal = document.getElementById('locker-modal');
    modal.style.display = 'flex';
    document.getElementById('locker-pw-input').value = '';
    document.getElementById('locker-month-select').value = "1";
    currentSelectedLocker = null;
    document.getElementById('selected-locker-msg').innerText = "선택된 사물함: 없음";
    calculateLockerPrice();
    renderLockerGrid();
}

function renderLockerGrid() {
    const grid = document.getElementById('locker-grid');
    grid.innerHTML = ''; 

    // 현재 사용중인 모든 사물함 번호 찾기
    const allLockers = getAllLockers();
    const occupiedNumbers = [];
    
    // DB에 있는 실제 사용자들의 사물함
    for (let key in allLockers) {
        occupiedNumbers.push(allLockers[key].no);
    }
    // + 시스템상 이미 차있는 가상의 사물함 (리얼함을 위해)
    const systemOccupied = [3, 15, 19]; 
    
    for (let i = 1; i <= 20; i++) {
        const btn = document.createElement('div');
        btn.className = 'locker-item';
        btn.innerText = i;
        
        // 실제 유저가 쓰고 있거나, 시스템이 쓰고 있다면 '사용중' 처리
        if (occupiedNumbers.includes(i) || systemOccupied.includes(i)) {
            btn.classList.add('occupied');
            btn.innerText = "사용중";
            btn.onclick = null; // 클릭 방지
        } else {
            btn.onclick = function() { selectLocker(i, btn); };
        }
        grid.appendChild(btn);
    }
}

function selectLocker(num, element) {
    const prev = document.querySelector('.locker-item.selected');
    if (prev) prev.classList.remove('selected');
    element.classList.add('selected');
    currentSelectedLocker = num;
    document.getElementById('selected-locker-msg').innerText = `선택된 사물함: ${num}번`;
}

function confirmLockerRegister() {
    const pwInput = document.getElementById('locker-pw-input').value;
    const month = document.getElementById('locker-month-select').value;
    const userId = localStorage.getItem('smu_user_id');

    // 선택된 사물함 결제 수단 가져오기
    const payMethod = document.querySelector('input[name="locker-pay-method"]:checked').value;

    if (currentSelectedLocker === null) { alert("위치를 선택해주세요."); return; }
    if (pwInput.length !== 4 || isNaN(pwInput)) { alert("비밀번호 4자리를 입력해주세요."); return; }

    // 확인 메시지에 결제 수단 포함
    const msg = `[${currentSelectedLocker}번 사물함 신청]\n` + 
                `기간: ${month}개월\n` + 
                `금액: ${currentLockerPrice.toLocaleString()}원\n` + 
                `결제 수단: ${payMethod}\n\n` + 
                `결제하시겠습니까?`;

    if(confirm(msg)) {
        const allLockers = getAllLockers();
        
        allLockers[userId] = {
            no: currentSelectedLocker,
            pw: pwInput,
            month: month,
            price: currentLockerPrice,
            payMethod: payMethod // 결제 수단도 데이터에 저장
        };

        localStorage.setItem('smu_all_lockers', JSON.stringify(allLockers));
        
        alert(`[${payMethod}] 결제가 완료되었습니다.`);
        closeLockerModal(); 
        updateLockerUI(userId); 
    }
}

function closeLockerModal() {
    document.getElementById('locker-modal').style.display = 'none';
}

function resetLocker(userId) {
    if(confirm("정말 반납하시겠습니까? (남은 기간 환불 불가)")) {
        const allLockers = getAllLockers();
        delete allLockers[userId]; // 내 정보만 삭제
        localStorage.setItem('smu_all_lockers', JSON.stringify(allLockers)); // 업데이트
        
        updateLockerUI(userId);
        alert("반납되었습니다.");
    }
}

// --- 기타 기능 ---
// --- [수정] 가격 계산 함수 ---
function calculatePrice() {
    const month = parseInt(document.getElementById('month-select').value);
    
    // 1. 기간별 원래 가격 구하기 (베이스 가격)
    const discountPrices = {
        3: 29000,
        5: 49000,
        12: 116000
    };

    if (discountPrices[month]) {
        currentPrice = discountPrices[month];
    } else {
        currentPrice = month * 10000;
    }
    
    // 2. 화면 업데이트 (일단 원래 가격으로 표시)
    document.getElementById('final-price').innerText = currentPrice.toLocaleString();
    
    // 3. 개월 수를 바꾸면 쿠폰 적용 상태는 초기화 (사용자 혼동 방지)
    const msg = document.getElementById('coupon-message');
    if(msg) {
        msg.innerText = ""; 
        document.getElementById('coupon-code').value = "";
    }
}

// --- [수정] 쿠폰 적용 함수 (중복 허용 + 무한 할인 버그 수정) ---
function applyCoupon() {
    const code = document.getElementById('coupon-code').value;
    const msg = document.getElementById('coupon-message');
    const month = parseInt(document.getElementById('month-select').value);

    // 1. 현재 선택된 개월 수의 '원래 가격'을 다시 계산 (핵심!)
    // (현재 화면에 있는 가격이 아니라, 기준 가격을 가져옵니다)
    const discountPrices = {
        3: 29000,
        5: 49000,
        12: 116000
    };
    
    let basePrice = 0;
    if (discountPrices[month]) {
        basePrice = discountPrices[month];
    } else {
        basePrice = month * 10000;
    }

    // 2. 쿠폰 유효성 검사 및 적용
    if (code === "X-mas") {
        // [수정 포인트] currentPrice가 아닌 basePrice에서 20% 할인
        // 이렇게 하면 버튼을 100번 눌러도 결과는 똑같습니다.
        currentPrice = basePrice * 0.8; 

        msg.innerText = "쿠폰 적용됨! (추가 20% 할인)";
        msg.style.color = "#003E7E";
        
        // 최종 금액 업데이트
        document.getElementById('final-price').innerText = currentPrice.toLocaleString();
    } else {
        msg.innerText = "유효하지 않은 쿠폰입니다.";
        msg.style.color = "#e74c3c";
        
        // 쿠폰이 틀리면 가격을 다시 원래 가격(basePrice)으로 복구
        currentPrice = basePrice;
        document.getElementById('final-price').innerText = currentPrice.toLocaleString();
    }
}
function processPayment() {
    const monthSelect = document.getElementById('month-select');
    const selectedMonth = parseInt(monthSelect.value);
    const priceText = document.getElementById('final-price').innerText;
    const userId = localStorage.getItem('smu_user_id');

    // 선택된 결제 수단 가져오기
    const payMethod = document.querySelector('input[name="payment-method"]:checked').value;

    // 확인 메시지에 결제 수단 포함
    const msg = `[기간 연장]\n` +
                `기간: ${selectedMonth}개월\n` +
                `금액: ${priceText}원\n` +
                `결제 수단: ${payMethod}\n\n` +
                `결제하시겠습니까?`;

    if(confirm(msg)) {
        const daysToAdd = selectedMonth * 30;
        
        let currentDays = localStorage.getItem('smu_expire_days_' + userId);
        currentDays = currentDays ? parseInt(currentDays) : 0;
        
        const newTotalDays = currentDays + daysToAdd;
        localStorage.setItem('smu_expire_days_' + userId, newTotalDays);

        alert(`[${payMethod}] 결제가 완료되었습니다.\n기간이 ${daysToAdd}일 연장되었습니다.`);
        loadUserData(userId); 
    }
}

function handleEventClick() {
    alert("축하합니다! 할인 코드: [X-mas] 입니다.");
    window.location.href = "mypage.html";
}

function drawCalendar() {
    const calendarDiv = document.getElementById('calendar');
    if (!calendarDiv) return;
    let html = '<table><tr><th>일</th><th>월</th><th>화</th><th>수</th><th>목</th><th>금</th><th>토</th></tr><tr>';
    html += '<td></td>'; 
    for (let i = 1; i <= 31; i++) {
        let dayOfWeek = (i) % 7;
        let isHoliday = (dayOfWeek === 0 || dayOfWeek === 6 || i === 25);
        let cellClass = isHoliday ? 'class="holiday"' : '';
        html += `<td ${cellClass}>${i}</td>`;
        if (dayOfWeek === 6) html += '</tr><tr>';
    }
    html += '</tr></table>';
    calendarDiv.innerHTML = html;
}

function setupAccordion() {
    const acc = document.getElementsByClassName("accordion");
    for (let i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") panel.style.display = "none";
            else panel.style.display = "block";
        });
    }
}