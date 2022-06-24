import { useEffect, useState } from "react";

interface LoadingProps{
	size: number;
	time: number;
	callback: Function;
}

export default function Timer (options : LoadingProps) {
	const {size, time, callback} = options

	const [timer, setTimer] = useState(time)

	useEffect(() => {
		if(timer == 0){
			callback()
		} else {
			setTimeout(() => {
				setTimer(timer - 1)
			}, 1000);
		}
	}, [timer])
	
	return (
		<div
			style={{
				height: size,
				width: size
			}} 
			className="relative"
		>
			<svg 
				viewBox="0 0 100 100" 
				className={"stroke-light-grey-2 stroke-[15px] overflow-visible h-full w-full absolute top-0 bottom-0 left-0 right-0 fill-transparent"}
			>
				<path d="M 50 96 a 46 46 0 0 1 0 -92 46 46 0 0 1 0 92" />
			</svg>
			<svg 
				viewBox="0 0 100 100" 
				style={{
					strokeDasharray: 288.5,
					transform: "rotate(270deg)",
					strokeLinecap: "round",
					transformOrigin: `${size/2}px ${size/2}px`,
					animation: `pathStroke ${time}s linear`
				}} 
				className={"stroke-[#63D266] stroke-[15px] overflow-visible path h-full w-full absolute top-0 bottom-0 left-0 right-0 fill-transparent"}
			>
				<path d="M 50 96 a 46 46 0 0 1 0 -92 46 46 0 0 1 0 92" />
			</svg>
			<div className="flex items-center justify-center absolute h-full w-full text-title-2">
				{timer}
			</div>
		</div>
	)
}