var path = document.querySelector('.zigzag');
var length = path.getTotalLength();

// Redirects the user to the editTeam page and stores what team is currently being edited
function editTeam(teamKey) {
    localStorage.setItem("currentTeamKey", teamKey);
    window.location.href = "./editteam.html";
}