const questions = [
    {
        text: "ماهو الرشيد بالنسبة لك؟",
        answers: [
            { text: "مكان مررت به", value: 1 },
            { text: "قصة لم تنتهي بعد", value: 2 },
            { text: "قرية منفوخة إعلاميا", value: 3 },
            { text: "مكان تربطني به ذكريات", value: 4 }
        ]
    },
    {
        text: "إلى أي جماعة تنتمي؟",
        answers: [
            { text: "الجماعة ذوك", value: 1 },
            { text: "الجماعة الأخرى", value: 2 },
            { text: "ماني أمركهم فشي كاملين", value: 3 }
        ]
    },
    {
        text: "أيهم تنافق له؟",
        answers: [
            { text: "ألا ايهم مسْ لبنتو", value: 1 },
            { text: "كاملين", value: 2 },
            { text: "المهم ألا الإستفادة", value: 3 }
        ]
    },
    {
        text: "هل أنت غبي وتصدق كل ما تقرأه او تسمعه دون تحليل حيادي؟",
        answers: [
            { text: "نعم", value: 1 },
            { text: "واللهي", value: 2 },
            { text: "حك بعد", value: 3 }
        ]
    }
];

const results = [
    { range: [4,5], text: "أنت ذكي لكنك من أهل الرشيد (حرطاني)" },
    { range: [6,7], text: "منافق لكنك لا تعرف الطريق إلى هدفك" },
    { range: [8,12], text: "لا عليك لست غبيا وحدك جميع من دخلو الرابط في الخانة نفسها إلا من ضغطو على الزر الصحيح في البداية" }
];

let currentQuestion = 0;
let score = 0;

// العناصر
const warningOverlay = document.getElementById('warningOverlay');
const continueBtn = document.getElementById('continueBtn');
const exitBtn = document.getElementById('exitBtn');

const questionOverlay = document.getElementById('questionOverlay');
const questionContainer = document.getElementById('questionContainer');

const resultOverlay = document.getElementById('resultOverlay');
const resultText = document.getElementById('resultText');
const countdownSpan = document.getElementById('countdown');

const telegramOverlay = document.getElementById('telegramOverlay');
const telegramMessage = document.getElementById('telegramMessage');
const sendTelegram = document.getElementById('sendTelegram');

// وظائف
continueBtn.addEventListener('click', () => {
    warningOverlay.classList.remove('active');
    questionOverlay.classList.add('active');
    showQuestion();
});

exitBtn.addEventListener('click', () => {
    window.close();
});

function showQuestion() {
    questionContainer.innerHTML = '';
    const q = questions[currentQuestion];

    const qElem = document.createElement('div');
    qElem.classList.add('question');
    qElem.innerHTML = `<h3>${q.text}</h3>`;
    questionContainer.appendChild(qElem);

    q.answers.forEach(answer => {
        const btn = document.createElement('button');
        btn.classList.add('answerBtn', 'primary-btn');
        btn.innerText = answer.text;
        btn.addEventListener('click', () => selectAnswer(answer.value));
        questionContainer.appendChild(btn);
    });
}

function selectAnswer(value) {
    score += value;
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        questionOverlay.classList.remove('active');
        showResult();
    }
}

function showResult() {
    // تحديد النتيجة
    let finalResult = results[results.length-1].text; // default
    for(let res of results) {
        if(score >= res.range[0] && score <= res.range[1]) {
            finalResult = res.text;
            break;
        }
    }
    resultText.innerText = finalResult;
    resultOverlay.classList.add('active');

    let countdown = 12;
    countdownSpan.innerText = countdown;
    const timer = setInterval(() => {
        countdown--;
        countdownSpan.innerText = countdown;
        if(countdown <=0) {
            clearInterval(timer);
            resultOverlay.classList.remove('active');
            telegramOverlay.classList.add('active');
            telegramMessage.value = finalResult;
        }
    }, 1000);
}

sendTelegram.addEventListener('click', () => {
    const msg = encodeURIComponent(telegramMessage.value);
    const telegramLink = `https://t.me/YourTelegramUsername?start=${msg}`;
    window.open(telegramLink, '_blank');
});