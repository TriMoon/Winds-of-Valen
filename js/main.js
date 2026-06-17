import { init as initVisits } from "./Visits.js"
import { init as initClock } from "./Clock.js"
import { init as initSteam } from "./Steam.js"
import { init as initGuestBook } from "./GuestBook.js"
import { init as initTranslations } from "./Translations.js"

function init() {
	initVisits()
	initClock()
	initSteam()
	initGuestBook()
	initTranslations()
}

globalThis.addEventListener("DOMContentLoaded", init)
