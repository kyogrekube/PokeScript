// Loads the action menu and any changes on it
function loadActionMenu() {
    const container = document.getElementById("ActionMenu");
    container.innerHTML = `
        <div class = "topInnerActionMenu">
            <button class = "actionMenuButton fight" id = "fightButton">FIGHT</button>
        </div>
        <div class = "bottomInnerActionMenu">
            <div class = "bottomLeftInnerActionMenu">
            <button class = "actionMenuButton bag" id = "bagButton">BAG</button>
            </div>
            <div class = "bottomRightInnerActionMenu">
            <button class = "actionMenuButton pokemon" id = "pokemonButton">POKEMON</button>
            </div>
        </div>
    `;

    const fightBtn = document.getElementById("fightButton");
    const bagBtn = document.getElementById("bagButton");
    const pokemonBtn = document.getElementById("pokemonButton");

    fightBtn.addEventListener("click", () => {
        alert("Currently under development!");
    });

    bagBtn.addEventListener("click", () => {
        alert("Currently under development!");
    });

    pokemonBtn.addEventListener("click", () => {
        alert("Currently under development!");
    });
}

function loadBattleInfo() {
    console.log(localStorage);
    //localStorage.setItem("")
    //localStorage.removeItem("mytime");
}

document.addEventListener("DOMContentLoaded", () => {
    loadBattleInfo();
    loadActionMenu();
});
  