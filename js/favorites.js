const favoriteLink =
    document.querySelector("#favorites-link");

const favoriteDiv =
    document.querySelector(".fav-result-div");

const animeFav =
    document.querySelector("#favorite-list");

const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
);


// Kiểm tra user đã login chưa
if (!currentUser) {

    alert("Please login to use Your Favorites");

    // Không tiếp tục chạy code phía dưới
} else {

    loadFavorites();

}


// ============================
// LOAD FAVORITES
// ============================

async function loadFavorites() {

    animeFav.innerHTML = "";

    try {

        // Lấy Favorites của user hiện tại
        const response = await fetch(
            `http://localhost:3000/favorites?userEmail=${encodeURIComponent(currentUser.email)}`
        );

        if (!response.ok) {

            throw new Error(
                `Failed to fetch favorites: ${response.status}`
            );

        }

        const favorites = await response.json();

        console.log("Favorites:", favorites);


        // Không có Favorite
        if (favorites.length === 0) {

            animeFav.textContent =
                "You haven't added any anime to your favorites yet.";

            return;

        }


        // ============================
        // LẤY THÔNG TIN ANIME TỪ JIKAN
        // ============================

        favorites.forEach((favorite, index) => {

            setTimeout(() => {

                fetch(
                    `https://api.jikan.moe/v4/anime/${favorite.mal_id}`
                )
                    .then(response => {

                        if (!response.ok) {

                            throw new Error(
                                `API Error: ${response.status}`
                            );

                        }

                        return response.json();

                    })
                    .then(result => {

                        const anime = result.data;

                        const card =
                            createAnimeCard(anime);

                        animeFav.appendChild(card);

                    })
                    .catch(error => {

                        console.error(
                            `Lỗi khi tải anime ${favorite.mal_id}:`,
                            error
                        );

                    });

            }, index * 1000);

        });


    } catch (error) {

        console.error(
            "Failed to load favorites:",
            error
        );

    }

}