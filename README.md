# ✏️ Notes App with Drawing & Sharing

A full-stack **notes application** that lets you:

- Write and edit notes in a **rich text editor** (WYSIWYG-style with Markdown preview).  
- Use an **integrated drawing editor** to sketch diagrams, annotate with pen, or add shapes. Drawings are saved as images and embedded directly into your notes.  
- **Share notes publicly** via a generated shareable link — recipients can view text and drawings without logging in.  

---

## 🚀 Features

- 📝 **Text Editor (WYSIWYG/Markdown)**  
  - Clean, distraction-free editing  
  - Supports text formatting, lists, code blocks  
  - What-you-see-is-what-you-get preview  

- 🎨 **Drawing Editor**  
  - Freehand drawing (pen tool)  
  - Shapes (lines, rectangles, circles)  
  - Export and embed drawing into notes  
  - Drawing is saved & rendered inline (not just a link)  

- 🔗 **Sharing**  
  - Generate a public URL for any note  
  - Shared notes display both text & drawings  
  - Anyone with the link can view the note (read-only)  

- 👤 **Authentication**  
  - User accounts (sign up, login, JWT authentication)  
  - Each user manages their own notes  

---

## 🛠️ Tech Stack

**Frontend**
- React + Vite
- TailwindCSS + shadcn/ui components
- React Markdown (for rendering note content)
- Axios (API requests)

**Backend**
- Node.js + Express
- MongoDB + Mongoose (data storage)
- Multer (file uploads for drawings)
- JWT Authentication


---

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/saumyaketu/notes-app.git
cd notes-app
```

### 2. Backend setup
```bash
cd backend
npm install
cp .env.example .env   # set MONGO_URI, JWT_SECRET, APP_ORIGIN
npm run dev
```
Backend will start at **http://localhost:5000**

### 3. Frontend setup
```bash
cd frontend
npm install
npm run dev
```
Frontend will start at **http://localhost:5173**

---

## 🔑 Environment Variables

### Backend (`backend/.env`)
```
MONGO_URI=mongodb://localhost:27017/notesapp
JWT_SECRET=your_jwt_secret
APP_ORIGIN=http://localhost:5173
```

### Frontend (`frontend/.env`)
```
VITE_API_URL=http://localhost:5000/api
```

---

## 📖 Usage

1. **Sign up / Login** to create your account.  
2. **Create a note** and start typing in the editor.  
3. **Open Drawing Editor** → sketch, save, and insert the drawing.  
   - Drawing will appear inline in the editor (`![](url)`) and is saved to DB.  
4. **Share a note** → generate a link, send it to others.  
   - Recipients can open the link and view both text & drawings.  

---

## 📡 API Overview

### Notes
- `POST /api/notes` → create note  
- `GET /api/notes/:id` → fetch note  
- `PUT /api/notes/:id` → update note  
- `DELETE /api/notes/:id` → delete note  
- `POST /api/notes/:id/share` → create share link  
- `GET /api/notes/public/:shareId` → fetch public note  

### Auth
- `POST /api/auth/register`  
- `POST /api/auth/login`  
- `GET /api/auth/me`  

---

## ✅ Future Improvements

- Richer WYSIWYG editor (bold, italic, headings toolbar)  
- Collaborative editing (multi-user live editing)  
- Export notes as PDF / Markdown  
- Drawing layers & image annotations  

---

## 📜 License

MIT License © 2025 Saumyaketu Chand Gupta
