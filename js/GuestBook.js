import { SupaBaseClient } from "./SupaBase.js"

const inputName = document.getElementById("guest-name")
const inputMsg = document.getElementById("guest-msg")
const btn = document.getElementById("submit-btn")
const list = document.getElementById("guestbook-list")
const tsStyle = new Intl.DateTimeFormat(undefined, {
	dateStyle: "full",
	timeStyle: "long",
	hourCycle: "h24",
	timeZone: "UTC",
})

function loadGuestbook() {
	SupaBaseClient.from("guestbook")
		.select("*")
		.order("created_at", {
			ascending: true,
		})
		.then(({ data, error }) => {
			if (error) throw error

			// Show input fields and button if data is successfully fetched
			inputName.style.display =
				inputMsg.style.display =
				btn.style.display =
					"initial"
			if (!data.length) {
				// If there are no entries, show a message instead of an empty list.
				list.innerHTML = `<div class="entry">No visitor messages yet.</div>`
				return
			}

			// Use a document fragment to minimize reflows when adding entries
			const fragment = document.createDocumentFragment()
			// Iterate over entries and create DOM elements for each
			data.forEach((gb_entry) => {
				const ts = gb_entry.created_at
					? tsStyle.format(new Date(gb_entry.created_at))
					: "Unknown time"
				const name = gb_entry.name || "Anonymous"
				const message = gb_entry.message || ""

				const entryElement = document.createElement("div")
				entryElement.className = "entry"

				const tsElement = document.createElement("span")
				tsElement.className = "timestamp"
				tsElement.style.fontSize = "xx-small"
				tsElement.style.color = "var(--accent)"
				tsElement.style.float = "right"
				tsElement.appendChild(document.createTextNode(`@${ts}`))
				entryElement.appendChild(tsElement)

				const nameElement = document.createElement("b")
				nameElement.appendChild(document.createTextNode(`${name}: `))
				entryElement.appendChild(nameElement)

				const messageElement = document.createElement("span")
				messageElement.appendChild(document.createTextNode(message))
				entryElement.appendChild(messageElement)
				// Append the entry to the fragment
				fragment.appendChild(entryElement)
			})
			// Replace existing entries with the new ones.
			list.replaceChildren(fragment)
			// Scroll to the last entry smoothly
			list.lastChild.scrollIntoView({
				behavior: "smooth",
				container: "nearest",
			})
		})
		.catch((_err) => {
			// Hide input fields and button if fetch fails.
			inputName.style.display =
				inputMsg.style.display =
				btn.style.display =
					"none"
			// Show a fallback message in the guestbook list.
			list.innerHTML = `<div class="entry">Guestbook temporarily offline.</div>`
		})
}

function addEntry() {
	const name = inputName.value.trim()
	const message = inputMsg.value.trim()

	if (!name || !message) return alert("Please fill in both fields!")
	if (btn) btn.disabled = true

	SupaBaseClient.from("guestbook")
		.insert([{ name, message }])
		.then(({ error }) => {
			if (!error) {
				// inputName.value = ""
				inputMsg.value = ""
				loadGuestbook()
			}
		})
		.catch(() => {
			// Ignore temporary errors; fallback UI already handles fetch failures.
		})
		.finally(() => {
			if (btn) btn.disabled = false
		})
}

export function init() {
	if (btn) {
		btn.addEventListener("click", addEntry)
	}
	loadGuestbook()
	const refresh = 30 // Refresh every 30 seconds
	setInterval(loadGuestbook, refresh * 1000)
}
