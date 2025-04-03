var path = document.querySelector('.zigzag');
var length = path.getTotalLength();

// Redirects the user to the editTeam page and stores what team is currently being edited
function editTeam(teamKey) {
    localStorage.setItem("currentTeamKey", teamKey);
    window.location.href = "./editteam.html";
}

// Creates default/empty elements for each team member slot of the given team
function initializeLocalStorage(teamKey) {
    if (localStorage.getItem(teamKey) === null) {
        let teamInfo = [];
        for (let i = 0; i < 6; i++) {
            teamInfo.push({
                name: "N/A",
                nickname: "N/A",
                moves: [],
                ability: "",
                frontImageURL: "./media/missingno_sprite.png",
                backImageURL: "./media/missingno_sprite.png",
                /* For each stat the structure is: base stat, current stat, buff/debuff */
                hp: [0, 0, 0],
                attack: [0, 0, 0],
                specialAttack: [0, 0, 0],
                defense: [0, 0, 0],
                specialDefense: [0, 0, 0],
                speed: [0, 0, 0],
                evasion: [100, 100, 0],
                accuracy: [100, 100, 0]
            });
        }
        localStorage.setItem(teamKey, JSON.stringify(teamInfo));
    }
}

document.addEventListener("DOMContentLoaded", () => {
    //localStorage.clear(); /* Here for testing purposes */
    //console.log(localStorage);
    initializeLocalStorage("playerTeam");
    initializeLocalStorage("enemyTeam");


    let teams = ["player", "enemy"];
    for (let i = 0; i < 2; i++) {
        const savedTeamInfo = JSON.parse(localStorage.getItem(teams[i] + "Team"))
        for (let j = 0; j < 6; j++) {
            const currentTeamMemberCard = document.getElementById(teams[i] + "TeamMemberCard" + (j + 1));
            currentTeamMemberCard.innerHTML = `
                <div class="teamMemberCardInner">
                    <div class="cardFront">
                        <div class="imgContainer">
                            <img src="${savedTeamInfo[j]?.frontImageURL || './media/missingno_sprite.png'}" 
                                 alt="${savedTeamInfo[j]?.nickname || 'Unknown'} Sprite">
                        </div>
                        <div class="nameContainer">
                            <p><strong>${savedTeamInfo[j]?.nickname || 'N/A'}</strong></p>
                        </div>
                    </div>
                    <div class="cardBack">
                        <p><strong>Ability:</strong></p>
                        <p>${savedTeamInfo[j]?.ability || "N/A"}</p>
                        <p><strong>Move 1:</strong></p>
                        <p>${savedTeamInfo[j]?.moves?.[0]?.[0] || "N/A"}</p>
                        <p><strong>Move 2:</strong></p>
                        <p>${savedTeamInfo[j]?.moves?.[1]?.[0] || "N/A"}</p>
                        <p><strong>Move 3:</strong></p>
                        <p>${savedTeamInfo[j]?.moves?.[2]?.[0] || "N/A"}</p>
                        <p><strong>Move 4:</strong></p>
                        <p>${savedTeamInfo[j]?.moves?.[3]?.[0] || "N/A"}</p>
                    </div>
                </div>
            `;
        }
    }
});