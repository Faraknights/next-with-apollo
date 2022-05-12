export default function description (options: {label : string}) {
    const {label} = options
    return (
        <>
            { (label && (
                <div>{label}</div>
            )) || (
                <div className="italic text-gray-500">Pas de description</div>
            )}
        </>
    )
}