var path = document.querySelector('.zigzag');
var length = path.getTotalLength();

// Redirects the user to the editTeam page and stores what team is currently being edited
function editTeam(teamKey, index = null) {
    localStorage.setItem("currentTeamKey", teamKey);
    if (index !== null) {
        localStorage.setItem("currentSlotIndex", index);
    }
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
                imageURL: "./media/missingno_sprite.png"
            });
        }
        localStorage.setItem(teamKey, JSON.stringify(teamInfo));
    }
}

// Render team member function
function renderTeamMemberCard(member, containerId, teamKey, slotIndex) {
    const container = document.getElementById(containerId);
    container.innerHTML = `
        <div class="teamMemberCardInner" onclick="editTeam('${teamKey}', ${slotIndex})">
            <div class="cardFront">
                <div class="imgContainer">
                    <img src="${member?.imageURL || './media/missingno_sprite.png'}"
                         alt="${member?.nickname || 'Unknown'} Sprite"
                         onerror="this.src='./media/missingno_sprite.png';">
                </div>
                <div class="nameContainer">
                    <p><strong>${member?.nickname || 'N/A'}</strong></p>
                </div>
            </div>
            <div class="cardBack">
                <p><strong>Ability:</strong></p>
                <p>${member?.ability || "N/A"}</p>
                <p><strong>Move 1:</strong></p>
                <p>${member?.moves?.[0] || "N/A"}</p>
                <p><strong>Move 2:</strong></p>
                <p>${member?.moves?.[1] || "N/A"}</p>
                <p><strong>Move 3:</strong></p>
                <p>${member?.moves?.[2] || "N/A"}</p>
                <p><strong>Move 4:</strong></p>
                <p>${member?.moves?.[3] || "N/A"}</p>
            </div>
        </div>
    `;
}
// Helper function tyo Render a team member
function getDefaultTeamMember() {
    return {
        name: "N/A",
        nickname: "N/A",
        moves: [],
        ability: "",
        imageURL: "./media/missingno_sprite.png"
    };
}

document.addEventListener("DOMContentLoaded", () => {
    // localStorage.clear(); // Uncomment if you want to reset for testing
    initializeLocalStorage("playerTeam");
    initializeLocalStorage("enemyTeam");

    const teams = ["player", "enemy"];

    for (let i = 0; i < teams.length; i++) {
        const teamKey = teams[i] + "Team";
        const savedTeamInfo = JSON.parse(localStorage.getItem(teamKey)) || [];

        for (let j = 0; j < 6; j++) {
            const containerId = `${teams[i]}TeamMemberCard${j + 1}`;
            renderTeamMemberCard(savedTeamInfo[j], containerId, teamKey, j);
        }
    }
});