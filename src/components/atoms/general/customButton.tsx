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
	unfilled?: boolean
}

interface colorProps {
	text: {
		default: string;
		unfilled: string;
		unfilledDisable: string;
	}
	background: {
		default: string;
		defaultDisable: string;
		unfilled: string;
	}
	fill: {
		default: string;
		unfilled: string;
		unfilledDisable: string;
	}
	border: {
		default: string;
		unfilled: string;
		unfilledDisable: string;
	}
}

export default function CustomButton(options : customButtonProps) {
	const {icon, onClick, disabled, color, label, submitButton, loading, unfilled} = options
	let colors = {
		text: {
			default: "text-white",
			unfilled: "text-primary-color",
			unfilledDisable: "text-primary-color-lightened"
		},
		background: {
			default: "bg-primary-color",
			defaultDisable: "bg-primary-color-lightened",
			unfilled: "bg-white"
		},
		fill: {
			default: "fill-white",
			unfilled: "fill-primary-color",
			unfilledDisable: "fill-primary-color-lightened"
		},
		border: {
			default: "border-none",
			unfilled: "border-primary-color",
			unfilledDisable: "border-primary-color-lightened"
		}
	} as colorProps
		
	switch (color) {
		case "secondaryColor":
			colors.text.unfilled = "text-secondary-color"
			colors.text.unfilledDisable = "text-secondary-color-lightened"
			colors.background.default = "bg-secondary-color"
			colors.background.defaultDisable = "bg-secondary-color-lightened"
			colors.fill.unfilled = "fill-secondary-color"
			colors.fill.unfilledDisable = "fill-secondary-color-lightened"
			colors.border.unfilled = "border-secondary-color"
			colors.border.unfilledDisable = "border-secondary-color-lightened"
			break;
		case "lightGrey":
			colors.text.unfilled = "text-light-grey-3"
			colors.text.unfilledDisable = "text-light-grey-2"
			colors.background.default = "bg-light-grey-3"
			colors.background.defaultDisable = "bg-light-grey-2"
			colors.fill.unfilled = "fill-light-grey-3"
			colors.fill.unfilledDisable = "fill-light-grey-2"
			colors.border.unfilled = "border-light-grey-3"
			colors.border.unfilledDisable = "border-light-grey-2"
			break;
	}
	return (
		<button
			type={submitButton ? "submit": "button"}
			onClick={onClick}
			className={" p-2 px-4 rounded-lg border "
			 + (!!disabled ? "cursor-default pointer-events-none " + colors.background.defaultDisable : colors.background.default)
			 + (!!unfilled ? colors.background.unfilled + " " : " ")
			 + (!!unfilled ? ( !!disabled ? colors.text.unfilledDisable + " " : colors.text.unfilled + " " ) : colors.text.default + " ")
			 + (!!unfilled ? ( !!disabled ? colors.border.unfilledDisable : colors.border.unfilled ) : colors.border.default)
			}
		>
			{loading ? (
				<div className="flex items-center justify-center">
					<Loading
						background={(!!unfilled ? colors.background.unfilled : (!!disabled ? colors.background.defaultDisable : colors.background.default))}
						mode="black"
						size={20}
					/>
					<span className="ml-3">Chargment...</span>
				</div>
			) : (
				<div className="flex items-center justify-center">
					{icon && (
						<div className={"h-4 w-4 " + (!!unfilled ? (!!disabled ? colors.fill.unfilledDisable : colors.fill.unfilled) : colors.fill.default)}>
							{icon}
						</div>
					)}
					<span className={icon ? "ml-2" : ""}>{label}</span>
				</div>
			)}
		</button>
	)	  
}