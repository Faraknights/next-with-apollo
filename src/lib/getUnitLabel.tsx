/**
 * Converti la valeur unit en une unité lisible
 * @param unit string
 * @returns libellé de l'unité
 */
 export default (unit: String) => {
	switch (unit) {
		case 'unit':
			return 'pièce'
		case 'gramme':
			return 'gramme'
	}
}