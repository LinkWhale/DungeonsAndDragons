

fetch("https://api.open5e.com")
.then((res) => res.json())
.then((data) => console.log(data));


fetch("https://api.open5e.com/v1/classes/")
.then((res) => res.json())
.then((data) => classes(data))


function classes(data) {
    console.log(data);
    for(let i = 0; i < data.results.length; i++){
    document.getElementById("classes").innerHTML += `
    <details>
        <summary>${data.results[i].name}</summary>
        <textarea id="description" rows="30" cols="170">${data.results[i].desc}</textarea>
    </details>`
    }
}



/*function roll_dice(multiplier, die) {
    let result = 0;
    for(let i = 0; i < multiplier; i++){
    result = Math.floor(Math.random() * die) + 1;
    }
    return result;
}

function roll_abilityScore() {
    let numbers = [];
    for(let i = 0; i < 4; i++) {
        numbers.push(roll_dice(1, 6));
    }
    numbers.sort();
    numbers.shift();
    let result = 0;
    for(let i = 0; i < numbers.length; i++) {
        result =+ numbers[i];
    }
    return result;
}

roll_abilityScore();*/