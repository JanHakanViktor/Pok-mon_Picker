// kör main-funktionen när DOM är laddad
window.addEventListener("DOMContentLoaded", main);

const ash = document.querySelector("#ash img");
const gary = document.querySelector("#gary img");
const description = document.querySelector("#description");

function main() {
    toggleAsh();
    toggleGary();
}

function toggleAsh() {
    
    ash.onclick = function(){
        const name = "Ash Ketchum";
        ash.classList.toggle("selected");
        gary.classList.remove("selected");
        if(ash.classList.contains("selected")){
            description.innerHTML = "Du har valt " + name + ", dags att påbörja din resa!";
        } else{
            description.innerHTML = "Välj din karaktär och påbörja din resa";
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
        } else{
            description.innerHTML = "Välj din karaktär och påbörja din resa";
        }
    }
}

function nextPage() {
    
}