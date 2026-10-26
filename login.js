// ==========================
// PASSWORD SHOW / HIDE
// ==========================

function togglePassword() {

    const password =
        document.getElementById("password");

    const eyeIcon =
        document.getElementById("eyeIcon");

    if (password.type === "password") {

        password.type = "text";

        eyeIcon.classList.remove("fa-eye");
        eyeIcon.classList.add("fa-eye-slash");

    } else {

        password.type = "password";

        eyeIcon.classList.remove("fa-eye-slash");
        eyeIcon.classList.add("fa-eye");

    }
}


// ==========================
// LOGIN FORM
// ==========================

const loginForm =
    document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const email =
            document.getElementById("email")
                .value
                .trim()
                .toLowerCase();

        const password =
            document.getElementById("password")
                .value;

        const remember =
            document.getElementById("remember").checked;

        const message =
            document.getElementById("message");


        // ==========================
        // CHECK ACCOUNT
        // ==========================

        const savedUser =
            localStorage.getItem("edunovaUser");


        if (!savedUser) {

            message.style.color = "#dc2626";

            message.textContent =
                "No account found. Please sign up first.";

            return;
        }


        const user =
            JSON.parse(savedUser);


        // ==========================
        // CHECK EMAIL
        // ==========================

        if (email !== user.email.toLowerCase()) {

            message.style.color = "#dc2626";

            message.textContent =
                "Incorrect email address.";

            return;
        }


        // ==========================
        // CHECK PASSWORD
        // ==========================

        if (password !== user.password) {

            message.style.color = "#dc2626";

            message.textContent =
                "Incorrect password.";

            return;
        }


        // ==========================
        // LOGIN SUCCESS
        // ==========================

        localStorage.setItem(
            "edunovaLoggedIn",
            "true"
        );

        localStorage.setItem(
            "edunovaCurrentUser",
            JSON.stringify(user)
        );


        // ==========================
        // REMEMBER ME
        // ==========================

        if (remember) {

            localStorage.setItem(
                "edunovaRemember",
                "true"
            );

        } else {

            localStorage.removeItem(
                "edunovaRemember"
            );

        }


        // ==========================
        // SUCCESS MESSAGE
        // ==========================

        message.style.color = "#16a34a";

        message.textContent =
            "Login successful! Welcome back, " +
            user.firstName + "!";


        // ==========================
        // REDIRECT AFTER LOGIN
        // ==========================

        setTimeout(function() {

            const redirectPage =
                localStorage.getItem(
                    "edunovaRedirectAfterLogin"
                );

            if (redirectPage) {

                localStorage.removeItem(
                    "edunovaRedirectAfterLogin"
                );

                window.location.href =
                    redirectPage;

            } else {

                window.location.href =
                    "home.html";

            }

        }, 1200);

    });

}


// ==========================
// GOOGLE BUTTON
// ==========================

const googleButton =
    document.querySelector(".google-btn");

if (googleButton) {

    googleButton.addEventListener("click", function() {

        alert(
            "Google Login is not connected yet.\n\n" +
            "Please use your EduNova account."
        );

    });

}


// ==========================
// FORGOT PASSWORD
// ==========================

const forgotPassword =
    document.querySelector(".password-label a");

if (forgotPassword) {

    forgotPassword.addEventListener("click", function(event) {

        event.preventDefault();

        const savedUser =
            localStorage.getItem("edunovaUser");

        if (!savedUser) {

            alert(
                "No EduNova account found.\n\n" +
                "Please create an account first."
            );

            return;
        }

        alert(
            "For this demo website, password reset is not connected.\n\n" +
            "You can create a new account using Sign Up."
        );

    });

}


// ==========================
// SIGN UP LINK
// ==========================

const signupLink =
    document.querySelector(".signup-text a");

if (signupLink) {

    signupLink.addEventListener("click", function(event) {

        event.preventDefault();

        window.location.href =
            "signup.html";

    });

}


console.log(
    "EduNova Login JavaScript loaded successfully 🚀"
);