interface RadioProgressionProps {
	currentPos: number;
	structure: String[];
}

export default function RadioProgression({currentPos, structure} : RadioProgressionProps) {
	return (
		<div className="h-[3px] bg-primary-color-lightened w-full relative mb-10">
			<div className="absolute w-full flex">
				{ structure.map((name, i) => i + 1 >= structure.length || (
					<div key={name + i.toString()} className="w-full h-[3px]">
						{ ((i < currentPos - 1) && 
							<div className="w-full h-full bg-primary-color"/>
						) || (
							<div className="w-full h-full bg-primary-color-lightened"/>
						)} 
					</div>
				))}
			</div>
			<div className="absolute w-full flex justify-between">
				{ structure.map((name, i) => (
					<div key={name + i.toString()}>
						{ ((i+1 <= currentPos) && 
							<div className="-translate-y-1/2 h-8 w-8 bg-primary-color rounded-full flex items-center justify-center relative">
								<span className="absolute top-8">{name}</span>
								<div className="h-[28px] w-[28px] bg-white rounded-full flex items-center justify-center">
									<div className="h-5 w-5 bg-primary-color rounded-full flex items-center justify-center"/>
								</div>
							</div> 
						) || ( 
							<div className="-translate-y-1/2 h-8 w-8 bg-primary-color-lightened rounded-full flex items-center justify-center relative">
								<span className="absolute top-8">{name}</span>
							</div> 
						)} 
					</div>
				))}
			</div>
		</div>
	)	  
}