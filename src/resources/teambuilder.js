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
                <img src="${savedTeamInfo[j].imageURL}" alt="${savedTeamInfo[j].name + "Sprite"}">
                <p><strong>${savedTeamInfo[j].name}</strong></p>
            `
            if (savedTeamInfo[j].ability == "") {
                currentTeamMemberCard.innerHTML = currentTeamMemberCard.innerHTML + `<p><strong>Ability:</strong> N/A</p>`;
            }
            else {
                currentTeamMemberCard.innerHTML = currentTeamMemberCard.innerHTML + `<p><strong>Ability:</strong> ${savedTeamInfo[j].ability}</p>`;
            }
            for (let k = 1; k <= 4; k++) {
                if (k > savedTeamInfo[j].moves.length) {
                    currentTeamMemberCard.innerHTML = currentTeamMemberCard.innerHTML + `<p><strong>Move ${k}:</strong> N/A</p>`;
                }
                else {
                    currentTeamMemberCard.innerHTML = currentTeamMemberCard.innerHTML + `<p><strong>Move ${k}:</strong> ${savedTeamInfo[j].moves[k-1]}</p>`;
                }
            }
        }
    }
});