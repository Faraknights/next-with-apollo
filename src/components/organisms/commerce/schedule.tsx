import Day from '../../atoms/commerce/day'
import {DayProps} from '../../atoms/commerce/day'

export interface ScheduleProps {
	monday: Array<DayProps>;
	tuesday: Array<DayProps>;
	wednesday: Array<DayProps>;
	thursday: Array<DayProps>;
	friday: Array<DayProps>;
	saturday: Array<DayProps>;
	sunday: Array<DayProps>;
}

export default function schedule( options: {businessHours : ScheduleProps} ){
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