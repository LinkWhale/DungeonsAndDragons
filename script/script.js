

fetch("https://api.open5e.com")
.then((res) => res.json())
.then((data) => console.log(data));


fetch("https://api.open5e.com/v1/classes/")
.then((res) => res.json())
.then((data) => classes(data))


function classes(data) {
    console.log(`"Those who fall from the loftiest heights may reach the darkest depths. A paladin who breaks their oath and turns their back on redemption may instead pledge themselves to a dark power or cause. Sometimes known as antipaladins, such betrayers may gain abilities in a mockery of their former goodness, spreading evil where once they fought for the cause of right.\n\nAt 3rd level or higher, a paladin of evil alignment may become an Oathless Betrayer. Unlike other oaths, paladins who take this path can do so in spite of having taken a previous oath, and the features of this subclass replace those of their former Sacred Oath.\n\nNote: this subclass is primarily for NPCs, but a player can choose it at their DM’s discretion.\n\n##### Tenets of the Betrayer\n\nBy their very nature, Oathless Betrayers do not share any common ideals, but may hold to one of the following tenets.\n\n**_Twisted Honor._** You still cling to your former oath, but distorted to serve your new purpose. For instance, you may still demand a fair fight against a worthy adversary, but show only contempt to those you deem weak.\n\n**_Utter Depravity._** You follow some part of your former oath to the opposite extreme. If you were once honest to a fault, you might now tell lies for the simple pleasure of causing others pain.\n\n**_Misguided Revenge._** You blame your fall not on your own failings but on the actions of another, possibly one who remained righteous where you wavered. Your all-consuming hate clouds your reason, and you’ve dedicated yourself to revenge at any cost for imagined wrongs.\n\n##### Oath Spells\n\nYou gain oath spells at the paladin levels listed.\n\n| Level | Paladin Spells                 |\n|-------|--------------------------------|\n| 3rd   | hellish rebuke, inflict wounds |\n| 5th   | crown of madness, darkness     |\n| 9th   | animate dead, bestow curse     |\n| 13th  | blight, confusion              |\n| 17th  | contagion, dominate person     |\n\n##### Channel Divinity\n\nAs an Oathless Betrayer paladin of 3rd level or higher, you gain the following two Channel Divinity options.\n\n**_Command the Undead._** As an action, you may target one undead creature within 30 feet that you can see. If the target creature fails a Wisdom saving throw against your spellcasting DC, it is compelled to obey you for the next 24 hours. The effect ends on the target creature if you use this ability on a different target, and you cannot use this ability on an undead creature if its challenge rating exceeds or is equal to your paladin class level.\n\n**_Frightful Bearing._** As an action, you take on a menacing aspect to terrify your enemies. You target any number of creatures within 30 feet that can see you to make a Wisdom saving throw. Each target that fails its save becomes frightened of you. The creature remains frightened for 1 minute, but it may make a new Wisdom saving throw to end the effect if it is more than 30 feet away from you at the end of its turn.\n\n##### Aura of Loathing\n\nStarting at 7th level, you add your Charisma modifier to damage rolls from melee weapons (with a minimum bonus of +1). Creatures of the fiend or undead type within 10 feet of you also gain this bonus, but the bonus does not stack with the same bonus from another paladin.\n\nAt 18th level, the range of this aura increases to 30 feet.\n\n##### Unearthly Barrier\n\nBeginning at 15th level, you receive resistance to nonmagical bludgeoning, piercing, and slashing damage.\n\n##### Master of Doom\n\nAt 20th level, as an action, you can cloak yourself and any allied creatures of your choice within 30-feet in an aura of darkness. For 1 minute, bright light in this radius becomes dim light, and any creatures that use primarily sight suffer disadvantage on attack rolls against you and the others cloaked by you.\n\nIf an enemy that starts its turn in the aura is frightened of you, it suffers 4d10 psychic damage. You may also use a bonus action to lash out with malicious energy against one creature on your turn during the duration of the aura. If you succeed on a melee spell attack against the target, you deal 3d10 + your Charisma modifier in necrotic damage.\n\nOnce you use this feature, you can't use it again until you finish a long rest."`)
    console.log(data);
    //go through every class
    for(let i = 0; i < data.results.length; i++){
    //add html structure for each class in the array
    document.getElementById("classes").innerHTML += `
    <details id="${data.results[i].name}1" class="layer1">
    <summary>${data.results[i].name}</summary>
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
            console.log(data.results[i].archetypes[c].name);
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