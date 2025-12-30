document.addEventListener("DOMContentLoaded", () => {
    const analyzeBtn = document.getElementById("analyze-btn");
    const warningPopup = document.getElementById("warning-popup");
    const closeWarning = document.getElementById("close-warning");
    const resultPopup = document.getElementById("result-popup");
    const closeResult = document.getElementById("close-result");
    const resultText = document.getElementById("result-text");
    const form = document.getElementById("psych-form");

    // إظهار نافذة التحذير عند الضغط على زر التحليل
    analyzeBtn.addEventListener("click", () => {
        warningPopup.classList.remove("hidden");
    });

    closeWarning.addEventListener("click", () => {
        warningPopup.classList.add("hidden");
        calculateResult();
    });

    closeResult.addEventListener("click", () => {
        resultPopup.classList.add("hidden");
    });

    function calculateResult() {
        const data = new FormData(form);
        let score = 0;

        for (let value of data.values()) {
            switch (value) {
                case "محايد":
                case "ربما":
                case "لا":
                    score += 1;
                    break;
                case "أرض الأحبة":
                case "الجماعه ذوك":
                case "تلمدين":
                case "أهلنا ذوك":
                case "نعم":
                    score += 3;
                    break;
                case "مكان مستفز":
                case "الأغلبية":
                case "الزيرة":
                case "أهلنا لخرين":
                case "صدقت أول جملة قرأتها":
                    score += 5;
                    break;
                default:
                    score += 2;
            }
        }

        // تحديد النص حسب الدرجة
        let message = "";
        if (score <= 8) {
            message = "أنت تكذب على نفسك، يجب أن تراجع نفسك قبل السير خلف القطيع!";
        } else if (score <= 15) {
            message = "أنت ذكي لكنك من أهل الرشيد، مخلتكم منحصرة في نطاق ضيق.";
        } else if (score <= 25) {
            message = "تحليلك منطقي نسبيًا، لكن هناك تلاعب بسيط في خياراتك.";
        } else {
            message = "نتيجة معقدة: يبدو أنك تتصرف بشكل متناقض، فكر قليلاً!";
        }

        resultText.textContent = message;
        resultPopup.classList.remove("hidden");
    }
});