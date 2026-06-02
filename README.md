# VibeShuttle | Premium Airport Transfer 🚐✨

A modern, responsive, and "vibe-coded" web application for booking premium airport shuttle transfers. Built with a lightweight yet powerful tech stack, this application features dynamic pricing, mobile-first design, and a sleek glassmorphism aesthetic.

## 🚀 Tech Stack
- **Backend:** FastAPI (Python)
- **Database:** SQLite3
- **Frontend:** HTML5, Vanilla CSS, Vanilla JavaScript
- **Templating:** Jinja2

## ✨ Features
- **Modern UI/UX:** Premium design featuring vibrant colors, transparent blur effects (glassmorphism), and Phosphor Icons.
- **Mobile First:** Fully responsive layout that ensures a seamless booking experience on smartphones and tablets.
- **Dynamic Calculation:** JavaScript automatically calculates the total price based on the number of passengers (`10€` per passenger).
- **FastAPI Integration:** Form data is securely processed via a REST API endpoint (`/api/book`) and stored directly into the database.
- **Zero Heavy Frameworks:** Achieves a highly interactive experience using only Vanilla JS and CSS variables, keeping the bundle size microscopic.

## 📂 Project Structure
```text
van_booking/
├── main.py              # FastAPI application & route definitions
├── database.py          # SQLite database initialization & connection
├── airport_shuttle.db   # Automatically generated database file
├── templates/
│   └── index.html       # The main UI structure & Jinja2 template
└── static/
    ├── css/
    │   └── style.css    # Premium coastal-themed styling
    ├── js/
    │   └── app.js       # Form handling, dynamic pricing, & API calls
    └── images/
        └── hero_bg.png  # Generated premium background imagery
```

## 🛠️ How to Run

1. **Install Dependencies:**
   Make sure you have Python installed, then run:
   ```bash
   pip install fastapi uvicorn jinja2
   ```

2. **Start the Server:**
   Launch the FastAPI development server using Uvicorn:
   ```bash
   python main.py
   ```
   *(Or run it manually: `uvicorn main:app --host 0.0.0.0 --port 8000 --reload`)*

3. **View the App:**
   Open your browser and navigate to:
   👉 **http://localhost:8000**
