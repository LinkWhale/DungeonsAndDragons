

fetch("https://api.open5e.com")
.then((res) => res.json())
.then((data) => console.log(data));


fetch("https://api.open5e.com/v1/classes/")
.then((res) => res.json())
.then((data) => classes(data))


function classes(data) {
    console.log(data);
    //go through every class
    for(let i = 0; i < data.results.length; i++){
    //add html structure for each class in the array
    document.getElementById("classes").innerHTML += `
    <details class="layer1">
        <summary>${data.results[i].name}</summary>
        <details class="layer2">
            <summary>Description</summary>
                <div class="description">${format_string(data.results[i].desc)}</div>
            </details>
    </details>`;
    }
}

function format_string(text) {
    //split a string at each new line
    let array = text.split("\n");
    let result = "";

    let bold_open = false
    let div_counter = 0;
    //format every new line
    for(let i = 0; i < array.length; i++) {

        if(array[i] !== " ") { //ignore whitespaces
            array[i] = array[i].trim();

            //BOLD ITALIC TEXT
            array[i] = array[i].replaceAll("**_", "<strong style=\"font-style: italic;\">");
            array[i] = array[i].replaceAll("_**", "</strong>");

            //changes ** into bold text
            while(array[i].includes("**")) {
            array[i] = array[i].replace("**", `<strong>`);
            array[i] = array[i].replace("**", `</strong>`);}
            
            //Lists made from *
            if(array[i].includes("*") && array[i].indexOf(" ") == 1) {
                result += `<li>${array[i].replace("*", "")}</li>`;
            }

            //format into a header
            else if(array[i].includes("#")){ 
                let size = array[i].lastIndexOf("#") + 1;
                result += `<h${size}>${array[i].replaceAll("#", "")}</h${size}>`;
            }

            //Make div out of sentences starting with >
            else if(array[i].indexOf(">") == 0){
                if(array[i + 1].indexOf(">") == 0 && div_counter == 0) {
                    result += `<div class="arrowList">${array[i].replace(">", "")}`;
                    div_counter ++;
                }
                else if(array[i + 1].indexOf(">") == 0 && div_counter > 0) {
                    result += `<p>${array[i].replace(">", "")}</p>`;
                    div_counter ++;
                }
                else if(array[i + 1].indexOf(">") != 0 && div_counter > 0) {
                    result += `<p>${array[i].replace(">", "")}</p></div>`;
                    div_counter = 0;
                }
            }

            //format into text
            else { 
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