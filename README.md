# Myke Towers - Young King Experience

<p align="center">
  <img src="public/356shots_so.png" alt="Myke Towers Project Preview" width="100%">
</p>

A high-end, premium web experience dedicated to the career, discography, and legacy of **Myke Towers**. This project features a state-of-the-art editorial design, smooth animations, and real-time data integration via a custom API.

## ✨ Key Features

- **🎨 Editorial Biography**: A clean, minimalist timeline experience showcasing the artist's evolution with high-impact typography and an editorial layout inspired by high-fashion magazines.
- **💿 Dynamic Discography**: Interactive album listing categorized by studio albums, mixtapes, and EPs. Features unique mouse-follow preview cards that appear as you hover over titles.
- **🎥 YouTube Integration**: Real-time search and playback of Myke Towers' music videos and hits directly within the platform.
- **👑 Premium UI/UX**: Built with a "Black Panther" aesthetic, utilizing glassmorphism, smooth gradients, and sophisticated micro-animations powered by Framer Motion.
- **📱 Full Responsive Design**: Every element is meticulously optimized for a seamless experience across mobile, tablet, and ultra-wide desktop monitors.
- **🚀 Real-time Data**: Fetches biography details, social media images, and discography from a dedicated Node.js backend.

## 🛠️ Tech Stack

- **Frontend Core**: [React 18](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Routing**: [React Router Dom](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend API**: [Node.js / Express](https://github.com/sebastianvasquezechavarria1234/myke-towers-api)

## 📁 Project Structure

```bash
myke-towers/
├── public/              # Static assets (images, videos, previews)
├── src/
│   ├── assets/          # Project-specific assets (fonts, icons)
│   ├── components/      # Reusable UI components
│   │   ├── common/      # Global components (Cursor, Bg, etc.)
│   │   └── home/        # Home-specific sections (Discography, Hero)
│   ├── layout/          # Layout wrappers (Header, Footer, Layout)
│   ├── pages/           # Main page views (Home, FullBio, AlbumDetail)
│   ├── routers/         # Navigation and routing logic
│   └── index.css        # Global styles and design tokens
├── tailwind.config.js   # Custom Tailwind theme configuration
└── README.md            # Project documentation
```

## 📡 API Endpoints Used

The frontend consumes data from the following endpoints of the [Myke Towers API](https://github.com/sebastianvasquezechavarria1234/myke-towers-api):

- `GET /albums`: Retrieves the full list of albums, mixtapes, and EPs.
- `GET /social`: Fetches dynamic images and social media content for the biography and hero sections.
- `GET /album/:id`: Detailed information for a specific album, including tracklist and metadata.

## 🚀 Getting Started

### Prerequisites

- Node.js (v16.x or higher)
- npm (v7.x or higher)
- [Myke Towers API](https://github.com/sebastianvasquezechavarria1234/myke-towers-api) running on `http://localhost:3000`.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sebastianvasquezechavarria1234/myke-towers.git
   ```

2. **Install dependencies**
   ```bash
   cd myke-towers
   npm install
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

## 📐 Design Principles

- **Minimalism**: Focus on what matters—the artist and his music.
- **Contrast**: Bold white typography on deep panther-black backgrounds.
- **Fluidity**: Transitions should feel natural and effortless, enhancing the user's journey through the artist's history.

---
Developed with ❤️ by **Sebastian Vasquez** & **Antigravity** for the Young King.

