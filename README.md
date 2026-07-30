# 🎬 AnimeVerse

**AnimeVerse** là một website khám phá và quản lý anime được xây dựng bằng **HTML, CSS và JavaScript**. Website cho phép người dùng khám phá các anime nổi bật, tìm kiếm anime, xem thông tin chi tiết và quản lý danh sách anime yêu thích theo từng tài khoản người dùng.

---

## 🌟 Giới thiệu

AnimeVerse được phát triển với mục tiêu tạo ra một giao diện web anime trực quan, hiện đại và dễ sử dụng.

Website sử dụng **Jikan API** để lấy dữ liệu anime từ **MyAnimeList**, kết hợp với **Local Storage** để quản lý tài khoản người dùng và danh sách anime yêu thích.

Người dùng có thể:

* 🔍 Tìm kiếm anime
* ⭐ Xem danh sách anime nổi bật / Top Rated
* 🎭 Xem anime theo thể loại
* ❤️ Thêm hoặc xóa anime khỏi Favorites
* 👤 Đăng ký tài khoản
* 🔐 Đăng nhập
* 🚪 Đăng xuất
* 👤 Quản lý trạng thái người dùng đang đăng nhập
* 💾 Lưu danh sách Favorites riêng cho từng tài khoản
* 📱 Sử dụng website trên nhiều kích thước màn hình

---

# 🚀 Các tính năng chính

## 1. 🏠 Home

Trang Home là trang chính của AnimeVerse.

Tại đây người dùng có thể khám phá các nội dung anime nổi bật được lấy từ API.

Các anime được hiển thị dưới dạng Movie Card với các thông tin như:

* Poster anime
* Tên anime
* Điểm đánh giá
* Thể loại
* Nút xem chi tiết
* Nút Favorite

Mỗi anime được tạo thành một card bằng JavaScript dựa trên dữ liệu nhận được từ API.

---

## 2. ⭐ Top Rated

Tính năng Top Rated hiển thị danh sách những anime có điểm đánh giá cao.

Thông tin của anime được lấy từ Jikan API.

Mỗi card anime bao gồm:

* 🖼️ Poster
* 📝 Tên anime
* ⭐ Điểm đánh giá
* 🎭 Thể loại
* 🔍 Nút Detail
* ❤️ Nút Favorite

Người dùng có thể thêm anime trực tiếp vào Favorites bằng cách nhấn vào biểu tượng ❤️.

---

## 3. 🎭 Genres

AnimeVerse hỗ trợ hiển thị anime theo từng thể loại.

Ví dụ:

* Action
* Adventure
* Comedy
* Drama
* Fantasy
* Romance
* Sci-Fi

Mỗi thể loại có một khu vực riêng và chứa các anime tương ứng.

Cấu trúc giao diện:

```text
Genres
│
├── Action
│   ├── Anime Card
│   ├── Anime Card
│   └── Anime Card
│
├── Comedy
│   ├── Anime Card
│   ├── Anime Card
│   └── Anime Card
│
└── Romance
    ├── Anime Card
    ├── Anime Card
    └── Anime Card
```

---

## 4. 🔍 Search

Người dùng có thể tìm kiếm anime bằng thanh Search.

### Cách sử dụng:

1. Nhấn vào nút **Search**.
2. Nhập tên anime muốn tìm.
3. Nhấn nút tìm kiếm.
4. Website gửi yêu cầu đến Jikan API.
5. Kết quả tìm kiếm được hiển thị dưới dạng Anime Card.

Ví dụ:

```text
Naruto
One Piece
Attack on Titan
Gintama
Demon Slayer
```

Kết quả tìm kiếm có thể được thêm vào Favorites nếu người dùng đã đăng nhập.

---

## 5. ❤️ Favorites

Favorites là một trong những tính năng chính của AnimeVerse.

Người dùng có thể lưu những anime yêu thích của mình để dễ dàng xem lại sau.

### Cách thêm anime vào Favorites:

1. Đăng nhập tài khoản.
2. Tìm anime muốn yêu thích.
3. Nhấn vào nút ❤️ trên Anime Card.
4. Biểu tượng sẽ chuyển thành 💖.
5. Anime được thêm vào danh sách Favorites.

### Xóa anime khỏi Favorites:

1. Tìm anime đang được yêu thích.
2. Nhấn vào biểu tượng 💖.
3. Anime sẽ được xóa khỏi Favorites.
4. Biểu tượng trở lại ❤️.

---

## 👤 Favorites theo từng tài khoản

AnimeVerse hỗ trợ Favorites riêng cho từng user.

Ví dụ:

```text
User A
├── Naruto
└── One Piece

User B
├── Demon Slayer
└── Attack on Titan
```

Nếu User A đăng nhập:

```text
Favorites của User A
→ Naruto
→ One Piece
```

Nếu User B đăng nhập:

```text
Favorites của User B
→ Demon Slayer
→ Attack on Titan
```

Dữ liệu Favorites của các tài khoản không bị trộn lẫn.

Website sử dụng:

```text
users
```

để lưu tất cả tài khoản.

Trong khi:

```text
currentUser
```

được sử dụng để xác định tài khoản hiện đang đăng nhập.

Mỗi user có một danh sách:

```js
favorites: []
```

Anime được lưu bằng `mal_id` của anime thay vì lưu toàn bộ dữ liệu anime.

Ví dụ:

```js
{
    id: 1,
    username: "User A",
    email: "usera@gmail.com",
    password: "123456",
    favorites: [20, 21, 22]
}
```

---

# 🔐 6. Register

Người dùng có thể tạo tài khoản mới bằng chức năng Register.

Thông tin tài khoản được lưu vào Local Storage.

Một tài khoản có thể có cấu trúc:

```js
{
    id: 1,
    username: "Hoa",
    email: "hoa@gmail.com",
    password: "123456",
    favorites: []
}
```

Sau khi đăng ký thành công, user được thêm vào danh sách:

```text
users
```

Ví dụ:

```text
users
│
├── User A
├── User B
└── User C
```

Mỗi tài khoản mới được tạo sẽ có:

```js
favorites: []
```

để bắt đầu với danh sách Favorites trống.

---

# 🔑 7. Login

Người dùng có thể đăng nhập bằng email và password đã đăng ký.

Website sẽ kiểm tra thông tin đăng nhập với dữ liệu trong:

```text
users
```

Nếu email và password chính xác, user sẽ được lưu vào:

```text
currentUser
```

Ví dụ:

```js
localStorage.setItem(
    "currentUser",
    JSON.stringify(user)
);
```

Sau khi đăng nhập, website có thể xác định người dùng hiện tại và cho phép sử dụng tính năng Favorites.

---

# 🚪 8. Logout

Người dùng có thể đăng xuất khỏi tài khoản.

Khi Logout, website xóa:

```text
currentUser
```

khỏi Local Storage.

Ví dụ:

```js
localStorage.removeItem("currentUser");
```

Dữ liệu tài khoản trong:

```text
users
```

vẫn được giữ nguyên.

Điều này có nghĩa:

```text
Logout
│
├── currentUser → Xóa
│
└── users → Giữ nguyên
```

Khi đăng nhập lại, dữ liệu Favorites vẫn còn.

---

# 🛡️ 9. Kiểm tra trạng thái đăng nhập

Các tính năng cần tài khoản, chẳng hạn như Favorites, sẽ kiểm tra người dùng đã đăng nhập hay chưa.

Nếu chưa đăng nhập:

```text
Please login to use Favorites
```

Nếu đã đăng nhập:

```text
Cho phép thêm / xóa Favorites
```

Website sử dụng:

```js
localStorage.getItem("currentUser")
```

để kiểm tra trạng thái đăng nhập.

---

# 💾 10. Local Storage

AnimeVerse sử dụng Local Storage để lưu dữ liệu phía trình duyệt.

Hai dữ liệu chính được sử dụng là:

```text
users
currentUser
```

### `users`

Lưu danh sách tất cả tài khoản.

```text
users
├── User A
├── User B
└── User C
```

### `currentUser`

Lưu tài khoản hiện đang đăng nhập.

```text
currentUser
└── User B
```

### Khi đăng ký:

```text
Register
    ↓
users
```

### Khi đăng nhập:

```text
Login
    ↓
users
    ↓
currentUser
```

### Khi Favorite:

```text
currentUser
    ↓
Tìm user trong users
    ↓
Cập nhật favorites
    ↓
Lưu lại users
    ↓
Cập nhật currentUser
```

### Khi Logout:

```text
Logout
    ↓
Xóa currentUser
```

---

# 🌐 11. Jikan API

AnimeVerse sử dụng **Jikan API** để lấy dữ liệu anime từ MyAnimeList.

Các dữ liệu được sử dụng có thể bao gồm:

* Anime ID
* Anime title
* Poster
* Score
* Genres
* Release date
* Synopsis
* Thông tin chi tiết khác

Một số API endpoint được sử dụng:

```text
Top Anime
https://api.jikan.moe/v4/top/anime

Search Anime
https://api.jikan.moe/v4/anime?q={keyword}

Anime Detail
https://api.jikan.moe/v4/anime/{id}
```

Dữ liệu API được lấy bằng JavaScript `fetch()`.

Ví dụ:

```js
fetch("https://api.jikan.moe/v4/top/anime")
    .then(response => response.json())
    .then(result => {
        console.log(result);
    });
```

---

# 🧩 12. Anime Card

Anime Card là thành phần giao diện chính của website.

Mỗi card được tạo động bằng JavaScript.

Một Anime Card có thể bao gồm:

```text
┌─────────────────────────┐
│                         │
│        Poster           │
│                         │
├─────────────────────────┤
│ Anime Name              │
│ ⭐ Rating               │
│ 🎭 Genre                │
│                         │
│ [Detail]       [❤️]     │
└─────────────────────────┘
```

JavaScript sử dụng DOM để tạo các phần tử:

```js
document.createElement()
```

Sau đó thêm các phần tử vào card bằng:

```js
appendChild()
```

Ví dụ:

```js
card.appendChild(image);
card.appendChild(title);
card.appendChild(rating);
card.appendChild(genre);
card.appendChild(detailButton);
card.appendChild(favoriteButton);
```

---

# 📱 13. Responsive Design

AnimeVerse được thiết kế để hoạt động trên nhiều kích thước màn hình.

Website sử dụng:

* CSS Flexbox
* CSS Grid
* Media Queries

Các breakpoint chính:

```text
Desktop
    ↓
Tablet
    ↓
Mobile
```

Ví dụ:

```css
@media (max-width: 992px)
```

Giảm số cột của Anime Grid.

```css
@media (max-width: 768px)
```

Tối ưu giao diện cho màn hình nhỏ.

Các thành phần được điều chỉnh như:

* Navigation
* Anime Grid
* Movie Card
* Hero Section
* Font Size
* Layout

---

# 🛠️ Công nghệ sử dụng

## Frontend

* HTML5
* CSS3
* JavaScript

## JavaScript

* DOM Manipulation
* Event Listener
* Fetch API
* Array
* Object
* Local Storage
* JSON
* Template Literals
* `find()`
* `findIndex()`
* `push()`
* `splice()`
* `includes()`
* `indexOf()`

## API

* Jikan API
* MyAnimeList data

## Tools

* Visual Studio Code
* Git
* GitHub
* Local Development Server

---

# 📁 Cấu trúc Project

Cấu trúc project có thể được tổ chức như sau:

```text
AnimeVerse/
│
├── html/
│   ├── index.html
│   ├── login.html
│   └── register.html
│
├── css/
│   ├── reset.css
│   ├── style.css
│   └── responsive.css
│
├── js/
│   └── script.js
│
├── assets/
│   └── images/
│
├── data/
│   └── movies.json
│
└── README.md
```

---

# ▶️ Cách chạy Project

## Bước 1: Clone Project

Clone repository về máy:

```bash
git clone <repository-url>
```

## Bước 2: Mở Project

Mở thư mục AnimeVerse bằng Visual Studio Code.

## Bước 3: Chạy Local Server

Có thể sử dụng:

* Live Server trong VS Code
* Hoặc một local development server khác

Sau đó mở website trên trình duyệt.

Ví dụ:

```text
http://127.0.0.1:5500/
```

---

# 🧪 Cách kiểm tra các tính năng

## Kiểm tra Register

1. Mở trang Register.
2. Tạo tài khoản User A.
3. Tạo tài khoản User B.
4. Kiểm tra Local Storage.

Kết quả:

```text
users
├── User A
└── User B
```

---

## Kiểm tra Login

1. Đăng nhập User A.
2. Kiểm tra `currentUser`.
3. Logout.
4. Đăng nhập User B.
5. Kiểm tra `currentUser`.

Đảm bảo `currentUser` thay đổi đúng theo tài khoản đăng nhập.

---

## Kiểm tra Favorites

### User A

```text
Login User A
    ↓
Favorite Naruto
    ↓
Logout
```

### User B

```text
Login User B
    ↓
Kiểm tra Favorites
```

User B không được nhìn thấy Naruto trong Favorites của User A.

Sau đó:

```text
Login User A
    ↓
Naruto vẫn còn trong Favorites
```

Điều này chứng minh Favorites đã được lưu riêng cho từng user.

---

# ⚠️ Lưu ý

AnimeVerse hiện tại sử dụng Local Storage để lưu tài khoản và dữ liệu người dùng.

Điều này phù hợp cho mục đích:

* Học JavaScript
* Học DOM
* Học Local Storage
* Làm Frontend Project
* Demo chức năng Authentication

Tuy nhiên, đây **không phải hệ thống authentication thực tế**.

Password được lưu trực tiếp trong Local Storage nên không an toàn cho một website thực tế.

Nếu phát triển thành một sản phẩm thực tế, nên sử dụng:

* Backend
* Database
* Authentication Server
* Password Hashing
* Session hoặc JWT
* API bảo mật

---

# 🎯 Mục tiêu học tập của Project

Thông qua AnimeVerse, project tập trung thực hành:

```text
HTML
 ↓
CSS
 ↓
Responsive Design
 ↓
JavaScript
 ↓
DOM
 ↓
Event Handling
 ↓
Fetch API
 ↓
External API
 ↓
Local Storage
 ↓
Register / Login / Logout
 ↓
User State
 ↓
Favorites
```

AnimeVerse là project thực hành giúp xây dựng nền tảng cho việc học **Frontend Development** và chuẩn bị cho các bước tiếp theo như **Backend Development, Database và Authentication**.

---

# 🔮 Future Improvements

Một số tính năng có thể phát triển trong tương lai:

* [ ] Watch Anime
* [ ] Search Suggestions
* [ ] Pagination
* [ ] User Profile
* [ ] Edit Profile
* [ ] Password Change
* [ ] Dark / Light Mode
* [ ] Backend Authentication
* [ ] Database
* [ ] Cloud-based Favorites
* [ ] Loading Animation

---

