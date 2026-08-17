const favoriteLink =
    document.querySelector("#favorites-link");

const favoriteDiv =
    document.querySelector(".fav-result-div");

const animeFav =
    document.querySelector("#favorite-list");

const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
);


if (!currentUser) {
    alert("Please login to use Your Favorites");
    loadingFavorites = false;
    
}

const favoriteIds =
    currentUser.favorites;

animeFav.innerHTML = "";


if (favoriteIds.length === 0) {

    animeFav.textContent =
        "You haven't added any anime to your favorites yet.";

}


favoriteIds.forEach((id, index) => {

    setTimeout(() => {

        fetch(
            `https://api.jikan.moe/v4/anime/${id}`
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
                    `Lỗi khi tải anime ${id}:`,
                    error
                );

            });

    }, index * 1000);

});

