// عناصر الصفحة
const warningModal = document.getElementById("warningModal");
const proceedBtn = document.getElementById("proceedBtn");
const exitBtn = document.getElementById("exitBtn");
const quizContainer = document.getElementById("quizContainer");
const submitQuiz = document.getElementById("submitQuiz");
const resultModal = document.getElementById("resultModal");
const resultText = document.getElementById("resultText");
const countdownEl = document.getElementById("countdown");
const telegramModal = document.getElementById("telegramModal");
const sendTelegram = document.getElementById("sendTelegram");
const telegramMessage = document.getElementById("telegramMessage");

// إظهار التحذير أولًا
warningModal.classList.remove("hidden");

// أزرار التحذير
proceedBtn.onclick = () => {
    warningModal.classList.add("hidden");
    quizContainer.classList.remove("hidden");
};

exitBtn.onclick = () => {
    window.close();
};

// تحليل الأسئلة
submitQuiz.onclick = () => {
    const form = document.getElementById("quizForm");
    const answers = new FormData(form);
    let score = 0;

    for (let value of answers.values()) {
        if (value === "صدقت أول جملة قرأتها" || value === "لا" || value === "بقعة ملعونة") {
            score -= 2;
        } else if (value === "محايد" || value === "ربما") {
            score += 1;
        } else {
            score += 2;
        }
    }

    let finalMessage = "";
    if (score < 5) finalMessage = "أنت تكذب على نفسك يجب أن تراجع نفسك قبل السير خلف قطيعهم.";
    else if (score < 10) finalMessage = "أنت ذكي لكنك من أهل الرشيد ومخلتكم منحصرة في نطاق ضيق.";
    else finalMessage = "تحليلك جيد لكن لا تثق بكل شيء حولك.";

    quizContainer.classList.add("hidden");
    resultModal.classList.remove("hidden");
    resultText.textContent = finalMessage;

    // العد التنازلي
    let countdown = 5;
    countdownEl.textContent = countdown;
    const interval = setInterval(() => {
        countdown--;
        countdownEl.textContent = countdown;
        if (countdown <= 0) {
            clearInterval(interval);
            resultModal.classList.add("hidden");
            telegramModal.classList.remove("hidden");
        }
    }, 1000);
};

// فتح تيليجرام
sendTelegram.onclick = () => {
    const msg = encodeURIComponent(telegramMessage.value);
    // ضع رابط تيليجرام الخاص بك هنا
    const telegramLink = `https://t.me/gaaraKZG?text=${msg}`;
    window.open(telegramLink, "_blank");
};