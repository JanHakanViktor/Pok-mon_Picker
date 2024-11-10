// kör main-funktionen när DOM är laddad
window.addEventListener("DOMContentLoaded", main);

const ash = document.querySelector("#ash img");
const gary = document.querySelector("#gary img");
const description = document.querySelector("#description");
const storedCharacter = localStorage.getItem("selectedCharacter");

function main() {
    toggleAsh();
    toggleGary();
    nextPage();
}

function toggleAsh() {
    
    ash.onclick = function(){
        const name = "Ash Ketchum";
        ash.classList.toggle("selected");
        gary.classList.remove("selected");
        if(ash.classList.contains("selected")){
            description.innerHTML = "Du har valt " + name + ", dags att påbörja din resa!";
            localStorage.setItem("selectedCharacter", "Ash");
        } else{
            description.innerHTML = "Välj din karaktär och påbörja din resa!";
            localStorage.removeItem("selectedCharacter");
        }
    }
}

function toggleGary() {
    
    gary.onclick = function(){
        const name = "Gary Oak";
        gary.classList.toggle("selected");
        ash.classList.remove("selected");
        if(gary.classList.contains("selected")){
            description.innerHTML = "Du har valt " + name + ", dags att påbörja din resa!";
            localStorage.setItem("selectedCharacter", "Gary");
        } else{
            description.innerHTML = "Välj din karaktär och påbörja din resa!";
            localStorage.removeItem("selectedCharacter");
        }
    }
}

if (storedCharacter === "Ash") {
    ash.classList.add("selected");
    description.innerHTML = "Du har valt Ash Ketchum, dags att påbörja din resa!";
} else if (storedCharacter === "Gary") {
    gary.classList.add("selected");
    description.innerHTML = "Du har valt Gary Oak, dags att påbörja din resa!";
} else {
    description.innerHTML = "Välj din karaktär och påbörja din resa!";
}

function nextPage() { 
    const buttonForward = document.getElementById("firstForward");
    buttonForward.onclick = worldPage;
   
   
    const text = document.createElement("P") // skapar p tagg 
    text.textContent = "bacon" // ändrar innehållet
    text.className = "large" // lägger till large

    const button = document.createElement("button")
    
    gameContainer.append(text); // skickar in information som skapas i javascript
    }

function worldPage() {
    gameContainer.innerHTML = "";

}
//