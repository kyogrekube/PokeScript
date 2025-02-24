// Creates the display for the Moveset and Ability selection process
function displayMovesetAndAbilitySelection(changeStatsContainer, newStatsContainer) {
    document.getElementById("editStatsButtonID").addEventListener("click", () => {
        const selectedPokemon = document.querySelectorAll("#possiblePokemonContainer .pokemonCheckbox:checked");
        // Ensures only 1 pokemon is selected at a time
        if (selectedPokemon.length == 1) {
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

            // Displays newly selected stats
            newStatsContainer.innerHTML = `
                <p><strong>Ability:</strong></p>
                <p>Truant</p>
                <p><strong>Moveset:</strong></p> 
                <p>Ember, Draco Meteor, Wood Hammer, Heat Crash</p>
                <button class="saveStatsButton">Save Stat Changes</button>
            `;
            // Prevents users from selecting more than 4 moves at once
            document.getElementById("possibleMovesContainer").addEventListener("change", () => {
                const selectedMoves = document.querySelectorAll("#possibleMovesContainer .moveCheckbox:checked");
                if (selectedMoves.length > 4) {
                    alert("A pokemon may only have up to 4 moves");
                    selectedMoves[selectedMoves.length - 1].checked = false;
                }
            });
            // Prevents users from selecting more than 1 ability at once
            document.getElementById("possibleAbilitiesContainer").addEventListener("change", () => {
                const selectedAbility = document.querySelectorAll("#possibleAbilitiesContainer .abilityCheckbox:checked");
                if (selectedAbility.length > 1) {
                    alert("A pokemon may only have 1 ability");
                    selectedAbility[selectedAbility.length - 1].checked = false;
                }
            });

            // Populating lists of possible moves and abilities
            selectedPokemon.forEach(pokemon => {
                fetch("https://pokeapi.co/api/v2/pokemon/"+pokemon.nextElementSibling.textContent)
                .then(response => response.json())
                .then(data => {
                    // Populating the left scrollable element with possible moves
                    console.log(data);
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
        // Since a user cannot ever have more than 1 pokemon selected, we can assume that the only other option is having none selected
        else {
            alert("A pokemon must be selected");
            return;
        }
    });
}

// Creates the display for the pokemon/team member selection process
function displayPokemonSelection() {
    const editButtons = document.querySelectorAll(".editTeamMemberButton");
    const changeStatsContainer = document.querySelector(".changeStatsContainer");
    const newStatsContainer = document.querySelector(".newStatsContainer");

    editButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Creates a scrollable list of pokemon to be chosen from
            changeStatsContainer.innerHTML = `
                <div class="changePokemonContainer">
                    <p><strong>Select New Pokemon</strong></p>
                    <div class="scrollableContainer" id="possiblePokemonContainer"></div>
                </div>
            `;
            // Prevents the user from selecting more than 1 pokemon at once
            document.getElementById("possiblePokemonContainer").addEventListener("change", () => {
                const selectedPokemon = document.querySelectorAll("#possiblePokemonContainer .pokemonCheckbox:checked");
                if (selectedPokemon.length > 1) {
                    alert("Only 1 pokemon may be selected at a time");
                    selectedPokemon[selectedPokemon.length - 1].checked = false;
                }
            });
            // Populates the list of possible pokemon to be chosen from
            const possiblePokemonContainer = document.getElementById("possiblePokemonContainer");
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
            displayMovesetAndAbilitySelection(changeStatsContainer, newStatsContainer);
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    displayPokemonSelection();
});
