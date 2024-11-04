// kör main-funktionen när DOM är laddad
window.addEventListener("DOMContentLoaded", main);


function main() {
    loadStartingScene()
}

function loadStartingScene(){
    const p=document.createElement("p");
    document.body.append(p);
}

function loadEnterLivingRoom(){

}

function goBackToSleep(){
    //ladda svart bakgrund som cover allt och lägg till en knapp "Vakna upp igen" som startar om första scenen
}














// globalt tillstånd för vår applikation, läggs oftast övre delen av scripts. Inte allt men många. 
// const todoList = ["Städa", "Handla godis"];

// saveTodoButton.onclick = saveTodo;


// här startar applikationen
// function saveTodo() {
//     todoList.push(todoInput.value)

//     console.log(todoList);
// }




// var value = 0;
// while(value < 100) {
// 	console.log(value);
// 	value++;
// }




// let value = 0;

// console.time("time");

// while (value < 100_000) {
//     value +=1;
// }

// console.timeEnd("time");