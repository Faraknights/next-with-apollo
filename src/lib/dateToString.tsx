/**
 * Converti la valeur unit en une unité lisible
 * @param unit string
 * @returns libellé de l'unité
 */
interface dateToString{
	date : Date;
	spaced? : boolean
}

export function getDate (options: dateToString) {
	const {date, spaced} = options
	let string = ""
	if(date){
		string += `${('0' + new Date(date).getDate()).slice(-2)}${spaced ? " / " : "/"}`
		string += `${('0' + (new Date(date).getMonth() + 1)).slice(-2)}${spaced ? " / " : "/"}`
		string += `${('0' + new Date(date).getFullYear()).slice(-2)}`
	} else {
		string += `--${spaced ? " / " : "/"}`
		string += `--${spaced ? " / " : "/"}`
		string += `----`
	}
	return string
}

export function getHours (options: dateToString) {
	const {date, spaced} = options
	let string = ""
	if(date){
		string += `${('0' + new Date(date).getHours()).slice(-2)}${spaced ? " : " : ":"}`
		string += `${('0' + new Date(date).getMinutes()).slice(-2)}`
	} else {
		string += `--${spaced ? " / " : "/"}`
		string += `--${spaced ? " / " : "/"}`
		string += `----`
	}
	return string
}