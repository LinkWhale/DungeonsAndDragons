fetch("https://api.open5e.com/v1/classes/")
.then((res) => res.json())
.then((data) => classes(data))


function classes(data) {

    console.log(data);
    //go through every class
    for(let i = 0; i < data.results.length; i++){
    //add html structure for each class in the array
    document.getElementById("classes").innerHTML += `
    <details id="${data.results[i].name}1" class="layer1">
    <summary>${data.results[i].name}</summary>
    <details class="description">
        <summary>Hit Points</summary>
        <div class="content">
            <strong>Hit Dice: </strong> ${format_string(data.results[i].hit_dice)}
            <strong>Hit Points at 1st Level: </strong> ${format_string(data.results[i].hp_at_1st_level)}
            <strong>Hit Points at Higher Levels: </strong> ${format_string(data.results[i].hp_at_higher_levels)}
        </div>
        </details>
        <details class="description">
            <summary>Proficiencies</summary>
            <div class="content">
            <strong>Armor: </strong> ${format_string(data.results[i].prof_armor)}
            <strong>Saving throws: </strong> ${format_string(data.results[i].prof_saving_throws)}
            <strong>Skills: </strong> ${format_string(data.results[i].prof_skills)}
            <strong>Tools: </strong> ${format_string(data.results[i].prof_tools)}
            <strong>Weapons: </strong> ${format_string(data.results[i].prof_weapons)}
            </div>
        </details>
        <details class="description">
            <summary>Equipment</summary>
            <div class="content">
            ${format_string(data.results[i].equipment)}
            </div>
        </details>
        <details class="description">
            <summary>Description</summary>
            <div class="content">
            ${format_string(data.results[i].desc)}
            </div>
        </details>
        <details class="description">
            <summary>${data.results[i].subtypes_name}</summary>
            <div class="content" id="archetypes${i}">
            </div>
        </details>
        <details class="description">
            <summary>Table</summary>
            <div><h1>${data.results[i].name} Level Table</h1>${makeTable(data.results[i].table)}</div>
        </details>
    </details>`;
        for(let c = 0; c < data.results[i].archetypes.length; c++){
            document.getElementById(`archetypes${i}`).innerHTML += `
            <details class="archetypes ${data.results[i].name}">
                <summary>${data.results[i].archetypes[c].name}</summary>
                <br>
                <div class="content">
                ${format_string(data.results[i].archetypes[c].desc)}<br>
                </div>
            </details>
            `
        }
    }
}

function format_string(text) {
    //split a string at each new line
    let array = text.split("\n");
    let result = "";

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
            array[i] = array[i].replace("**", `<strong>`); //first **
            array[i] = array[i].replace("**", `</strong>`);} //second **
            

            //Lists made from *
            while(array[i].includes("*") && array[i].indexOf(" ") == 1) {
                array[i] = `<li>${array[i].replace("*", "")}</li>`;
            }
            //checking for singular * bold must be second or else the list wont work
            while(array[i].includes("*")) {
                array[i] = array[i].replace("*", `<strong>`); //first **
                array[i] = array[i].replace("*", `</strong>`); //second **
            }


            //format into a header
            while(array[i].includes("#")){ 
                let size = array[i].lastIndexOf("#") + 1;
                array[i] = `<h${size}>${array[i].replaceAll("#", "")}</h${size}>`;
            }

            if(array[i].includes("|")) {
                result += `<table class="table">`
                let long = 1;
                for(let r = 0; r < long; r++) {
                    let row = array[i + r].split("|");
                    row.pop();
                    row.shift();
                    result += `<tr>`
                    for(let d = 0; d < row.length; d++){
                        if(r == 0){
                            result += `<th class="table-dark">${row[d].trim()}</th>`;
                        }
                        else if(r != 1) {
                            if(d == 0){
                                result += `<th class="table-dark">${row[d].trim()}</th>`;
                            }
                            else {
                            result += `<td class="table-dark">${row[d].trim()}</td>`;// make td out of everything on one line
                            }
                        }
                    }
                    result += `</tr>`
                    if(array[i + long] == "" || array[i + long] == " " || array[i + long].includes("|")){
                        long++;
                    }
                }
                result += `</table><br><br>`;
                i += long - 1;
            }

            //Make div out of sentences starting with >
            if(array[i].indexOf(">") == 0)
            {
                //check for beggining of div
                if(array[i + 1] != null){
                    if(array[i + 1].indexOf(">") == 0 && div_counter == 0) {
                        result += `<div class="arrowList">${array[i].replace(">", "")}`;
                        div_counter ++;
                    }
                    //check for div elements
                    else if(array[i + 1].indexOf(">") == 0 && div_counter > 0) {
                        result += `<p>${array[i].replace(">", "")}</p>`;
                        div_counter ++;
                    }
                    //check for end of div
                    else if(array[i + 1].indexOf(">") != 0 && div_counter > 0) {
                        result += `<p>${array[i].replace(">", "")}</p></div>`;
                        div_counter = 0;
                    }
                }
                else {
                    result += `<div class="arrowList">${array[i].replace(">", "")}</div><br>`;
                }
            } 
             //format into text
            else 
            { 
                result += `<p>${array[i]}</p>`;
            }
        }
        else 
        {
            result += "<br>"
        }
    }
    return result;
}

function makeTable(content) {
    let array = content.split("\n");
    let result = `<table class="table table-bordered">`;
        for(let i = 0; i < array.length; i++) 
        {
                let sentence = array[i].split("|");//seperate table items
                sentence.pop();
                sentence.shift();
                result += "<tr>"; //start table row
                for(let element = 0; element < sentence.length; element++)
                    { 
                        if(i == 0){
                            result += `<th class="table-dark">${sentence[element].trim()}</th>`;
                        }
                        else if(i != 1) {
                            if(element == 0){
                                result += `<th class="table-dark">${sentence[element].trim()}</th>`;
                            }
                            else {
                            result += `<td class="table-dark">${sentence[element].trim()}</td>`;// make td out of everything on one line
                            }
                        }
                    }
                    result += "</tr>"; //end table row
        }
    return result;
}

/*

IGNORE, STUFF FOR EXPANDING PROJECT LATER

function roll_dice(multiplier, die) {
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