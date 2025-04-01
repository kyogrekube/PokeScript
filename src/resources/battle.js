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

    // Ensure all team members have full move PP prior to battle
    const teams = ["playerTeam", "enemyTeam"];
    teams.forEach(teamKey => {
        const team = JSON.parse(localStorage.getItem(teamKey));
        // Loop through teammates
        for (let i = 0; i < team.length; i++) {
            // Loop through teammate move array
            for (let j = 0; j < team[i].moves.length; j++) {
                // Set currentPP = maxPP
                team[i].moves[j][4] = team[i].moves[j][3];
            }
            // For each stat, reset the stat to its base and reset its buff/debuffs to 0
            team[i].hp[1] = team[i].hp[0]
            team[i].hp[2] = 0
            team[i].attack[1] = team[i].attack[0]
            team[i].attack[2] = 0
            team[i].specialAttack[1] = team[i].specialAttack[0]
            team[i].specialAttack[2] = 0
            team[i].defense[1] = team[i].defense[0]
            team[i].defense[2] = 0
            team[i].specialDefense[1] = team[i].specialDefense[0]
            team[i].specialDefense[2] = 0
            team[i].speed[1] = team[i].speed[0]
            team[i].speed[2] = 0
            team[i].evasion[1] = team[i].evasion[0]
            team[i].evasion[2] = 0
            team[i].accuracy[1] = team[i].accuracy[0]
            team[i].accuracy[2] = 0
        }
        localStorage.setItem(teamKey, JSON.stringify(team));
    });
    console.log(localStorage);
    //localStorage.setItem("")
    //localStorage.removeItem("mytime");
}

document.addEventListener("DOMContentLoaded", () => {
    loadBattleInfo();
    loadActionMenu();
});
  