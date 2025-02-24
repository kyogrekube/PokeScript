// Creates the display for the Moveset and Ability selection process
function displayMovesetAndAbilitySelection(changeStatsContainer, newStatsContainer) {
    document.getElementById("editStatsButtonID").addEventListener("click", () => {
        // Creates the moveset container
        const changeMovesetContainer = document.createElement("div");
        changeMovesetContainer.classList.add("changeMovesetContainer");
        changeMovesetContainer.innerHTML = `
            <p><strong>Select New Moveset</strong></p>
            <div class="scrollableContainer">
                <div class="checkBoxOption">
                    <input type="checkbox" class="moveCheckbox">
                    <label>Ember</label>
                </div>
                <div class="checkBoxOption">
                    <input type="checkbox" class="moveCheckbox">
                    <label>Draco Meteor</label>
                </div>
                <div class="checkBoxOption">
                    <input type="checkbox" class="moveCheckbox">
                    <label>Wood Hammer</label>
                </div>
                <div class="checkBoxOption">
                    <input type="checkbox" class="moveCheckbox">
                    <label>Heat Crash</label>
                </div>
            </div>
        `;

        // Creates the ability container
        const changeAbilityContainer = document.createElement("div");
        changeAbilityContainer.classList.add("changeAbilityContainer");
        changeAbilityContainer.innerHTML = `
            <p><strong>Select New Ability</strong></p>
            <div class="scrollableContainer">
                <div class="checkBoxOption">
                    <input type="checkbox" class="abilityCheckbox">
                    <label>Truant</label>
                </div>
                <div class="checkBoxOption">
                    <input type="checkbox" class="abilityCheckbox">
                    <label>Overgrow</label>
                </div>
                <div class="checkBoxOption">
                    <input type="checkbox" class="abilityCheckbox">
                    <label>Blaze</label>
                </div>
            </div>
        `;
        // Removes any existing content from the changeStatsContainer before applying new content
        changeStatsContainer.innerHTML = ``;
        changeStatsContainer.appendChild(changeMovesetContainer);
        changeStatsContainer.appendChild(changeAbilityContainer);

        // Replaces existing content in newStatsContainer with new content
        newStatsContainer.innerHTML = `
            <p><strong>Ability:</strong></p>
            <p>Truant</p>
            <p><strong>Moveset:</strong></p> 
            <p>Ember, Draco Meteor, Wood Hammer, Heat Crash</p>
            <button class="saveStatsButton">Save Stat Changes</button>
        `
    });
}

// Creates the display for the pokemon/team member selection process
function displayPokemonSelection() {
    const editButtons = document.querySelectorAll(".editTeamMemberButton");
    const changeStatsContainer = document.querySelector(".changeStatsContainer");
    const newStatsContainer = document.querySelector(".newStatsContainer");

    editButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Creates the change pokemon container
            changeStatsContainer.innerHTML = `
                <div class="changePokemonContainer">
                    <p><strong>Select New Pokemon</strong></p>
                    <div class="scrollableContainer">
                        <!-- Example abilities added dynamically -->
                        <div class="checkBoxOption">
                            <input type="checkbox" class="abilityCheckbox">
                            <label>Truant</label>
                        </div>
                        <div class="checkBoxOption">
                            <input type="checkbox" class="abilityCheckbox">
                            <label>Overgrow</label>
                        </div>
                        <div class="checkBoxOption">
                            <input type="checkbox" class="abilityCheckbox">
                            <label>Blaze</label>
                        </div>
                    </div>
                </div>
            `;
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
