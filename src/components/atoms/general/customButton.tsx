import { MouseEventHandler, ReactNode } from "react";
import Loading from "./loading";

interface customButtonProps {
	icon?: ReactNode
	loading? : boolean
	onClick?: MouseEventHandler<HTMLButtonElement>;
	disabled?: boolean;
	color?: "red" | "orange";
	label: String;
	submitButton?: boolean
}

export default function CustomButton(options : customButtonProps) {
	const {icon, onClick, disabled, color, label, submitButton, loading} = options
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
			{loading ? (
				<div className="flex items-center justify-center">
					<Loading
						background={color && color == "red" ? (
							disabled ? "bg-secondary-color-lightened" : "bg-secondary-color"
						) : (
							disabled ? "bg-primary-color-lightened" : "bg-primary-color"
						)}
						mode="black"
						size={20}
					/>
					<span className="ml-3">Chargment...</span>
				</div>
			) : (
				<div className="flex items-center">
					{icon}
					<span className={icon ? "ml-2" : ""}>{label}</span>
				</div>
			)}
		</button>
	)	  
}