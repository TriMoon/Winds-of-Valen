const STEAM_APP_ID = "4135880"

function updateSteamCount() {
	const display = document.getElementById("steam-count")
	const steamUrl =
		`https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=${STEAM_APP_ID}&nocache=${Date.now()}`
	const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(steamUrl)}`

	fetch(proxyUrl)
		.then((response) => {
			if (!response.ok) throw new Error()
			return response.json()
		})
		.then((data) => {
			if (data.response && typeof data.response.player_count !== "undefined") {
				display.innerText = data.response.player_count.toLocaleString()
			}
		})
		.catch((_err) => {
			fetch(
				`https://api.allorigins.win/get?url=${
					encodeURIComponent(steamUrl)
				}&t=${Date.now()}`,
			)
				.then((altResponse) => altResponse.json())
				.then((altData) => {
					const steamData = JSON.parse(altData.contents)
					if (steamData.response) {
						display.innerText = steamData.response.player_count.toLocaleString()
					}
				})
				.catch((_err) => {})
		})
}

export function init() {
	updateSteamCount()
	const refresh = 10 // Refresh every 10 seconds
	setInterval(updateSteamCount, refresh * 1000)
}
