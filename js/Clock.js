const clockElement = document.getElementById("game-time")
const clockStyle = new Intl.DateTimeFormat(undefined, {
	hourCycle: "h24",
	hour: "2-digit",
	minute: "2-digit",
	second: "2-digit",
	timeZone: "UTC",
	// timeZoneName: "short",
})

function updateClock() {
	clockElement.innerText = clockStyle.format(Date.now())
}

export function init() {
	updateClock()
	const refresh = 1 // Refresh every 1 second
	setInterval(updateClock, refresh * 1000)
}
