// Saves all proposed stat changes and closes the side menus
function saveStatChanges(teamMemberKey, selectedMovesArray, selectedAbilityHolder, newlySelectedTeamMember) {
    const changeStatsContainer = document.querySelector(".changeStatsContainer");
    const newStatsContainer = document.querySelector(".newStatsContainer");
    changeStatsContainer.innerHTML = "";
    newStatsContainer.innerHTML = "";
    fetch(`https://pokeapi.co/api/v2/pokemon/${newlySelectedTeamMember}`)
        .then(response => response.json())
        .then(data => {
            const newTeamMemberInfo = {
                name: newlySelectedTeamMember,
                moves: selectedMovesArray,
                ability: selectedAbilityHolder,
                imageURL: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`
            };
            // Takes entire saved team and replaces the currently selected team member's stats
            const savedTeamInfo = JSON.parse(localStorage.getItem(localStorage.getItem("currentTeamKey")))
            let newTeamInfo = []
            for (let i = 0; i < 6; i++) {
                if (i == teamMemberKey) {
                    newTeamInfo.push(newTeamMemberInfo)
                }
                else {
                    newTeamInfo.push(savedTeamInfo[i])
                }
                console.log(newTeamInfo[i]);
            }
            localStorage.setItem(localStorage.getItem("currentTeamKey"), JSON.stringify(newTeamInfo));
            displayPokemonSelection();
        });
}

// Cancels all proposed stat changes and closes the side menus
function cancelStatChanges(teamMemberKey) {
    const changeStatsContainer = document.querySelector(".changeStatsContainer");
    const newStatsContainer = document.querySelector(".newStatsContainer");
    changeStatsContainer.innerHTML = "";
    newStatsContainer.innerHTML = "";
    const savedTeamMemberInfo = JSON.parse(localStorage.getItem(localStorage.getItem("currentTeamKey")))[teamMemberKey]
    document.getElementById("teamMemberCard" + (teamMemberKey+1)).innerHTML = `
        <img src="${savedTeamMemberInfo.imageURL}" alt="${savedTeamMemberInfo.name + "Sprite"}">
        <p><strong>${savedTeamMemberInfo.name}</strong></p>
    `;
}


// Creates the display for the Moveset and Ability selection process
function displayMovesetAndAbilitySelection(teamMemberKey, newlySelectedTeamMember) {
    const changeStatsContainer = document.querySelector(".changeStatsContainer");
    const newStatsContainer = document.querySelector(".newStatsContainer");
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
    // Changes the newStatsContainer to contain save changes and cancel changes buttons
    newStatsContainer.innerHTML = `
        <button class="editStatsButton" id="saveStatsButtonID">Save Changes</button>
        <button class="editStatsButton" id="cancelStatChangesButtonID">Cancel</button>
    `;

    document.getElementById("cancelStatChangesButtonID").addEventListener("click", () => {
        cancelStatChanges(teamMemberKey);
    });

    // Populating lists of possible moves and abilities
    fetch("https://pokeapi.co/api/v2/pokemon/" + newlySelectedTeamMember)
    .then(response => response.json())
    .then(data => {
        // Populating the left scrollable element with possible moves
        data.moves.forEach(move => {
            const checkBoxOption = document.createElement("div");
            checkBoxOption.classList.add("checkBoxOption");
            checkBoxOption.innerHTML = `
                <input type="checkbox" class="moveCheckbox" value="${move.move.name}">
                <label>${move.move.name}</label>
            `;
            possibleMovesContainer.appendChild(checkBoxOption);
        });

        // Populating the right scrollable element with possisble abilities
        data.abilities.forEach(ability => {
            const checkBoxOption = document.createElement("div");
            checkBoxOption.classList.add("checkBoxOption");
            checkBoxOption.innerHTML = `
                <input type="checkbox" class="abilityCheckbox" value="${ability.ability.name}">
                <label>${ability.ability.name}</label>
            `;
            possibleAbilitiesContainer.appendChild(checkBoxOption);
        });
    });

    // Stores the proposed stat changes
    let selectedMovesArray = [];
    let selectedAbilityHolder = "";

    // Prevents users from selecting more than 4 moves at once
    document.getElementById("possibleMovesContainer").addEventListener("change", (event) => {
        const selectedMoves = document.querySelectorAll("#possibleMovesContainer .moveCheckbox:checked");
        if (selectedMoves.length > 4) {
            alert("A pokemon may only have up to 4 moves");
            event.target.checked = false;
        }    
        selectedMovesArray = Array.from(selectedMoves).map(move => move.value);
    });
    // Prevents users from selecting more than 1 ability at once
    document.getElementById("possibleAbilitiesContainer").addEventListener("change", (event) => {
        const selectedAbility = document.querySelectorAll("#possibleAbilitiesContainer .abilityCheckbox:checked");
        if (selectedAbility.length > 1) {
            alert("A pokemon may only have 1 ability");
            event.target.checked = false;
        }
        else if (selectedAbility.length == 1) {
            selectedAbilityHolder = selectedAbility[0].value
        }
    });

    // Only allows changes to be saved if 1-4 moves are selected and 1 ability is selected
    document.getElementById("saveStatsButtonID").addEventListener("click", () => {
        if (selectedMovesArray.length < 1 || selectedMovesArray.length > 4) {
            alert("A pokemon must have 1-4 moves");
            return;
        }
        if (selectedAbilityHolder == "") {
            alert("A pokemon must have 1 ability");
            return;
        }
        saveStatChanges(teamMemberKey, selectedMovesArray, selectedAbilityHolder, newlySelectedTeamMember);
    });
}

// Creates the display for the pokemon/team member selection process
function displayPokemonSelection() {
    const editButtons = document.querySelectorAll(".editTeamMemberButton");
    const changeStatsContainer = document.querySelector(".changeStatsContainer");
    const newStatsContainer = document.querySelector(".newStatsContainer");

    const currentTeamData = JSON.parse(localStorage.getItem(localStorage.getItem("currentTeamKey")))
    //console.log(test);
    //console.log(test[0]);
    //console.log(test[0].name);
    for (let j = 0; j < 6; j++) {
        const teamMemberIndex = j + 1
        const teamMemberStatsContainer = document.getElementById("teamMemberStatsContainer" + teamMemberIndex);
        document.getElementById("teamMemberCard" + teamMemberIndex).innerHTML = `
            <img src="${currentTeamData[j].imageURL}" alt="${currentTeamData[j].name + "Sprite"}">
            <p><strong>${currentTeamData[j].name}</strong></p>
        `;
        
        teamMemberStatsContainer.innerHTML = `<p><strong>Ability:</strong></p>`;
        if (currentTeamData[j].ability == "") {
            teamMemberStatsContainer.innerHTML = teamMemberStatsContainer.innerHTML + `<p>N/A</p>`;
        }
        else {
            teamMemberStatsContainer.innerHTML = teamMemberStatsContainer.innerHTML + `<p>${currentTeamData[j].ability}</p>`;
        }
        teamMemberStatsContainer.innerHTML = teamMemberStatsContainer.innerHTML + `<p><strong>Moveset:</strong></p>`;
        for (let i = 0; i < 4; i++) {
            if (i < currentTeamData[j].moves.length) {
                teamMemberStatsContainer.innerHTML = teamMemberStatsContainer.innerHTML + `<p>${currentTeamData[j].moves[i]}</p>`;
            } 
            else {
                teamMemberStatsContainer.innerHTML = teamMemberStatsContainer.innerHTML + "<p>N/A</p>";
            }
        }
    };

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
            // Creates a button to proceed with selection
            newStatsContainer.innerHTML = `
                <button class="editStatsButton" id="editStatsButtonID">Edit Movesets and Ability</button>
                <button class="editStatsButton" id="cancelStatChangesButtonID">Cancel</button>
            `;
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
            // Prevents the user from selecting more than 1 pokemon at once
            const possiblePokemonContainer = document.getElementById("possiblePokemonContainer");
            possiblePokemonContainer.addEventListener("change", (selectEvent) => {
                const selectedPokemon = document.querySelectorAll("#possiblePokemonContainer .pokemonCheckbox:checked");
                if (selectedPokemon.length > 1) {
                    alert("Only 1 pokemon may be selected at a time");
                    selectEvent.target.checked = false;
                }
                // When one pokemon is selected, update the team card's name and sprite
                else if (selectedPokemon.length == 1) {
                    let newlySelectedTeamMember = selectedPokemon[0].nextElementSibling.textContent;
                    fetch(`https://pokeapi.co/api/v2/pokemon/${newlySelectedTeamMember}`)
                        .then(response => response.json())
                        .then(data => {
                            document.getElementById("teamMemberCard" + clickEvent.target.id.slice(-1)).innerHTML = `
                                <img src="${`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`}" alt="${newlySelectedTeamMember + "Sprite"}">
                                <p><strong>${newlySelectedTeamMember}</strong></p>
                            `;
                            document.getElementById("editStatsButtonID").addEventListener("click", () => {
                                displayMovesetAndAbilitySelection(clickEvent.target.id.slice(-1)-1, newlySelectedTeamMember);
                            });
                    });
                }
            });
            document.getElementById("cancelStatChangesButtonID").addEventListener("click", () => {
                cancelStatChanges(clickEvent.target.id.slice(-1) - 1);
            });
        });
    });
}

// Creates default/empty elements for each team member slot of the given team
function initializeLocalStorage(teamKey) {
    if (localStorage.getItem(teamKey) === null) {
        let teamInfo = [];
        for (let i = 0; i < 6; i++) {
            teamInfo.push({
                name: "N/A",
                moves: [],
                ability: "",
                imageURL: "./media/missingno_sprite.png"
            });
        }
        localStorage.setItem(teamKey, JSON.stringify(teamInfo));
    }
}

document.addEventListener("DOMContentLoaded", () => {
    //localStorage.clear(); /* Here for testing purposes */
    console.log(localStorage);
    initializeLocalStorage(localStorage.getItem("currentTeamKey"));
    displayPokemonSelection();
});
