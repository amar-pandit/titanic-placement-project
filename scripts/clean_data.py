import pandas as pd
import os

RAW_PATH = "data/raw/titanic.csv"
CLEAN_PATH = "data/processed/titanic_clean.csv"

os.makedirs("data/processed", exist_ok=True)

df = pd.read_csv(RAW_PATH)

# -------- CLEANING --------

# Fill Age with median
df["Age"] = df["Age"].fillna(df["Age"].median())

# Fill missing Embarked with most common value ('S')
df["Embarked"] = df["Embarked"].fillna("S")

# Encode Embarked
df["Embarked"] = df["Embarked"].map({
    "S": 0,
    "C": 1,
    "Q": 2
})

# Cabin presence (1 = has cabin, 0 = no cabin)
df["CabinPresent"] = df["Cabin"].notnull().astype(int)

# Family size
df["FamilySize"] = df["SibSp"] + df["Parch"] + 1

# Encode Sex
df["Sex"] = df["Sex"].map({
    "male": 0,
    "female": 1
})

# Drop useless columns
df.drop(["Name", "Ticket", "Cabin"], axis=1, inplace=True)

# Save cleaned data
df.to_csv(CLEAN_PATH, index=False)

print("✅ Data cleaned & saved at:", CLEAN_PATH)
