const questions = document.querySelectorAll(".question");
let current = 0;

const scores = {
    identity: 0,
    group: 0,
    land: 0,
    memory: 0,
    hypocrisy: 0,
    awareness: 0,
    future: 0
};

const logEvent = (type, data={}) => {
    fetch("/log", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({type, data})
    });
};

document.getElementById("startBtn").onclick = () => {
    document.getElementById("warningOverlay").classList.remove("active");
    logEvent("start");
};

questions.forEach(q => {
    q.querySelectorAll("button").forEach(btn => {
        btn.onclick = () => {
            const key = q.dataset.score;
            scores[key] += btn.innerText.length;
            q.style.display = "none";
            current++;
            logEvent("answer", {question: key, value: btn.innerText});
            if (questions[current]) {
                questions[current].style.display = "block";
            } else {
                showResult();
            }
        };
    });
});

questions.forEach((q, i) => {
    if (i !== 0) q.style.display = "none";
});

function showResult() {
    let sum = Object.values(scores).reduce((a,b)=>a+b,0);
    let title, text, color;

    if (sum > 120) {
        title = "أنت تكذب على نفسك";
        text = "تحاول الظهور كشيء لستَه. راجع نفسك قبل أن تمشي خلف قطيعهم.";
        color = "danger";
    } else if (sum > 80) {
        title = "ذكي… لكن محاصَر";
        text = "وعيك أعلى من محيطك، لكنك ما زلت سجين نطاق ضيق.";
        color = "success";
    } else {
        title = "محايد ظاهريًا";
        text = "الحياد هنا ليس فضيلة، بل تهرّب.";
        color = "danger";
    }

    document.getElementById("resultTitle").innerText = title;
    document.getElementById("resultText").innerText = text;
    document.getElementById("resultOverlay").classList.add("active");

    logEvent("result", {sum, scores});
}

document.getElementById("exitBtn").onclick = () => {
    location.reload();
};

document.getElementById("sendTelegram").onclick = () => {
    const msg = document.getElementById("userMessage").value;
    logEvent("telegram_redirect", {message: msg});

    const encoded = encodeURIComponent(msg);
    window.location.href =
        "https://t.me/gaaraKZG?text=" + encoded;
};

/* Mouse tracking (your code integrated) */
document.addEventListener("mousedown", function(event) {
    logEvent("mouse", {button: event.button});
});