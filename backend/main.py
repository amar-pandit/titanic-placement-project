from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
import os

# ---------------- APP ----------------
app = FastAPI(title="Titanic Survival Prediction API")

# ---------------- CORS ----------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # GitHub Pages / Render allowed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- LOAD MODEL ----------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "model.pkl")

model = joblib.load(MODEL_PATH)

# ---------------- INPUT SCHEMA ----------------
class Passenger(BaseModel):
    Pclass: int
    Sex: int              # male=0, female=1
    Age: float
    Fare: float
    SibSp: int
    Parch: int
    Embarked: int         # S=0, C=1, Q=2
    CabinPresent: int
    FamilySize: int

# ---------------- ROUTES ----------------
@app.get("/")
def home():
    return {
        "message": "🚢 Titanic ML API is running",
        "status": "success"
    }

@app.post("/predict")
def predict_survival(data: Passenger):
    # Convert input to DataFrame
    df = pd.DataFrame([data.dict()])

    # Ensure same column order as training
    df = df[
        [
            "Pclass",
            "Sex",
            "Age",
            "SibSp",
            "Parch",
            "Fare",
            "Embarked",
            "CabinPresent",
            "FamilySize"
        ]
    ]

    # Prediction
    prediction = model.predict(df)[0]

    # 🔥 Probability (Survival = class 1)
    probability = model.predict_proba(df)[0][1] * 100

    return {
        "survived": int(prediction),
        "probability": round(probability, 2),
        "result": "Survived 🎉" if prediction == 1 else "Not Survived ❌"
    }
