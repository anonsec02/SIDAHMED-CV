// اختيار العناصر
const riskBtn = document.getElementById('risk-btn');
const riskOverlay = document.getElementById('risk-overlay');
const exitBtn = document.getElementById('exit-btn');
const mainContent = document.getElementById('main-content');
const countdownEl = document.getElementById('countdown');

let countdownInterval;

// عند الضغط على زر التحذير
riskBtn.addEventListener('click', () => {
    // إخفاء المحتوى الأصلي
    mainContent.style.display = 'none';
    // عرض واجهة التحذير
    riskOverlay.style.display = 'flex';
    let timeLeft = 10; // العد التنازلي 10 ثواني
    countdownEl.textContent = timeLeft;

    // بدء العد التنازلي
    countdownInterval = setInterval(() => {
        timeLeft--;
        countdownEl.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            countdownEl.textContent = "0";
            // يمكن إضافة أحداث إضافية عند انتهاء العد التنازلي
        }
    }, 1000);
});

// زر الخروج وإعادة الواجهة الأصلية
exitBtn.addEventListener('click', () => {
    // إخفاء واجهة التحذير
    riskOverlay.style.display = 'none';
    // إظهار المحتوى الأصلي
    mainContent.style.display = 'block';
    // إيقاف أي عد تنازلي
    clearInterval(countdownInterval);
});