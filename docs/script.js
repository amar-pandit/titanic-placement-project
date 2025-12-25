function predict() {

    document.getElementById("loader").classList.remove("hidden");
    document.getElementById("result").innerText = "Predicting...";
    document.getElementById("prob-fill").style.width = "0%";
    document.getElementById("prob-text").innerText = "";

    const sibsp = parseInt(document.getElementById("sibsp").value || 0);
    const parch = parseInt(document.getElementById("parch").value || 0);

    const data = {
        Pclass: parseInt(document.getElementById("pclass").value),
        Sex: parseInt(document.getElementById("sex").value),
        Age: parseFloat(document.getElementById("age").value),
        Fare: parseFloat(document.getElementById("fare").value),
        SibSp: sibsp,
        Parch: parch,
        Embarked: parseInt(document.getElementById("embarked").value),
        CabinPresent: parseInt(document.getElementById("cabin").value),
        FamilySize: sibsp + parch + 1
    };

    fetch("https://titanic-placement-project.onrender.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(result => {
        document.getElementById("loader").classList.add("hidden");
        document.getElementById("result").innerText = result.result;

        if (result.probability !== undefined) {
            document.getElementById("prob-fill").style.width =
                result.probability + "%";
            document.getElementById("prob-text").innerText =
                "Survival Probability: " + result.probability + "%";
        }
    })
    .catch(() => {
        document.getElementById("loader").classList.add("hidden");
        document.getElementById("result").innerText = "❌ API Error";
    });
}
