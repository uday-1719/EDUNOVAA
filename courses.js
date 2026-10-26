// ==========================
// COURSES PAGE JAVASCRIPT
// ==========================


// ==========================
// LOGIN / SIGNUP BUTTONS
// ==========================

const loginBtn = document.querySelector(".login-btn");

if (loginBtn) {
    loginBtn.addEventListener("click", function () {
        window.location.href = "login.html";
    });
}


const signupBtn = document.querySelector(".signup-btn");

if (signupBtn) {
    signupBtn.addEventListener("click", function () {
        window.location.href = "signup.html";
    });
}


// ==========================
// SEARCH COURSES
// ==========================

const searchInput =
    document.querySelector(".search-box input");

const searchButton =
    document.querySelector(".search-box button");

const courseCards =
    document.querySelectorAll(".course-card");


function searchCourses() {

    const searchText =
        searchInput.value.toLowerCase().trim();

    let foundCourses = 0;

    courseCards.forEach(function (card) {

        const courseName =
            card.querySelector("h3")
                .textContent
                .toLowerCase();

        const category =
            card.querySelector(".course-category")
                .textContent
                .toLowerCase();

        const description =
            card.querySelector(".course-description")
                .textContent
                .toLowerCase();


        if (
            searchText === "" ||
            courseName.includes(searchText) ||
            category.includes(searchText) ||
            description.includes(searchText)
        ) {

            card.style.display = "block";
            foundCourses++;

        } else {

            card.style.display = "none";

        }

    });


    if (foundCourses === 0) {

        alert("❌ No courses found.");

    }

}


// Search button

if (searchButton) {

    searchButton.addEventListener("click", function () {

        searchCourses();

    });

}


// Search while typing

if (searchInput) {

    searchInput.addEventListener("input", function () {

        searchCourses();

    });

}


// ==========================
// CATEGORY FILTER
// ==========================

const categoryCards =
    document.querySelectorAll(".category-card");


categoryCards.forEach(function (category) {

    category.addEventListener("click", function () {

        const selectedCategory =
            this.querySelector("h3")
                .textContent
                .toLowerCase();

        let found = false;


        courseCards.forEach(function (course) {

            const courseCategory =
                course.querySelector(".course-category")
                    .textContent
                    .toLowerCase();


            if (
                courseCategory.includes(selectedCategory)
            ) {

                course.style.display = "block";
                found = true;

            } else {

                course.style.display = "none";

            }

        });


        if (found) {

            document
                .querySelector(".courses-section")
                .scrollIntoView({
                    behavior: "smooth"
                });

        } else {

            alert(
                "No courses available in " +
                this.querySelector("h3").textContent
            );

        }

    });

});


// ==========================
// ENROLLMENT SYSTEM
// ==========================


// Get saved enrollments

let enrollments =
    JSON.parse(
        localStorage.getItem("edunovaEnrollments")
    ) || [];


// Check whether user is logged in

function isLoggedIn() {

    return (
        localStorage.getItem("edunovaLoggedIn")
        === "true"
    );

}


// Save enrollments

function saveEnrollments() {

    localStorage.setItem(
        "edunovaEnrollments",
        JSON.stringify(enrollments)
    );

}


// ==========================
// UPDATE ENROLL BUTTONS
// ==========================

function updateEnrollmentButtons() {

    const buttons =
        document.querySelectorAll(".enroll-btn");


    buttons.forEach(function (button) {

        const card =
            button.closest(".course-card");

        const courseName =
            card.querySelector("h3")
                .textContent
                .trim();


        if (enrollments.includes(courseName)) {

            button.textContent =
                "Enrolled ✓";

            button.disabled = true;

            button.style.cursor =
                "default";

        }

    });

}


// ==========================
// ENROLL COURSE
// ==========================

const enrollButtons =
    document.querySelectorAll(".enroll-btn");


enrollButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const courseCard =
            this.closest(".course-card");


        const courseName =
            courseCard.querySelector("h3")
                .textContent
                .trim();


        const price =
            courseCard.querySelector(".price")
                .childNodes[0]
                .textContent
                .trim();


        // Check login

        if (!isLoggedIn()) {

            const goToLogin =
                confirm(
                    "🔐 Please login first to enroll in a course.\n\n" +
                    "Do you want to go to Login?"
                );


            if (goToLogin) {

                localStorage.setItem(
                    "edunovaRedirectAfterLogin",
                    "courses.html"
                );

                window.location.href =
                    "login.html";

            }

            return;

        }


        // Already enrolled

        if (enrollments.includes(courseName)) {

            alert(
                "You are already enrolled in this course."
            );

            return;

        }


        // Confirm enrollment

        const confirmEnroll =
            confirm(
                "🎓 Course: " +
                courseName +
                "\n💰 Price: " +
                price +
                "\n\nDo you want to enroll?"
            );


        if (!confirmEnroll) {

            return;

        }


        // Save enrollment

        enrollments.push(courseName);

        saveEnrollments();


        // Update button

        this.textContent =
            "Enrolled ✓";

        this.disabled = true;

        this.style.cursor =
            "default";


        alert(
            "✅ Enrollment Successful!\n\n" +
            "You are now enrolled in:\n" +
            courseName
        );

    });

});


// ==========================
// VIEW ALL COURSES
// ==========================

const viewAllBtn =
    document.querySelector(".view-all");


if (viewAllBtn) {

    viewAllBtn.addEventListener("click", function () {

        courseCards.forEach(function (card) {

            card.style.display = "block";

        });


        if (searchInput) {

            searchInput.value = "";

        }

    });

}


// ==========================
// COURSE CARD HOVER
// ==========================

courseCards.forEach(function (card) {

    card.addEventListener("mouseenter", function () {

        this.style.transform =
            "translateY(-8px)";

    });


    card.addEventListener("mouseleave", function () {

        this.style.transform =
            "translateY(0)";

    });

});


// ==========================
// LOAD SAVED ENROLLMENTS
// ==========================

updateEnrollmentButtons();


console.log(
    "EduNova Courses JavaScript loaded successfully 🚀"
);