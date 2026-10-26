// ==========================
// PRELOADER
// ==========================

window.addEventListener("load", function () {

    setTimeout(function () {

        const preloader =
            document.getElementById("preloader");

        const website =
            document.getElementById("website");

        if (preloader) {
            preloader.style.display = "none";
        }

        if (website) {
            website.style.display = "block";
        }

    }, 2000);

});


// ==========================
// EXPLORE COURSES BUTTON
// ==========================

const exploreButton =
    document.querySelector(".explore-btn");

if (exploreButton) {

    exploreButton.onclick = function () {

        window.location.href =
            "courses.html";

    };

}


// ==========================
// NAVIGATION ACTIVE LINK
// ==========================

const links =
    document.querySelectorAll("nav ul li a");

for (let i = 0; i < links.length; i++) {

    links[i].onclick = function () {

        for (let j = 0; j < links.length; j++) {

            links[j].style.color =
                "#334155";

        }

        this.style.color =
            "#2563EB";

    };

}


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
    // USER IS LOGGED IN
    // ==========================

    if (loggedIn && currentUser) {

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


                    // Clear login state

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
    // USER IS NOT LOGGED IN
    // ==========================

    else {

        if (loginButton) {

            loginButton.textContent =
                "Login";

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
// LIGHT / DARK MODE
// ==========================

const themeToggle =
    document.getElementById(
        "themeToggle"
    );

const themeIcon =
    document.getElementById(
        "themeIcon"
    );


if (
    themeToggle &&
    themeIcon
) {

    if (
        localStorage.getItem(
            "theme"
        ) === "dark"
    ) {

        document.body.classList.add(
            "dark-mode"
        );

        themeIcon.classList.remove(
            "fa-moon"
        );

        themeIcon.classList.add(
            "fa-sun"
        );

    }


    themeToggle.addEventListener(
        "click",
        function () {

            document.body.classList.toggle(
                "dark-mode"
            );


            if (
                document.body.classList.contains(
                    "dark-mode"
                )
            ) {

                themeIcon.classList.remove(
                    "fa-moon"
                );

                themeIcon.classList.add(
                    "fa-sun"
                );

                localStorage.setItem(
                    "theme",
                    "dark"
                );

            }

            else {

                themeIcon.classList.remove(
                    "fa-sun"
                );

                themeIcon.classList.add(
                    "fa-moon"
                );

                localStorage.setItem(
                    "theme",
                    "light"
                );

            }

        }
    );

}


// ==========================
// FAQ ACCORDION
// ==========================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const questions =
            document.querySelectorAll(
                ".faq-question"
            );


        questions.forEach(
            function (question) {

                question.addEventListener(
                    "click",
                    function () {

                        const answer =
                            this.nextElementSibling;


                        document
                            .querySelectorAll(
                                ".faq-answer"
                            )
                            .forEach(
                                function (item) {

                                    if (
                                        item !== answer
                                    ) {

                                        item.classList.remove(
                                            "open"
                                        );

                                    }

                                }
                            );


                        answer.classList.toggle(
                            "open"
                        );

                    }
                );

            }
        );


        // Update login/logout state

        updateLoginState();

    }
);


// ==========================
// COURSE ENROLLMENT
// ==========================

const courseButtons =
    document.querySelectorAll(
        ".course-btn"
    );


courseButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const loggedIn =
                    localStorage.getItem(
                        "edunovaLoggedIn"
                    ) === "true";


                // Login required

                if (!loggedIn) {

                    const goToLogin =
                        confirm(
                            "🔐 Please login first to enroll in a course.\n\nDo you want to login?"
                        );


                    if (goToLogin) {

                        window.location.href =
                            "login.html";

                    }

                    return;

                }


                const courseCard =
                    this.closest(
                        ".course-card"
                    );


                if (!courseCard) {
                    return;
                }


                const courseName =
                    courseCard
                        .querySelector("h3")
                        .textContent
                        .trim();


                let enrollments =
                    JSON.parse(
                        localStorage.getItem(
                            "edunovaEnrollments"
                        )
                    ) || [];


                // Already enrolled

                if (
                    enrollments.includes(
                        courseName
                    )
                ) {

                    alert(
                        "✅ You are already enrolled in " +
                        courseName + "!"
                    );

                    return;

                }


                // Save enrollment

                enrollments.push(
                    courseName
                );


                localStorage.setItem(
                    "edunovaEnrollments",
                    JSON.stringify(
                        enrollments
                    )
                );


                alert(
                    "🎓 Enrollment Successful!\n\n" +
                    "You selected: " +
                    courseName
                );


                this.textContent =
                    "Enrolled ✓";

                this.disabled = true;

            }
        );

    }
);


// ==========================
// TESTIMONIAL SLIDER
// ==========================

const testimonials =
    document.querySelectorAll(
        ".testimonial"
    );

let currentTestimonial = 0;


function changeTestimonial() {

    if (
        testimonials.length === 0
    ) {
        return;
    }


    testimonials[
        currentTestimonial
    ].classList.remove(
        "active"
    );


    currentTestimonial++;


    if (
        currentTestimonial >=
        testimonials.length
    ) {

        currentTestimonial = 0;

    }


    testimonials[
        currentTestimonial
    ].classList.add(
        "active"
    );

}


if (
    testimonials.length > 1
) {

    setInterval(
        changeTestimonial,
        4000
    );

}


// ==========================
// NEWSLETTER VALIDATION
// ==========================

const newsletterForm =
    document.getElementById(
        "newsletter-form"
    );


if (newsletterForm) {

    newsletterForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const email =
                newsletterForm
                    .querySelector("input")
                    .value
                    .trim();


            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !emailPattern.test(
                    email
                )
            ) {

                alert(
                    "❌ Please enter a valid email address."
                );

                return;

            }


            alert(
                "🎉 Successfully subscribed!\n\n" +
                "Thank you for joining EduNova."
            );


            newsletterForm.reset();

        }
    );

}


// ==========================
// SCROLL TO TOP
// ==========================

const scrollTop =
    document.getElementById(
        "scrollTop"
    );


if (scrollTop) {

    window.addEventListener(
        "scroll",
        function () {

            if (
                window.scrollY > 400
            ) {

                scrollTop.style.display =
                    "block";

            }

            else {

                scrollTop.style.display =
                    "none";

            }

        }
    );


    scrollTop.addEventListener(
        "click",
        function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


// ==========================
// ANIMATED STATISTICS
// ==========================

const statNumbers =
    document.querySelectorAll(
        ".stat-box h2"
    );


function animateStats() {

    statNumbers.forEach(
        function (stat) {

            const originalText =
                stat.textContent;


            const number =
                parseInt(
                    originalText.replace(
                        /\D/g,
                        ""
                    )
                );


            const suffix =
                originalText.replace(
                    /[0-9]/g,
                    ""
                );


            let current = 0;


            const increment =
                Math.ceil(
                    number / 50
                );


            const counter =
                setInterval(
                    function () {

                        current +=
                            increment;


                        if (
                            current >=
                            number
                        ) {

                            current =
                                number;

                            clearInterval(
                                counter
                            );

                        }


                        stat.textContent =
                            current +
                            suffix;

                    },
                    30
                );

        }
    );

}


window.addEventListener(
    "load",
    function () {

        setTimeout(
            function () {

                animateStats();

            },
            2100
        );

    }
);


// ==========================
// COURSE CARD EFFECT
// ==========================

const courseCards =
    document.querySelectorAll(
        ".course-card"
    );


courseCards.forEach(
    function (card) {

        card.addEventListener(
            "mouseenter",
            function () {

                this.style.transform =
                    "translateY(-8px)";

            }
        );


        card.addEventListener(
            "mouseleave",
            function () {

                this.style.transform =
                    "translateY(0)";

            }
        );

    }
);


// ==========================
// CONSOLE MESSAGE
// ==========================

console.log(
    "EduNova JavaScript loaded successfully 🚀"
);