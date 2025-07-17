import { supabase } from "./supabase"

interface Ephemeris {
	date: string
	title: string
	description: string
	category: string
	year?: number
	constellation?: string
	magnitude?: number
}

// Tipo para los datos de Supabase
interface SupabaseEphemeris {
	id: number
	day: number
	month: number
	year: number
	event: string
	display_date: string
	historical_day?: number
	historical_month?: number
	historical_year?: number
	created_at: string
	updated_at: string
}

const ephemerisData: Ephemeris[] = [
	{
		date: "01-01",
		title: "Conjunción de Júpiter y Saturno",
		description:
			"En esta fecha histórica, Júpiter y Saturno aparecen muy cerca en el cielo nocturno, un evento conocido como la 'Gran Conjunción' que ocurre aproximadamente cada 20 años.",
		category: "Conjunción Planetaria",
		year: 2020,
		constellation: "Acuario",
		magnitude: -2.0,
	},
	{
		date: "01-02",
		title: "Perihelio de la Tierra",
		description:
			"La Tierra alcanza su punto más cercano al Sol en su órbita elíptica, aproximadamente 147 millones de kilómetros. Paradójicamente, esto ocurre durante el invierno en el hemisferio norte.",
		category: "Evento Orbital",
		year: 2024,
	},
	{
		date: "01-03",
		title: "Lluvia de meteoros Cuadrántidas",
		description:
			"Una de las lluvias de meteoros más intensas del año, con hasta 120 meteoros por hora en su pico. Originada por los restos del asteroide 2003 EH1.",
		category: "Lluvia de Meteoros",
		constellation: "Boyero",
	},
	{
		date: "01-04",
		title: "Descubrimiento de Ceres",
		description:
			"Giuseppe Piazzi descubrió Ceres, el primer asteroide conocido y ahora clasificado como planeta enano, desde el Observatorio de Palermo en Sicilia.",
		category: "Descubrimiento",
		year: 1801,
		constellation: "Tauro",
	},
	{
		date: "01-05",
		title: "Lanzamiento del Surveyor 7",
		description:
			"La NASA lanzó la sonda Surveyor 7, la última de la serie Surveyor, que aterrizó cerca del cráter Tycho en la Luna para estudiar su composición.",
		category: "Exploración Espacial",
		year: 1968,
	},
	{
		date: "01-06",
		title: "Descubrimiento de las lunas de Júpiter",
		description:
			"Galileo Galilei observó por primera vez las cuatro lunas más grandes de Júpiter: Ío, Europa, Ganimedes y Calisto, conocidas como las lunas galileanas.",
		category: "Descubrimiento Histórico",
		year: 1610,
		constellation: "Géminis",
	},
	{
		date: "01-07",
		title: "Oposición de Marte",
		description:
			"Marte se encuentra en oposición, apareciendo más brillante y grande en el cielo nocturno. Es el momento ideal para la observación del planeta rojo.",
		category: "Oposición Planetaria",
		constellation: "Cáncer",
		magnitude: -1.6,
	},
]

// Función para convertir datos de Supabase al formato esperado
function convertSupabaseToEphemeris(supabaseData: SupabaseEphemeris): Ephemeris {
	const month = String(supabaseData.month).padStart(2, "0")
	const day = String(supabaseData.day).padStart(2, "0")

	// Extraer título y descripción del campo event
	const eventParts = supabaseData.event.split(" - ")
	const title = eventParts[0]
	const baseDescription = eventParts.length > 1 ? eventParts[1] : eventParts[0]

	// Obtener el año histórico para mostrar
	const historicalYear = supabaseData.historical_year || supabaseData.year

	// Array de nombres de meses en español
	const monthNames = [
		"enero",
		"febrero",
		"marzo",
		"abril",
		"mayo",
		"junio",
		"julio",
		"agosto",
		"septiembre",
		"octubre",
		"noviembre",
		"diciembre",
	]

	// Formatear la descripción con el formato solicitado: "El [día] de [mes] de [año], [descripción]"
	const monthIndex = (supabaseData.historical_month || supabaseData.month) - 1
	const monthName = monthNames[monthIndex]
	const historicalDay = supabaseData.historical_day || supabaseData.day
	const formattedDescription = `El ${historicalDay} de ${monthName} de ${historicalYear}, ${baseDescription.toLowerCase()}`

	// Determinar categoría basada en el contenido del evento
	let category = "Efeméride Astronómica"
	const titleLower = title.toLowerCase()

	if (titleLower.includes("conjunción")) {
		category = "Conjunción Planetaria"
	} else if (titleLower.includes("lluvia") || titleLower.includes("meteoros")) {
		category = "Lluvia de Meteoros"
	} else if (titleLower.includes("oposición")) {
		category = "Oposición Planetaria"
	} else if (
		titleLower.includes("alunizaje") ||
		titleLower.includes("caminata lunar") ||
		titleLower.includes("apollo")
	) {
		category = "Exploración Espacial"
	} else if (titleLower.includes("descubrimiento")) {
		category = "Descubrimiento Histórico"
	} else if (
		titleLower.includes("lanzamiento") ||
		titleLower.includes("misión") ||
		titleLower.includes("telescopio")
	) {
		category = "Exploración Espacial"
	}

	return {
		date: `${month}-${day}`,
		title: title,
		description: formattedDescription,
		category: category,
		year: historicalYear,
	}
}
export async function getEphemerisForDate(date: Date): Promise<Ephemeris> {
	const month = date.getMonth() + 1
	const day = date.getDate()

	try {
		// Buscar efemérides que coincidan con el mes y día actual
		const { data, error } = await supabase
			.from("ephemerides")
			.select("*")
			.eq("month", month)
			.eq("day", day)
			.limit(1)

		if (error) {
			console.error("Error fetching ephemeris:", error)
			return getFallbackEphemeris(date)
		}

		if (data && data.length > 0) {
			return convertSupabaseToEphemeris(data[0])
		}

		// Si no hay datos para esta fecha, buscar por display_date
		const displayDate = `${date.getFullYear()}-${String(month).padStart(2, "0")}-${String(
			day
		).padStart(2, "0")}`
		const { data: displayData, error: displayError } = await supabase
			.from("ephemerides")
			.select("*")
			.eq("display_date", displayDate)
			.limit(1)

		if (displayError) {
			console.error("Error fetching ephemeris by display_date:", displayError)
			return getFallbackEphemeris(date)
		}

		if (displayData && displayData.length > 0) {
			return convertSupabaseToEphemeris(displayData[0])
		}

		// Si no hay datos específicos, devolver fallback
		return getFallbackEphemeris(date)
	} catch (error) {
		console.error("Error connecting to Supabase:", error)
		return getFallbackEphemeris(date)
	}
}

// Función fallback que devuelve datos estáticos si no hay conexión a la BD
function getFallbackEphemeris(date: Date): Ephemeris {
	const month = String(date.getMonth() + 1).padStart(2, "0")
	const day = String(date.getDate()).padStart(2, "0")
	const dateKey = `${month}-${day}`

	const ephemeris = ephemerisData.find((e) => e.date === dateKey)

	if (ephemeris) {
		return ephemeris
	}

	// Fallback para fechas sin datos específicos
	const fallbackIndex = (date.getMonth() * 31 + date.getDate()) % ephemerisData.length
	return ephemerisData[fallbackIndex]
}

export async function getAllEphemeris(): Promise<Ephemeris[]> {
	try {
		const { data, error } = await supabase
			.from("ephemerides")
			.select("*")
			.order("month")
			.order("day")

		if (error) {
			console.error("Error fetching all ephemeris:", error)
			return ephemerisData
		}

		if (data) {
			return data.map(convertSupabaseToEphemeris)
		}

		return ephemerisData
	} catch (error) {
		console.error("Error connecting to Supabase:", error)
		return ephemerisData
	}
}
