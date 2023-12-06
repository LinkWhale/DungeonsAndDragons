

fetch("https://api.open5e.com")
.then((res) => res.json())
.then((data) => console.log(data));


fetch("https://api.open5e.com/v1/classes/")
.then((res) => res.json())
.then((data) => classes(data))


function classes(data) {
    console.log(data);
    console.log(data.results[11].desc);
    //go through every class
    for(let i = 0; i < data.results.length; i++){
    //add html structure for each class in the array
    document.getElementById("classes").innerHTML += `
    <details>
        <summary>${data.results[i].name}</summary>
        <div>${format_string(data.results[i].desc)}</div>
    </details>`;
    }
}

function format_string(text) {
    //split a string at each new line
    let array = text.split("\n");
    let result = "";
    //format every new line
    for(let i = 0; i < array.length; i++) {
        if(array[i] != " ") { //ignore whitespaces
            if(array[i].includes("#")){ //format into a header
                let size = array[i].lastIndexOf("#") + 1;
                result += `<h${size}>${array[i].replaceAll("#", "")}</h${size}>`;
            }
            else { //format into text
                result += `<p>${array[i]}</p>`;
            }
        }
    }
    return result;
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