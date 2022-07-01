import Router from "next/router";
import { ReactNode } from "react";

interface RadioProgressionProps {
	currentPos: number;
	structure: Array<{
		label: string
		link: string
	}>;
}

export default function RadioProgression({currentPos, structure} : RadioProgressionProps) {
	return (
		<div className="h-[3px] bg-primary-color-lightened w-full relative my-10 mb-14">
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
				{ structure.map((onglet, i) => (
					<div key={onglet.label + i.toString()}>
						{(() : ReactNode => {
							switch (true) {
								case i+1 < currentPos:
									return (
										<div className="-translate-y-1/2 h-8 w-8 bg-primary-color rounded-full flex items-center justify-center relative cursor-pointer" onClick={e => {
											Router.push(onglet.link)
										}} >
											<span className="absolute top-8">{onglet.label}</span>
										</div>
									)
								case i+1 <= currentPos:
									return (
										<div className="-translate-y-1/2 h-8 w-8 bg-primary-color rounded-full flex items-center justify-center relative">
											<span className="absolute top-8">{onglet.label}</span>
											<div className="h-[28px] w-[28px] bg-white rounded-full flex items-center justify-center">
												<div className="h-5 w-5 bg-primary-color rounded-full flex items-center justify-center"/>
											</div>
										</div> 
									)
								default:
									return (
										<div className="-translate-y-1/2 h-8 w-8 bg-primary-color-lightened rounded-full flex items-center justify-center relative">
											<span className="absolute top-8">{onglet.label}</span>
										</div> 
									)
							}
						})()}
					</div>
				))}
			</div>
		</div>
	)	  
}