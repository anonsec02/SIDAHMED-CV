const warningOverlay = document.getElementById('warningOverlay');
const proceedBtn = document.getElementById('proceedBtn');
const gameContainer = document.getElementById('gameContainer');
const answerBtns = document.querySelectorAll('.answerBtn');
const resultOverlay = document.getElementById('resultOverlay');
const resultText = document.getElementById('resultText');
const countdown = document.getElementById('countdown');
const telegramOverlay = document.getElementById('telegramOverlay');
const sendTelegram = document.getElementById('sendTelegram');
const telegramMessage = document.getElementById('telegramMessage');

let answers = [];

// نافذة التحذير
proceedBtn.addEventListener('click', () => {
    warningOverlay.classList.add('hidden');
    gameContainer.classList.remove('hidden');
});

// أسئلة اللعبة
answerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const val = parseInt(btn.dataset.value);
        answers.push(val);

        const parentQuestion = btn.closest('.question');
        const nextQuestion = parentQuestion.nextElementSibling;

        parentQuestion.classList.add('hidden');
        if(nextQuestion && nextQuestion.classList.contains('question')) {
            nextQuestion.classList.remove('hidden');
        } else {
            showResult();
        }
    });
});

// عرض النتائج
function showResult() {
    gameContainer.classList.add("hidden");

    const sum = answers.reduce((a,b)=>a+b,0);
    let finalResult = "";

    if(sum <= 3) finalResult = "أنت ذكي لكنك من أهل الرشيد (حرطاني)";
    else if(sum <=6) finalResult = "منافق لكنك لا تعرف الطريق إلى هدفك";
    else finalResult = "لا عليك لست غبيا وحدك جميع من دخلو الرابط في الخانة نفسها إلا من ضغطو على الزر الصحيح في البداية";

    resultText.textContent = finalResult;
    resultOverlay.classList.remove("hidden");

    // عد تنازلي 12 ثانية قبل نافذة تيليجرام
    let count = 12;
    countdown.textContent = count;
    const timer = setInterval(()=>{
        count--;
        countdown.textContent = count;
        if(count === 0) {
            clearInterval(timer);
            resultOverlay.classList.add("hidden");
            telegramOverlay.classList.remove('hidden');
        }
    },1000);
}

// إرسال الرسالة إلى تيليجرام
sendTelegram.addEventListener('click', () => {
    const message = encodeURIComponent(telegramMessage.value);
    if(message) {
        const telegramLink = `https://t.me/YourTelegramUsername?start=${message}`;
        window.open(telegramLink, '_blank');
    }
});