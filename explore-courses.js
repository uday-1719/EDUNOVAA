// ==========================
// LOGIN BUTTON
// ==========================

const loginBtn = document.querySelector(".login-btn");

if (loginBtn) {

    loginBtn.addEventListener("click", function () {

        window.location.href = "login.html";

    });

}


// ==========================
// COURSE DATA
// ==========================

const courseDetails = {

    "Python Programming": {
        price: "₹999",
        category: "Programming"
    },

    "Artificial Intelligence": {
        price: "₹1,499",
        category: "AI & ML"
    },

    "Full Stack Web Development": {
        price: "₹1,999",
        category: "Web Development"
    },

    "Data Science": {
        price: "₹1,799",
        category: "Data Science"
    },

    "Java Programming": {
        price: "₹1,199",
        category: "Programming"
    },

    "UI/UX Design": {
        price: "₹899",
        category: "Design"
    }

};


// ==========================
// COURSE FILTER
// ==========================

function filterCourses(category) {

    const cards =
        document.querySelectorAll(".course-card");

    const buttons =
        document.querySelectorAll(".category");

    buttons.forEach(function (button) {

        button.classList.remove("active");

    });


    // Find clicked category button
    buttons.forEach(function (button) {

        const buttonText =
            button.textContent
                .toLowerCase();

        if (
            (category === "all" &&
                buttonText.includes("all")) ||

            (category === "programming" &&
                buttonText.includes("programming")) ||

            (category === "ai" &&
                buttonText.includes("ai")) ||

            (category === "web" &&
                buttonText.includes("web")) ||

            (category === "data" &&
                buttonText.includes("data"))
        ) {

            button.classList.add("active");

        }

    });


    let visibleCourses = 0;


    cards.forEach(function (card) {

        const cardCategory =
            card.dataset.category;


        if (
            category === "all" ||
            cardCategory === category
        ) {

            card.style.display = "block";

            visibleCourses++;

        } else {

            card.style.display = "none";

        }

    });


    updateCourseCount(visibleCourses);

}


// ==========================
// SEARCH COURSES
// ==========================

function searchCourses() {

    const searchInput =
        document.getElementById("courseSearch");

    const search =
        searchInput.value
            .toLowerCase()
            .trim();


    const cards =
        document.querySelectorAll(".course-card");


    let visibleCourses = 0;


    cards.forEach(function (card) {

        const title =
            card.dataset.title
                .toLowerCase();

        const category =
            card.dataset.category
                .toLowerCase();

        const description =
            card.querySelector("p")
                .textContent
                .toLowerCase();


        if (
            search === "" ||

            title.includes(search) ||

            category.includes(search) ||

            description.includes(search)
        ) {

            card.style.display = "block";

            visibleCourses++;

        } else {

            card.style.display = "none";

        }

    });


    updateCourseCount(visibleCourses);

}


// ==========================
// UPDATE COURSE COUNT
// ==========================

function updateCourseCount(count) {

    const courseCount =
        document.getElementById("courseCount");

    const noResults =
        document.getElementById("noResults");


    if (courseCount) {

        courseCount.textContent =
            count + " Courses";

    }


    if (noResults) {

        noResults.style.display =
            count === 0 ? "block" : "none";

    }

}


// ==========================
// SEARCH WHILE TYPING
// ==========================

const searchInput =
    document.getElementById("courseSearch");


if (searchInput) {

    searchInput.addEventListener(
        "input",
        function () {

            searchCourses();

        }
    );

}


// ==========================
// OPEN / ENROLL COURSE
// ==========================

function openCourse(courseName) {

    const loggedIn =
        localStorage.getItem(
            "edunovaLoggedIn"
        ) === "true";


    // User not logged in
    if (!loggedIn) {

        const login =
            confirm(
                "🔐 Please login first to enroll in this course.\n\n" +
                "Do you want to go to Login?"
            );


        if (login) {

            localStorage.setItem(
                "edunovaRedirectAfterLogin",
                "explore-courses.html"
            );

            localStorage.setItem(
                "edunovaSelectedCourse",
                courseName
            );

            window.location.href =
                "login.html";

        }

        return;

    }


    // Get saved enrollments
    let enrollments =
        JSON.parse(
            localStorage.getItem(
                "edunovaEnrollments"
            )
        ) || [];


    // Already enrolled
    if (enrollments.includes(courseName)) {

        alert(
            "✅ You are already enrolled in " +
            courseName + "!"
        );

        return;

    }


    const details =
        courseDetails[courseName];


    const price =
        details
            ? details.price
            : "N/A";


    // Confirm enrollment
    const confirmEnrollment =
        confirm(
            "🎓 Course: " +
            courseName +
            "\n💰 Price: " +
            price +
            "\n\nDo you want to enroll?"
        );


    if (!confirmEnrollment) {

        return;

    }


    // Save enrollment
    enrollments.push(courseName);


    localStorage.setItem(
        "edunovaEnrollments",
        JSON.stringify(enrollments)
    );


    // Change button
    const cards =
        document.querySelectorAll(".course-card");


    cards.forEach(function (card) {

        const title =
            card.querySelector("h3")
                .textContent
                .trim();


        if (title === courseName) {

            const button =
                card.querySelector(
                    ".course-bottom button"
                );


            if (button) {

                button.textContent =
                    "Enrolled ✓";

                button.disabled = true;

            }

        }

    });


    alert(
        "🎉 Enrollment Successful!\n\n" +
        "You are now enrolled in:\n" +
        courseName
    );

}


// ==========================
// UPDATE ENROLLED COURSES
// ==========================

function updateEnrolledCourses() {

    const enrollments =
        JSON.parse(
            localStorage.getItem(
                "edunovaEnrollments"
            )
        ) || [];


    const cards =
        document.querySelectorAll(".course-card");


    cards.forEach(function (card) {

        const title =
            card.querySelector("h3")
                .textContent
                .trim();


        if (enrollments.includes(title)) {

            const button =
                card.querySelector(
                    ".course-bottom button"
                );


            if (button) {

                button.textContent =
                    "Enrolled ✓";

                button.disabled = true;

            }

        }

    });

}


// ==========================
// PAGE LOAD
// ==========================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const cards =
            document.querySelectorAll(
                ".course-card"
            );


        updateCourseCount(cards.length);

        updateEnrolledCourses();


        console.log(
            "EduNova Explore Courses loaded successfully 🚀"
        );

    }
);