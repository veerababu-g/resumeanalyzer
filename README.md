#  Resume Analyzer

AI-powered full-stack web application that parses PDF resumes, extracts key details, evaluates quality, and suggests improvements using Google Gemini Pro.

## 🚀 Features

- Upload and parse PDF resumes
- Extract:
  - Name, Email, Phone
  - LinkedIn, Portfolio
  - Work Experience, Education, Skills
  - Projects, Certifications
- Resume rating (0–10)
- Improvement feedback & upskill suggestions
- Past uploads history and detail view

## 🛠️ Tech Stack

**Frontend:** React.js  
**Backend:** Node.js, Express.js  
**Database:** PostgreSQL  
**AI Engine:** Google Generative AI (Gemini-Pro)  
**Parsing:** pdf-parse  
**File Uploads:** multer

## 📁 Project Structure

├── server.js
├── db/
│ └── index.js
├── routes/
│ └── resumeRoutes.js
├── controllers/
│ └── resumeController.js
├── services/
│ └── analysisService.js
└── frontend/
├── src/
│ ├── App.js
│ └── components/
│ ├── ResumeUploader.js
│ ├── ResumeDetails.js
│ └── PastResumesTable.js


## ⚙️ Setup Instructions

### 1. Backend Setup


cd backend
npm install


node server.js


cd frontend
npm install
npm start

live demo
![project 22](https://github.com/user-attachments/assets/cde8ac62-ac52-4fd9-8a4f-0f8f5ff60d98)



