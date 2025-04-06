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
        log.innerHTML += `<p>You used ${moveName}!</p>`;
        setTimeout(() => {
            log.innerHTML += `<p>Enemy used Growl!</p>`;
            log.scrollTop = log.scrollHeight;
        }, 1000);
        loadActionMenu();
    }

    function loadPlayerInfo() {
        const playerNames = document.querySelectorAll(".playerName");
        playerNames[0].textContent = "Red";
        playerNames[1].textContent = "Blue";

        const dots = document.querySelectorAll(".dot");
        dots[2].style.backgroundColor = "gray"; // Example: mark one fainted
    }

    document.addEventListener("DOMContentLoaded", () => {
        loadPlayerInfo();
        loadActionMenu();
        console.log(localStorage);
    });
    