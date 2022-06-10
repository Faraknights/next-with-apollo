interface LoadingProps{
	size: number;
	background?: string;
	mode? : "white" | "black"
}

export default function Loading (options : LoadingProps) {
	const {size, background, mode} = options

	return (
		<div style={{height: size, width: size}} className={"h-full w-full rounded-full flex items-center justify-center relative overflow-hidden"}>
			<div style={{
				background: mode && mode == "black" ? "conic-gradient(rgba(0,0,0,0), white)" : "conic-gradient(rgba(0,0,0,0), grey)", 
				clipPath: "polygon(0 0, 20% 0, 50% 40%, 80% 0, 100% 0, 100% 100%, 0 100%) "
			}} className="w-full h-full absolute left-0 right-0 top-0 bottom-0 rotating"></div>
			<div className={"w-4/6 h-4/6 rounded-full z-10 " + (background ? background: "bg-white")}></div>
		</div>
	)
}