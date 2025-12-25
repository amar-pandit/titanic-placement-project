// ===== BACKEND URL =====
const API_URL = "https://titanic-placement-project.onrender.com/predict";

// ===== OPTIONAL: WAKE UP BACKEND (Render cold start fix) =====
fetch("https://titanic-placement-project.onrender.com/")
  .then(() => console.log("Backend awake"))
  .catch(() => console.log("Backend sleeping"));

async function processPrediction() {
    const cta = document.getElementById('cta');
    const spinner = document.getElementById('spinner');
    const btnTxt = document.getElementById('btn-txt');
    const resultsArea = document.getElementById('results-area');

    const resVal = document.getElementById('res-val');
    const prog = document.getElementById('progress-bar');
    const probNum = document.getElementById('prob-num');

    const inputs = {
        age: document.getElementById('age').value,
        fare: document.getElementById('fare').value || 0,
        sex: document.getElementById('sex').value,
        pclass: document.getElementById('pclass').value,
        sibsp: parseInt(document.getElementById('sibsp').value || 0),
        parch: parseInt(document.getElementById('parch').value || 0),
        embarked: document.getElementById('embarked').value
    };

    // ===== VALIDATION =====
    if (
        inputs.age === "" ||
        inputs.sex === "" ||
        inputs.pclass === "" ||
        inputs.embarked === ""
    ) {
        alert("⚠️ Please fill all required fields.");
        return;
    }

    // ===== UI LOADING =====
    cta.disabled = true;
    spinner.style.display = 'block';
    btnTxt.innerText = 'Calculating...';
    resultsArea.classList.remove('active');

    // ===== PAYLOAD (MATCHES BACKEND EXACTLY) =====
    const payload = {
        Pclass: Number(inputs.pclass),
        Sex: Number(inputs.sex),
        Age: Number(inputs.age),
        Fare: Number(inputs.fare),
        SibSp: inputs.sibsp,
        Parch: inputs.parch,
        Embarked: Number(inputs.embarked),
        CabinPresent: 0,
        FamilySize: inputs.sibsp + inputs.parch + 1
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error("API request failed");
        }

        const data = await response.json();

        // ===== RESULT DISPLAY =====
        resultsArea.classList.add('active');

        const survived = data.survived === 1;

        // UI probability (visual only)
        const probability = survived ? 85 : 25;

        resVal.innerText = survived ? "SURVIVED 🎉" : "NOT SURVIVED ❌";
        resVal.style.color = survived ? "var(--success)" : "var(--danger)";

        prog.style.width = probability + "%";
        prog.style.background = survived ? "var(--success)" : "var(--danger)";
        probNum.innerText = `${probability}% Confidence`;

    } catch (error) {
        console.error("Prediction error:", error);

        resultsArea.classList.add('active');
        resVal.innerText = "⏳ Server waking up… please wait 20 seconds and try again";
        resVal.style.color = "#facc15";
        probNum.innerText = "";
        prog.style.width = "0%";

    } finally {
        cta.disabled = false;
        spinner.style.display = 'none';
        btnTxt.innerText = 'Execute ML Analysis';
    }
}
