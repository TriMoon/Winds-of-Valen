import { SupaBaseClient } from "./SupaBase.js"

function registerVisit() {
	const counter = document.getElementById("visit-count")

	SupaBaseClient.from("page_visits")
		.insert([{}])
		.then(() =>
			SupaBaseClient.from("page_visits").select("*", {
				count: "exact",
				head: true,
			})
		)
		.then(({ count, error }) => {
			if (error) throw error
			counter.innerText = count.toLocaleString()
		})
		.catch(() => {
			counter.innerText = "Offline"
		})
}

function refreshVisitCount() {
	const counter = document.getElementById("visit-count")

	SupaBaseClient.from("page_visits")
		.select("*", {
			count: "exact",
			head: true,
		})
		.then(({ count, error }) => {
			if (error) throw error
			counter.innerText = count.toLocaleString()
		})
		.catch(() => {})
}

export function init() {
	registerVisit()
	const refresh = 60 // Refresh every 60 seconds
	setInterval(refreshVisitCount, refresh * 1000)
}
