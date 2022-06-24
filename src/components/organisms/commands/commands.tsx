import { CommandConnection, StatusCommand } from "../../../interfaces/commands"
import Card from "../../atoms/general/card"
import {getDate, getHours} from "../../../lib/dateToString"
import Tag from "../../atoms/general/tag"
import StatusTag from "../../molecules/commands/statusTag"

interface CommandsProps{
	commands : CommandConnection
}

export default function Commands (options: CommandsProps) {
	const {commands} = options
	const timeGap = 15

	return (
		<div className="flex flex-col items-center w-full">
			{commands.edges.filter(commandEdge => commandEdge.node.commerces.some(commerceCommand => commerceCommand.status != StatusCommand.DONE)).map((CommandEdge) => (
				<div className="w-1/2">
					<Card className="my-2">
							<div className="flex flex-col">
								<div className="flex items-center justify-between">
									<h3 className="text-gray-800 font-bold text-lg">Commande du {getDate({date: CommandEdge.node.creationDate})}</h3>
									<svg className="h-7 fill-gray-600" viewBox="0 0 24 24">
										<path d="M9.46967 5.46967C9.76256 5.17678 10.2374 5.17678 10.5303 5.46967L16.5303 11.4697C16.8232 11.7626 16.8232 12.2374 16.5303 12.5303L10.5303 18.5303C10.2374 18.8232 9.76256 18.8232 9.46967 18.5303C9.17678 18.2374 9.17678 17.7626 9.46967 17.4697L14.9393 12L9.46967 6.53033C9.17678 6.23744 9.17678 5.76256 9.46967 5.46967Z"/>
									</svg>
								</div>
								{CommandEdge.node.commerces.map(commerceCommand => (
									<div className="flex items-center justify-between">
										<div className="flex flex-col">
											<h4 className="text-black font-semibold mt-3">{commerceCommand.commerce.name}</h4>
											<span>{commerceCommand.commerce.address.number} {commerceCommand.commerce.address.route}</span>
											<span>{commerceCommand.commerce.address.postalCode} {commerceCommand.commerce.address.city}</span>
											<span>Collecte : {getDate({date: commerceCommand.pickupDate})} -{'>'} {getHours({date: commerceCommand.pickupDate})} - {getHours({date: new Date(new Date(commerceCommand.pickupDate).setMinutes(new Date(commerceCommand.pickupDate).getMinutes() + timeGap))})}</span>
										</div>
										<StatusTag status={commerceCommand.status}/>
									</div>
								))}
							</div>
					</Card>
				</div>
			))}
		</div>
	)
}