let lang = "ar";
let step = 0;

const texts = {
  ar: [
    {
      q: "المدينة لا تبدأ بالاسم. تبدأ بالشعور.",
      o: ["الرشيد", "مكان عابر", "لا أدري"]
    },
    {
      q: "هل تعتقد أن المكان يتذكرك؟",
      o: ["نعم", "ربما", "لا"]
    },
    {
      q: "السياسة فرّقت الناس. هل لاحظت ذلك متأخراً؟",
      o: ["نعم", "كنت أعرف", "لا يهم"]
    },
    {
      q: "الثقة قرار. ليس فضيلة.",
      o: ["أثق بنفسي", "أثق بالتجربة", "لا أثق"]
    }
  ],
  ru: [
    {
      q: "Место начинается не с имени. А с ощущения.",
      o: ["Рашид", "Проходное место", "Не знаю"]
    },
    {
      q: "Ты думаешь, что место помнит тебя?",
      o: ["Да", "Возможно", "Нет"]
    },
    {
      q: "Политика разделила людей. Ты понял это поздно?",
      o: ["Да", "Я знал", "Неважно"]
    },
    {
      q: "Доверие — это решение, не добродетель.",
      o: ["Доверяю себе", "Доверяю опыту", "Не доверяю"]
    }
  ]
};

function setLang(l) {
  lang = l;
  step = 0;
  render();
}

function render() {
  const game = document.getElementById("game");
  game.innerHTML = "";

  if (step >= texts[lang].length) {
    game.innerHTML = finalText();
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
    b.onclick = () => next();
    game.appendChild(b);
  });
}

function next() {
  step++;
  render();
}

function finalText() {
  if (lang === "ar") {
    return `
      <p>
        النتيجة ليست سيئة.<br>
        لكنها متوقعة.
      </p>
      <p>
        هذه مجرد لعبة.<br>
        TELMEDEYN-tool لا يشرح. لا يختبر. لا يسأل.
      </p>
      <p>
        الرشيد مكان.<br>
        والأماكن لا تعتذر.
      </p>
    `;
  } else {
    return `
      <p>
        Результат не плохой.<br>
        Он ожидаемый.
      </p>
      <p>
        Это всего лишь игра.<br>
        TELMEDEYN-tool не объясняет. Не тестирует. Не спрашивает.
      </p>
      <p>
        Рашид — это место.<br>
        Места не извиняются.
      </p>
    `;
  }
}

/* ====== الكود الذي زودتني به بعد تصحيحه و توظيفه ====== */

const Input = {
  mouse: {
    left: false,
    middle: false,
    right: false
  }
};

document.addEventListener("mousedown", function(event) {
  if (event.button === 0) Input.mouse.left = true;
  if (event.button === 1) Input.mouse.middle = true;
  if (event.button === 2) Input.mouse.right = true;

  document.body.style.opacity = "0.96";
});

document.addEventListener("mouseup", function() {
  Input.mouse.left = false;
  Input.mouse.middle = false;
  Input.mouse.right = false;

  document.body.style.opacity = "1";
});

/* ====== بدء اللعبة ====== */
render();