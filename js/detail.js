// Featured 
//Detail Button
const genres = anime.genres.map(genre => genre.name);
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


// Function
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
