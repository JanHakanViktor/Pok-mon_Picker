// kör main-funktionen när DOM är laddad
window.addEventListener("DOMContentLoaded", main);

// Hänvisar till karaktärerna, samt beskrivningen ovanför. 
const toggleAsh = document.querySelector("#ash img");
const toggleGary = document.querySelector("#gary img");
const description = document.querySelector("#description");
const storedCharacter = localStorage.getItem("selectedCharacter");

//Kör alla huvudfunktioner
function main() {
    characterSelection();
    nextPage();
}



function characterSelection() {

//Lägger till style "selected" om man klickar på Ash, samt ändrar beskrivningen till att du valt Ash. Klickar du igen, tas "selected" bort och du återgår till standard-läget där ingen är vald. 

    toggleAsh.onclick = function(){
        const name = "Ash Ketchum";
        toggleAsh.classList.toggle("selected");
        toggleGary.classList.remove("selected");
        if(toggleAsh.classList.contains("selected")){
            description.innerHTML = "Du har valt " + name + ", dags att påbörja din resa!";
            localStorage.setItem("selectedCharacter", "Ash Ketchum");
        } else{
            description.innerHTML = "Välj din karaktär och påbörja din resa!";
            localStorage.removeItem("selectedCharacter");
        }
    }


//Lägger till style "selected" om man klickar på Gary, samt ändrar beskrivningen till att du valt Gary. Klickar du igen, tas "selected" bort och du återgår till standard-läget där ingen är vald.

    toggleGary.onclick = function(){
        const name = "Gary Oak";
        toggleGary.classList.toggle("selected");
        toggleAsh.classList.remove("selected");
        if(toggleGary.classList.contains("selected")){
            description.innerHTML = "Du har valt " + name + ", dags att påbörja din resa!";
            localStorage.setItem("selectedCharacter", "Gary Oak");
        } else{
            description.innerHTML = "Välj din karaktär och påbörja din resa!";
            localStorage.removeItem("selectedCharacter");
        }
    }


    //If statement - om du har valt Ash lägg till i local storage, om du valt Gary, ta bort ash från local storage och lägg till Gary. Om ingen väljs, dvs man togglar av, ta bort valda från local storage.
    if (storedCharacter === "Ash") {
        toggleAsh.classList.add("selected");
        description.innerHTML = "Du har valt Ash Ketchum, dags att påbörja din resa!";
    } else if (storedCharacter === "Gary") {
        toggleGary.classList.add("selected");
        description.innerHTML = "Du har valt Gary Oak, dags att påbörja din resa!";
    } else {
        description.innerHTML = "Välj din karaktär och påbörja din resa!";
    }

}

/* skickar användaren vidare till äventyret, som börjar på worldPage */
function nextPage() { 
    const buttonForward = document.getElementById("firstForward");
    buttonForward.onclick = worldPage;
}

function worldPage(){
    characterContainer.classList.add("hidden");
    firstForward.classList.add("hidden");

    description.textContent = "Du har nu gått ur huset och ser dig omkring. Du har tidigare hört att man kan bli tilldelad en Pokémon i Dr Oaks laboratorium."

    const gameSceneOne = document.createElement("img");
    gameSceneOne.className = "world";
    gameSceneOne.src = "/assets/worldImage.png";

    const buttonBack = document.createElement("button"); // skapar knapp
    buttonBack.textContent = "Tillbaka";
    buttonBack.className = "back"; // lägger till klassnamn "back"

    buttonBack.onclick = function(){
        characterContainer.classList.remove("hidden");
        firstForward.classList.remove("hidden");
        gameSceneOne.remove();
        buttonToHouse.remove();
        buttonBack.remove();
        buttonToLab.remove();
        options.remove();
    }

    const options = document.createElement("div");
    options.className = "buttonMenu";

    const buttonToLab = document.createElement("button");
    buttonToLab.className = "navigateToLab";
    buttonToLab.textContent = "Gå till labbet";

    const buttonToHouse = document.createElement("button");
    buttonToHouse.className = "navigateToHouse";
    buttonToHouse.textContent = "Gå hem";
    
    sceneContainer.append(gameSceneOne);

    options.append(buttonToHouse, buttonToLab);

    buttonContainer.append(
        options,
        buttonBack,
    );

 /* anlendingen till att img kommer längst ned är för att img skapas i gameContainer och där ligger
 buttonContainer först. -> lösningne är att göra buttonContainer med createElement istälet för html
 så att den prioriteras rätt */

}


/* Gömmer characterContainer och skapar nya alternativ för användaren som tar en vidare i spelet */
function elementPage() {
    characterContainer.classList.add("hidden");

    const description = document.createElement("p");
    description.textContent = "Välj ditt favoritelement!";
    description.className = "secondDescription"

    const buttonOptionOne = document.createElement("button");
    buttonOptionOne.textContent = "FIRE ️‍🔥";

    const buttonOptionTwo = document.createElement("button");
    buttonOptionTwo.textContent = "WATER 💧"

    const buttonOptionThree = document.createElement("button");
    buttonOptionThree.textContent = "GRASS 🍃"

    const buttonBack = document.createElement("button") // skapar knapp
    buttonBack.textContent = "Tillbaka";
    buttonBack.className = "back"; // lägger till klassnamn "back"



/* om användaren går tillbaka, måste vi ta bort uppskapade knappar */
    buttonBack.onclick = function(){
        characterContainer.classList.remove("hidden");
        buttonBack.remove();
        buttonOptionOne.remove();
        buttonOptionTwo.remove();
        description.remove();
        buttonOptionThree.remove();
    }

    gameContainer.append(
        description,
        buttonOptionOne, 
        buttonOptionTwo, 
        buttonOptionThree, 
        buttonBack); // skickar in information som skapas i javascript
}
//