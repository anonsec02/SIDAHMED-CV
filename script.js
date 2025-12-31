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
        question: "هل أنت غبي وتصدق كل ما تقرأه؟",
        options: ["نعم", "واللهي", "حك بعد"]
    }
];

let answers = [];

const overlay = document.querySelector(".overlay");
const quizContainer = document.getElementById("quiz-container");

const warningModal = document.getElementById("warning-modal");
const quizModal = document.getElementById("quiz-modal");
const resultModal = document.getElementById("result-modal");
const telegramModal = document.getElementById("telegram-modal");

/* إنشاء الأسئلة */
quizData.forEach((q, index) => {
    const qDiv = document.createElement("div");
    qDiv.className = "quiz-question";
    qDiv.innerHTML = `<p>${q.question}</p>`;

    const optionsDiv = document.createElement("div");
    optionsDiv.className = "quiz-options";

    q.options.forEach(opt => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.onclick = () => {
            answers[index] = opt;
            [...optionsDiv.children].forEach(b => b.classList.remove("selected"));
            btn.classList.add("selected");
        };
        optionsDiv.appendChild(btn);
    });

    qDiv.appendChild(optionsDiv);
    quizContainer.appendChild(qDiv);
});

/* أدوات */
function show(modal) {
    overlay.style.display = "block";
    modal.classList.add("show");
}

function hide(modal) {
    modal.classList.remove("show");
    overlay.style.display = "none";
}

/* البداية */
window.onload = () => {
    show(warningModal);
};

document.getElementById("start-btn").onclick = () => {
    hide(warningModal);
    show(quizModal);
};

/* إرسال الإجابات */
document.getElementById("submit-quiz").onclick = () => {
    hide(quizModal);

    document.getElementById("result-text").textContent = analyzeAnswers(answers);
    show(resultModal);

    let c = 12;
    const cd = document.getElementById("countdown");
    cd.textContent = c;

    const timer = setInterval(() => {
        c--;
        cd.textContent = c;

        if (c <= 0) {
            clearInterval(timer);
            hide(resultModal);
            show(telegramModal);
        }
    }, 1000);
};

function analyzeAnswers(a) {
    if (a[2] === "المهم ألا الإستفادة") return "منافق لكنك ضائع الاتجاه";
    if (a[3] === "واللهي") return "أنت نموذج حي لثقافة القطيع";
    return "نتيجة عامة غير حاسمة";
}

document.getElementById("send-telegram").onclick = () => {
    const msg = encodeURIComponent(document.getElementById("telegram-message").value);
    window.open(`https://t.me/YourTelegramUsername?start=${msg}`, "_blank");
};