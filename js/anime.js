/* API */
const animeList = document.querySelector("#anime-list");

let allAnime = [];

if (animeList) {
    fetch("https://api.jikan.moe/v4/top/anime")
        .then(response => response.json())
        .then(result => {
            allAnime = result.data;
            const anime = result.data;
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
        })
        .catch(error => {
            console.error(
                "Failed to fetch anime:",
                error
            );
        });
}

// Feature function
const featuredTitle = document.querySelector("#featured-title");
const featuredDescription = document.querySelector("#featured-description");
const featuredDetailBtn = document.querySelector("#featured-detail-btn");
const featuredImage = document.querySelector(".featured-image");
    
function renderFeaturedAnime(anime) {
    if (featuredTitle) {
        featuredTitle.textContent = anime.title;
    }
    if (featuredImage) {
        featuredImage.src = anime.images.jpg.large_image_url;
        featuredImage.alt = anime.title;
    }
    if (featuredDescription) {
        featuredDescription.textContent = anime.synopsis || "No synopsis available.";
    }
}
    
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

    
    // Favorite Button
    const favoriteButton = document.createElement("button");
    favoriteButton.classList.add("favorite-btn");
    favoriteButton.textContent = "🤍";

    favoriteButton.addEventListener("click", function () {

        const currentUser = JSON.parse(
            localStorage.getItem("currentUser")
        );

        if (!currentUser) {
            alert("Please login to use Favorites");
            return;
        }

        const favoriteIds = currentUser.favorites;
        const users = JSON.parse(
            localStorage.getItem("users")
        ) || [];

        const userIndex = users.findIndex(user => {
            return user.email === currentUser.email;
        });

        if (userIndex === -1) {
            return;
        }

        if (favoriteButton.textContent === "🤍") {

            // Thêm vào Favorites
            favoriteButton.textContent = "💖";

            favoriteIds.push(anime.mal_id);

        } else {

            // Xóa khỏi Favorites
            favoriteButton.textContent = "🤍";

            const index = favoriteIds.indexOf(anime.mal_id);

            if (index !== -1) {
                favoriteIds.splice(index, 1);
            }
        }

    // Cập nhật user
    users[userIndex].favorites = favoriteIds;

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    localStorage.setItem(
        "currentUser",
        JSON.stringify(users[userIndex])
    );
});
    // Kiểm tra anime đã được yêu thích chưa
    const currentUser = JSON.parse(
        localStorage.getItem("currentUser")
    );

    const favoriteIds = currentUser
        ? currentUser.favorites
        : [];

    if (favoriteIds.includes(anime.mal_id)) {
        favoriteButton.textContent = "💖";
    }
        
    // Dua tat ca vao card 
    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(rating);
    card.appendChild(genre);
    card.appendChild(detailButton); 
    card.appendChild(favoriteButton);
    
    return card;
    
}
