import { ChangeEventHandler } from "react";

interface customButtonProps {
	value: any
	name: string
	onChange?: ChangeEventHandler<HTMLInputElement>
	currentValue: any
	size?: number
}

export default function CustomRadio(options : customButtonProps) {
	const {value, name, onChange, currentValue, size} = options

	return (
		<div style={{height: size || 20, width: size || 20}} className="relative">
			<input 
				type="radio" 
				className="absolute h-full w-full cursor-pointer"
				value={value}
				onChange={onChange}
				name={name}
				checked={currentValue == value}
			/>
			{currentValue == value ? (
				<div className="absolute h-full w-full bg-secondary-color pointer-events-none rounded-full flex items-center justify-center">
					<div className="w-[86%] bg-white h-[86%] rounded-full flex items-center justify-center">
						<div className="w-[80%] bg-secondary-color h-[80%] rounded-full"/>
					</div>
				</div>
			) : (
				<div className="absolute h-full w-full bg-secondary-color pointer-events-none rounded-full flex items-center justify-center">
					<div className="w-[86%] bg-white h-[86%] rounded-full"/>
				</div>
			)}
		</div>
	)	  
}