// kör main-funktionen när DOM är laddad
window.addEventListener("DOMContentLoaded", main);

// Hänvisar till karaktärerna, samt beskrivningen ovanför. 
const toggleAsh = document.querySelector("#ash img");
const toggleGary = document.querySelector("#gary img");
const description = document.querySelector("#description");
const storedCharacter = localStorage.getItem("selectedCharacter");

const listOfPokemons = ["Charmander", "Squirtle", "Bulbasaur"];

const charmander = {
    typeOfElement: "Fire",
    typeOfAnimal: "Dragon",
}
const squirtle = {
    typeOfElement: "Water",
    typeOfAnimal: "Turtle",
}
const bulbasaur = {
    typeOfElement: "Grass",
    typeOfAnimal: "Dinosaur",
}



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
    buttonForward.onclick = housePage;
}

function housePage(){
    characterContainer.classList.add("hidden");
    firstForward.classList.add("hidden");
    description.classList.add("hidden");
    const name = localStorage.getItem("selectedCharacter");

    const houseDescription = document.createElement("p");
    houseDescription.classList = ("description")
    houseDescription.textContent = "God morgon " + name + ", du har precis haft frukost med din kära mor. Det är nu dags att ta sig an utmaningarna ute i världen."

    const gameSceneOne = document.createElement("img");
    gameSceneOne.className = "videoStyling";
    gameSceneOne.src = "/assets/houseRoom.png";

    const buttonBack = document.createElement("button"); // skapar knapp
    buttonBack.textContent = "Tillbaka";
    buttonBack.className = "back"; // lägger till klassnamn "back"

    buttonBack.onclick = function(){
        characterContainer.classList.remove("hidden");
        firstForward.classList.remove("hidden");
        description.classList.remove("hidden");
        gameSceneOne.remove();
        buttonToWorld.remove();
        buttonBack.remove();
        options.remove();
        houseDescription.remove();
    }

    const options = document.createElement("div");
    options.className = "buttonMenu";

    const buttonToWorld = document.createElement("button");
    buttonToWorld.className = "navigateToWorld";
    buttonToWorld.textContent = "Gå ut i världen";
    buttonToWorld.onclick = worldPage;

    sceneContainer.append(houseDescription, gameSceneOne);

    options.append(buttonToWorld);

    buttonContainer.append(
        buttonBack,
        options,
    );
}

function worldPage(){
    sceneContainer.innerHTML = ""
    buttonContainer.innerHTML = ""

    const worldDescription = document.createElement("p");
    worldDescription.classList = ("description");
    worldDescription.textContent = "Du har nu gått ur huset och ser dig omkring. Du har tidigare hört att man kan bli tilldelad en Pokémon i Dr Oaks laboratorium.";

    const gameSceneTwo = document.createElement("img");
    gameSceneTwo.className = "videoStyling";
    gameSceneTwo.src = "/assets/worldImage.png";

    const buttonToLab = document.createElement("button");
    buttonToLab.className = "navigateToLab";
    buttonToLab.textContent = "Gå till labbet";
    buttonToLab.onclick = labPage;
    
    sceneContainer.append(worldDescription, gameSceneTwo);

    buttonContainer.append(buttonToLab)
}

function labPage(){
    sceneContainer.innerHTML = ""
    buttonContainer.remove();

    const labDescription = document.createElement("p");
    labDescription.classList = ("description");
    labDescription.textContent = "Du pratar med Professor Oak och han säger att du måste genomföra ett test med 3 frågor. Gå vidare till testet!"

    const gameSceneThree = document.createElement("img");
    gameSceneThree.className = "videoStyling";
    gameSceneThree.src = "/assets/pokemonRoom.png";

    const buttonToTest = document.createElement("button");
    buttonToTest.className = "navigateToTest";
    buttonToTest.textContent = "Gå till testet";
    buttonToTest.addEventListener("click", elementPage);
    
    sceneContainer.append(labDescription, gameSceneThree, buttonToTest);

}

/* Gömmer characterContainer och skapar nya alternativ för användaren som tar en vidare i spelet */
function elementPage() {

    const description = document.createElement("p");
    description.textContent = "Välj ditt favoritelement!";
    description.className = "secondDescription"


// skapa en div och lägg alla knappar i den och style som en rad

    const buttonOptionOne = document.createElement("button");
    buttonOptionOne.textContent = "FIRE ️‍🔥";

    const buttonOptionTwo = document.createElement("button");
    buttonOptionTwo.textContent = "WATER 💧"

    const buttonOptionThree = document.createElement("button");
    buttonOptionThree.textContent = "GRASS 🍃"

    const buttonBack = document.createElement("button") // skapar knapp
    buttonBack.textContent = "Tillbaka";
    buttonBack.className = "back"; // lägger till klassnamn "back"



    // if else statement som leder till drake - sköldpadda - dinosaurie som slutligen leder till pokemon selection
    //uppdateras i sceneContainer


/* om användaren går tillbaka, måste vi ta bort uppskapade knappar */
    buttonBack.onclick = function(){
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