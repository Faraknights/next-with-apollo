import { Dispatch, FocusEventHandler, SetStateAction } from "react";

interface InputFormProps {
	inputName: String;
	placeholder?: String;
	label?: String;
	inputState: any;
	inputSetState: Dispatch<SetStateAction<any>>;
	onFocus?: FocusEventHandler<HTMLInputElement>
}

export default function InputForm(options : InputFormProps) {
	const {inputName, placeholder, label, inputState, inputSetState, onFocus} = options
	return (
		<div className='flex flex-col my-2 w-full'>
			<label className="text-bodyLarge font-medium text-dark-grey" htmlFor={inputName.toString()}>{label ? label.toString() : ""}</label>
			<input 
				onFocus={onFocus}
				type={inputName.toString()}
				id={inputName.toString()}
				name={inputName.toString()}
				placeholder={placeholder ? placeholder.toString() : ""}
				value={inputState}
				onChange={e => {
					inputSetState((currentState: any) => {
						let stateCopy =  {...currentState}
						stateCopy[inputName.toString()] = e.target.value
						return stateCopy;
					});
				}}
				className='border border-gray-300 border-solid outline-none p-2 rounded-lg w-full' 
			/>
		</div>
	)	  
}