let player1 = {
    name: "Red",
    currentHP: 100,
    maxHP: 100,
    barId: "player1Health"
};

let player2 = {
    name: "Blue",
    currentHP: 100,
    maxHP: 100,
    barId: "player2Health"
};

function updateHealthBar(player) {
    const hpRatio = player.currentHP / player.maxHP;
    const bar = document.getElementById(player.barId);
    bar.style.width = `${Math.max(hpRatio * 100, 0)}%`;

    // Optional: Change color based on health
    if (hpRatio > 0.5) {
        bar.style.backgroundColor = "#4caf50"; // Green
    } else if (hpRatio > 0.25) {
        bar.style.backgroundColor = "#ffc107"; // Yellow
    } else {
        bar.style.backgroundColor = "#f44336"; // Red
    }
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

        fightBtn.addEventListener("click", showMoveOptions);

        bagBtn.addEventListener("click", () => {
            alert("Currently under development!");
        });

        pokemonBtn.addEventListener("click", () => {
            alert("Currently under development!");
        });
    }

    const moves = ["Tackle", "Thunderbolt", "Quick Attack", "Protect"];

    function showMoveOptions() {
        const container = document.getElementById("ActionMenu");
        container.innerHTML = `
            <div class="topInnerActionMenu">
                ${moves.map(move => `
                    <button class="actionMenuButton fight" onclick="handleMove('${move}')">${move}</button>
                `).join("")}
            </div>
            <div class="bottomInnerActionMenu" style="justify-content:center;">
                <button class="actionMenuButton back" onclick="loadActionMenu()">BACK</button>
            </div>
        `   ;
    }

    function handleMove(moveName) {
        const log = document.querySelector(".battleLog");
        const damage = Math.floor(Math.random() * 20 + 10); // Random 10–30 damage
        player2.currentHP -= damage;
    
        log.innerHTML += `<p>You used ${moveName} and dealt ${damage} damage!</p>`;
        updateHealthBar(player2);
    
        setTimeout(() => {
            const enemyDamage = Math.floor(Math.random() * 15 + 5); // Enemy deals 5–20
            player1.currentHP -= enemyDamage;
    
            log.innerHTML += `<p>Enemy used Growl and dealt ${enemyDamage} damage!</p>`;
            updateHealthBar(player1);
    
            // Auto-scroll
            log.scrollTop = log.scrollHeight;
    
            // Check for victory or loss
            if (player2.currentHP <= 0) {
                log.innerHTML += `<p style="color: green;">You win!</p>`;
            } else if (player1.currentHP <= 0) {
                log.innerHTML += `<p style="color: red;">You lose!</p>`;
            }
        }, 1000);
    
        loadActionMenu();
    }

    function loadPlayerInfo() {
        const playerNames = document.querySelectorAll(".playerName");
        playerNames[0].textContent = player1.name;
        playerNames[1].textContent = player2.name;
    
        const dots = document.querySelectorAll(".dot");
        dots[2].style.backgroundColor = "gray";
    
        updateHealthBar(player1);
        updateHealthBar(player2);
    }

    document.addEventListener("DOMContentLoaded", () => {
        loadPlayerInfo();
        loadActionMenu();
        console.log(localStorage);
    });
    