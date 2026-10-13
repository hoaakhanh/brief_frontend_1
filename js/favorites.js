import { auth, database } from "../firebase.js";

import { createAnimeCard } from "./anime.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

import {
    ref,
    get
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";


// ============================
// DOM ELEMENTS
// ============================

const animeFav = document.querySelector("#favorite-list");


// ============================
// KIỂM TRA USER ĐÃ LOGIN CHƯA
// ============================

onAuthStateChanged(auth, (user) => {

    if (!animeFav) return;

    if (!user) {

        animeFav.innerHTML = "Please login to use Your Favorites.";

        return;

    }

    loadFavorites(user);

});


// ============================
// LOAD FAVORITES TỪ FIREBASE
// ============================

async function loadFavorites(user) {

    animeFav.innerHTML = "";

    try {

        // Lấy danh sách Favorites của user hiện tại
        const favoritesRef = ref(
            database,
            `users/${user.uid}/favorites`
        );

        const snapshot = await get(favoritesRef);


        // Kiểm tra có Favorites hay không
        if (!snapshot.exists()) {

            animeFav.textContent =
                "You haven't added any anime to your favorites yet.";

            return;

        }


        // Chuyển dữ liệu Firebase thành array
        const favorites = Object.values(snapshot.val());

        console.log("Favorites from Firebase:", favorites);


        // ============================
        // LẤY THÔNG TIN ANIME TỪ API
        // ============================

        favorites.forEach((favorite, index) => {

            setTimeout(async () => {

                try {

                    const response = await fetch(
                        `https://api.tenrai.org/v1/anime/${favorite.mal_id}`
                    );

                    if (!response.ok) {

                        throw new Error(
                            `API Error: ${response.status}`
                        );

                    }

                    const result = await response.json();

                    console.log("Anime API response:", result);


                    // Lấy thông tin anime
                    const anime = result.data;


                    // Kiểm tra dữ liệu API
                    if (!anime) {

                        throw new Error(
                            "API không trả về dữ liệu anime"
                        );

                    }


                    // Tạo card bằng hàm đã có
                    const card = createAnimeCard(anime);

                    animeFav.appendChild(card);

                } catch (error) {

                    console.error(
                        `Lỗi khi tải anime ${favorite.mal_id}:`,
                        error
                    );

                }

            }, index * 1000);

        });

    } catch (error) {

        console.error(
            "Failed to load Firebase Favorites:",
            error
        );

        animeFav.textContent =
            "Unable to load Favorites. Please try again.";

    }

}