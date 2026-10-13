AnimeVerse
AnimeVerse is a responsive anime discovery website built as a frontend
learning project. Users can explore anime, search for titles, view anime
details, and maintain a personal favorites list. Firebase Authentication
manages user accounts, while Firebase Realtime Database stores each
user's favorites separately.
Features
- Browse anime and view featured or highly rated titles.
- Search for anime.
- Filter anime by genre where available in the interface.
- Open a detail page for an anime, including its poster, score,
  genres, episode count, status, release information, and synopsis.
- Register, sign in, and sign out using Firebase Authentication.
- Add and remove anime from a personal favorites list.
- Store favorites under each authenticated user's Firebase UID.
- Display the correct favorite state when the page is loaded.
- Responsive layout for different screen sizes.
- Use Tailwind CSS utility classes alongside project CSS.
Technology Stack
- HTML5 for page structure.
- CSS3 for styling and responsive layouts.
- Tailwind CSS for utility-based styling.
- JavaScript (ES modules) for application logic and DOM
  interactions.
- Firebase Authentication for email/password authentication.
- Firebase Realtime Database for user-specific favorites.
- Tenrai API for anime data.
- Live Server for local development.
Project Structure
AnimeVerse/
├── assets/
│   └── logoicon.png
├── css/
│   ├── pages.css
│   ├── responsive.css
│   ├── style.css
│   ├── tailwind.css
│   └── tailwind-output.css
├── html/
│   ├── detail.html
│   ├── favorites.html
│   ├── index.html
│   ├── login.html
│   └── register.html
├── js/
│   ├── anime.js
│   ├── auth.js
│   ├── detail.js
│   ├── favorites.js
│   └── script.js
├── firebase.js
├── package.json
├── package-lock.json
└── README.md
The exact files may change as the project develops.
Getting Started
Prerequisites
- A modern web browser.
- Visual Studio Code or another code editor.
- The Live Server extension, or an equivalent local static web server.
- A Firebase project with Email/Password sign-in enabled and Realtime
  Database configured.
Run Locally
1. Clone or download the repository.
2. Open the project folder in your code editor.
3. Check the Firebase configuration in firebase.js.
4. Open html/index.html using Live Server.
5. Use the website through the local URL provided by Live Server.
Because the HTML pages are inside the html/ directory and the
JavaScript modules are inside js/, open the HTML page through a local
server rather than directly using a file:// URL. JavaScript modules
and Firebase requests may not work correctly when opened directly from
the filesystem.
Firebase Configuration
AnimeVerse uses Firebase Authentication and Firebase Realtime Database.
1. Create or select a project in the Firebase console.
2. Enable Email/Password under Authentication sign-in providers.
3. Create a Realtime Database.
4. Add the Firebase web app configuration to firebase.js.
5. Configure Realtime Database Security Rules so an authenticated user
   can read and write only their own data.
Favorites are stored by user UID using a structure similar to:
users/
  <user_uid>/
    favorites/
      <anime_id>/
        mal_id
        title
        image
        score
Use rules that enforce per-user access, for example:
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "auth != null && auth.uid === $uid",
        ".write": "auth != null && auth.uid === $uid"
      }
    }
  }
}
Review the rules in the Firebase console before deploying. Do not use
open read/write rules for a public deployment. Firebase web
configuration identifies the project but does not replace database
security rules.
Anime Data API
The website requests anime information from the Tenrai API. API
availability, response formats, and endpoint paths can change. If anime
data does not load, check the browser developer console and the API
documentation, then confirm that the response fields match those used by
the rendering code.
Development Notes
- JavaScript files that use import or export must be loaded as ES
  modules with type="module".
- Favorites should be read and written using the authenticated user's
  UID, not a shared global list.
- Avoid committing private credentials, service-account keys, or other
  secrets to the repository.
- When changing API endpoints, verify the response structure before
  using fields such as title, images, score, and genres.
Learning Objectives
This project provides practice with:
- Structuring a multi-page frontend application.
- Responsive layouts with CSS and Tailwind CSS.
- DOM manipulation and event listeners.
- Fetching and rendering data from an external API.
- JavaScript modules and asynchronous operations.
- Authentication and user-specific data persistence with Firebase.
- Debugging API requests, browser console errors, and CSS conflicts.
Future Improvements
- Improve loading, empty, and API-error states.
- Reduce duplicate API requests and improve loading performance.
- Extract reusable anime-card components into a dedicated module.
- Add automated tests and accessibility improvements.
- Deploy the site and document the live demo.
License
No license has been specified for this project yet. Add a license file
if you intend to allow others to reuse, modify, or distribute the code.
