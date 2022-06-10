import { ChangeEventHandler } from "react";
import {getDate} from '../../lib/dateToString'

interface InputDateProps {
	min: Date;
	max: Date;
	date?: Date;
	onChange: ChangeEventHandler<HTMLInputElement>
}

export default function InputDate(options : InputDateProps) {
	const {min, max, date, onChange} = options
	return (
		<div className='grid grid-cols-1 grid-rows-1 rounded overflow-hidden'>
			<input
				onChange={onChange}
				style={{gridColumn:1, gridRow:1}}
				className='h-full'
				type="date" 
				min={min.getFullYear() + "-" + (min.getMonth()+1) + "-" + min.getDate()}
				max={max.getFullYear() + "-" + (max.getMonth()+1) + "-" + max.getDate()}
			/>
			<label 
				style={{gridColumn:1, gridRow:1}}
				className='px-4 h-full w-full pointer-events-none bg-primary-color flex items-center justify-center text-white text'
			>{getDate({date, spaced: true})}</label>
		</div>
	)	  
}