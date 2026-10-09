// =====================================================
// NOVA LANDING PAGE - JavaScript
// Handles the responsive navigation and small interactions
// =====================================================

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const navLinks = document.querySelectorAll(".nav-link");
const yearElement = document.getElementById("year");

// Display the current year automatically in the footer.
yearElement.textContent = new Date().getFullYear();

// Open/close the mobile navigation menu.
menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");

    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", isOpen);
});

// Close the mobile menu when a navigation link is selected.
navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});

// Highlight the navigation item for the section currently visible.
const sections = document.querySelectorAll("main section[id]");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                navLinks.forEach((link) => link.classList.remove("active"));

                const activeLink = document.querySelector(
                    `.nav-link[href="#${entry.target.id}"]`
                );

                if (activeLink) {
                    activeLink.classList.add("active");
                }
            }
        });
    },
    {
        threshold: 0.25,
        rootMargin: "-80px 0px -40% 0px"
    }
);

sections.forEach((section) => observer.observe(section));

// Close the mobile menu if the browser is resized to desktop size.
window.addEventListener("resize", () => {
    if (window.innerWidth > 700) {
        mainNav.classList.remove("open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
    }
});
