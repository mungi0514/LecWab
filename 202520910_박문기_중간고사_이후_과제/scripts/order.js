// order.js

document.addEventListener('DOMContentLoaded', () => {
    const orderItems = document.querySelectorAll('.order-item');
    const quantityInputs = document.querySelectorAll('.quantity');
    const totalAmountInput = document.getElementById('total-amount');
    const calculateButton = document.getElementById('calculate-button');
    const resetButton = document.getElementById('reset-button');
    const orderButton = document.getElementById('order-button');
    const orderOutput = document.getElementById('order-output');

    // 가격 문자열에서 숫자만 추출하는 함수
    const parsePrice = (priceStr) => parseInt(priceStr.replace(/[^0-9]/g, ''));

    // 합계 계산 함수 
    const calculateTotal = () => {
        let grandTotal = 0;
        let totalQuantity = 0;

        orderItems.forEach(item => {
            const price = parseInt(item.dataset.price);
            const quantityInput = item.querySelector('.quantity');
            const itemTotalInput = item.querySelector('.item-total');

            const quantity = parseInt(quantityInput.value) || 0;
            const itemTotal = price * quantity;
            
            // 개별 합계 업데이트
            itemTotalInput.value = itemTotal.toLocaleString('ko-KR'); 
            
            grandTotal += itemTotal;
            totalQuantity += quantity;
        });

        // 총 합계 업데이트
        totalAmountInput.value = grandTotal.toLocaleString('ko-KR');
        document.getElementById('total-quantity').value = totalQuantity;
    };

    // 1. 수량 입력 시 계산 기능 활성화 
    quantityInputs.forEach(input => {
        input.addEventListener('input', calculateTotal);
    });

    // 2. 초기화 버튼 (수량 값 초기화)
    resetButton.addEventListener('click', () => {
        quantityInputs.forEach(input => {
            input.value = '0'; // 수량 값을 초기화 함 
        });
        calculateTotal(); // 초기화 후 합계 다시 계산
        orderOutput.innerHTML = ''; // 주문 내역도 초기화
    });

    // 4. 주문하기 버튼 
    orderButton.addEventListener('click', () => {
        const storedId = localStorage.getItem('loggedInUser'); // 로그인 ID 가져오기 
        const headerText = storedId 
            ? `<p style="font-weight: bold;">${storedId}님의 주문 내역입니다.</p>` // 저장된 아이디를 활용 
            : `<p style="font-weight: bold;">(비회원) 주문 내역입니다.</p>`;

        let outputTable = `
            ${headerText}
            <table border="1" style="width: 100%; margin-top: 10px;">
                <tr><th>책 제목</th><th>가격</th><th>수량</th><th>합계</th></tr>
        `;
        let orderedItemsCount = 0;

        orderItems.forEach(item => {
            const title = item.querySelector('td:nth-child(1)').textContent.trim();
            const price = item.dataset.price;
            const quantity = parseInt(item.querySelector('.quantity').value) || 0;
            const itemTotal = parseInt(item.querySelector('.item-total').value.replace(/,/g, ''));

            // 수량이 0인 값 제외 
            if (quantity > 0) {
                outputTable += `
                    <tr>
                        <td>${title}</td>
                        <td align="right">${parseInt(price).toLocaleString('ko-KR')}원</td>
                        <td align="center">${quantity}</td>
                        <td align="right">${itemTotal.toLocaleString('ko-KR')}원</td>
                    </tr>
                `;
                orderedItemsCount++;
            }
        });

        // 합계 행 추가
        outputTable += `
            <tr style="font-weight: bold;">
                <td colspan="3" align="center">총 합계</td>
                <td align="right">${totalAmountInput.value}원</td>
            </tr>
        </table>`;

        if (orderedItemsCount > 0) {
            orderOutput.innerHTML = outputTable;
        } else {
            orderOutput.innerHTML = `<p style="color: red;">주문할 상품이 없습니다 (수량 0 제외).</p>`;
        }
    });
});