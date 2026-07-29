/* Hieu ung cho All top favorite button */
const favoriteButtons = document.querySelectorAll(".favorite-btn"); /* chon tat ca cac button co class favorite-btn */
favoriteButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        if (button.textContent === "❤") {
            button.textContent = "💖";
        }
        else {
            button.textContent = "❤";
        }
    });
});

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

loginForm.addEventListener("submit", function (event) {

    event.preventDefault(); /* duyet xem co hop le khong */

    if (emailInput.value === "") {
        emailError.textContent = "Please enter your email";
    }
    else if (!emailInput.value.includes("@gmail.com")) {
        emailError.textContent = "Invalid email";
    }
    else if (passwordInput.value === "") {
        passwordError.textContent = "Please enter your password";
    }
    else if (passwordInput.value.length < 8) {
        passwordError.textContent = "Password must be at least 8 characters";

    }
    else {
    emailInput.value = ""; /* tra ve trong khi gap loi */
    passwordInput.value = ""; /* tra ve trong khi gap loi */

    loginModal.classList.add("hidden"); /* dong o dang nhap */

    loginBtn.classList.add("hidden"); /* tat hien thi nut login */

    logoutBtn.classList.remove("hidden");

    welcomeText.classList.remove("hidden"); /* hien chu welcome! */
}

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
    image.src = anime.images.jpg.image_url;
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
    favoriteButton.textContent = "❤️";

    // Kiểm tra anime đã được yêu thích chưa
    const favoriteIds = JSON.parse(localStorage.getItem("favorites")) || [];

    // Nếu đã yêu thích → hiển thị 💖
    if (favoriteIds.includes(anime.mal_id)) {
        favoriteButton.textContent = "💖";
    }

    favoriteButton.addEventListener("click", function () {
        const favoriteIds = JSON.parse(localStorage.getItem("favorites")) || [];

        if (favoriteButton.textContent === "❤️") {
            favoriteButton.textContent = "💖";

            favoriteIds.push(anime.mal_id);
            localStorage.setItem(
                "favorites", JSON.stringify(favoriteIds)
            );
        } else {
            favoriteButton.textContent = "❤️";
            const index = favoriteIds.indexOf(anime.mal_id);

            favoriteIds.splice(index, 1);

            localStorage.setItem(
                "favorites", JSON.stringify(favoriteIds)
            );
        }
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
    featuredImage.src = anime.images.jpg.large_image_url;

    featuredImage.alt = anime.title;

    featuredTitle.textContent = anime.title;

    featuredDescription.textContent = anime.synopsis || "No synopsis available.";

    const genres = anime.genres.map(genre => genre.name);

    //Detail Button
    featuredDetailBtn.addEventListener("click", function(){
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
        
            const card = createAnimeCard(anime);

            // Dua cac card vao list
            animeList.appendChild(card); /* dua card vao movie-grid */
            
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
    // Hiện khu vực Favorites
    favoriteDiv.classList.add("active");

    // Xoa su kien cu
    animeFav.innerHTML = "";

    // Lấy danh sách ID Favorites
    const favoriteIds = JSON.parse(localStorage.getItem("favorites")) || [];

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
