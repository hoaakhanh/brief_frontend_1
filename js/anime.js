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

    if (featuredDetailBtn) {
        featuredDetailBtn.addEventListener("click", function () {
            window.location.href =
                `detail.html?id=${anime.mal_id}`;
        });
    }
}
    
// Function

function createAnimeCard(anime) {
    //Card
    const card = document.createElement("article"); /* them article */
    card.classList.add("movie-card", 
                        "bg-white/10",
                        "max-w-[350px]",
                        "rounded-[15px]",
                        "overflow-hidden",
                        "transition",
                        "duration-300",
                        "text-center"); 
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
    detailButton.classList.add("detail-btn",
        "no-underline",
        "py-3",
        "px-5",
        "bg-yellow-500",
        "text-black",
        "rounded-[25px]",
        "text-[16px]",
        "inline-block",
        "m-[10px]",
        "cursor-pointer"
    );
    detailButton.textContent = "More Details";
    detailButton.addEventListener("click", function () {
        window.location.href =
            `detail.html?id=${anime.mal_id}`;
    });

    
    // Favorite Button
const favoriteButton = document.createElement("button");

favoriteButton.type = "button";

favoriteButton.classList.add(
    "favorite-btn",
    "no-underline",
    "py-3",
    "px-5",
    "bg-transparent",
    "rounded-[25px]",
    "text-[27px]",
    "inline-block",
    "m-[10px]",
    "border-none",
    "cursor-pointer"
);

favoriteButton.textContent = "🤍";

// Kiểm tra anime đã được favorite chưa
async function checkFavorite() {

    const currentUser = JSON.parse(
        localStorage.getItem("currentUser")
    );

    if (!currentUser) {
        return;
    }

    try {

        const response = await fetch(
            `http://localhost:3000/favorites?userEmail=${currentUser.email}`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch favorites");
        }

        const favorites = await response.json();

        const isFavorite = favorites.some(favorite => {
            return favorite.mal_id === anime.mal_id;
        });

        if (isFavorite) {
            favoriteButton.textContent = "💖";
        }

    } catch (error) {

        console.error(
            "Failed to fetch favorites:",
            error
        );

    }
}

checkFavorite();


favoriteButton.addEventListener("click", async function () {

    const currentUser = JSON.parse(
        localStorage.getItem("currentUser")
    );

    if (!currentUser) {
        alert("Please login to use Favorites");
        return;
    }

    try {

        if (favoriteButton.textContent === "🤍") {
            const checkResponse = await fetch(`http://localhost:3000/favorites?userEmail=${encodeURIComponent(currentUser.email)}&mal_id=${anime.mal_id}`);

            const existingFavorites = await checkResponse.json();

            if (existingFavorites.length >0) {
                console.log("Anime already in favorites");
                favoriteButton.textContent = "💖";
                return;
            } 

            // Thêm vào Favorites
            const response = await fetch(
                "http://localhost:3000/favorites",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        userEmail: currentUser.email,
                        mal_id: anime.mal_id,
                        title: anime.title
                    })
                }
            );

            if (!response.ok) {
                throw new Error(
                    `Failed to add favorite: ${response.status}`
                );
            }

            const data = await response.json();

            console.log("Add:", data);

            favoriteButton.textContent = "💖";


        } else {

            // DELETE
            const response = await fetch(`http://localhost:3000/favorites?userEmail=${encodeURIComponent(currentUser.email)}&mal_id=${anime.mal_id}`);

            if (!response.ok) {
                throw new Error('Failed to find favorite');
            }

            const favorites = await response.json();

            console.log("Current user:", currentUser.email);
            console.log("Anime mal_id:", anime.mal_id);
            console.log("Favorites:", favorites);

            //Khong tim thay favorite
            if (favorites.length === 0) {
                console.log('Favorite not found');
                return;
            }
            // Lấy record đầu tiên thoan man dieu kien (userEmail va mal_id)
            const favorite = favorites[0];

            // Xóa khỏi database
            const deleteResponse = await fetch(
                `http://localhost:3000/favorites/${favorite.id}`,
                {
                    method: "DELETE"
                }
            );

            if (!deleteResponse.ok) {
                throw new Error("Failed to delete favorite");
            }

            console.log("Deleted:", favorite);

            // Đổi icon
            favoriteButton.textContent = "🤍";

                }

            } catch (error) {

                console.error("Favorite error:", error);

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

}
