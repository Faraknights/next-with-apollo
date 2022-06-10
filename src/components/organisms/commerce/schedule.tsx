import { BusinessHours } from '../../../interfaces/commerce'
import DayUnit from '../../atoms/commerce/day'

interface ScheduleItemProps{
	businessHours: BusinessHours;
}

export default function ScheduleItem( options: ScheduleItemProps ){
	const {businessHours} = options
	return (
		<div>
			<DayUnit label="Lundi" day={businessHours.monday}/>
			<DayUnit label="Mardi" day={businessHours.tuesday}/>
			<DayUnit label="Mercredi" day={businessHours.wednesday}/>
			<DayUnit label="Jeudi" day={businessHours.thursday}/>
			<DayUnit label="Vendredi" day={businessHours.friday}/>
			<DayUnit label="Samedi" day={businessHours.saturday}/>
			<DayUnit label="Dimanche" day={businessHours.sunday}/>
		</div>
	)
}