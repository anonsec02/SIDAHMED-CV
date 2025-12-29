// Language switching functionality
document.addEventListener("DOMContentLoaded", function() {
    const langButtons = document.querySelectorAll(".lang-btn");
    const body = document.body;

    let currentLang = "fr";

    function switchLanguage(lang) {
        currentLang = lang;
        langButtons.forEach(btn => {
            btn.classList.remove("active");
            if (btn.dataset.lang === lang) btn.classList.add("active");
        });

        body.classList.toggle("rtl", lang === "ar");
        body.style.direction = lang === "ar" ? "rtl" : "ltr";

        document.querySelectorAll("[data-fr],[data-en],[data-ar]").forEach(el => {
            const t = el.getAttribute(`data-${lang}`);
            if (t) el.textContent = t;
        });

        const titles = {
            "fr": "Sid'Ahmed Mohamed Ejehah - Curriculum Vitae",
            "en": "Sid Ahmed Mohamed Ejehah - Curriculum Vitae",
            "ar": "سيداحمد محمد أجهاه - السيرة الذاتية"
        };
        document.title = titles[lang];

        const descriptions = {
            "fr": "Expert en Cybersécurité et Spécialiste IA - Sid'Ahmed Mohamed Ejehah. Plus d'un an d'expérience en tests d'intrusion et développement d'IA.",
            "en": "Cybersecurity Expert & AI Specialist - Sid'Ahmed Mohamed Ejehah. Over one year of experience in penetration testing and AI development.",
            "ar": "خبير الأمن السيبراني و متخصص الذكاء الاصطناعي - سيداحمد محمد أجهاه. أكثر من سنة خبرة عملية في اختبار الاختراق وتطوير الذكاء الاصطناعي."
        };
        let metaDesc = document.querySelector("meta[name='description']");
        if (metaDesc) metaDesc.setAttribute("content", descriptions[lang]);

        document.documentElement.setAttribute("lang", lang);
        localStorage.setItem("preferredLanguage", lang);

        body.style.opacity = "0.8";
        setTimeout(() => { body.style.opacity = "1"; }, 150);
    }

    langButtons.forEach(btn => btn.addEventListener("click", function() {
        switchLanguage(this.dataset.lang);
    }));

    const savedLang = localStorage.getItem("preferredLanguage");
    const browserLang = navigator.language.substring(0,2);
    const initialLang = (savedLang || ["fr","en","ar"].includes(browserLang) && browserLang) || "fr";
    switchLanguage(initialLang);

    document.addEventListener("keydown", function(e){
        if(e.altKey){
            switch(e.key){
                case "1": e.preventDefault(); switchLanguage("fr"); break;
                case "2": e.preventDefault(); switchLanguage("en"); break;
                case "3": e.preventDefault(); switchLanguage("ar"); break;
            }
        }
    });

    document.querySelectorAll("a[href^='#']").forEach(anchor=>{
        anchor.addEventListener("click", e=>{
            e.preventDefault();
            const target=document.querySelector(anchor.getAttribute("href"));
            if(target) target.scrollIntoView({behavior:"smooth",block:"start"});
        });
    });

    window.addEventListener("load", function(){
        body.style.opacity="0";
        body.style.transform="translateY(20px)";
        setTimeout(()=>{body.style.transition="all 0.6s ease"; body.style.opacity="1"; body.style.transform="translateY(0)";},100);
    });

    const observer = new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                entry.target.style.opacity="1";
                entry.target.style.transform="translateY(0)";
            }
        });
    }, {threshold:0.1, rootMargin:"0px 0px -50px 0px"});

    document.querySelectorAll(".section").forEach(section=>{
        section.style.opacity="0";
        section.style.transform="translateY(30px)";
        section.style.transition="all 0.6s ease";
        observer.observe(section);
    });

    function printCV(){ window.print(); }
    function downloadPDF(){ alert("PDF download requires backend implementation."); }

    window.switchLanguage = switchLanguage;
    window.printCV = printCV;
    window.downloadPDF = downloadPDF;

    function shareCV(){
        if(navigator.share){ navigator.share({title:"Sid Ahmed Mohamed Ejjah - CV", text:"Check out my professional CV", url:window.location.href}); }
        else{ navigator.clipboard.writeText(window.location.href).then(()=>alert("CV link copied!")); }
    }
    window.shareCV = shareCV;

    function sendEmail(){ window.location.href="mailto:sidahmedhedya59@gmail.com?subject=Contact from CV&body=Hello Sid'Ahmed,"; }
    function callPhone(){ window.location.href="tel:+22241377131"; }
    window.sendEmail = sendEmail;
    window.callPhone = callPhone;

    function lazyLoadImages(){
        const images=document.querySelectorAll("img[data-src]");
        const io=new IntersectionObserver((entries,observer)=>{
            entries.forEach(entry=>{
                if(entry.isIntersecting){
                    const img=entry.target; img.src=img.dataset.src; img.classList.remove("lazy"); io.unobserve(img);
                }
            });
        });
        images.forEach(img=>io.observe(img));
    }
    lazyLoadImages();

    // Warning overlay
    const warningOverlay = document.getElementById("warning-overlay");
    const dismissBtn = document.getElementById("dismiss-warning");
    dismissBtn.addEventListener("click", ()=>{ warningOverlay.style.display="none"; });

    // Countdown Timer (5 minutes)
    const countdownTimer = document.getElementById("countdown-timer");
    let timeLeft = 300;
    const countdownInterval = setInterval(()=>{
        let min=Math.floor(timeLeft/60);
        let sec=timeLeft%60;
        countdownTimer.textContent = `⏳ ${min.toString().padStart(2,'0')}:${sec.toString().padStart(2,'0')}`;
        timeLeft--;
        if(timeLeft<0){ clearInterval(countdownInterval); countdownTimer.textContent="⏰ Time's up!"; }
    },1000);
});