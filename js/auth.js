
// FRESHTRACK - AUTHENTICATION

// REGISTER FUNCTION
const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("registerName").value.trim();
        const email = document.getElementById("registerEmail").value.trim().toLowerCase();
        const password = document.getElementById("registerPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        const message = document.getElementById("registerMessage");

        if (password !== confirmPassword) {
            message.innerHTML = '<div class="alert alert-danger">Passwords do not match.</div>';
            return;
        }

        let users = JSON.parse(localStorage.getItem("freshTrackUsers")) || [];

        const existingUser = users.find(user => user.email === email);

        if (existingUser) {
            message.innerHTML = '<div class="alert alert-danger">Email already registered.</div>';
            return;
        }

        const newUser = {
            name: name,
            email: email,
            password: password
        };

        users.push(newUser);

        localStorage.setItem("freshTrackUsers", JSON.stringify(users));

        message.innerHTML = '<div class="alert alert-success">Registration successful!</div>';

        registerForm.reset();

        setTimeout(function() {
            window.location.href = "index.html";
        }, 1500);

    });

}



// LOGIN FUNCTION
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.getElementById("loginEmail").value.trim().toLowerCase();
        const password = document.getElementById("loginPassword").value;
        const message = document.getElementById("loginMessage");

        try {
            const users = JSON.parse(localStorage.getItem("freshTrackUsers")) || [];

            const validUser = users.find(user =>
                user.email === email && user.password === password
            );

            if (validUser) {
                localStorage.setItem("freshTrackCurrentUser", JSON.stringify({
                    name: validUser.name,
                    email: validUser.email
                }));

                message.innerHTML = '<div class="alert alert-success">Login successful! Redirecting...</div>';

                setTimeout(function() {
                    window.location.href = "dashboard.html";
                }, 1000);

            } else {
                message.innerHTML = '<div class="alert alert-danger">Invalid email or password. Please register first.</div>';
            }

        } catch (error) {
            message.innerHTML = '<div class="alert alert-danger">Unable to process login. Please try again.</div>';
        }
    });
}

// LOGOUT FUNCTION

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", function(event) {

        event.preventDefault();

        localStorage.removeItem("freshTrackCurrentUser");

        window.location.href = "index.html";

    });

}
