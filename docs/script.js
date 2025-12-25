async function processPrediction() {

    const cta = document.getElementById('cta');
    const spinner = document.getElementById('spinner');
    const btnTxt = document.getElementById('btn-txt');

    const payload = {
        Age: +document.getElementById('age').value,
        Sex: +document.getElementById('sex').value,
        Pclass: +document.getElementById('pclass').value,
        Fare: +document.getElementById('fare').value,
        SibSp: +document.getElementById('sibsp').value,
        Parch: +document.getElementById('parch').value,
        Embarked: +document.getElementById('embarked').value,
        CabinPresent: +document.getElementById('cabin').value
    };

    spinner.style.display = 'block';
    btnTxt.innerText = 'Calculating...';

    const res = await fetch(
        "https://titanic-placement-project.onrender.com/predict",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        }
    );

    const data = await res.json();

    document.getElementById('res-val').innerText = data.result;
    document.getElementById('prob-num').innerText = data.probability + "%";

    spinner.style.display = 'none';
    btnTxt.innerText = 'Execute ML Analysis';
}
