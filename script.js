let step = 0;
let score = 0;
let behavior = 0;

const questions = [
  {
    q: "ماهو الرشيد بالنسبة لك؟",
    o: [
      { t: "مكان عابر", s: 1 },
      { t: "جذر ثقيل", s: 2 },
      { t: "لا شيء", s: 0 }
    ]
  },
  {
    q: "إلى أي جماعة تنتمي؟",
    o: [
      { t: "الجماعه ذوك", s: 2 },
      { t: "الأغلبية", s: 1 },
      { t: "محايد", s: 0 }
    ]
  },
  {
    q: "كلمة تصف بها تلك البقعة من الأرض",
    o: [
      { t: "بقعة ملعونة", s: 2 },
      { t: "أرض لئيمة", s: 1 },
      { t: "محايد", s: 0 }
    ]
  },
  {
    q: "أيهم يحمل ذكرياتك؟",
    o: [
      { t: "تلمدين", s: 3 },
      { t: "الجديدة", s: 1 },
      { t: "الزيرة", s: 1 },
      { t: "لخنك", s: 1 },
      { t: "علك شربه", s: 1 }
    ]
  },
  {
    q: "أيهم تنافق له؟",
    o: [
      { t: "أهلنا ذوك", s: 3 },
      { t: "أهلنا لخرين", s: 2 },
      { t: "كاملين", s: 1 }
    ]
  },
  {
    q: "هل أنت غبي وتصدق كل ما تقرأه؟",
    o: [
      { t: "لا", s: 0 },
      { t: "غير واثق", s: 1 },
      { t: "صدقت أول جملة قرأتها", s: 3 }
    ]
  },
  {
    q: "هل تعتقد أن أداة TELMEDEYN ستعمل لمصلحة أهل الرشيد؟",
    o: [
      { t: "لا", s: 0 },
      { t: "ربما", s: 1 },
      { t: "نعم", s: 3 }
    ]
  }
];

function render() {
  const game = document.getElementById("game");
  game.innerHTML = "";

  if (step >= questions.length) {
    return finalAnalysis();
  }

  const q = questions[step];
  const qEl = document.createElement("div");
  qEl.className = "question";
  qEl.textContent = q.q;
  game.appendChild(qEl);

  q.o.forEach(opt => {
    const b = document.createElement("button");
    b.className = "option";
    b.textContent = opt.t;
    b.onclick = () => choose(opt.s);
    game.appendChild(b);
  });
}

function choose(s) {
  score += s;
  behavior += (s * (step + 1));
  step++;
  render();
}

function finalAnalysis() {
  let text = "";
  let color = "green";

  if (score > 12 && behavior > 25) {
    text = "أنت تكذب على نفسك. وعيك ليس حراً كما تعتقد. راجع نفسك قبل السير خلف قطيعهم.";
    color = "red";
  } else if (score > 8) {
    text = "أنت ذكي… لكنك محاصر داخل نطاق ضيق. المكان شكّلك أكثر مما تعترف.";
  } else {
    text = "تحليلك منخفض الانحياز. هذا نادر هنا.";
  }

  showModal(text, color);
}

function showModal(msg, color) {
  const overlay = document.getElementById("overlay");
  const modal = document.getElementById("modal");
  document.getElementById("modal-text").textContent = msg;

  modal.className = "modal " + color;
  overlay.classList.remove("hidden");
}

function closeModal() {
  document.getElementById("overlay").classList.add("hidden");
}

/* كودك – بعد تصحيح خطير */
const Input = { mouse: { left: false, middle: false, right: false } };

document.addEventListener("mousedown", e => {
  if (e.button === 0) Input.mouse.left = true;
  if (e.button === 1) Input.mouse.middle = true;
  if (e.button === 2) Input.mouse.right = true;
});

document.addEventListener("mouseup", () => {
  Input.mouse.left = Input.mouse.middle = Input.mouse.right = false;
});

render();