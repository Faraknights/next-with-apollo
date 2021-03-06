/**
 * Retourne le slug de la chaîne
 * @param {string} string 
 * @returns {string}
 */
export default function (string: string) {
	string = string.replace(/^\s+|\s+$/g, ''); // trim
	string = string.toLowerCase();
  
	// remove accents, swap ñ for n, etc
	var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
	var to   = "aaaaeeeeiiiioooouuuunc------";
	for (var i=0, l=from.length ; i<l ; i++) {
		string = string.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
	}

	string = string.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
		.replace(/\s+/g, '-') // collapse whitespace and replace by -
		.replace(/-+/g, '-'); // collapse dashes

	return string;
}