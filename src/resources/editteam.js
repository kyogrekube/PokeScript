// Updates the newStatsContainer with the currently selected stats
function updateNewStatsContainer(newStatsContainer, teamMemberKey) {
    // Creates arrays from the nodelist of checked items in the possible moves and abilities containers
    const selectedMoves = Array.from(document.querySelectorAll("#possibleMovesContainer .moveCheckbox:checked"))
        .map(move => move.nextElementSibling.textContent);
    const selectedAbility = Array.from(document.querySelectorAll("#possibleAbilitiesContainer .abilityCheckbox:checked"))
        .map(ability => ability.nextElementSibling.textContent);
    let savedTeamMemberInfo = JSON.parse(localStorage.getItem(teamMemberKey));
    newStatsContainer.innerHTML = `<p><strong>Ability:</strong></p>`;
    // Joins the abilities together, attaches them to html, and stores them
    if (selectedAbility.length > 0) {
        newStatsContainer.innerHTML = newStatsContainer.innerHTML + `<p>${selectedAbility.join(", ")}</p>`;
        savedTeamMemberInfo.ability = selectedAbility[0];
    }
    else {newStatsContainer.innerHTML = newStatsContainer.innerHTML + `<p>None selected</p>`}
    newStatsContainer.innerHTML = newStatsContainer.innerHTML + `<p><strong>Moveset:</strong></p>`;
    // Joins the moves together, attaches them to html, and stores them
    if (selectedMoves.length > 0) { 
        newStatsContainer.innerHTML = newStatsContainer.innerHTML + `<p>${selectedMoves.join(", ")}</p>`;
        savedTeamMemberInfo.moves = Array.from(document.querySelectorAll("#possibleMovesContainer .moveCheckbox:checked"))
        .map(move => move.nextElementSibling.textContent);
    }
    else { newStatsContainer.innerHTML = newStatsContainer.innerHTML + `<p>None selected</p>` }
    newStatsContainer.innerHTML = newStatsContainer.innerHTML + `<button class="saveStatsButton">Save Stat Changes</button>`;
    localStorage.setItem(teamMemberKey, JSON.stringify(savedTeamMemberInfo));
}

// Creates the display for the Moveset and Ability selection process
function displayMovesetAndAbilitySelection(changeStatsContainer, newStatsContainer, teamMemberKey) {
    document.getElementById("editStatsButtonID").addEventListener("click", () => {
        const selectedPokemon = document.querySelectorAll("#possiblePokemonContainer .pokemonCheckbox:checked");
        // Ensures only 1 pokemon is selected at a time
        if (selectedPokemon.length != 1) {
            alert("Exactly 1 pokemon may be selected at a time");
            return;
        }
        else {
            // Creates moveset container
            const changeMovesetContainer = document.createElement("div");
            changeMovesetContainer.classList.add("changeMovesetContainer");
            changeMovesetContainer.innerHTML = `
                <p><strong>Select New Moveset</strong></p>
                <div class="scrollableContainer" id="possibleMovesContainer"></div>
            `;
            // Creates the abilities container
            const changeAbilityContainer = document.createElement("div");
            changeAbilityContainer.classList.add("changeAbilityContainer");
            changeAbilityContainer.innerHTML = `
                <p><strong>Select New Ability</strong></p>
                <div class="scrollableContainer" id="possibleAbilitiesContainer"></div>
            `;
            // Clears changeStatsContainer and adds new containers to it
            changeStatsContainer.innerHTML = "";
            changeStatsContainer.appendChild(changeMovesetContainer);
            changeStatsContainer.appendChild(changeAbilityContainer);
            // Updates the stats container with current moves/abilities
            updateNewStatsContainer(newStatsContainer, teamMemberKey);

            // Prevents users from selecting more than 4 moves at once
            document.getElementById("possibleMovesContainer").addEventListener("change", (event) => {
                const selectedMoves = document.querySelectorAll("#possibleMovesContainer .moveCheckbox:checked");
                if (selectedMoves.length > 4) {
                    alert("A pokemon may only have up to 4 moves");
                    event.target.checked = false;
                }
                // Updates the stats container with current moves/abilities
                updateNewStatsContainer(newStatsContainer, teamMemberKey);
            });
            // Prevents users from selecting more than 1 ability at once
            document.getElementById("possibleAbilitiesContainer").addEventListener("change", (event) => {
                const selectedAbility = document.querySelectorAll("#possibleAbilitiesContainer .abilityCheckbox:checked");
                if (selectedAbility.length > 1) {
                    alert("A pokemon may only have 1 ability");
                    event.target.checked = false;
                }              
                // Updates the stats container with current moves/abilities
                updateNewStatsContainer(newStatsContainer, teamMemberKey);
            });

            // Populating lists of possible moves and abilities
            selectedPokemon.forEach(pokemon => {
                fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon.nextElementSibling.textContent)
                .then(response => response.json())
                .then(data => {
                    // Populating the left scrollable element with possible moves
                    data.moves.forEach(move => {
                        const checkBoxOption = document.createElement("div");
                        checkBoxOption.classList.add("checkBoxOption");
                        checkBoxOption.innerHTML = `
                            <input type="checkbox" class="moveCheckbox">
                            <label>${move.move.name}</label>
                        `;
                        possibleMovesContainer.appendChild(checkBoxOption);
                    });

                    // Populating the right scrollable element with possisble abilities
                    data.abilities.forEach(ability => {
                        const checkBoxOption = document.createElement("div");
                        checkBoxOption.classList.add("checkBoxOption");
                        checkBoxOption.innerHTML = `
                            <input type="checkbox" class="abilityCheckbox">
                            <label>${ability.ability.name}</label>
                        `;
                        possibleAbilitiesContainer.appendChild(checkBoxOption);
                    });
                });
            });
        }
    });
}

// Creates the display for the pokemon/team member selection process
function displayPokemonSelection() {
    const editButtons = document.querySelectorAll(".editTeamMemberButton");
    const changeStatsContainer = document.querySelector(".changeStatsContainer");
    const newStatsContainer = document.querySelector(".newStatsContainer");

    const localStorageKeys = Object.keys(localStorage);
    localStorageKeys.forEach(keyName => {
        const savedTeamMemberInfo = JSON.parse(localStorage.getItem(keyName));
        document.getElementById("teamMemberCard" + keyName.slice(-1)).innerHTML = `
            <img src="${savedTeamMemberInfo.imageURL}" alt="${savedTeamMemberInfo.name + "Sprite"}">
            <p><strong>${savedTeamMemberInfo.name}</strong></p>
        `;
    });

    // Show team card data from existing local storage

    editButtons.forEach(button => {
        button.addEventListener("click", (clickEvent) => {
            // Creates a scrollable list of pokemon to be chosen from
            changeStatsContainer.innerHTML = `
                <div class="changePokemonContainer">
                    <p><strong>Select New Pokemon</strong></p>
                    <div class="scrollableContainer" id="possiblePokemonContainer"></div>
                </div>
            `;

            // Prevents the user from selecting more than 1 pokemon at once
            const possiblePokemonContainer = document.getElementById("possiblePokemonContainer");
            possiblePokemonContainer.addEventListener("change", (selectEvent) => {
                const selectedPokemon = document.querySelectorAll("#possiblePokemonContainer .pokemonCheckbox:checked");
                if (selectedPokemon.length > 1) {
                    alert("Only 1 pokemon may be selected at a time");
                    selectEvent.target.checked = false;
                }
                // When one pokemon is selected, update the team card's name and sprite and the team member's local storage stats
                else if (selectedPokemon.length == 1) {
                    let savedTeamMemberInfo = JSON.parse(localStorage.getItem("teamMember" + clickEvent.target.id.slice(-1)));
                    fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon[0].nextElementSibling.textContent}`)
                        .then(response => response.json())
                        .then(data => {
                            savedTeamMemberInfo.imageURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`;
                            // Removes the moves/ability of the team member if it is switched with another pokemon
                            if (savedTeamMemberInfo.name != selectedPokemon[0].nextElementSibling.textContent) {
                                savedTeamMemberInfo.name = selectedPokemon[0].nextElementSibling.textContent;
                                savedTeamMemberInfo.moves = [];
                                savedTeamMemberInfo.ability =  "";
                            }
                            document.getElementById("teamMemberCard" + clickEvent.target.id.slice(-1)).innerHTML = `
                                <img src="${savedTeamMemberInfo.imageURL}" alt="${savedTeamMemberInfo.name + "Sprite"}">
                                <p><strong>${savedTeamMemberInfo.name}</strong></p>
                            `;
                            localStorage.setItem("teamMember1", JSON.stringify(savedTeamMemberInfo));
                    });
                }
            });
            // Populates the list of possible pokemon to be chosen from
            fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
                .then(response => response.json())
                .then(data => {
                    data.results.forEach(pokemon => {
                        const checkBoxOption = document.createElement("div");
                        checkBoxOption.classList.add("checkBoxOption");
                        checkBoxOption.innerHTML = `
                            <input type="checkbox" class="pokemonCheckbox">
                            <label>${pokemon.name}</label>
                        `;
                        possiblePokemonContainer.appendChild(checkBoxOption);
                    });
                });
            // Creates a button to proceed with selection
            newStatsContainer.innerHTML = `
                <button class="editStatsButton" id="editStatsButtonID">Edit Movesets and Ability</button>
            `;
            displayMovesetAndAbilitySelection(changeStatsContainer, newStatsContainer, "teamMember" + clickEvent.target.id.slice(-1));
        });
    });
}

// Creates default/empty elements for each team member slot
function initializeLocalStorage() {
    for (let i = 1; i <= 6; i++) {
        if (localStorage.getItem("teamMember" + i) === null) {
            const teamMemberInfo = {
                name: "N/A",
                moves: [],
                ability: "",
                imageURL: "./media/missingno_sprite.png"
            };
            localStorage.setItem("teamMember" + i, JSON.stringify(teamMemberInfo));
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    //localStorage.clear(); /* Here for testing purposes */
    console.log(localStorage);
    initializeLocalStorage();
    displayPokemonSelection();
});
