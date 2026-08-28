<div align="center">

# 🏔️ TrekHive

### **Escape the Ordinary.**

A full-stack travel and place-discovery platform where people can discover, share, and review amazing places worth visiting.

<br>

## 🌐 Live Demo

Experience TrekHive:

<p align="center">
  <a href="https://trekhive.vercel.app/home" target="_blank">
    <strong>🏔️ Open TrekHive →</strong>
  </a>
</p>

<br>

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge\&logo=node.js\&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge\&logo=express\&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge\&logo=mongodb\&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge\&logo=mongoose\&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge\&logo=ejs\&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge\&logo=tailwindcss\&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge\&logo=vercel\&logoColor=white)

</div>

---

## 📖 About

TrekHive is a community-driven place-listing platform — think of it as a shared travel journal for anywhere worth visiting. On TrekHive, a "trek" isn't just a hiking trail: it's any place a user has found amazing and wants others to discover — a summit trail, a hidden waterfall, a quiet local viewpoint, a campsite, or a full-blown tourist attraction.

Users can browse everything on an interactive cluster map, post their own spots with photos and a location, and leave star ratings and reviews on places shared by the community.

> 🚧 **Status:** Actively in development — features are being added progressively, so some functionality may evolve.

## ✨ Features

- 🔐 **Authentication & sessions** — secure sign-up/login with Passport.js, hashed credentials, and MongoDB-backed sessions
- 🗺️ **Interactive maps** — MapTiler-powered cluster map on the explore page and a location marker on every listing's detail page
- 📍 **Geocoding** — locations are automatically geocoded to map coordinates on create/update
- 🖼️ **Image uploads** — multi-image upload (up to 5 per listing) stored and served via Cloudinary
- ⭐ **Reviews & ratings** — leave 1–5 star reviews on places, with author-only delete permissions
- 👤 **User authorization** — only a listing's author can edit or delete it; same for reviews
- 🧳 **"My Treks"** — a personal dashboard of every place you've shared
- 🛡️ **Security hardening** — Helmet CSP headers, MongoDB query sanitization, and HTML sanitization to prevent XSS
- ✅ **Server-side validation** — Joi schemas validate listings, reviews, and user input before they touch the database
- 📱 **Responsive UI** — built with Tailwind CSS v4 for a clean experience across devices
- ☁️ **Deployed & live** — running on Vercel with a MongoDB Atlas backend
---

## 🛠️ Tech Stack

| Layer                | Technology                                    |
| -------------------- | --------------------------------------------- |
| **Runtime**          | Node.js                                       |
| **Backend**          | Express.js                                    |
| **Templating**       | EJS + ejs-mate                                |
| **Database**         | MongoDB                                       |
| **ODM**              | Mongoose                                      |
| **Authentication**   | Passport.js                                   |
| **Sessions**         | express-session + connect-mongo               |
| **Image Storage**    | Cloudinary                                    |
| **Maps & Geocoding** | MapTiler                                      |
| **Validation**       | Joi                                           |
| **Security**         | Helmet, sanitize-html, express-mongo-sanitize |
| **Styling**          | Tailwind CSS v4                               |
| **Deployment**       | Vercel                                        |

---

## 🗂️ Project Structure

```text
TrekHive/
│
├── cloudinary/
│   └── index.js
│
├── controllers/
│   ├── listingcontroller.js
│   ├── reviewscontroller.js
│   └── usercontroller.js
│
├── models/
│   ├── reviewmodel.js
│   ├── trekhiveschema.js
│   └── usermodel.js
│
├── public/
│   ├── video/
│   │   ├── back-view-hiker-watching-sunset-from-mountain.jpg
│   │   └── original-1635cb72296909630c60363b5cb129dd.mp4
│   │
│   ├── app.css
│   ├── clientSideStyle.js
│   ├── clusterMap.js
│   ├── flash.css
│   ├── home.css
│   ├── home.js
│   ├── image.js
│   ├── mobileMenu.js
│   ├── myTrekScript.js
│   ├── showPageMap.js
│   ├── showpagescript.js
│   └── star.css
│
├── routes/
│   ├── listings.js
│   ├── reviews.js
│   └── user.js
│
├── seeds/
│   ├── cities.js
│   ├── index.js
│   └── seedHelpers.js
│
├── src/
│   └── input.css
│
├── utils/
│   ├── ExpressError.js
│   ├── mongoSanitizeV5.js
│   └── validationSchema.js
│
├── views/
│   ├── auth/
│   │   ├── login.ejs
│   │   └── register.ejs
│   │
│   ├── layout/
│   │   └── boilerplate.ejs
│   │
│   ├── partials/
│   │   ├── flash.ejs
│   │   ├── footer.ejs
│   │   └── navbar.ejs
│   │
│   └── places/
│       ├── edit.ejs
│       ├── error.ejs
│       ├── home.ejs
│       ├── index.ejs
│       ├── mytreks.ejs
│       ├── new.ejs
│       ├── show.ejs
│       └── userTreks.ejs
│
├── app.js
├── middleware.js
├── playground.js
├── vercel.json
├── package.json
├── package-lock.json
├── LICENSE
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- A [MongoDB](https://www.mongodb.com/) database (local or [Atlas](https://www.mongodb.com/atlas))
- A [Cloudinary](https://cloudinary.com/) account (for image uploads)
- A [MapTiler](https://www.maptiler.com/) account (for geocoding & maps)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Tanmayyee/trekhive.git
   cd trekhive
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the project root:
   ```env
   DB_URL=mongodb://127.0.0.1:27017/trekhive-v2
   SESSION_SECRET=your_session_secret
   MONGOSTORE_SECRET=your_mongostore_secret
   MAPTILER_API_KEY=your_maptiler_api_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_CLOUD_KEY=your_cloudinary_api_key
   CLOUDINARY_SECRET=your_cloudinary_api_secret
   ```

4. **Build Tailwind CSS** (optional — watches for changes during development)
   ```bash
   npm run dev:css
   ```

5. **Run the app**
   ```bash
   npm start
   ```

   The app will be running at `http://localhost:3000` (or your configured port).

---

## 🔮 Future Improvements

* [ ] Search functionality
* [ ] Advanced filtering
* [ ] Categories for different types of places
* [ ] Additional UI/UX improvements
* [ ] More community features

---

## 🔒 Security

Security is an important part of TrekHive.

The application uses:

* **Helmet** for HTTP security headers
* **Content Security Policy**
* **express-mongo-sanitize** against MongoDB query injection
* **sanitize-html** for HTML sanitization
* **Joi** for server-side validation
* **Passport.js** for authentication
* **MongoDB-backed sessions**
* Authorization middleware for protected resources

Sensitive environment variables are kept outside the repository.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

To contribute:

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Commit your changes
5. Push your branch
6. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

See the [LICENSE](LICENSE) file for more information.

---

## 👤 Author

### **Tanmay Johri**

<a href="https://www.linkedin.com/in/tanmayjohri/" target="_blank">LinkedIn</a>
  ·  
<a href="https://www.instagram.com/tanmay._.ye/" target="_blank">Instagram</a>

Built with ❤️ and a passion for exploring amazing places.

---

<div align="center">

### ⭐ Enjoying TrekHive?

If you found the project interesting, consider giving the repository a star!

<br>

**Escape the Ordinary. 🏔️**

</div>
