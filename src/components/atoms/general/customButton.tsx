import { MouseEventHandler, ReactNode } from "react";
import Loading from "./loading";

interface customButtonProps {
	icon?: ReactNode
	loading? : boolean
	onClick?: MouseEventHandler<HTMLButtonElement>;
	disabled?: boolean;
	color?: "secondaryColor" | "primaryColor" | "lightGrey";
	label: string;
	submitButton?: boolean
}

export default function CustomButton(options : customButtonProps) {
	const {icon, onClick, disabled, color, label, submitButton, loading} = options
	let colors = ["text-white", "bg-primary-color-lightened", "bg-primary-color"]
	switch (color) {
		case "primaryColor":
			colors = ["text-white", "bg-primary-color-lightened", "bg-primary-color"]
			break;
		case "secondaryColor":
			colors = ["text-white", "bg-secondary-color-lightened", "bg-secondary-color"]
			break;
		case "lightGrey":
			colors = ["text-dark-grey", "bg-light-grey-2", "bg-light-grey-2"]
			break;
	
		default:
			break;
	}
	return (
		<button
			type={submitButton ? "submit": "button"}
			onClick={onClick}
			className={" p-2 px-4 rounded-lg " + colors[0] + (disabled ? " " + colors[1] + " cursor-default pointer-events-none" : " " + colors[2] )}
		>
			{loading ? (
				<div className="flex items-center justify-center">
					<Loading
						background={disabled ? colors[1] : colors[2]}
						mode="black"
						size={20}
					/>
					<span className="ml-3">Chargment...</span>
				</div>
			) : (
				<div className="flex items-center justify-center">
					{icon}
					<span className={icon ? "ml-2" : ""}>{label}</span>
				</div>
			)}
		</button>
	)	  
}