const warningOverlay = document.getElementById('warningOverlay');
const proceedBtn = document.getElementById('proceedBtn');
const gameContainer = document.getElementById('gameContainer');
const questions = document.querySelectorAll('.question');
const resultOverlay = document.getElementById('resultOverlay');
const resultText = document.getElementById('resultText');
const countdown = document.getElementById('countdown');
const telegramOverlay = document.getElementById('telegramOverlay');
const sendTelegram = document.getElementById('sendTelegram');
const telegramMessage = document.getElementById('telegramMessage');

let answers = [];
let currentQuestion = 0;

// فتح اللعبة بعد التحذير
proceedBtn.addEventListener('click', () => {
    warningOverlay.classList.remove('active');
    gameContainer.classList.remove('hidden');
    showQuestion(currentQuestion);
});

function showQuestion(index){
    questions.forEach(q => q.classList.add('hidden'));
    if(questions[index]){
        questions[index].classList.remove('hidden');
        const btns = questions[index].querySelectorAll('.answerBtn');
        btns.forEach(btn => {
            btn.onclick = () => {
                answers.push(parseInt(btn.dataset.value));
                currentQuestion++;
                if(currentQuestion < questions.length){
                    showQuestion(currentQuestion);
                } else {
                    showResult();
                }
            }
        });
    }
}

// عرض النتائج
function showResult(){
    gameContainer.classList.add('hidden');

    const sum = answers.reduce((a,b)=>a+b,0);
    let finalResult = "";

    if(sum <= 3) finalResult = "أنت ذكي لكنك من أهل الرشيد (حرطاني)";
    else if(sum <=6) finalResult = "منافق لكنك لا تعرف الطريق إلى هدفك";
    else finalResult = "لا عليك لست غبيا وحدك جميع من دخلو الرابط في الخانة نفسها إلا من ضغطو على الزر الصحيح في البداية";

    resultText.textContent = finalResult;
    resultOverlay.classList.remove('hidden');

    let count = 12;
    countdown.textContent = count;
    const timer = setInterval(()=>{
        count--;
        countdown.textContent = count;
        if(count <= 0){
            clearInterval(timer);
            resultOverlay.classList.add('hidden');
            telegramOverlay.classList.remove('hidden');
        }
    },1000);
}

// نافذة تيليجرام
sendTelegram.addEventListener('click', () => {
    const message = encodeURIComponent(telegramMessage.value);
    if(message){
        const telegramLink = `https://t.me/YourTelegramUsername?start=${message}`;
        window.open(telegramLink, '_blank');
    }
});