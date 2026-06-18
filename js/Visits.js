import { SupaBaseClient } from "./SupaBase.js"

async function registerVisit() {
	const counter = document.getElementById("visit-count")

	try {
		await SupaBaseClient.from("page_visits").insert([{}])
		const { count, error } = await SupaBaseClient.from("page_visits")
			.select("*", {
				count: "exact",
				head: true,
			})
		if (error) throw error
		counter.innerText = count.toLocaleString()
	} catch (_err) {
		counter.innerText = "Offline"
	}
}

async function refreshVisitCount() {
	const counter = document.getElementById("visit-count")

	try {
		const { count, error } = await SupaBaseClient.from("page_visits")
			.select("*", {
				count: "exact",
				head: true,
			})
		if (error) throw error
		counter.innerText = count.toLocaleString()
	} catch (_err) {}
}

export function init() {
	registerVisit()
	const refresh = 60 // Refresh every 60 seconds
	setInterval(refreshVisitCount, refresh * 1000)
}
