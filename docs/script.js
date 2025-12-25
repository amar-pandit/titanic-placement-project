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

    fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(result => {
        document.getElementById("result").innerText = result.result;
    })
    .catch(err => {
        document.getElementById("result").innerText = "❌ API Error";
        console.error(err);
    });
}
