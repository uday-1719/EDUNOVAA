// ==========================
// EDUNOVA ABOUT PAGE
// ==========================


// ==========================
// NAVIGATION ACTIVE LINK
// ==========================

const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(function(link) {

    link.addEventListener("click", function() {

        navLinks.forEach(function(item) {
            item.classList.remove("active");
        });

        this.classList.add("active");

    });

});


// ==========================
// EXPLORE COURSES BUTTON
// ==========================

const exploreButton =
    document.querySelector(".primary-btn");

if (exploreButton) {

    exploreButton.addEventListener("click", function() {

        window.location.href = "courses.html";

    });

}


// ==========================
// ANIMATED STATISTICS
// ==========================

const statNumbers =
    document.querySelectorAll(".stat-card h2");


function animateStats() {

    statNumbers.forEach(function(stat) {

        const originalText =
            stat.textContent.trim();

        const target =
            parseInt(
                originalText.replace(/\D/g, "")
            );

        const suffix =
            originalText.includes("K") ? "K+" : "+";

        let current = 0;

        const increment =
            Math.ceil(target / 50);


        const counter =
            setInterval(function() {

                current += increment;


                if (current >= target) {

                    current = target;

                    clearInterval(counter);

                }


                stat.textContent =
                    current + suffix;

            }, 30);

    });

}


if (statNumbers.length > 0) {

    window.addEventListener(
        "load",
        animateStats
    );

}


// ==========================
// SCROLL REVEAL
// ==========================

const revealElements =
    document.querySelectorAll(
        ".mission-card, .feature-card, .value, .stat-card, .about-image, .about-text"
    );


if (revealElements.length > 0) {

    const observer =
        new IntersectionObserver(
            function(entries) {

                entries.forEach(function(entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    revealElements.forEach(function(element) {

        observer.observe(element);

    });

}


// ==========================
// LOGIN STATE
// ==========================

function updateLoginState() {

    const loggedIn =
        localStorage.getItem(
            "edunovaLoggedIn"
        ) === "true";


    let currentUser = null;


    try {

        currentUser =
            JSON.parse(
                localStorage.getItem(
                    "edunovaCurrentUser"
                )
            );

    } catch (error) {

        currentUser = null;

    }


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

    if (loggedIn && currentUser) {

        if (loginButton) {

            loginButton.textContent =
                "Welcome, " +
                currentUser.firstName;


            loginButton.onclick =
                function() {

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
                function() {

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
    // LOGGED OUT
    // ==========================

    else {

        if (loginButton) {

            loginButton.textContent =
                "Log In";


            loginButton.onclick =
                function() {

                    window.location.href =
                        "login.html";

                };

        }


        if (signupButton) {

            signupButton.textContent =
                "Sign Up";


            signupButton.onclick =
                function() {

                    window.location.href =
                        "signup.html";

                };

        }

    }

}


// ==========================
// FOOTER LINKS
// ==========================

const footerLinks =
    document.querySelectorAll(
        "footer a"
    );


footerLinks.forEach(function(link) {

    link.addEventListener(
        "click",
        function(event) {

            const href =
                this.getAttribute("href");


            if (href === "#") {

                event.preventDefault();

                alert(
                    "🚧 This section is coming soon!"
                );

            }

        }
    );

});


// ==========================
// PAGE LOAD
// ==========================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateLoginState();

    }
);


// ==========================
// CONSOLE MESSAGE
// ==========================

console.log(
    "EduNova About JavaScript loaded successfully 🚀"
);