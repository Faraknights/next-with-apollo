import Day from '../../molecules/commerce/day'

export default function schedule( options ){
    const {businessHours} = options
    return (
        <div>
            <Day label="Lundi" day={businessHours.monday}/>
            <Day label="Mardi" day={businessHours.tuesday}/>
            <Day label="Mercredi" day={businessHours.wednesday}/>
            <Day label="Jeudi" day={businessHours.thursday}/>
            <Day label="Vendredi" day={businessHours.friday}/>
            <Day label="Samedi" day={businessHours.saturday}/>
            <Day label="Dimanche" day={businessHours.sunday}/>
        </div>
    )
}