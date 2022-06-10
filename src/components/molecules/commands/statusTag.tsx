import { ReactNode } from "react";
import { StatusCommand } from "../../../interfaces/commands";
import Tag from "../../atoms/general/tag";

interface StatusTagProps{
	status: StatusCommand;
}

export default function StatusTag (options : StatusTagProps) {
	const {status} = options
	let tag = <></>
	switch (status) {
		case StatusCommand.INPROGRESS:
			tag = (
				<Tag>
					<svg viewBox="0 0 367.136 367.136" className="w-[14px] fill-white my-2 mr-2">
						<path d="M336.554,86.871c-11.975-18.584-27.145-34.707-44.706-47.731L330.801,0H217.436v113.91L270.4,60.691
							c40.142,28.131,65.042,74.724,65.042,124.571c0,83.744-68.13,151.874-151.874,151.874S31.694,269.005,31.694,185.262
							c0-58.641,32.781-111.009,85.551-136.669l-13.119-26.979C73.885,36.318,48.315,59.1,30.182,87.494
							c-18.637,29.184-28.488,62.991-28.488,97.768c0,100.286,81.588,181.874,181.874,181.874s181.874-81.588,181.874-181.874
							C365.442,150.223,355.453,116.201,336.554,86.871z"/>
					</svg>
					<span className="whitespace-nowrap">En cours</span>
				</Tag>
			)
			return tag
		case StatusCommand.READY:
			tag = (
				<Tag>
					<svg viewBox="0 0 405.272 405.272" className="w-[14px] fill-white my-2 mr-2">
						<path d="M393.401,124.425L179.603,338.208c-15.832,15.835-41.514,15.835-57.361,0L11.878,227.836
							c-15.838-15.835-15.838-41.52,0-57.358c15.841-15.841,41.521-15.841,57.355-0.006l81.698,81.699L336.037,67.064
							c15.841-15.841,41.523-15.829,57.358,0C409.23,82.902,409.23,108.578,393.401,124.425z"/>
					</svg>
					<span className="whitespace-nowrap">Prête</span>
				</Tag>
			)
			return tag
		case StatusCommand.DONE:
			
			return tag
	}
}