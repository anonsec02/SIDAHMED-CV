// Language switching functionality
document.addEventListener("DOMContentLoaded", function() {
    const langButtons = document.querySelectorAll(".lang-btn");
    const body = document.body;
    
    // Set default language
    let currentLang = "fr";
    
    // Language switching function
    function switchLanguage(lang) {
        currentLang = lang;
        
        // Update active button
        langButtons.forEach(btn => {
            btn.classList.remove("active");
            if (btn.dataset.lang === lang) {
                btn.classList.add("active");
            }
        });
        
        // Update text direction for Arabic
        if (lang === "ar") {
            body.classList.add("rtl");
            body.style.direction = "rtl";
        } else {
            body.classList.remove("rtl");
            body.style.direction = "ltr";
        }
        
        // Update all translatable elements
        const translatableElements = document.querySelectorAll("[data-fr], [data-en], [data-ar]");
        
        translatableElements.forEach(element => {
            const translation = element.getAttribute(`data-${lang}`);
            if (translation) {
                element.textContent = translation;
            }
        });
        
        // Update page title
        const titles = {
            "fr": "Sid Ahmed Mohamed Ejjah - Curriculum Vitae",
            "en": "Sid Ahmed Mohamed Ejjah - Curriculum Vitae", 
            "ar": "سيد أحمد محمد إججاه - السيرة الذاتية"
        };
        document.title = titles[lang];
        
        // Update meta description
        const descriptions = {
            "fr": "Expert en Cybersécurité et Spécialiste IA - Sid Ahmed Mohamed Ejjah. Plus d\'un an d\'expérience en tests d\'intrusion et développement d\'IA.",
            "en": "Cybersecurity Expert & AI Specialist - Sid Ahmed Mohamed Ejjah. Over one year of experience in penetration testing and AI development.",
            "ar": "خبير الأمن السيبراني ومتخصص الذكاء الاصطناعي - سيد أحمد محمد إججاه. أكثر من سنة خبرة في اختبار الاختراق وتطوير الذكاء الاصطناعي."
        };
        
        let metaDesc = document.querySelector("meta[name=\"description\"]");
        if (metaDesc) {
            metaDesc.setAttribute("content", descriptions[lang]);
        }
        
        // Update HTML lang attribute
        document.documentElement.setAttribute("lang", lang);
        
        // Save language preference
        localStorage.setItem("preferredLanguage", lang);
        
        // Add smooth transition effect
        document.body.style.opacity = "0.8";
        setTimeout(() => {
            document.body.style.opacity = "1";
        }, 150);
    }
    
    // Add click event listeners to language buttons
    langButtons.forEach(button => {
        button.addEventListener("click", function() {
            const lang = this.dataset.lang;
            switchLanguage(lang);
        });
    });
    
    // Load saved language preference or detect browser language
    const savedLang = localStorage.getItem("preferredLanguage");
    const browserLang = navigator.language.substring(0, 2);
    
    let initialLang = "fr"; // Default to French
    
    if (savedLang && ["fr", "en", "ar"].includes(savedLang)) {
        initialLang = savedLang;
    } else if (["fr", "en", "ar"].includes(browserLang)) {
        initialLang = browserLang;
    }
    
    // Apply initial language
    switchLanguage(initialLang);
    
    // Add keyboard shortcuts for language switching
    document.addEventListener("keydown", function(e) {
        if (e.altKey) {
            switch(e.key) {
                case "1":
                    e.preventDefault();
                    switchLanguage("fr");
                    break;
                case "2":
                    e.preventDefault();
                    switchLanguage("en");
                    break;
                case "3":
                    e.preventDefault();
                    switchLanguage("ar");
                    break;
            }
        }
    });
    
    // Add smooth scrolling for better UX
    document.querySelectorAll("a[href^=\"#\"]").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });
    
    // Add loading animation
    window.addEventListener("load", function() {
        document.body.style.opacity = "0";
        document.body.style.transform = "translateY(20px)";
        
        setTimeout(() => {
            document.body.style.transition = "all 0.6s ease";
            document.body.style.opacity = "1";
            document.body.style.transform = "translateY(0)";
        }, 100);
    });
    
    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);
    
    // Observe all sections for scroll animations
    document.querySelectorAll(".section").forEach(section => {
        section.style.opacity = "0";
        section.style.transform = "translateY(30px)";
        section.style.transition = "all 0.6s ease";
        observer.observe(section);
    });
    
    // Add print functionality
    function printCV() {
        window.print();
    }
    
    // Add download PDF functionality (if needed)
    function downloadPDF() {
        // This would require a PDF generation service or library
        alert("PDF download functionality can be implemented with a backend service.");
    }
    
    // Expose functions globally if needed
    window.switchLanguage = switchLanguage;
    window.printCV = printCV;
    window.downloadPDF = downloadPDF;
});

// Add some utility functions
function shareCV() {
    if (navigator.share) {
        navigator.share({
            title: "Sid Ahmed Mohamed Ejjah - CV",
            text: "Check out my professional CV",
            url: window.location.href
        });
    } else {
        // Fallback: copy URL to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            alert("CV link copied to clipboard!");
        });
    }
}

// Add contact functionality
function sendEmail() {
    window.location.href = "mailto:sidahmedhedya59@gmail.com?subject=Contact from CV&body=Hello Sid Ahmed,";
}

function callPhone() {
    window.location.href = "tel:+22241377131";
}

// Performance optimization
function lazyLoadImages() {
    const images = document.querySelectorAll("img[data-src]");
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove("lazy");
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is ready
document.addEventListener("DOMContentLoaded", lazyLoadImages);
