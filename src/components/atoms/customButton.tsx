import { MouseEventHandler } from "react";

interface customButtonProps {
	onClick?: MouseEventHandler<HTMLButtonElement>;
	disabled?: boolean;
	color?: "red" | "orange";
	label: String;
	submitButton?: boolean
}

export default function CustomButton(options : customButtonProps) {
	const {onClick, disabled, color, label, submitButton} = options
	return (
		<button
			type={submitButton ? "submit": "button"}
			onClick={onClick}
			className={ color && color == "red" ? 
				"p-2 rounded-lg text-white" + (disabled ? ' bg-secondary-color-lightened cursor-default pointer-events-none' : ' bg-secondary-color' )
			:
				"p-2 rounded-lg text-white" + (disabled ? ' bg-primary-color-lightened cursor-default pointer-events-none' : ' bg-primary-color' )
			}
		>
			{label}
		</button>
	)	  
}