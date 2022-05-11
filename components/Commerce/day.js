export default function Day(options) {
    const { label: label, day : day } = options;
    let text = "";
    if(day.length){
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