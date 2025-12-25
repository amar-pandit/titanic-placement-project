import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib

DATA_PATH = "data/processed/titanic_clean.csv"
MODEL_PATH = "backend/model.pkl"

df = pd.read_csv(DATA_PATH)

# ❌ Drop columns not used in prediction
X = df.drop(["Survived", "PassengerId"], axis=1)
y = df["Survived"]

model = RandomForestClassifier(n_estimators=200, random_state=42)
model.fit(X, y)

joblib.dump(model, MODEL_PATH)
print("✅ Model retrained & saved")
