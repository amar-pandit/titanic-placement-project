function predict() {

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

    // Show loader
    document.getElementById("loader").classList.remove("hidden");
    document.getElementById("resultBox").classList.add("hidden");

    fetch("https://titanic-placement-project.onrender.com/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(result => {

        document.getElementById("loader").classList.add("hidden");
        document.getElementById("resultBox").classList.remove("hidden");

        document.getElementById("result").innerText = result.result;

        let percent = result.survived === 1 ? 80 : 20;
        document.getElementById("progressBar").style.width = percent + "%";

    })
    .catch(err => {
        document.getElementById("loader").classList.add("hidden");
        document.getElementById("resultBox").classList.remove("hidden");
        document.getElementById("result").innerText = "❌ API Error";
        console.error(err);
    });
}
