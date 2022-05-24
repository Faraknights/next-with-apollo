import { Dispatch, SetStateAction } from "react";

interface InputForm {
	inputName: String;
	placeholder?: String;
	label?: String;
	inputState: any;
	inputSetState: Dispatch<SetStateAction<any>>
}

export default function InputForm(options : InputForm) {
	const {inputName, placeholder, label, inputState, inputSetState} = options
	return (
		<div className='flex flex-col m-2'>
			<label htmlFor={inputName.toString()}>{label ? label.toString() : ""}</label>
			<input 
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
				className='border border-gray-300 border-solid outline-none p-2 rounded-lg' 
			/>
		</div>
	)	  
}