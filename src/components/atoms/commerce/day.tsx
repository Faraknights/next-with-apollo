export interface DayProps{
    opening: string;
    closing: string;
}

export default function Day(options : {label : string, day : Array<DayProps>}) {
    const { label: label, day : day } = options;
    let text = "";
    if(day && day.length){
        text = day[0].opening + " - " + day[0].closing;
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