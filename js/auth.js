import {auth} from "../firebase.js"; 

import {
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword, 
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

function updateNavbar(user) {
    const welcomeText = document.querySelector(".welcome-text");
    const loginBtn = document.querySelector(".login-btn");
    const logoutBtn = document.querySelector(".logout-btn");

    // Nếu trang hiện tại không có navbar thì bỏ qua
    if (!welcomeText || !loginBtn || !logoutBtn) {
        return;
    }

    if (user) {
        // Đã đăng nhập
        const username = user.displayName || user.email;

        welcomeText.textContent = `Welcome, ${username}!`;

        welcomeText.classList.remove("hidden");
        loginBtn.classList.add("hidden");
        logoutBtn.classList.remove("hidden");
    } else {
        // Chưa đăng nhập
        welcomeText.textContent = "";

        welcomeText.classList.add("hidden");
        loginBtn.classList.remove("hidden");
        logoutBtn.classList.add("hidden");
    }
}

onAuthStateChanged(auth, (user) => {
    updateNavbar(user);
});

// Register

const registerForm = document.querySelector(".register-form");

const registerUsername = document.querySelector("#register-username");
const registerEmail = document.querySelector("#register-email");
const registerPassword = document.querySelector("#register-password");

const registerUsernameError = document.querySelector(".username-error");
const registerEmailError = document.querySelector(".register-email-error");
const registerPasswordError = document.querySelector(".register-password-error");


if (registerForm) {
    registerForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        //Lay du lieu tu form dang ky
        const username = registerUsername.value;
        const email = registerEmail.value;
        const password = registerPassword.value;

        // Xoa loi hien thi truoc do
        registerUsernameError.textContent = "";
        registerEmailError.textContent = "";
        registerPasswordError.textContent = "";

        let hasError = false;

        // Validate username
        if (!username.trim()) {
            usernameError.textContent = "Username không được để trống.";
            hasError = true;
        }

        // Validate email
        if (!email.trim()) {
            emailError.textContent = "Email không được để trống.";
            hasError = true;
        }

        // Validate password
        if (password.length < 8) {
            passwordError.textContent = "Password phải có ít nhất 8 ký tự.";
            hasError = true;
        }

        if (hasError) {
            return;
        }

        try{
            //1. Tạo tài khoản người dùng bằng Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            
            //2. Lấy thông tin người dùng đã đăng ký
            const user = userCredential.user;

            //3. Lưu thông tin người dùng vào cơ sở dữ liệu Realtime Database
            await updateProfile(user, {
                displayName: username
            });

            alert("Đăng ký thành công!");

            //4. Chuyển hướng người dùng đến trang đăng nhập
            window.location.href = "login.html";
        
        } catch (error) {
            console.error("Lỗi khi đăng ký:", error);

            alert("Đăng ký thất bại. Vui lòng thử lại.");
        
            switch (error.code) {
                case "auth/email-already-in-use":
                    registerEmailError.textContent = "Email đã được sử dụng.";
                    break;
                case "auth/invalid-email":
                    registerEmailError.textContent = "Email không hợp lệ.";
                    break;
                case "auth/weak-password":
                    registerPasswordError.textContent = "Mật khẩu quá yếu.";
                    break;
                default:
                    registerEmailError.textContent = "Đã xảy ra lỗi. Vui lòng thử lại.";
            }
        }
    });
}


/* Login form validation */
const loginBtn = document.querySelector(".login-btn");


const loginForm = document.querySelector(".login-form");
const emailInput = document.querySelector(".email-input");
const passwordInput = document.querySelector(".password-input");


const emailError = document.querySelector(".email-error");
const passwordError = document.querySelector(".password-error");

const welcomeText = document.querySelector(".welcome-text");
const logoutBtn = document.querySelector(".logout-btn");

if (loginForm) {
    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value;
        
        // Xóa lỗi cũ
        emailError.textContent = "";
        passwordError.textContent = "";

        let hasError = false;

        // Kiểm tra dữ liệu đầu vào
        if (!email) {
            emailError.textContent = "Email không được để trống.";
            hasError = true;
        }

        if (!password) {
            passwordError.textContent = "Password không được để trống.";
            hasError = true;
        }

        if (hasError) return;

        try {
            // Đăng nhập bằng Firebase
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            const user = userCredential.user;
            
            const username = user.displayName;

            console.log("Username:", username);
            console.log("Login successful!");
            console.log("UID:", user.uid);
            console.log("Email:", user.email);



            window.location.href = "index.html";

        } catch (error) {
            console.error("Login error:", error);

            switch (error.code) {
                case "auth/invalid-credential":
                case "auth/wrong-password":
                case "auth/user-not-found":
                    emailError.textContent =
                        "Email hoặc mật khẩu không chính xác.";
                    break;

                case "auth/invalid-email":
                    emailError.textContent =
                        "Email không hợp lệ.";
                    break;

                case "auth/too-many-requests":
                    passwordError.textContent =
                        "Bạn đã thử đăng nhập quá nhiều lần. Vui lòng thử lại sau.";
                    break;

                default:
                    alert("Đăng nhập thất bại. Vui lòng thử lại.");
            }
        }
    });
}


// Logout
if (logoutBtn) {
    logoutBtn.addEventListener("click", async function () {
        try {
            await signOut(auth);
            window.location.href = "index.html";
        } catch (error) {
            console.error("Logout error:", error);
            alert("Đăng xuất thất bại. Vui lòng thử lại.");
        }
    });
}