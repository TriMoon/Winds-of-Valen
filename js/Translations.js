function changeLang(lang) {
	// Set default language if no language is provided
	if (!lang) {
		// Check the user's browser language
		switch (navigator.language) {
			case "en":
				lang = "en"
				break
			case "de":
				lang = "de"
				break
			case "fr":
				lang = "fr"
				break
			// set the default language if the browser language is not supported
			default:
				lang = "en"
		}
	}

	// Dynamically fetch the Multi-language translation dictionary
	import(`../trans/${lang}.json`, {
		with: { type: "json" },
	}).then(
		(module) => {
			// Access the default export from the JSON module to get the translation dictionary
			const translation = module.default
			// Update active button layout state
			document.querySelectorAll(".lang-selector > .lang-btn").forEach(
				(button) => {
					const buttonLang = button.getAttribute("data-lang")
					if (buttonLang === lang) {
						button.classList.add("active")
					} else {
						button.classList.remove("active")
					}
				},
			)

			// Translate standard dataset text keys
			document.querySelectorAll("[data-key]").forEach(
				(el) => {
					const key = el.getAttribute("data-key")
					if (translation[key]) {
						el.innerHTML = translation[key]
					}
				},
			)

			// Translate custom layout structures (tickers, tables, complex structures)
			document.getElementById("ticker-text").innerText = translation["ticker"]
			document.getElementById("dyk-content").innerHTML = translation["dyk-html"]
			document.getElementById("updates-table-body").innerHTML =
				translation["updates-html"].join("")
		},
	)
		.catch((err) => {
			console.error(`Error loading translation: ${lang}`, err)
			alert(
				`Failed to load language translation '${lang}'. Please try again.`,
			)
		})
}

export function init() {
	changeLang() // Initialize with default language
	// Add event listeners to language buttons
	document.querySelectorAll(".lang-selector > .lang-btn").forEach(
		(button) => {
			const buttonLang = button.getAttribute("data-lang")
			button.addEventListener("click", () => {
				changeLang(buttonLang)
			})
		},
	)
}
