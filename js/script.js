
/* Login form validation */
const loginBtn = document.querySelector(".login-btn");
const closeBtn = document.querySelector(".close-btn");
const loginModal = document.querySelector(".login-modal");

loginBtn.addEventListener("click", function () {
    loginModal.classList.remove("hidden"); /* hien o dang nhap */
});

closeBtn.addEventListener("click", function () {
    loginModal.classList.add("hidden"); /* dong o dang nhap */
});

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

            loginModal.classList.add("hidden");

            loginBtn.classList.add("hidden");

            logoutBtn.classList.remove("hidden");

            welcomeText.classList.remove("hidden");

            welcomeText.textContent = `Welcome ${user.username}`;
            }

        }
});

// Logout
logoutBtn.addEventListener("click", function() {
    localStorage.removeItem("currentUser");

    logoutBtn.classList.add("hidden");

    loginBtn.classList.remove("hidden");

    welcomeText.classList.add("hidden");
});

/* Menu cho Mobile */ 
const menuBtn = document.querySelector(".menu-btn");
const navMenu = document.querySelector(".nav-menu");

menuBtn.addEventListener("click", function () { /* an dau 3 gach thi hien thi noi dung */

    navMenu.classList.toggle("active");

});

// Function

function createAnimeCard(anime) {
    //Card
    const card = document.createElement("article"); /* them article */
    card.classList.add("movie-card"); /* them class cho article de moi article la mot card phim */

    // Image
    const image = document.createElement("img");
    image.src = anime.images.jpg.large_image_url;
    image.alt = anime.title_english || anime.title;

    //Title
    const title = document.createElement("h3");
    title.textContent = anime.title_english || anime.title;

    //Rating
    const rating = document.createElement("p");
    rating.textContent = `⭐ ${anime.score}`;

    // Genre
    const genre = document.createElement("p");
    const genres = anime.genres.map(genre => genre.name); /* voi moi genre lay thuoc tinh name */
    genre.textContent = genres.join(" • ");

    //Detail Button
    const detailButton = document.createElement("button");
    detailButton.classList.add("detail-btn");
    detailButton.textContent = "More Details";

    detailButton.addEventListener("click", function(){
        detailModal.classList.add("active");

        detailInfo.innerHTML = `
        <h2>${anime.title}</h2>

        <img
            src="${anime.images.jpg.image_url}"
            alt="${anime.title}"
        >

        <div class="detail-meta">

            <p class="detail-score">
                ⭐ ${anime.score || "N/A"}
            </p>

            <p>
                Episodes: ${anime.episodes || "N/A"}
            </p>

            <p>
                Status: ${anime.status || "N/A"}
            </p>

            <p>
                Genres:
                ${genres.join(" • ") || "N/A"}
            </p>

            <p>
                Type: ${anime.type || "N/A"}
            </p>

            <p>
                Aired: ${anime.aired?.string || "N/A"}
            </p>
        </div>

        <div class="detail-synopsis">

            <h3>Synopsis</h3>

            <p>
                ${anime.synopsis || "No synopsis available."}
            </p>

        </div>
    `;
    });

    // Favorite Button
    const favoriteButton = document.createElement("button");
    favoriteButton.classList.add("favorite-btn");
    favoriteButton.textContent = "🤍";

    // Kiểm tra anime đã được yêu thích chưa

    // User đang đăng nhập
    const currentUser = JSON.parse(
        localStorage.getItem("currentUser")
    );

    // Lấy Favorites của currentUser
    const favoriteIds = currentUser
        ? currentUser.favorites
        : [];


    // Nếu đã yêu thích → hiển thị 💖
    if (favoriteIds.includes(anime.mal_id)) {
        favoriteButton.textContent = "💖";
    }

    favoriteButton.addEventListener("click", function () {
        // Lấy currentUser MỚI NHẤT khi click
        const currentUser = JSON.parse(
            localStorage.getItem("currentUser")
        );
        
        if (!currentUser) {
            alert("Please login to use Favorites");
            return;
        }

        const favoriteIds = currentUser.favorites;
        const users = JSON.parse(localStorage.getItem("users")) || [];
        
        const userIndex = users.findIndex(user => {
            return user.email === currentUser.email;
        });

        if (userIndex === -1) {
            console.log("Không tìm thấy user");
            return;
        }

        if (favoriteButton.textContent === "🤍") {
            favoriteButton.textContent = "💖";

            favoriteIds.push(anime.mal_id);

            users[userIndex].favorites = favoriteIds;

            localStorage.setItem(
                "users", JSON.stringify(users)
            );

        } else {
            favoriteButton.textContent = "🤍";
            const index = favoriteIds.indexOf(anime.mal_id);

            favoriteIds.splice(index, 1);

            users[userIndex].favorites = favoriteIds;

            localStorage.setItem(
                "users",
                JSON.stringify(users)
            );

        }

        // Lưu toàn bộ users
        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );

        // Cập nhật currentUser
        localStorage.setItem(
            "currentUser",
            JSON.stringify(users[userIndex])
        );
    });

    // Dua tat ca vao card 
    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(rating);
    card.appendChild(genre);
    card.appendChild(detailButton); 
    card.appendChild(favoriteButton);
    
    return card;
    
};

// Feature function
const featuredTitle = document.querySelector("#featured-title");
const featuredDescription = document.querySelector("#featured-description");
const featuredDetailBtn = document.querySelector("#featured-detail-btn");
const featuredImage = document.querySelector(".featured-image");
    
function renderFeaturedAnime(anime) {
    featuredTitle.textContent = anime.title;
    
    featuredImage.src = anime.images.jpg.large_image_url;

    featuredImage.alt = anime.title;

    featuredDescription.textContent = anime.synopsis || "No synopsis available.";

    const genres = anime.genres.map(genre => genre.name);

    //Detail Button
    featuredDetailBtn.addEventListener("click", function(){
        detailModal.classList.add("active");

        detailInfo.innerHTML = `
        <h2>${anime.title}</h2>

        <img
            src="${anime.images.jpg.large_image_url}"
            alt="${anime.title}"
        >

        <div class="detail-meta">

            <p class="detail-score">
                ⭐ ${anime.score || "N/A"}
            </p>

            <p>
                Episodes: ${anime.episodes || "N/A"}
            </p>

            <p>
                Status: ${anime.status || "N/A"}
            </p>

            <p>
                Genres:
                ${genres.join(" • ") || "N/A"}
            </p>

            <p>
                Type: ${anime.type || "N/A"}
            </p>

            <p>
                Aired: ${anime.aired?.string || "N/A"}
            </p>
        </div>

        <div class="detail-synopsis">

            <h3>Synopsis</h3>

            <p>
                ${anime.synopsis || "No synopsis available."}
            </p>

        </div>
    `;
    })
}
/* API */
const animeList = document.querySelector("#anime-list");

let allAnime = [];

fetch("https://api.jikan.moe/v4/top/anime")
    .then(response => response.json())
    .then(result => {
        allAnime = result.data;
        // Feature
        const featuredAnime = result.data[0];

        renderFeaturedAnime(featuredAnime);

        // Top-Rated
        result.data.forEach(anime => { /* lay tu kho ttin */
            if (anime.score >= 9.0) {
                const card = createAnimeCard(anime);

                // Dua cac card vao list
                animeList.appendChild(card); /* dua card vao movie-grid */
                }
            
        });
    });

// Search Input
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector("#search-btn");

const searchDiv = document.querySelector(".search-result-div");
const closeSearchBtn = document.querySelector("#close-search");

const animeSearch = document.querySelector("#search-result")

searchBtn.addEventListener("click", function() {
    const keyword = searchInput.value.trim();

    searchInput.value = ""; /* xoa tu khoa tim kiem sau khi bam nut search */

    if (!keyword) {
        return;
    }

    searchDiv.classList.add("active");

    fetch(`https://api.jikan.moe/v4/anime?q=${keyword}`)
        .then(response => response.json())
        .then(result => {

            // Xóa Card cũ
            animeSearch.innerHTML = "";

            // Hiển thị kết quả Search
            result.data.forEach(anime => {

                const card = createAnimeCard(anime);

                animeSearch.appendChild(card);

            });
            
        })

});
closeSearchBtn.addEventListener("click", function() {

    searchDiv.classList.remove("active");

});

// Favorite - Navbar
const favoriteLink = document.querySelector("#favorites-link");
const favoriteDiv = document.querySelector(".fav-result-div");

const animeFav = document.querySelector("#favorite-list")

favoriteLink.addEventListener("click", function() {
    const currentUser = JSON.parse(
        localStorage.getItem("currentUser")
    );

    // Kiem tra xem dang nhap chx
    if (!currentUser) {
        alert("Please login to view Favorites");
        return;
    }

    // Lay danh sach ID Fav
    const favoriteIds = currentUser.favorites;

    // Hiện khu vực Favorites
    favoriteDiv.classList.add("active");

    // Xoa su kien cu
    animeFav.innerHTML = "";


    // Nếu chưa có Favorites
    if (favoriteIds.length === 0) {

        animeFav.textContent =
            "You haven't added any anime to your favorites yet.";

        return;
    }

    // Duyệt từng ID
    favoriteIds.forEach((id, index) => {

    setTimeout(() => {

        fetch(`https://api.jikan.moe/v4/anime/${id}`)
            .then(response => {

                if (!response.ok) {
                    throw new Error(
                        `API Error: ${response.status}`
                    );
                }

                return response.json();
            })
            .then(result => {

                if (!result.data) {
                    return;
                }

                const anime = result.data;

                const card =
                    createAnimeCard(anime);

                animeFav.appendChild(card);
            })
            .catch(error => {

                console.error(
                    `Lỗi khi tải anime ${id}:`,
                    error
                );

            });

    }, index * 1000);

});
    });

const closeFavBtn = document.querySelector("#close-favorite");
closeFavBtn.addEventListener("click", function() {

    favoriteDiv.classList.remove("active");

});

// Detail Modal
const detailModal = document.querySelector(".detail-modal");
const detailContent = document.querySelector(".detail-content");
const detailInfo = document.querySelector("#detail-info");

const closeDetailBtn = document.querySelector("#close-detail");
closeDetailBtn.addEventListener("click", function(){
    detailModal.classList.remove("active");
}); 

//Genres 
const genreButtons = document.querySelectorAll(".genre-filter button");
const genreAnimeList = document.querySelector("#genre-anime-list");

genreButtons.forEach(button => 
    button.addEventListener("click", function() {
        //xoa "active" nut cu
        genreButtons.forEach(button => {
            button.classList.remove("active");
        });
        //add "active" nut vua click
        button.classList.add("active");

        const genreName = button.textContent;

        const filteredAnime = allAnime.filter(anime => {
            return anime.genres.some(genre => {
                return genre.name === genreName;
        });
    });
        genreAnimeList.innerHTML = "";
        if (genreName === "All") {
            allAnime.forEach(anime => {
                const card = createAnimeCard(anime);
                genreAnimeList.appendChild(card);
            });
        } else {
            filteredAnime.forEach(anime => {
                const card = createAnimeCard(anime);
                genreAnimeList.appendChild(card);
            });
        }
    })
)

// Login - Register

const registerModal = document.querySelector(".register-modal");
const showRegisterBtn = document.querySelector("#show-register-btn");
const showLoginBtn = document.querySelector("#show-login-btn");

showRegisterBtn.addEventListener("click", function(event) {
    event.preventDefault();

    registerModal.classList.remove("hidden");
    loginModal.classList.add("hidden");
})

showLoginBtn.addEventListener("click", function(event) {

    event.preventDefault();

    registerModal.classList.add("hidden");
    loginModal.classList.remove("hidden");

});

const registerCloseBtn = document.querySelector(".register-close-btn");
registerCloseBtn.addEventListener("click", function() {
    registerModal.classList.add("hidden");
})

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

        registerModal.classList.add("hidden"); /* dong o dang nhap */

        loginModal.classList.remove("hidden");
    }    
});
