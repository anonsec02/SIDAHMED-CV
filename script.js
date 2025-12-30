// واجهة التحذير
const warningOverlay = document.getElementById("warningOverlay");
const startGameBtn = document.getElementById("startGameBtn");
const gameContainer = document.getElementById("gameContainer");
const resultOverlay = document.getElementById("resultOverlay");
const resultText = document.getElementById("resultText");
const countdown = document.getElementById("countdown");
const telegramOverlay = document.getElementById("telegramOverlay");
const sendTelegramBtn = document.getElementById("sendTelegramBtn");
const telegramMessage = document.getElementById("telegramMessage");

startGameBtn.addEventListener("click", () => {
    warningOverlay.classList.add("hidden");
    gameContainer.classList.remove("hidden");
});

// جمع الأجوبة
let answers = [];

const optionButtons = document.querySelectorAll(".option-btn");
optionButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const value = parseInt(btn.dataset.value);
        answers.push(value);
        btn.parentElement.parentElement.classList.add("hidden");

        if (answers.length === 4) {
            showResult();
        }
    });
});

// تحليل الأجوبة
function showResult() {
    gameContainer.classList.add("hidden");
    let finalResult = "";

    // معادلة بسيطة لتحديد النتيجة بدقة ودائمًا ثابتة لكل مجموعة إجابات
    const sum = answers.reduce((a,b)=>a+b,0);

    if(sum <= 3) finalResult = "أنت ذكي لكنك من أهل الرشيد (حرطاني)";
    else if(sum <=6) finalResult = "منافق لكنك لا تعرف الطريق إلى هدفك";
    else finalResult = "لا عليك لست غبيا وحدك جميع من دخلو الرابط في الخانة نفسها إلا من ضغطو على الزر الصحيح في البداية";

    resultText.textContent = finalResult;
    resultOverlay.classList.remove("hidden");

    // عد تنازلي
    let count = 5;
    countdown.textContent = count;
    const timer = setInterval(()=>{
        count--;
        countdown.textContent = count;
        if(count === 0) {
            clearInterval(timer);
            resultOverlay.classList.add("hidden");
            telegramOverlay.classList.remove("hidden");
        }
    },1000);
}

// إرسال رسالة تيليجرام
sendTelegramBtn.addEventListener("click", ()=>{
    const text = encodeURIComponent(telegramMessage.value || "مرحبًا، هذه رسالة تلقائية من اللعبة.");
    const telegramUrl = `https://t.me/YOUR_TELEGRAM_USERNAME?text=${text}`;
    window.open(telegramUrl,"_blank");
});