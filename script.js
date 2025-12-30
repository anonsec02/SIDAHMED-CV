// عناصر الصفحة
const warningModal = document.getElementById("warningModal");
const proceedBtn = document.getElementById("proceedBtn");
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

// متابعة التحذير
proceedBtn.onclick = () => {
    warningModal.classList.add("hidden");
    quizContainer.classList.remove("hidden");
};

// تحليل الأسئلة
submitQuiz.onclick = () => {
    const form = document.getElementById("quizForm");
    const answers = new FormData(form);
    const q = [];
    for (let value of answers.values()) q.push(value);

    let finalMessage = "";

    // تحديد النتائج بدقة لكل سلسلة إجابات
    if (q[0] === "مكان تربطني به ذكريات" && q[1] === "الجماعة ذوك" && q[2] === "كاملين") {
        finalMessage = "أنت ذكي لكنك من أهل الرشيد (حرطاني)";
    } else if (q[2] === "المهم ألا الإستفادة") {
        finalMessage = "منافق لكنك لا تعرف الطريق إلى هدفك";
    } else if (q[3] === "نعم" || q[3] === "واللهي") {
        finalMessage = "لا عليك لست غبيا وحدك جميع من دخلو الرابط في الخانة نفسها إلا من ضغطو على الزر الصحيح في البداية";
    } else {
        finalMessage = "تحليلك جيد لكن ركز أكثر على إجاباتك القادمة";
    }

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