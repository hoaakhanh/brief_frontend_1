import { auth, database } from "../firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

import {
    ref,
    get,
    set,
    remove
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";

/* API */
const animeList = document.querySelector("#anime-list");

let allAnime = [];

if (animeList) {
    fetch("https://api.tenrai.org/v1/top/anime")
        .then(response => {
            console.log("Jikan HTTP status:", response.status);

            if (!response.ok) {
                throw new Error(`Jikan API error: ${response.status}`);
            }

            return response.json();
        })
        .then(result => {
            if (!result.data || result.data.length === 0) {
                throw new Error("API không trả về danh sách anime.");
            }

            allAnime = result.data;

            const featuredAnime = result.data[0];
            renderFeaturedAnime(featuredAnime);

            result.data.forEach(anime => {
                if (anime.score >= 9.0) {
                    const card = createAnimeCard(anime);
                    animeList.appendChild(card);
                }
            });
        })
        .catch(error => {
            console.error("Failed to fetch anime:", error);
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

export function createAnimeCard(anime) {
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
    const user = auth.currentUser;

    if (!user) {
        favoriteButton.textContent = "🤍";
        return;
    }

    try {
        const favoriteRef = ref(
            database,
            `users/${user.uid}/favorites/${anime.mal_id}`
        );

        const snapshot = await get(favoriteRef);

        favoriteButton.textContent = snapshot.exists()
            ? "💖"
            : "🤍";

    } catch (error) {
        console.error("Failed to fetch favorites from Firebase:", error);
    }
}
    onAuthStateChanged(auth, (user) => {
        checkFavorite(user);
    });


    favoriteButton.addEventListener("click", async function () {
        const user = auth.currentUser;

        // Kiểm tra đăng nhập
        if (!user) {
            alert("Please login to use Favorites");
            return;
        }

        try {
            const favoriteRef = ref(
                database,
                `users/${user.uid}/favorites/${anime.mal_id}`
            );

            // Kiểm tra anime đã được yêu thích chưa
            const snapshot = await get(favoriteRef);

            if (snapshot.exists()) {
                // Đã yêu thích -> xóa khỏi Firebase
                await remove(favoriteRef);

                favoriteButton.textContent = "🤍";

                console.log("Removed from Favorites:", anime.title);
            } else {
                // Chưa yêu thích -> thêm vào Firebase
                await set(favoriteRef, {
                    mal_id: anime.mal_id,
                    title: anime.title_english || anime.title,
                    image: anime.images.jpg.large_image_url,
                    score: anime.score
                });

                favoriteButton.textContent = "💖";

                console.log("Added to Favorites:", anime.title);
            }
        } catch (error) {
            console.error("Firebase Favorites error:", error);
            alert("Không thể cập nhật Favorites. Vui lòng thử lại.");
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
