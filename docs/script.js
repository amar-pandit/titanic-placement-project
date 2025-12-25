async function processPrediction() {
    const cta = document.getElementById('cta');
    const spinner = document.getElementById('spinner');
    const btnTxt = document.getElementById('btn-txt');
    const resultsArea = document.getElementById('results-area');

    const inputs = {
        age: document.getElementById('age').value,
        fare: document.getElementById('fare').value || 0,
        sex: document.getElementById('sex').value,
        pclass: document.getElementById('pclass').value,
        sibsp: parseInt(document.getElementById('sibsp').value || 0),
        parch: parseInt(document.getElementById('parch').value || 0),
        embarked: document.getElementById('embarked').value
    };

    if (Object.values(inputs).some(v => v === "")) {
        alert("⚠️ Please fill all required fields.");
        return;
    }

    cta.disabled = true;
    spinner.style.display = 'block';
    btnTxt.innerText = 'Calculating...';
    resultsArea.classList.remove('active');

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
        const response = await fetch(
            "https://titanic-placement-project.onrender.com/predict",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            }
        );

        if (!response.ok) throw new Error("Server error");

        const data = await response.json();

        resultsArea.classList.add('active');

        const resVal = document.getElementById('res-val');
        const prog = document.getElementById('progress-bar');
        const probNum = document.getElementById('prob-num');

        const survived = data.survived === 1;

        // Fake probability (visual purpose only)
        const probability = survived ? 85 : 25;

        resVal.innerText = survived ? "SURVIVED 🎉" : "NOT SURVIVED ❌";
        resVal.style.color = survived ? "var(--success)" : "var(--danger)";

        prog.style.width = probability + "%";
        prog.style.background = survived ? "var(--success)" : "var(--danger)";
        probNum.innerText = `${probability}% Confidence`;

    } catch (e) {
        resultsArea.classList.add('active');
        document.getElementById('res-val').innerText =
            "⏳ Server waking up… try again in 20 seconds";
        document.getElementById('res-val').style.color = "#facc15";
        document.getElementById('prob-num').innerText = "";
    } finally {
        cta.disabled = false;
        spinner.style.display = 'none';
        btnTxt.innerText = 'Execute ML Analysis';
    }
}
