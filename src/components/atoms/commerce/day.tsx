import { Day } from "../../../interfaces/commerce";

export default function DayUnit(options : {label : string, day : Array<Day>}) {
	const { label: label, day : day } = options;
	let text = "";
	if(day && day.length){
		text = day.map(e => e.opening + " - " + e.closing).join(' . ')
	} else {
		text = "Fermé"
	}

	return (
		<div className="grid grid-cols-[150px_1fr]">
			<span className="font-semibold">{label}</span>
			<span>{text}</span>
		</div>
	)	  
}