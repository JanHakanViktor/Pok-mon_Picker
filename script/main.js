/**
 * Huvudfunktion för att initiera karaktärsval och navigering.
 * @listens window:DOMContentLoaded
 */
window.addEventListener("DOMContentLoaded", main);

/**
 *  Inställningar för bakgrundsmusik
 */
const backgroundMusic = new Audio("assets/backgroundmusic.mp3"); 
backgroundMusic.loop = true; 
backgroundMusic.volume = 0.05;
backgroundMusic.autoplay = true;


/** @type {HTMLImageElement} Element för att välja Ash */
const toggleAsh = document.querySelector("#ash img");

/** @type {HTMLImageElement} Element för att välja Gary */
const toggleGary = document.querySelector("#gary img");

/** @type {HTMLButtonElement} Knapp för att återställa local storage och gå tillbaka till startsidan */
const returnButton = document.getElementById("return");


/**
 * Detaljer om en Pokémon-karaktär.
 * @typedef {Object} Pokemon
 * @property {string} name - Pokémonens namn.
 * @property {string} element - Pokémonens elementtyp.
 * @property {string} animal - Pokémonens inspiration från djurvärlden.
 * @property {string} color - Pokémonens huvudsakliga färg.
 * @property {string} image - Bildens filväg för Pokémonen.
 */

const charmander = {
    name: "Charmander",
    element: "FIRE 🔥",
    animal: "Dragon",
    color: "Red",
    image: "/assets/charmander.png"
};

const squirtle = {
    name: "Squirtle",
    element: "WATER 💧",
    animal: "Turtle",
    color: "Blue",
    image: "/assets/squirtle.png"
};

const bulbasaur = {
    name: "Bulbasaur",
    element: "GRASS 🍃",
    animal: "Dinosaur",
    color: "Green",
    image: "/assets/bulbasaur.png"
};

const pikachu = {
    name: "Pikachu",
    element: "Electric",
    animal: "Mouse",
    color: "Yellow",
    image: "/assets/pikachu.png"
};


/**
 * Återställer den senast sparade sidan från local storage.
 */
function restoreSavedPage(){
    const savedPage = localStorage.getItem("savedPage");
    if (savedPage != null){
        hideElements([characterContainer, firstForward, description]);
    }
    switch(savedPage) {
        case "housePage":   
            housePage();
            break;
        case "worldPage":
            worldPage();
            break;
        case "labPage":
            labPage();
            break;
        case "elementPage":
            elementPage();
            break;
        case "animalPage":
            animalPage();
            break;
        case "colorPage":
            colorPage();
            break;
        case "selectedPokemonPage":
            selectedPokemonPage();
            break;
    }
}

/**
 * Startfunktion som kör characterSelection, nextPage samt restoreSavedPage.
 */
function main() {
    characterSelection();
    nextPage();
    restoreSavedPage();
}

/**
 * funktion som gör att man kan växla mellan karaktärer.
 * @param {string} name - Namnet på den valda karaktären.
 * @param {HTMLElement} elementToSelect - Element för den karaktär som ska väljas.
 * @param {HTMLElement} elementToRemove - Element för den andra karaktären som ska avmarkeras.
 */
function onCharacterToggle(name, elementToSelect, elementToRemove){
    elementToSelect.classList.toggle("selected");
    elementToRemove.classList.remove("selected");
    
    if(elementToSelect.classList.contains("selected")){
        description.innerHTML = "Du har valt " + name + ", dags att påbörja din resa!";
        localStorage.setItem("selectedCharacter", name);
    } else {
        description.innerHTML = "Välj din karaktär och påbörja din resa!";
        localStorage.removeItem("selectedCharacter");
    }
    
}


/**
 * Funktion som startar interaktionen för karaktärsval.
 */
function characterSelection() {
    hideElements([returnButton]);

    toggleAsh.onclick = function(){
        onCharacterToggle("Ash Ketchum", toggleAsh, toggleGary);
    }

    toggleGary.onclick = function(){
        onCharacterToggle("Gary Oak", toggleGary, toggleAsh);
    }
}

/**
 * Knapp som tar en vidare till housePage.
 */
function nextPage() { 
    const buttonForward = document.getElementById("firstForward");
    buttonForward.onclick = housePage;
}

/**
 * Funktion som används för att dölja element.
 * @param {HTMLElement[]} elements - De element som ska döljas.
 */
function hideElements(elements){
    elements.forEach(element => {
        element.classList.add("hidden");
    });
}


/**
 * Funktion som används för att visa element som är dolda.
 * @param {HTMLElement[]} elements - De element som ska visas.
 */
function showElements(elements){
    elements.forEach(element => {
        element.classList.remove("hidden");
    });
}

/**
 * För samtliga sidor; housePage, worldPage och labPage:
 * Visar returnButton så att användaren kan starta om spelet.
 * Rensar innehållet på respektive sida i syfte för att uppdatera med nytt innehåll.
 * Visar nästkommande sida med tillbehörande beskrivning, bild och navigeringsalternativ.
 * Uppdaterar local storage med savedPage till respektive sida om spelet avbryts under spelets gång.
 */
function housePage(){
    localStorage.setItem("savedPage", "housePage");
    hideElements([characterContainer, firstForward, description]);
    const name = localStorage.getItem("selectedCharacter");


    const houseDescription = document.createElement("p");
    houseDescription.classList = ("description")
    houseDescription.textContent = "God morgon " + name + ", du har precis haft frukost med din kära mor. Det är nu dags att ta sig an utmaningarna ute i världen."

    const gameSceneOne = document.createElement("img");
    gameSceneOne.className = "videoStyling";
    gameSceneOne.src = "/assets/houseRoom.png";

    const buttonBack = document.createElement("button"); 
    buttonBack.textContent = "Tillbaka";
    buttonBack.className = "back"; 

    buttonBack.onclick = function(){
        showElements([characterContainer, firstForward, description]);
        gameSceneOne.remove();
        buttonToWorld.remove();
        buttonBack.remove();
        options.remove();
        houseDescription.remove();
        hideElements([returnButton]);
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
    showElements([returnButton]);
    localStorage.setItem("savedPage", "worldPage");
    sceneContainer.innerHTML = ""
    buttonContainer.innerHTML = ""

    const worldDescription = document.createElement("p");
    worldDescription.classList = ("description");
    worldDescription.textContent = "Du har nu gått ur huset och ser dig omkring. Du har tidigare hört att man kan bli tilldelad en Pokémon i Professor Oaks laboratorium.";

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
    showElements([returnButton]);
    localStorage.setItem("savedPage", "labPage");
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
    buttonToTest.onclick = () => {
        elementPage();
        hideElements([buttonToTest, gameSceneThree, labDescription]);
    };
    
    sceneContainer.append(labDescription, gameSceneThree, buttonToTest);

}

/**
 * Funktionen gör det möjligt att generera en fråga och presenterar den i form av knappar. När användaren gör ett val:
 * - Anropas en callback-funktion med det valda alternativet.
 * - Frågan och dess alternativ tas bort från sidan.
 * 
 * @param {string} questionDescription - visar beskrivningen av frågan.
 * @param {string[]} options - Skapar en array med valmöjligheter baseat på vilken sida som användaren kommer infinna sig på.
 * @param {Function} callback - Callbackfunktion för att hantera vad som händer när ett val av användaren gjorts.
 * 
 * 
 * @example
 * createQuestion(
 *   "Vilket är ditt favoritelement?",
 *   ["FIRE 🔥", "WATER 💧", "GRASS 🍃"],
 *   (selectedOption) => {
 *     console.log("Du valde: " + selectedOption);
 *   }
 * );
 */
function createQuestion(questionDescription, options, callback){
    // Skapar ett element för frågan och sätter dess text.
    const pokemonDescription = document.createElement("p");
    pokemonDescription.textContent = questionDescription;
    pokemonDescription.className = "description";

    // Lägger till frågan i sceneContainer så att den syns.
    sceneContainer.appendChild(pokemonDescription);

    // skapar en lista som gör det möjligt att hålla alla skapade alternativknappar.
    const optionButtons = []

    // Skapar knappar för varje alternativ och lägger till dem i scenen.
    options.forEach(option => {
        const pokemonButton = document.createElement("button");
        pokemonButton.className = "continueSelectionButton";
        pokemonButton.textContent = option;
        optionButtons.push(pokemonButton)
        pokemonButton.onclick = () => {
            callback(option);
            pokemonDescription.remove();
            optionButtons.forEach(optionButton => {
                optionButton.remove();
            });
        };
        sceneContainer.appendChild(pokemonButton);
    });
}


/**
 * Navigerar till "element-sidan" och låter användaren välja sitt favoritelement (Fire, water, grass).
 * Funktionen visar returnButton, sparar den nuvarande sidan i local storage
 * och skapar en fråga med tillgängliga element som val. När användaren gör sitt val,
 * sparas valet i local storage under nyckeln `selectedElement`.
 * Efter valt alternativ, navigeras användaren vidare till nästa fråga, "animalPage".
 */
function elementPage(){
    showElements([returnButton]);
    localStorage.setItem("savedPage", "elementPage");
    createQuestion(
        "Välj ditt favoritelement!",
        [charmander.element, squirtle.element, bulbasaur.element],
        (element) => {
            localStorage.setItem("selectedElement", element);
            animalPage();
        }
    );
}

/**
 * Animalpage gör exakt samma som elementPage men navigerar användaren vidare till colorPage
 * efter valt alternativ.
 */
function animalPage(){
    showElements([returnButton]);
    localStorage.setItem("savedPage", "animalPage");
    createQuestion(
        "Vilket är ditt favoritdjur?",
        [charmander.animal, squirtle.animal, bulbasaur.animal], 
        (animal) => {
            localStorage.setItem("selectedAnimal", animal);
            colorPage();
        }
    );
}

/**
 * colorPage gör exakt samma som elementPage men navigerar användaren vidare till selectedPokemonPage
 * efter valt alternativ.
 */
function colorPage(){
    showElements([returnButton]);
    localStorage.setItem("savedPage", "colorPage");
    createQuestion(
        "Vad är din favoritfärg?", 
        [charmander.color, squirtle.color, bulbasaur.color], 
        (color) => {
            localStorage.setItem("selectedColor", color);
            selectedPokemonPage();
        }
    );
}


/**
 * Visar sidan för vald Pokémon.
 * 
 * Funktionen identifierar den Pokémon som bäst matchar användarens förvalda dvs, element, animal och color.
 * Om ingen Pokémon matchar, tilldelas Pikachu som default.
 * 
 * På sidan:
 * - Visas Pokémon-bilden, en text som anger vilken karaktär användaren valde på startsidan samt
 *   vilken Pokémon som tilldelades.
 * - Sidan visar även tillbaka-knappen för att starta om spelet.
 */
function selectedPokemonPage(){
    showElements([returnButton]);
    localStorage.setItem("savedPage", "selectedPokemonPage");

    // Standardval av Pokémon (Pikachu) om inga val matchar.
    let chosenPokemon = pikachu;

    // Jämför användarens val (element, animal, color) med varje Pokémon.
    [charmander, squirtle, bulbasaur].forEach(pokemon => {
        if(
            pokemon.element === localStorage.getItem("selectedElement") &&
            pokemon.animal === localStorage.getItem("selectedAnimal") &&
            pokemon.color === localStorage.getItem("selectedColor")
        ) { 
            chosenPokemon = pokemon; // Tilldelar den Pokémon som matchar användarens val.
        } 
    });

    // Skapar och lägger till Pokémon-bilden.
    const selectedPokemonImg = document.createElement("img");
    selectedPokemonImg.className = "videoStyling";
    selectedPokemonImg.src = chosenPokemon.image;

    // Skapar och lägger till text som beskriver tilldelade Pokémon.
    const storedCharacter = localStorage.getItem("selectedCharacter");
    const endResult = document.createElement("p");
    endResult.className = "description";
    endResult.textContent = `${storedCharacter} har blivit tilldelad ${chosenPokemon.name}!`;
    sceneContainer.append(endResult, selectedPokemonImg);
}

/**
 * Rensar sparad data från local storage och laddar om sidan när returnButton klickas på.
 */
returnButton.onclick = () => {
    localStorage.clear();
    location.reload();
}