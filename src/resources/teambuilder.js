var path = document.querySelector('.zigzag');
var length = path.getTotalLength();

// Redirects the user to the editTeam page and stores what team is currently being edited
function editTeam(teamKey) {
    localStorage.setItem("currentTeamKey", teamKey);
    window.location.href = "./editteam.html";
}

document.addEventListener("DOMContentLoaded", () => {
    let teams = ["player", "enemy"];
    for (let i = 0; i < 2; i++) {
        const savedTeamInfo = JSON.parse(localStorage.getItem(teams[i] + "Team"))
        console.log(savedTeamInfo);
        for (let j = 0; j < 6; j++) {
            const currentTeamMemberCard = document.getElementById(teams[i] + "TeamMemberCard" + (j + 1));
            currentTeamMemberCard.innerHTML = `
                <div class="teamMemberCardInner">
                    <div class="cardFront">
                        <div class="imgContainer">
                            <img src="${savedTeamInfo[j]?.imageURL || './media/missingno_sprite.png'}" 
                                 alt="${savedTeamInfo[j]?.name || 'Unknown'} Sprite">
                        </div>
                        <div class="nameContainer">
                            <p><strong>${savedTeamInfo[j]?.name || 'N/A'}</strong></p>
                        </div>
                    </div>
                    <div class="cardBack">
                        <p><strong>Ability:</strong></p>
                        <p>${savedTeamInfo[j]?.ability || "N/A"}</p>
                        <p><strong>Move 1:</strong></p>
                        <p>${savedTeamInfo[j]?.moves?.[0] || "N/A"}</p>
                        <p><strong>Move 2:</strong></p>
                        <p>${savedTeamInfo[j]?.moves?.[1] || "N/A"}</p>
                        <p><strong>Move 3:</strong></p>
                        <p>${savedTeamInfo[j]?.moves?.[2] || "N/A"}</p>
                        <p><strong>Move 4:</strong></p>
                        <p>${savedTeamInfo[j]?.moves?.[3] || "N/A"}</p>
                    </div>
                </div>
            `;
        }
    }
});