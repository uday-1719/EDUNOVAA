

// ==========================
// TOGGLE PASSWORD VISIBILITY
// ==========================

function togglePassword(inputId, iconId) {

    const password =
        document.getElementById(inputId);

    const icon =
        document.getElementById(iconId);


    if (password.type === "password") {

        password.type = "text";

        icon.classList.remove("fa-eye");

        icon.classList.add("fa-eye-slash");

    } else {

        password.type = "password";

        icon.classList.remove("fa-eye-slash");

        icon.classList.add("fa-eye");

    }

}


// ==========================
// SIGNUP FORM
// ==========================

const signupForm =
    document.getElementById("signupForm");


if (signupForm) {

    signupForm.addEventListener("submit", function(event) {

        event.preventDefault();


        const firstName =
            document.getElementById("firstName").value.trim();

        const lastName =
            document.getElementById("lastName").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        const terms =
            document.getElementById("terms").checked;

        const message =
            document.getElementById("message");


        // ==========================
        // NAME VALIDATION
        // ==========================

        if (firstName === "" || lastName === "") {

            message.style.color = "#dc2626";

            message.textContent =
                "Please enter your first and last name.";

            return;

        }


        // ==========================
        // EMAIL VALIDATION
        // ==========================

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(email)) {

            message.style.color = "#dc2626";

            message.textContent =
                "Please enter a valid email address.";

            return;

        }


        // ==========================
        // PASSWORD LENGTH
        // ==========================

        if (password.length < 6) {

            message.style.color = "#dc2626";

            message.textContent =
                "Password must contain at least 6 characters.";

            return;

        }


        // ==========================
        // PASSWORD MATCH
        // ==========================

        if (password !== confirmPassword) {

            message.style.color = "#dc2626";

            message.textContent =
                "Passwords do not match.";

            return;

        }


        // ==========================
        // TERMS & CONDITIONS
        // ==========================

        if (!terms) {

            message.style.color = "#dc2626";

            message.textContent =
                "Please accept the Terms of Service.";

            return;

        }


        // ==========================
        // SAVE USER
        // ==========================

        const user = {

            firstName: firstName,

            lastName: lastName,

            email: email,

            password: password

        };


        localStorage.setItem(
            "edunovaUser",
            JSON.stringify(user)
        );


        // ==========================
        // SUCCESS MESSAGE
        // ==========================

        message.style.color = "#16a34a";

        message.textContent =
            `Welcome to EduNova, ${firstName}! Account created successfully.`;


        // ==========================
        // REDIRECT TO LOGIN
        // ==========================

        setTimeout(function() {

            window.location.href = "login.html";

        }, 1500);

    });

}


// ==========================
// CONSOLE MESSAGE
// ==========================

console.log(
    "EduNova Signup JavaScript loaded successfully 🚀"
);
