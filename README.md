# 3rd Anniversary Web Experience

A personalized, vintage-themed web experience created with React, Vite, and Tailwind CSS to celebrate 3 years of memories together. Features automated scrolling photo galleries, an interactive vector-style vintage envelope with letter extraction animations, and background audio playback.

---

## Features

- **Vintage Vector Envelope Interaction:** Flat vector-style Kraft envelope design featuring a 3D flap unfolding animation, wax seal visuals, and smooth letter extraction.
- **Dynamic Photo Columns:** Automated independent 4-column vertical scrolling powered by photos fetched via Google Drive API.
- **Atmospheric Background Music:** Integrated local MP3 audio playback triggered naturally upon opening the envelope.
- **Responsive & Dark Visual Design:** Moody `#18050e` background palette paired with frosted glass card UI and custom hidden-scrollbar styling.

---

## Tech Stack

- **Framework:** [React.js](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons & Graphics:** Inline SVG for precision vector envelope rendering
- **Data Fetching:** Google Drive v3 REST API
- **Audio:** HTML5 Audio API

---

## Project Structure

```text
anniversary-website/
├── public/
├── src/
│   ├── assets/
│   ├── images/
│   ├── music/
│   │   └── 14-silent-sanctuary-violin-x-cello-cover.mp3
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env.local
├── package.json
└── README.md
