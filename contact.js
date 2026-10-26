// ==========================
// CONTACT FORM
// ==========================

const contactForm =
    document.querySelector(".contact-form form");

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const nameInput =
                contactForm.querySelector(
                    'input[type="text"]'
                );

            const emailInput =
                contactForm.querySelector(
                    'input[type="email"]'
                );

            const subjectInput =
                contactForm.querySelector(
                    "select"
                );

            const messageInput =
                contactForm.querySelector(
                    "textarea"
                );


            const name =
                nameInput.value.trim();

            const email =
                emailInput.value.trim().toLowerCase();

            const subject =
                subjectInput.value;

            const message =
                messageInput.value.trim();


            // ==========================
            // NAME VALIDATION
            // ==========================

            if (name === "") {

                alert(
                    "❌ Please enter your name."
                );

                nameInput.focus();

                return;
            }


            // ==========================
            // EMAIL VALIDATION
            // ==========================

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(email)) {

                alert(
                    "❌ Please enter a valid email address."
                );

                emailInput.focus();

                return;
            }


            // ==========================
            // SUBJECT VALIDATION
            // ==========================

            if (
                subject === "Select a subject"
            ) {

                alert(
                    "❌ Please select a subject."
                );

                subjectInput.focus();

                return;
            }


            // ==========================
            // MESSAGE VALIDATION
            // ==========================

            if (message.length < 10) {

                alert(
                    "❌ Message should contain at least 10 characters."
                );

                messageInput.focus();

                return;
            }


            // ==========================
            // SAVE MESSAGE
            // ==========================

            let messages =
                JSON.parse(
                    localStorage.getItem(
                        "edunovaMessages"
                    )
                ) || [];


            const newMessage = {

                name: name,

                email: email,

                subject: subject,

                message: message,

                date: new Date().toLocaleString()

            };


            messages.push(newMessage);


            localStorage.setItem(
                "edunovaMessages",
                JSON.stringify(messages)
            );


            // ==========================
            // SUCCESS
            // ==========================

            alert(
                "✅ Message sent successfully!\n\n" +
                "Thank you, " +
                name +
                "! Our team will get back to you soon."
            );


            contactForm.reset();

        }
    );

}


// ==========================
// FAQ ACCORDION
// ==========================

const faqQuestions =
    document.querySelectorAll(
        ".faq-question"
    );


faqQuestions.forEach(
    function (question) {

        question.addEventListener(
            "click",
            function () {

                const answer =
                    this.nextElementSibling;

                const icon =
                    this.querySelector("i");


                // Close other FAQs

                faqQuestions.forEach(
                    function (item) {

                        if (
                            item !== question
                        ) {

                            const otherAnswer =
                                item.nextElementSibling;

                            const otherIcon =
                                item.querySelector("i");


                            otherAnswer.style.display =
                                "none";


                            if (otherIcon) {

                                otherIcon.classList.remove(
                                    "fa-minus"
                                );

                                otherIcon.classList.add(
                                    "fa-plus"
                                );

                            }

                        }

                    }
                );


                // Toggle current FAQ

                if (
                    answer.style.display ===
                    "block"
                ) {

                    answer.style.display =
                        "none";


                    if (icon) {

                        icon.classList.remove(
                            "fa-minus"
                        );

                        icon.classList.add(
                            "fa-plus"
                        );

                    }

                } else {

                    answer.style.display =
                        "block";


                    if (icon) {

                        icon.classList.remove(
                            "fa-plus"
                        );

                        icon.classList.add(
                            "fa-minus"
                        );

                    }

                }

            }
        );

    }
);


// ==========================
// LOGIN STATE
// ==========================

function updateLoginState() {

    const loggedIn =
        localStorage.getItem(
            "edunovaLoggedIn"
        ) === "true";


    const currentUser =
        JSON.parse(
            localStorage.getItem(
                "edunovaCurrentUser"
            )
        );


    const loginButton =
        document.querySelector(
            ".login-btn"
        );


    const signupButton =
        document.querySelector(
            ".signup-btn"
        );


    // ==========================
    // LOGGED IN
    // ==========================

    if (
        loggedIn &&
        currentUser
    ) {

        if (loginButton) {

            loginButton.textContent =
                "Welcome, " +
                currentUser.firstName;


            loginButton.onclick =
                function () {

                    alert(
                        "👋 Welcome back, " +
                        currentUser.firstName +
                        "!"
                    );

                };

        }


        if (signupButton) {

            signupButton.textContent =
                "Logout";


            signupButton.onclick =
                function () {

                    const confirmLogout =
                        confirm(
                            "Are you sure you want to logout?"
                        );


                    if (!confirmLogout) {
                        return;
                    }


                    localStorage.removeItem(
                        "edunovaLoggedIn"
                    );

                    localStorage.removeItem(
                        "edunovaCurrentUser"
                    );

                    localStorage.removeItem(
                        "edunovaRemember"
                    );


                    alert(
                        "✅ You have been logged out successfully."
                    );


                    window.location.href =
                        "home.html";

                };

        }

    }


    // ==========================
    // NOT LOGGED IN
    // ==========================

    else {

        if (loginButton) {

            loginButton.textContent =
                "Log In";


            loginButton.onclick =
                function () {

                    window.location.href =
                        "login.html";

                };

        }


        if (signupButton) {

            signupButton.textContent =
                "Sign Up";


            signupButton.onclick =
                function () {

                    window.location.href =
                        "signup.html";

                };

        }

    }

}


// ==========================
// PAGE LOAD
// ==========================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateLoginState();

    }
);


// ==========================
// CONSOLE MESSAGE
// ==========================

console.log(
    "EduNova Contact JavaScript loaded successfully 🚀"
);