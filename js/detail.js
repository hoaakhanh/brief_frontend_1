const params =
    new URLSearchParams(window.location.search);

const animeId =
    params.get("id");


const detailTitle =
    document.querySelector("#detail-title");

const detailImage =
    document.querySelector("#detail-image");

const detailScore =
    document.querySelector("#detail-score");

const detailEpisodes =
    document.querySelector("#detail-episodes");

const detailStatus =
    document.querySelector("#detail-status");

const detailType =
    document.querySelector("#detail-type");

const detailGenres =
    document.querySelector("#detail-genres");

const detailAired =
    document.querySelector("#detail-aired");

const detailSynopsis =
    document.querySelector("#detail-synopsis");


if (!animeId) {

    console.error("Anime ID not found");

} else {

    fetch(`https://api.jikan.moe/v4/anime/${animeId}`)

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

            const genres =
                anime.genres.map(
                    genre => genre.name
                );


            detailTitle.textContent =
                anime.title;

            detailImage.src =
                anime.images.jpg.large_image_url;

            detailImage.alt =
                anime.title;

            detailScore.textContent =
                anime.score || "N/A";

            detailEpisodes.textContent =
                anime.episodes || "N/A";

            detailStatus.textContent =
                anime.status || "N/A";

            detailType.textContent =
                anime.type || "N/A";

            detailGenres.textContent =
                genres.join(" • ") || "N/A";

            detailAired.textContent =
                anime.aired?.string || "N/A";

            detailSynopsis.textContent =
                anime.synopsis ||
                "No synopsis available.";

        })

        .catch(error => {

            console.error(
                "Error loading anime:",
                error
            );

        });
}