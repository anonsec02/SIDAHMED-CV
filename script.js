// الأسئلة والخيارات
const quizData = [
    {
        question: "ماهو الرشيد بالنسبة لك؟",
        options: ["مكان مررت به", "قصة لم تنتهي بعد", "قرية منفوخة إعلاميا", "مكان تربطني به ذكريات"]
    },
    {
        question: "إلى أي جماعة تنتمي؟",
        options: ["الجماعة ذوك", "الجماعة الأخرى", "ماني أمركهم فشي كاملين"]
    },
    {
        question: "أيهم تنافق له؟",
        options: ["ألا ايهم مسْ لبنتو", "كاملين", "المهم ألا الإستفادة"]
    },
    {
        question: "هل أنت غبي وتصدق كل ما تقرأه او تسمعه دون تحليل حيادي؟",
        options: ["نعم", "واللهي", "حك بعد"]
    }
];

let answers = [];

// عرض الأسئلة
const quizContainer = document.getElementById("quiz-container");
quizData.forEach((q, index) => {
    const qDiv = document.createElement("div");
    qDiv.className = "quiz-question";
    qDiv.innerHTML = `<p>${q.question}</p>`;
    const optionsDiv = document.createElement("div");
    optionsDiv.className = "quiz-options";
    q.options.forEach(opt => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.addEventListener("click", () => {
            answers[index] = opt;
            Array.from(optionsDiv.children).forEach(b => b.classList.remove("selected"));
            btn.classList.add("selected");
        });
        optionsDiv.appendChild(btn);
    });
    qDiv.appendChild(optionsDiv);
    quizContainer.appendChild(qDiv);
});

// عرض نافذة التحذير
const warningModal = document.getElementById("warning-modal");
const startBtn = document.getElementById("start-btn");
const quizModal = document.getElementById("quiz-modal");
startBtn.addEventListener("click", () => {
    warningModal.classList.remove("show");
    quizModal.classList.add("show");
});

// إرسال الأسئلة
const submitQuiz = document.getElementById("submit-quiz");
const resultModal = document.getElementById("result-modal");
const resultText = document.getElementById("result-text");
const countdownEl = document.getElementById("countdown");

submitQuiz.addEventListener("click", () => {
    quizModal.classList.remove("show");

    // تحليل الإجابات بدقة
    let res = analyzeAnswers(answers);
    resultText.textContent = res;

    // عرض النتائج مع عد تنازلي 12 ثانية
    let countdown = 12;
    countdownEl.textContent = countdown;
    resultModal.classList.add("show");

    let timer = setInterval(() => {
        countdown--;
        countdownEl.textContent = countdown;
        if (countdown <= 0) {
            clearInterval(timer);
            resultModal.classList.remove("show");
            showTelegramModal();
        }
    }, 1000);
});

// تحليل الإجابات بدقة لتحديد النتيجة
function analyzeAnswers(ans) {
    if(ans[0] === "مكان تربطني به ذكريات" && ans[1] === "الجماعة ذوك") return "أنت ذكي لكنك من أهل الرشيد (حرطاني)";
    if(ans[2] === "المهم ألا الإستفادة") return "منافق لكنك لا تعرف الطريق إلى هدفك";
    if(ans[3] === "واللهي") return "لا عليك لست غبيا وحدك جميع من دخلو الرابط في الخانة نفسها إلا من ضغطو على الزر الصحيح في البداية";
    return "نتيجة عامة غير محددة";
}

// نافذة Telegram
const telegramModal = document.getElementById("telegram-modal");
function showTelegramModal() {
    telegramModal.classList.add("show");
}

const sendTelegramBtn = document.getElementById("send-telegram");
sendTelegramBtn.addEventListener("click", () => {
    const message = encodeURIComponent(document.getElementById("telegram-message").value);
    const telegramLink = `https://t.me/YourTelegramUsername?start=${message}`;
    window.open(telegramLink, "_blank");
});