
"use strict";


const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";
});


navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        menuToggle.textContent = "☰";
    });
});


document.getElementById("year").textContent =
    new Date().getFullYear();


const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    
    if (!name || !email || !message) {
        formStatus.textContent = "Please complete all fields.";
        return;
    }

    
    formStatus.textContent = "Sending your message...";

    const submitButton = contactForm.querySelector(
        'button[type="submit"]'
    );

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    try {
        
        const response = await fetch(
            "https://formsubmit.co/ajax/nayakveekshitha40@gmail.com",
            {
                method: "POST",
                body: new FormData(contactForm),
                headers: {
                    Accept: "application/json"
                }
            }
        );

        const result = await response.json();

        if (response.ok && result.success) {
            formStatus.textContent =
                "Message sent successfully! Thank you for contacting me.";

            contactForm.reset();
        } else {
            formStatus.textContent =
                "Message could not be sent. Please try again.";
        }

    } catch (error) {
        formStatus.textContent =
            "Unable to send your message. Please check your internet connection and try again.";

    } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Send Message";
    }
});
