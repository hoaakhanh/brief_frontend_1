/* Login form validation */
const loginBtn = document.querySelector(".login-btn");
const closeBtn = document.querySelector(".close-btn");
const loginModal = document.querySelector(".login-modal");

const loginForm = document.querySelector(".login-form");
const emailInput = document.querySelector(".email-input");
const passwordInput = document.querySelector(".password-input");


const emailError = document.querySelector(".email-error");
const passwordError = document.querySelector(".password-error");

const welcomeText = document.querySelector(".welcome-text");
const logoutBtn = document.querySelector(".logout-btn");

const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
);

if (currentUser) {
    loginBtn.classList.add("hidden");
    logoutBtn.classList.remove("hidden");

    welcomeText.classList.remove("hidden");
    welcomeText.textContent = `Welcome ${currentUser.username}`;
}

loginForm.addEventListener("submit", function (event) {

    event.preventDefault(); /* duyet xem co hop le khong */

    if (emailInput.value === "") {
        emailError.textContent = "Please enter your email";
    }
    else if (!emailInput.value.includes("@gmail.com")) {
        emailError.textContent = "Email not available";
    }
    else if (passwordInput.value === "") {
        passwordError.textContent = "Please enter your password";
    }
    else if (passwordInput.value.length < 8) {
        passwordError.textContent = "Password must be at least 8 characters";

    }
    else {
        const user = users.find(user => {
            return user.email === emailInput.value;
        });

        if (!user) {
            emailError.textContent = "Email not available";
        }
        else if (user.password !== passwordInput.value) {
            passwordError.textContent = "Incorrect password";
        }
        else {
            localStorage.setItem("currentUser", JSON.stringify(user));

            emailInput.value = "";
            passwordInput.value = "";

            window.location.href = "index.html";

            loginBtn.classList.add("hidden");

            logoutBtn.classList.remove("hidden");

            welcomeText.classList.remove("hidden");

            welcomeText.textContent = `Welcome ${user.username}`;
            }

        }
});


// Login - Register

const registerForm = document.querySelector(".register-form");

const registerUsername = document.querySelector("#register-username");
const registerEmail = document.querySelector("#register-email");
const registerPassword = document.querySelector("#register-password");

const registerUsernameError = document.querySelector(".username-error");
const registerEmailError = document.querySelector(".email-error");
const registerPasswordError = document.querySelector(".password-error");

let users = JSON.parse(localStorage.getItem("users")) || []; 


registerForm.addEventListener("submit", function(event) {
    event.preventDefault();

    if (registerUsername.value === "") {
        registerUsernameError.textContent = "Please enter your username";
    }
    else if (registerEmail.value === "") {
        registerEmailError.textContent = "Please enter your email";
    }
    else if (!registerEmail.value.includes("@gmail.com")) {
        registerEmailError.textContent = "Invalid email";
    }
    else if (registerPassword.value === "") {
        registerPasswordError.textContent = "Please enter your password";
    }
    else if (registerPassword.value.length < 8) {
        registerPasswordError.textContent = "Password must be at least 8 characters";

    }
    else {
        // Tao User
        const newUser = {
            username: registerUsername.value,
            email: registerEmail.value,
            password: registerPassword.value,
            favorites: [],
        }

        users.push(newUser);

        localStorage.setItem("users", JSON.stringify(users));

        registerUsername.value = "";
        registerEmail.value = ""; /* tra ve trong khi gap loi */
        registerPassword.value = ""; /* tra ve trong khi gap loi */

        window.location.href = "login.html";

        loginModal.classList.remove("hidden");
    }    
});


// Logout
if (logoutBtn) {
    logoutBtn.addEventListener("click", function() {
        localStorage.removeItem("currentUser");

        logoutBtn.classList.add("hidden");

        loginBtn.classList.remove("hidden");

        welcomeText.classList.add("hidden");
    });
}