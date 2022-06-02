import { Schedule } from '../../../interfaces/commerce'
import DayUnit from '../../atoms/commerce/day'

export default function ScheduleItem( options: {businessHours : Schedule} ){
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