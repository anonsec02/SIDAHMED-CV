let lang = "ar";
let step = 0;
let cognitiveScore = 0;
let lastClickTime = Date.now();

const texts = {
  ar: [
    { q: "المكان لا يحتاج اسمك.", o: ["الرشيد", "ذاكرة", "فراغ"] },
    { q: "هل كنت جزءًا من الانقسام؟", o: ["نعم", "جزئيًا", "لا"] },
    { q: "هل تحب المكان أم تراقبه؟", o: ["أحبه", "أراقبه", "أهرب"] }
  ],
  ru: [
    { q: "Место не нуждается в твоём имени.", o: ["Рашид", "Память", "Пустота"] },
    { q: "Ты был частью разделения?", o: ["Да", "Частично", "Нет"] },
    { q: "Ты любишь место или наблюдаешь?", o: ["Люблю", "Наблюдаю", "Ухожу"] }
  ]
};

function setLang(l) {
  lang = l;
  step = 0;
  cognitiveScore = 0;
  render();
}

function render() {
  const game = document.getElementById("game");
  game.innerHTML = "";

  if (step >= texts[lang].length) {
    game.innerHTML = finalResult();
    return;
  }

  const item = texts[lang][step];
  const q = document.createElement("p");
  q.textContent = item.q;
  game.appendChild(q);

  item.o.forEach(opt => {
    const b = document.createElement("button");
    b.className = "option";
    b.textContent = opt;
    b.onclick = () => choose();
    game.appendChild(b);
  });
}

function choose() {
  const now = Date.now();
  const delta = now - lastClickTime;

  if (delta < 1200) cognitiveScore++;
  if (Input.mouse.right) cognitiveScore += 2;

  lastClickTime = now;
  step++;
  render();
}

function finalResult() {
  if (lang === "ar") {
    return `<p>
      التحليل اكتمل.<br>
      نمطك ليس فريدًا، لكنه واضح.<br><br>
      TELMEDEYN لا يحاكم.<br>
      هو فقط يسجّل.
    </p>`;
  } else {
    return `<p>
      Анализ завершён.<br>
      Твоя модель предсказуема.<br><br>
      TELMEDEYN не судит.<br>
      Он фиксирует.
    </p>`;
  }
}

/* ====== كودك بعد التصحيح ====== */
const Input = {
  mouse: { left: false, middle: false, right: false }
};

document.addEventListener("mousedown", e => {
  if (e.button === 0) Input.mouse.left = true;
  if (e.button === 1) Input.mouse.middle = true;
  if (e.button === 2) Input.mouse.right = true;
  document.body.style.opacity = "0.97";
});

document.addEventListener("mouseup", () => {
  Input.mouse.left = Input.mouse.middle = Input.mouse.right = false;
  document.body.style.opacity = "1";
});

/* init */
render();