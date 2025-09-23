# QuizMaster - Interactive Learning Platform

A modern, responsive quizzing website inspired by Quizizz, built with HTML, CSS, and JavaScript. This platform provides an engaging learning experience for educators and students with a clean, intuitive interface.


##  Technologies Used

- **HTML5**
- **CSS**
- **JavaScript**

## ✨ Features

- **Landing page**: Subjects, features, testimonials, and clear calls to action.
- **Create quizzes**:
  - Multiple question types: multiple‑choice, true/false, fill‑in‑the‑blank, short answer
  - Per‑question points, time limits, explanations
  - Quiz metadata: title, subject, description, difficulty, time limit, tags, visibility
  - Quiz settings: shuffle questions/options, show correct answers, allow retake, progress bar, instant feedback
  - Add, duplicate, remove, and reorder style interactions (duplicate supported; reorder not yet)
  - **Preview** assembled quizzes before saving
  - **Save draft** to `localStorage` (demo persistence)
- **Join or browse quizzes**: Simple join flow and a browse gallery with difficulty tags
- **Play quiz**: Interface with timer, progress, selectable options, and Next controls

## 🗂️ Project Structure
```
quizizz/
├── index.html          # Public landing page + in‑browser quiz flow
├── script.js           # Landing + quiz creation/join/browse/play logic
├── styles.css          # Public site styles
├── admin.html          # Admin dashboard (tables, filters, analytics, settings)
├── admin-script.js     # Admin interactions, modals, filters, notifications
├── admin-styles.css    # Admin dashboard styles
└── README.md
```

## 🧩 How It Works (Key Flows)

- **Create a quiz**: Click Create Quiz, pick a subject, fill in quiz details, add questions, Preview, Create
- **Join a quiz**: Click Join Quiz, enter code and name.
- **Browse quizzes**: Opens a gallery with sample cards, Start launches the demo quiz.
- **Play a quiz**: Full‑screen UI with timer, progress bar, options, and Next.

