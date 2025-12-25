async function processPrediction() {
    const cta = document.getElementById('cta');
    const spinner = document.getElementById('spinner');
    const btnTxt = document.getElementById('btn-txt');
    const resultsArea = document.getElementById('results-area');
    
    const inputs = {
        age: document.getElementById('age').value,
        fare: document.getElementById('fare').value,
        sex: document.getElementById('sex').value,
        pclass: document.getElementById('pclass').value,
        sibsp: parseInt(document.getElementById('sibsp').value || 0),
        parch: parseInt(document.getElementById('parch').value || 0),
        embarked: document.getElementById('embarked').value
    };

    if (Object.values(inputs).some(v => v === "")) {
        alert("⚠️ Please fill all data points.");
        return;
    }

    cta.disabled = true;
    spinner.style.display = 'block';
    btnTxt.innerText = 'Calculating...';
    resultsArea.classList.remove('active');

    const payload = {
        Pclass: parseInt(inputs.pclass),
        Sex: parseInt(inputs.sex),
        Age: parseFloat(inputs.age),
        Fare: parseFloat(inputs.fare),
        SibSp: inputs.sibsp,
        Parch: inputs.parch,
        Embarked: parseInt(inputs.embarked),
        FamilySize: inputs.sibsp + inputs.parch + 1
    };

    try {
        const response = await fetch("https://titanic-placement-project.onrender.com/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error();
        const data = await response.json();

        resultsArea.classList.add('active');
        const prob = parseFloat(data.probability);
        const survived = data.result.toLowerCase().includes("survived");

        const resVal = document.getElementById('res-val');
        const prog = document.getElementById('progress-bar');
        const probNum = document.getElementById('prob-num');

        resVal.innerText = survived ? "SURVIVAL LIKELY" : "SURVIVAL UNLIKELY";
        resVal.style.color = survived ? "var(--success)" : "var(--danger)";
        
        prog.style.width = prob + "%";
        prog.style.background = prob > 50 ? "var(--success)" : "var(--danger)";
        probNum.innerText = `${prob}% Probability`;

    } catch (e) {
        resultsArea.classList.add('active');
        document.getElementById('res-val').innerText = "SYSTEM ERROR";
        document.getElementById('prob-num').innerText = "API unreachable. Check your internet.";
    } finally {
        cta.disabled = false;
        spinner.style.display = 'none';
        btnTxt.innerText = 'Execute ML Analysis';
    }
}