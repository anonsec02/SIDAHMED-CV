document.addEventListener("DOMContentLoaded", () => {
    const warningPopup = document.getElementById("warning-popup");
    const continueBtn = document.getElementById("continue-btn");
    const exitBtn = document.getElementById("exit-btn");
    const mainContent = document.getElementById("main-content");
    const analyzeBtn = document.getElementById("analyze-btn");
    const finalPopup = document.getElementById("final-popup");
    const finalText = document.getElementById("final-text");
    const countdownEl = document.getElementById("countdown");
    const telegramPopup = document.getElementById("telegram-popup");
    const telegramMsg = document.getElementById("telegram-msg");
    const sendTelegram = document.getElementById("send-telegram");
    const form = document.getElementById("psych-form");

    // زر المتابعة يفتح الأسئلة
    continueBtn.addEventListener("click", () => {
        warningPopup.classList.add("hidden");
        mainContent.classList.remove("hidden");
    });

    // زر الخروج يترك الموقع
    exitBtn.addEventListener("click", () => {
        window.close();
    });

    analyzeBtn.addEventListener("click", () => {
        const data = new FormData(form);
        let score = 0;

        for (let value of data.values()) {
            switch (value) {
                case "محايد":
                case "ربما":
                case "لا": score += 1; break;
                case "أرض الأحبة":
                case "الجماعه ذوك":
                case "تلمدين":
                case "أهلنا ذوك":
                case "نعم": score += 3; break;
                case "مكان مستفز":
                case "الأغلبية":
                case "الزيرة":
                case "أهلنا لخرين":
                case "صدقت أول جملة قرأتها": score += 5; break;
                default: score += 2;
            }
        }

        let message = "";
        if(score<=8) message = "أنت تكذب على نفسك، يجب أن تراجع نفسك قبل السير خلف القطيع!";
        else if(score<=15) message = "أنت ذكي لكنك من أهل الرشيد، مخلتكم منحصرة في نطاق ضيق.";
        else if(score<=25) message = "تحليلك منطقي نسبيًا، لكن هناك تلاعب بسيط في خياراتك.";
        else message = "نتيجة معقدة: يبدو أنك تتصرف بشكل متناقض، فكر قليلاً!";

        finalText.textContent = message;
        finalPopup.classList.remove("hidden");

        // عد تنازلي 5 ثواني ثم تظهر نافذة Telegram
        let count = 5;
        countdownEl.textContent = count;
        const interval = setInterval(() => {
            count--;
            countdownEl.textContent = count;
            if(count<=0){
                clearInterval(interval);
                finalPopup.classList.add("hidden");
                telegramPopup.classList.remove("hidden");
            }
        },1000);
    });

    // زر إرسال Telegram
    sendTelegram.addEventListener("click", () => {
        const msg = encodeURIComponent(telegramMsg.value);
        const telegramLink = `https://t.me/YOUR_TELEGRAM_USERNAME?text=${msg}`;
        window.open(telegramLink, "_blank");
    });
});