// Displays the battle scene in the top center of the screen
function loadBattleScene() {
    const playerTeam = JSON.parse(localStorage.getItem("playerTeam"));
    const enemyTeam = JSON.parse(localStorage.getItem("enemyTeam"));
    const player = playerTeam.find(p => p.name !== "N/A");
    const enemy = enemyTeam.find(p => p.name !== "N/A");
    const battleFrame = document.querySelector(".centerBattleFrame");

    // Changes the color of the hp bar based on the available hp of the current team member
    function getHPColor(hpRatio) {
        if (hpRatio > 0.5) {
            return '#3ec45e';
        }
        else if (hpRatio > 0.2) {
            return '#f1c232';
        }
        else {
            return '#e74c3c'
        }
    }
    
    // Calculate hp ratios
    const playerHpRatio = player.hp[1] / player.hp[0];
    const enemyHpRatio = enemy.hp[1] / enemy.hp[0];
    
    // Adds the display for the battle frame for the enemy pokemon and then the player pokemon
    battleFrame.innerHTML = `
      <div class="enemyPokemonFrame">
        <div class="enemyUI">
          <span class="pokeName">${enemy.name}</span>
          <div class="hpOuterBar">
            <div class="hpInnerBar" style="width: ${enemyHpRatio * 100}%; background-color: ${getHPColor(enemyHpRatio)};"></div>
          </div>
        </div>
        <div class="shadow enemyPokemonShadow"></div>
        <img src="${enemy.frontImageURL}" alt="${enemy.name}" class="enemySprite">
      </div>
      <div class="playerPokemonFrame">
        <div class="shadow playerPokemonShadow"></div>
        <img src="${player.backImageURL}" alt="${player.name}" class="playerSprite">
        <div class="playerUI">
          <span class="pokeName">${player.name}</span>
          <div class="hpOuterBar">
            <div class="hpInnerBar" style="width: ${playerHpRatio * 100}%; background-color: ${getHPColor(playerHpRatio)};"></div>
          </div>
          <span class="hpFraction">${player.hp[1]} / ${player.hp[0]}</span>
        </div>
      </div>
    `;
}

// Displays team members in the dots on boht sides of the screen
function loadTeamLineup() {
    const teams = [
        {
            storageKey: "playerTeam",
            dotSelector: ".leftTopOverviewBox .dot"
        },
        {
            storageKey: "enemyTeam",
            dotSelector: ".rightTopOverviewBox .dot"
        }
    ];
    teams.forEach(team => {
        // Finds the indexes of actual team members and not placeholders
        const currentTeam = JSON.parse(localStorage.getItem(team.storageKey));
        let realTeamMemberIndexes = []
        currentTeam.forEach((teamMember, index) => {
            if (teamMember.name != "N/A") {
                realTeamMemberIndexes.push(index)
            }
        });

        // Only places actual team members in the dots
        const leftDots = document.querySelectorAll(team.dotSelector);
        leftDots.forEach((dot, index) => {
            if (index < realTeamMemberIndexes.length) {
                const member = currentTeam[realTeamMemberIndexes[index]];
                const img = document.createElement("img");
                img.src = member.frontImageURL;
                img.alt = member.name;
                img.style.width = "100%";
                img.style.height = "100%";
                img.style.borderRadius = "50%";
                dot.innerHTML = "";
                dot.appendChild(img);
            }
            /* 
            ADD LATER: IF A TEAMEMBER HAS 0 REMAINING HP, SIGNIFY
            THAT IT HAS FAINTED SOMEHOW 
            */
        });
    });
}

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
        const container = document.getElementById("ActionMenu");
        const currentPokemon = JSON.parse(localStorage.getItem("playerTeam")).find(p => p.name !== "N/A");
        const moves = currentPokemon.moves.slice(0, 4); // up to 4 moves
    
        container.innerHTML = `
            <div class="moveGridContainer">
                <div class="moveGrid">
                    ${moves.map((move) => `
                        <div class="moveButton ${move[5].toLowerCase()}">
                            <div class="moveName">${move[0]}</div>
                            <div class="moveDetails">
                                <span class="moveType">${move[5].toUpperCase()}</span>
                                <span class="pp">PP ${move[4]} / ${move[3]}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <button class="backButtonInMoves" id="backToAction">Back</button>
            </div>
        `;
    
        document.getElementById("backToAction").addEventListener("click", loadActionMenu);
    });    
    

    bagBtn.addEventListener("click", () => {
        alert("Currently under development!");
    });

    pokemonBtn.addEventListener("click", () => {
        alert("Currently under development!");
    });
}

// Resets stats and move PP before battle
function loadBattleInfo() {
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

    //console.log(localStorage);
    //localStorage.setItem("")
    //localStorage.removeItem("mytime");
}

document.addEventListener("DOMContentLoaded", () => {
    loadBattleInfo();
    loadActionMenu();
    loadTeamLineup();
    loadBattleScene();
    console.log(localStorage);
});
  