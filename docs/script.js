async function processPrediction() {

    const spinner = document.getElementById("spinner");
    const btnTxt = document.getElementById("btn-txt");
    const results = document.getElementById("results-area");

    const payload = {
        Pclass: +document.getElementById("pclass").value,
        Sex: +document.getElementById("sex").value,
        Age: +document.getElementById("age").value,
        Fare: +document.getElementById("fare").value
    };

    spinner.style.display = "block";
    btnTxt.innerText = "Calculating...";
    results.style.display = "none";

    try {
        const res = await fetch("https://titanic-placement-project.onrender.com/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const data = await res.json();
        results.style.display = "block";

        document.getElementById("res-val").innerText = data.result;
        document.getElementById("prob-num").innerText = data.probability + "%";

        document.getElementById("progress-bar").style.width =
            data.probability + "%";

    } catch {
        alert("API Error");
    }

    spinner.style.display = "none";
    btnTxt.innerText = "Execute ML Analysis";
}
