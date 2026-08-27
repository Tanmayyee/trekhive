<div align="center">

# 🏔️ TrekHive

**Escape the Ordinary.**

TrekHive is a full-stack web app for discovering and sharing amazing places to visit — hiking trails, campsites, tourist spots, hidden gems, or any beautiful spot worth the trip. Built with Node.js, Express, MongoDB, and EJS.

### 🌐 [**Live Demo → trekhive.vercel.app**](https://trekhive.vercel.app/home)

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

[Report a Bug](https://github.com/Tanmayyee/trekhive/issues) · [Request a Feature](https://github.com/Tanmayyee/trekhive/issues)

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

## 🛠️ Tech Stack

| Layer          | Technology                                                   |
| -------------- | -------------------------------------------------------------|
| **Core**       | Node.js, Express, EJS (via `ejs-mate`)                       |
| **Database**   | MongoDB, Mongoose                                             |
| **Auth**       | Passport.js (local strategy), `express-session`, `connect-mongo` |
| **Storage/Maps** | Cloudinary (images), MapTiler (geocoding + maps)            |
| **Validation & Security** | Joi, `sanitize-html`, `express-mongo-sanitize`, Helmet |
| **Styling**    | Tailwind CSS v4                                                |
| **Deployment** | Vercel                                                         |

## 🗂️ Project Structure

```
trekhive/
├── cloudinary/
│   └── index.js              # Cloudinary + multer storage config
├── controllers/
│   ├── listingcontroller.js
│   ├── reviewscontroller.js
│   └── usercontroller.js
├── models/
│   ├── reviewmodel.js
│   ├── trekhiveschema.js     # Listing model
│   └── usermodel.js
├── public/                   # Static assets & client-side JS (maps, image previews, styles)
├── routes/
│   ├── listings.js
│   ├── reviews.js
│   └── user.js
├── seeds/
│   ├── cities.js
│   ├── index.js
│   └── seedHelpers.js
├── src/
│   └── input.css             # Tailwind source
├── utils/
│   ├── ExpressError.js
│   ├── mongoSanitizeV5.js
│   └── validationSchema.js   # Joi schemas
├── views/
│   ├── auth/
│   │   ├── login.ejs
│   │   └── register.ejs
│   ├── layout/
│   │   └── boilerplate.ejs
│   ├── partials/
│   │   ├── flash.ejs
│   │   ├── footer.ejs
│   │   └── navbar.ejs
│   └── places/
│       ├── edit.ejs
│       ├── error.ejs
│       ├── home.ejs
│       ├── index.ejs
│       ├── mytreks.ejs
│       ├── new.ejs
│       ├── show.ejs
│       └── userTreks.ejs
├── .gitignore
├── app.js                    # App entry point, middleware & route mounting
├── LICENSE
├── middleware.js             # Auth guards & validation middleware
├── package.json
├── package-lock.json
├── playground.js
├── README.md
└── vercel.json               # Vercel deployment config
```

> `.env`, `.vercelignore`, `.vercel/`, and `node_modules/` exist locally but are git-ignored and not part of the repo.

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

## 🗺️ Roadmap

- [ ] Search & filtering on the explore page
- [ ] Categories/tags for different types of spots (trails, viewpoints, campsites, etc.)
- [ ] Additional UI/UX polish

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Tanmayyee/trekhive/issues).

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Tanmay Johri**

<div align="center">

If you found this project interesting, consider giving it a ⭐!

</div>
