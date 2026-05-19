# Myke Towers - Young King Experience 👑🗼

<p align="center">
  <img src="https://github.com/sebastianvasquezechavarria1234/myke-towers/blob/main/public/preview.png?raw=true" alt="Myke Towers Project Preview" width="100%">
</p>

A premium, production-grade web experience dedicated to the career, discography, and legacy of the global artist **Myke Towers**. This repository pairs a state-of-the-art, highly-stylized React frontend with a robust, developer-ready Express/Node.js REST API.

Designed not only as an immersive fan experience with editorial typography and advanced animations, it also functions as an open-source data resource. The custom API is optimized for developers to consume structured information about the artist.

---

## 📡 Developer-Friendly API

> [!TIP]
> The backend service is open and can be integrated into any developer's project to retrieve structured biographical, discographical, and media details of Myke Towers.

### Active Endpoints
* **`GET /albums`**: Retrieves the full catalog categorized by studio albums, mixtapes, and EPs.
* **`GET /album/:id`**: Detailed metadata of a specific album, including its tracklist, cover art, and release year.
* **`GET /social`**: Fetches dynamic images and live content for biographies and galleries.

---

## ✨ Key Features

* **🎨 Editorial Biography (`/biografia`)**: A minimalist timeline showcasing the artist's evolution with high-impact typography inspired by modern editorial styling.
* **💿 Interactive Discography (`/albums`)**: Dynamically categorized catalog featuring unique, fluid mouse-following preview cards powered by Framer Motion.
* **📱 Responsive Layouts (`/album/:id`)**: Responsive, touch-friendly interfaces, such as the dynamic tracklist grid optimized with truncate mechanics for mobile devices.
* **🎥 Media Playback**: YouTube API integration for searching and playing music videos and live sessions smoothly.
* **🖤 Dark Panther Aesthetic**: Curated dark palette using premium glassmorphism, precise gradients, and subtle micro-animations.

---

## 🛠️ Tech Stack

* **Frontend**: React 18 · Vite · Tailwind CSS · Framer Motion · Lucide Icons
* **Backend**: Node.js · Express.js · Cors (Open for developer integration)

---

## 🚀 Getting Started

### Prerequisites
* **Node.js** (v16.x or higher)
* **npm** (v7.x or higher)
* Active running instance of the [Myke Towers API](https://github.com/sebastianvasquezechavarria1234/myke-towers-api) on `http://localhost:3000`.

### Setup Frontend
1. **Clone the repository**
   ```bash
   git clone https://github.com/sebastianvasquezechavarria1234/myke-towers.git
   ```
2. **Install dependencies**
   ```bash
   cd myke-towers
   npm install
   ```
3. **Run local dev server**
   ```bash
   npm run dev
   ```

---

## 📐 Design Philosophy
* **Minimalism & Contrast**: High-contrast white typography on deep obsidian-black backgrounds.
* **Fluid Animation**: Effortless transitions that enhance the storytelling of the artist's history.

---

Developed with ❤️ by **Sebastian Vasquez** for the Young King.
