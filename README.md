<div align="center">

# 🏔️ TrekHive

### **Escape the Ordinary.**

A full-stack travel and place-discovery platform where people can discover, share, and review amazing places worth visiting.

<br>

### 🌐 <a href="https://trekhive.vercel.app/home" target="_blank"><strong>Live Demo → trekhive.vercel.app</strong></a>

<br>

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge\&logo=node.js\&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge\&logo=express\&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge\&logo=mongodb\&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge\&logo=mongoose\&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge\&logo=ejs\&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge\&logo=tailwindcss\&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge\&logo=vercel\&logoColor=white)

<br>

<a href="https://github.com/Tanmayyee/trekhive/issues" target="_blank">Report a Bug</a>
 ·  <a href="https://github.com/Tanmayyee/trekhive/issues" target="_blank">Request a Feature</a>

</div>

---

## 📖 About

**TrekHive** is a community-driven place-discovery platform built for people who love exploring new destinations.

A "trek" on TrekHive isn't limited to hiking trails. It can be anything worth discovering — a mountain viewpoint, hidden waterfall, peaceful campsite, local attraction, scenic location, or any memorable place.

Users can:

* Discover places shared by the community
* Explore listings through an interactive map
* Create and share their own places
* Upload multiple images
* Add locations and view them on a map
* Rate places using a 1–5 star rating system
* Write reviews
* Manage their own listings
* Explore their personal **My Treks** dashboard

> 🚧 **Status:** Actively in development. New features and improvements are being added progressively.

---

## ✨ Features

### 🔐 Authentication & Authorization

* User registration and login
* Passport.js local authentication
* Secure password hashing
* MongoDB-backed sessions
* Protected routes
* Author-only listing modification
* Author-only review deletion

### 🗺️ Interactive Maps

* MapTiler-powered maps
* Clustered markers on the explore page
* Individual location markers on listing pages
* Automatic geocoding of listing locations
* Map-based place discovery

### 📍 Place Listings

* Create new places
* Edit existing places
* Delete your own listings
* Add descriptions and locations
* Upload multiple images
* Cloudinary image storage

### ⭐ Reviews & Ratings

* 1–5 star ratings
* Community reviews
* Review deletion permissions
* Listing-specific reviews

### 🧳 My Treks

* Personal dashboard
* View all places created by the logged-in user
* Manage personal listings

### 🛡️ Security

* Helmet security headers
* Content Security Policy
* MongoDB query sanitization
* HTML sanitization
* Joi server-side validation
* Protected authentication routes
* Secure session configuration

### 📱 Responsive UI

* Responsive design
* Tailwind CSS v4
* Mobile-friendly navigation
* Image previews
* Interactive client-side components

### ☁️ Deployment

* Deployed on Vercel
* MongoDB Atlas database support
* Cloudinary media storage
* Production-ready environment configuration

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

Make sure you have the following installed or configured:

* <a href="https://nodejs.org/" target="_blank">Node.js</a> **v18+**
* <a href="https://www.mongodb.com/" target="_blank">MongoDB</a> database or MongoDB Atlas
* <a href="https://cloudinary.com/" target="_blank">Cloudinary</a> account
* <a href="https://www.maptiler.com/" target="_blank">MapTiler</a> account
* Git

---

### 1. Clone the Repository

```bash
git clone https://github.com/Tanmayyee/trekhive.git
```

```bash
cd trekhive
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Configure Environment Variables

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

> ⚠️ Never commit your `.env` file or expose your API keys and secrets publicly.

---

### 4. Run Tailwind CSS

For development, start the Tailwind CSS watcher:

```bash
npm run dev:css
```

---

### 5. Start the Application

```bash
npm start
```

The application will be available at:

```text
http://localhost:3000
```

---

## 🌐 Live Demo

Experience TrekHive:

<p align="center">
  <a href="https://trekhive.vercel.app/home" target="_blank">
    <strong>🏔️ Open TrekHive →</strong>
  </a>
</p>

---

## 🗺️ Roadmap

* [ ] Search functionality
* [ ] Advanced filtering
* [ ] Categories for different types of places
* [ ] Tags for listings
* [ ] Improved map interactions
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

For bugs and feature requests:

<a href="https://github.com/Tanmayyee/trekhive/issues" target="_blank">
  <strong>Open an Issue →</strong>
</a>

---

## 📄 License

This project is licensed under the **MIT License**.

See the [LICENSE](LICENSE) file for more information.

---

## 👤 Author

### **Tanmay Johri**

Built with ❤️ and a passion for exploring amazing places.

---

<div align="center">

### ⭐ Enjoying TrekHive?

If you found the project interesting, consider giving the repository a star!

<br>

**Escape the Ordinary. 🏔️**

</div>
