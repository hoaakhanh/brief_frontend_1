/* Menu cho Mobile */ 
const menuBtn = document.querySelector(".menu-btn");
const navMenu = document.querySelector(".nav-menu");

if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", function () {
        navMenu.classList.toggle("active");
    });
}

// Search Input
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector("#search-btn");

const searchDiv = document.querySelector(".search-result-div");
const closeSearchBtn = document.querySelector("#close-search");

const animeSearch = document.querySelector("#search-result")

if (searchBtn) {
    searchBtn.addEventListener("click", function() {
        const keyword = searchInput.value.trim();

        searchInput.value = ""; /* xoa tu khoa tim kiem sau khi bam nut search */

        if (!keyword) {
            return;
        }

        searchDiv.classList.add("active");

        fetch(
            `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(encodeURIComponent(keyword))}`
        )
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Jikan API Error: ${response.status}`);
                }

                return response.json();
            })
            .then(result => {

                animeSearch.innerHTML = "";

                if (!result.data) {
                    throw new Error("Jikan response does not contain data");
                }

                result.data.forEach(anime => {

                    const card = createAnimeCard(anime);

                    animeSearch.appendChild(card);

                });
                
            })
            .catch(error => {
                console.error("Search failed:", error);
            });
            
    });
}

if (closeSearchBtn) {
    closeSearchBtn.addEventListener("click", function() {

        searchDiv.classList.remove("active");

    });
}


//Genres 
const genreButtons = document.querySelectorAll(".genre-filter button");
const genreAnimeList = document.querySelector("#genre-anime-list");

if (genreAnimeList) {
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
}

// Back to Top
const backToTop = document.getElementById("back-to-top");

// Hiện/ẩn nút khi scroll
window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
        backToTop.style.display = "block";
    } else {
        backToTop.style.display = "none";
    }
});

// Cuộn lên đầu trang
if (backToTop) {
    backToTop.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
});
}
