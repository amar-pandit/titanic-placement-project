# 🚢 Titanic Survival Prediction – Full Stack ML Web App

A complete **end-to-end Machine Learning web application** that predicts whether a passenger would survive the Titanic disaster based on input features.  
This project covers the **entire ML lifecycle** — from data cleaning and model training to backend API deployment and frontend integration.

---

## 🌐 Live Demo

- 🔗 **Frontend (GitHub Pages):**  
  https://amar-pandit.github.io/titanic-placement-project/

- 🔗 **Backend API (Render):**  
  https://titanic-placement-project.onrender.com/docs

---

## 🧠 Project Overview

This project demonstrates how a real-world ML system is built and deployed:

- Raw data cleaning and preprocessing
- Feature engineering
- Model training using Scikit-learn
- Model serialization using Joblib
- Backend REST API using FastAPI
- Frontend UI using HTML, CSS, and JavaScript
- Cloud deployment using Render and GitHub Pages

The application allows users to input passenger details and get **real-time survival predictions**.

---

## ⚙️ Tech Stack

### 🔹 Machine Learning
- Python
- Pandas
- NumPy
- Scikit-learn (RandomForestClassifier)

### 🔹 Backend
- FastAPI
- Uvicorn
- Joblib
- CORS Middleware

### 🔹 Frontend
- HTML
- CSS
- JavaScript (Fetch API)

### 🔹 Deployment
- Backend: **Render**
- Frontend: **GitHub Pages**
- Version Control: **Git & GitHub**

---

## 📂 Project Structure

titanic-placement-project/
│
├── backend/
│ ├── main.py # FastAPI backend
│ ├── model.pkl # Trained ML model
│ └── requirements.txt # Backend dependencies
│
├── data/
│ ├── raw/
│ │ └── titanic.csv # Original dataset
│ └── processed/
│ └── titanic_clean.csv
│
├── scripts/
│ └── clean_data.py # Data cleaning script
│
├── training/
│ └── train_model.py # Model training script
│
├── docs/ # Frontend (GitHub Pages)
│ ├── index.html
│ ├── style.css
│ └── script.js
│
├── README.md
└── .gitignore




---

## 🧹 Data Cleaning & Feature Engineering

- Missing values handled (Age, Embarked)
- Categorical variables encoded (Sex, Embarked)
- New features created:
  - `FamilySize`
  - `CabinPresent`
- Unnecessary columns removed
- Cleaned dataset saved for reproducibility

---

## 🤖 Model Training

- Algorithm: **RandomForestClassifier**
- Trained on cleaned Titanic dataset
- Target variable: `Survived`
- Model saved as `model.pkl` using Joblib
- Training performed via Python scripts (no notebooks)

---

## 🔌 Backend API (FastAPI)

### Available Endpoints

- `GET /`  
  Health check endpoint

- `POST /predict`  
  Accepts passenger data in JSON format and returns survival prediction

### Sample Input
```json
{
  "Pclass": 3,
  "Sex": 0,
  "Age": 22,
  "Fare": 7.25,
  "SibSp": 1,
  "Parch": 0,
  "Embarked": 0,
  "CabinPresent": 0,
  "FamilySize": 2
}


### Sample Output
{
  "survived": 0,
  "result": "Not Survived ❌"
}


🎨 Frontend

Clean and responsive UI

User-friendly input form

Fetch API used to call backend

Displays prediction result instantly

Hosted using GitHub Pages

🚀 Deployment

Backend deployed on Render using Uvicorn

Frontend deployed on GitHub Pages

CORS enabled to allow secure frontend-backend communication

Fully cloud-hosted and publicly accessible


🧪 How to Run Locally
1️⃣ Clone Repository
git clone https://github.com/amar-pandit/titanic-placement-project.git
cd titanic-placement-project

2️⃣ Create Virtual Environment
python -m venv venv
venv\Scripts\activate

3️⃣ Install Dependencies
pip install -r backend/requirements.txt

4️⃣ Run Backend
cd backend
uvicorn main:app --reload

5️⃣ Open Frontend

Open docs/index.html in browser

🧑‍💼 Resume Highlights

Built and deployed a full-stack machine learning web application

Implemented data preprocessing, feature engineering, and model training

Designed and deployed RESTful APIs using FastAPI

Integrated frontend with live backend using Fetch API

Deployed backend on Render and frontend on GitHub Pages

Solved real-world deployment issues including CORS and API integration

📌 Future Improvements

Model evaluation metrics (accuracy, confusion matrix)

Feature importance visualization

SHAP explainability

Docker containerization

Authentication system

Database integration

👤 Author

Amar Kumar Pandit
B.E. Computer Science Engineering
Machine Learning & Backend Enthusiast

⭐ Acknowledgements

Kaggle Titanic Dataset

FastAPI Documentation

Scikit-learn Community
