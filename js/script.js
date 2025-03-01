document.addEventListener("DOMContentLoaded", function() {
    let preloader = document.getElementById("preloader");
    preloader.style.transition = "opacity 1s ease-out";
    preloader.style.opacity = "0";
    setTimeout(() => preloader.style.display = "none", 1000);
    
    document.documentElement.style.overflow = "visible";
    document.body.style.overflow = "auto";
});

// تأثيرات ScrollReveal
ScrollReveal({
  reset: false,
  distance: "60px",
  duration: 1500,
  delay: 200,
  easing: 'ease-in-out' 
});

ScrollReveal().reveal(".top", { origin: "top" });
ScrollReveal().reveal(".bottom", { origin: "bottom" });
ScrollReveal().reveal(".left", { origin: "left" });
ScrollReveal().reveal(".right", { origin: "right" });

// تأثير الكتابة المتحركة
const typed = new Typed(".multiple-text", {
    strings: ["a Programmer", "an Editor", "an artist", "a Designer", "Writer"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

// تحريك المهارات عند ظهورها
document.addEventListener("DOMContentLoaded", function() {
    let observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("start-animation");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(".skill-per").forEach(skill => {
        observer.observe(skill);
    });
});

// إضافة تأثير التحريك للعناصر القابلة للتمرير
const scrollers = document.querySelectorAll(".scroller");
function addAnimation() {
    scrollers.forEach(scroller => {
        scroller.setAttribute("data-animated", "true");
        let inner = scroller.querySelector(".scroller__inner"),
            children = Array.from(inner.children);

        children.forEach(child => {
            let clone = child.cloneNode(true);
            clone.setAttribute("aria-hidden", "true");
            inner.appendChild(clone);
        });
    });
}
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addAnimation();
}

// تقييم النجوم في المراجعات
function updateStars(value) {
    document.querySelectorAll(".stars-container .star").forEach(star => {
        parseInt(star.getAttribute("data-value")) <= value
            ? star.classList.add("checked")
            : star.classList.remove("checked");
    });
}

// التحقق من البريد الإلكتروني قبل إرسال النموذج
document.getElementById("reviewForm").addEventListener("submit", function(event) {
    let emailField = document.getElementById("email");
    let emailValue = emailField.value;
    if (!/^[^\s@]+@gmail\.com$/.test(emailValue)) {
        alert("  تستخدم بريد مزيف - _ - ؟ استخدم بريدًا حقيقيًا ليتم إرسال الرسالة");
        emailField.focus();
        event.preventDefault();
    }
});

// إظهار قائمة الصور في الملف الشخصي
document.addEventListener("DOMContentLoaded", function() {
    let profileBtn = document.querySelector(".profile-preview-btn");
    let selectItems = document.querySelector(".select-items");
    let profileImg = document.getElementById("profile-picture-preview");

    profileBtn.addEventListener("click", function() {
        selectItems.style.display = (selectItems.style.display === "none" || !selectItems.style.display) ? "grid" : "none";
    });

    document.querySelectorAll(".select-items div").forEach(item => {
        item.addEventListener("click", function() {
            let imgSrc = item.getAttribute("data-img");
            profileImg.src = imgSrc;
            selectItems.style.display = "none";
        });
    });

    document.addEventListener("click", function(event) {
        if (!event.target.closest(".profile-preview-btn") && !event.target.closest(".select-items")) {
            selectItems.style.display = "none";
        }
    });
});

// الشريط الجانبي
const sidebar = document.getElementById("sidebar"),
      toggleButton = document.getElementById("navbar-toggle"),
      closeButton = document.getElementById("closebtn");

function toggleSidebar() {
    sidebar.classList.toggle("open");
    sidebar.classList.toggle("close");
    toggleButton.classList.toggle("open");
}
toggleButton.addEventListener("click", toggleSidebar);
closeButton.addEventListener("click", toggleSidebar);

// إغلاق القائمة الجانبية عند الضغط في أي مكان خارجها
document.addEventListener("click", function(event) {
    if (sidebar.classList.contains("open") && !toggleButton.contains(event.target) && !sidebar.contains(event.target)) {
        sidebar.classList.remove("open");
        sidebar.classList.add("close");
        toggleButton.classList.remove("open");
    }
});

// التحديث التلقائي للتواريخ
document.addEventListener("DOMContentLoaded", function() {
    let dateElements = document.querySelectorAll(".date");

    dateElements.forEach(element => {
        let dataDate = element.getAttribute("data-date");
        let date = new Date(dataDate);
        let now = new Date();
        let diff = now - date;
        let days = Math.floor(diff / 86400000);
        let weeks = Math.floor(days / 7);
        let months = Math.floor(days / 30);
        let message = "";

        if (days < 1) {
            let hours = Math.floor(diff / 3600000);
            message = hours < 1 ? `قبل ${Math.floor(diff / 60000)} دقيقة` : `قبل ${hours} ساعة`;
        } else if (days <= 6) {
            message = `قبل ${days} ${days === 1 ? "يوم" : "أيام"}`;
        } else if (weeks <= 4) {
            message = `قبل ${weeks} ${weeks === 1 ? "أسبوع" : "أسابيع"}`;
        } else {
            message = `قبل ${months} ${months === 1 ? "شهر" : "أشهر"}`;
        }

        element.textContent = message;
    });
});

// تحريك شريط الأخبار
const root = document.documentElement;
const marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue("--marquee-elements-displayed");
const marqueeContent = document.querySelector("ul.marquee-content");

root.style.setProperty("--marquee-elements", marqueeContent.children.length);
for (let i = 0; i < marqueeElementsDisplayed; i++) {
    marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
}

// إظهار وإخفاء الوصف عند الضغط على الزر
document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", function() {
        this.classList.toggle("active");
        let description = this.previousElementSibling;
        description.style.display = description.style.display === "block" ? "none" : "block";
        this.textContent = description.style.display === "block" ? "إخفاء الوصف" : "عرض الوصف";
    });
});