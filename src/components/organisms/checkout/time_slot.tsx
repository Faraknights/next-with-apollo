import RadioProgression from '../../molecules/checkout/radioProgression';
import {Dispatch, SetStateAction, useEffect, useState} from 'react'
import useUser from '../../../lib/useUser';
import Layout from '../structure/layout';
import CustomButton from '../../atoms/general/customButton';
import { Basket } from '../../../interfaces/basket';
import InputDate from '../../atoms/general/inputDate';
import Router, { NextRouter } from 'next/router';
import { Schedule } from '../../../interfaces/commerce';
import { Login } from '../../../pages/api/login';

const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

interface TimeSlotPageProps{
	basket: Basket;
	setBasket: Dispatch<SetStateAction<Basket>>;
	setPurchaseProcessPage: Dispatch<SetStateAction<number>>
	router: NextRouter;
}

function toMinute(time: String) : number{
	return time.split(':').map(e=>parseInt(e))[0]*60+time.split(':').map(e=>parseInt(e))[1]
}

function fromMinute(time: number) : string{
	return ('0' + ~~(time/60)).slice(-2) + ":" + ('0' + time%60).slice(-2)
}

//Faire plusieurs créneaux par commerce
export default function TimeSlotPage(options: TimeSlotPageProps) {
	const {basket, setBasket, setPurchaseProcessPage, router} = options

	const [page, setPage] = useState(0);
	const timeGap = 20

	const [loading, setLoading] = useState(false)

	const min = new Date()
	let max = new Date()
	max.setDate(max.getDate() + 30)

	useEffect(() => {
		setPage(0)
	}, [router.query.stepCheckout])

  return (
		<div className="min-w-full h-full flex items-start overflow-hidden">
			{ basket.edges.map((basketCommerce, i) => {

				let scheduleDay
				let slots = [] as Array<number>
				if(basketCommerce){
					scheduleDay = basketCommerce.commerce.businessHours[days[new Date(basketCommerce.pickupDate).getDay()]] as Array<Schedule>
					if(scheduleDay && scheduleDay[0]){
						slots.push(toMinute(scheduleDay[0].opening))
						let j = 0
						for (let index = slots[0]; index <= toMinute(scheduleDay[scheduleDay.length-1].closing); index+=timeGap) {
							if(slots[slots.length-1] + timeGap <= toMinute(scheduleDay[j].closing)){
								slots = [...slots, index+timeGap]
							} else {
								j++
								if(j < scheduleDay.length)
									index = toMinute(scheduleDay[j].opening)
							}
						}
					}
				}

				return (
					<div 
						key={basketCommerce.commerce.id}
						className={'min-w-full flex flex-col items-center transition overflow-x-hidden'} 
						style={{transform: "translateX(-" + (page * 100).toString() + "%)"}}
					>
						<div className='flex flex-col bg-white w-1/2 shadow-md rounded-lg'>
							<span className='text-center my-4 text-xl'>Choix du créneau de retrait pour <b>{basketCommerce.commerce.name}</b></span>
							<div className='m-3 flex flex-col items-center'>
								<div className='flex justify-between w-full'>
									<div className='h-10'>
										{/* Bouton pour au jour précédent */}
										<button
											className='w-10 border border-gray-300'
											onClick={_ => {
												setBasket((currentBasket: any) => {
													let stateCopy =  {...currentBasket} as Basket
													stateCopy.edges[i].pickupDate = new Date(new Date(basketCommerce.pickupDate).setDate(new Date(basketCommerce.pickupDate).getDate() - 1))
													localStorage.setItem('basket', JSON.stringify(stateCopy))
													return stateCopy;
												});
											}}
										>
											<svg viewBox="0 0 24 24">
												<path fill="none" d="M0 0h24v24H0z"/>
												<path d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z"/>
											</svg>
										</button>
										{/* Bouton pour au jour Suivant */}
										<button 
											className='w-10 rotate-180 border border-gray-300 -translate-x-[1px]'
											onClick={_ => {
												setBasket((currentBasket: any) => {
													let stateCopy =  {...currentBasket} as Basket
													stateCopy.edges[i].pickupDate = new Date(new Date(basketCommerce.pickupDate).setDate(new Date(basketCommerce.pickupDate).getDate() + 1))
													localStorage.setItem('basket', JSON.stringify(stateCopy))
													return stateCopy;
												});
											}}
										>
											<svg viewBox="0 0 24 24">
												<path d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z"/>
											</svg>
										</button>
									</div>
									{/* Bouton de selection de date */}
									<InputDate 
										min={min}
										max={max}
										date={new Date(basketCommerce.pickupDate)}
										onChange={e => {
											setBasket((currentBasket: any) => {
												let stateCopy =  {...currentBasket} as Basket
												stateCopy.edges[i].pickupDate = new Date(new Date(stateCopy.edges[i].pickupDate).setFullYear(new Date(e.target.value).getFullYear()))
												stateCopy.edges[i].pickupDate = new Date(new Date(stateCopy.edges[i].pickupDate).setMonth(new Date(e.target.value).getMonth()))
												stateCopy.edges[i].pickupDate = new Date(new Date(stateCopy.edges[i].pickupDate).setDate(new Date(e.target.value).getDate()))
												localStorage.setItem('basket', JSON.stringify(stateCopy))
												return stateCopy;
											});
										}}
									/>
								</div>
							</div>
							<div className='flex flex-col items-center overflow-auto max-h-[450px]'>
								{ slots.length ? (
									<>
									<hr className='border-t w-11/12 my-2'/>
										{ slots.map(time => {
											const date = new Date(basketCommerce.pickupDate)
											date.setHours(parseInt(fromMinute(time).split(":")[0]))
											date.setMinutes(parseInt(fromMinute(time).split(":")[1]))
											date.setMilliseconds(0)
											date.setSeconds(0)
											return (
												<div key={time} className='w-full flex items-center flex-col'>
													<div className='flex justify-between w-11/12'>
														<span>{fromMinute(time)} - {fromMinute(time+timeGap)}</span>
														{date.toISOString() == new Date(basketCommerce.pickupDate).toISOString() ? (
															<span className='italic'>Sélectionné</span>
														) : (
															<button 
																className='underline text-primary-color'
																onClick={e => {
																	setBasket((currentBasket: any) => {
																		let stateCopy =  {...currentBasket} as Basket
																		stateCopy.edges[i].pickupDate = date
																		localStorage.setItem('basket', JSON.stringify(stateCopy))
																		return stateCopy;
																	});
																}}
															>Choisir ce créneau</button>
														)}
													</div>
													<hr className='border-t w-11/12 my-2'/>
												</div>
											)
										})}
									</>
								) : (
									<div className='italic m-5 flex flex-col items-center'>
										<span>Auncun créneau disponible sur cette journée</span>
										<span>Sélectionnez un autre jour pour retirer la commande</span>
									</div>
								)}
							</div>
						</div>
						<div className='flex my-4 w-1/2 justify-center'>
							{ i != 0 && (
								<div className='mr-2 w-1/4 flex flex-col'>
									<CustomButton
										label="Retour"
										color='lightGrey'
										onClick={() => {
											setPage(page-1)
										}}
									/>
								</div>
							)}
							<div className='mr-2 w-1/2 flex flex-col'>
								{ i + 1 == basket.edges.length ? (
									<CustomButton
										disabled={!(slots.length && slots.includes(toMinute(new Date(basketCommerce.pickupDate).getHours()+":"+new Date(basketCommerce.pickupDate).getMinutes())))}
										label="Payer"
										loading={loading}
										onClick={e => {
											setLoading(true)
											router.push(
												{pathname: '/commands/contact_information'}, 
												undefined, 
												{ shallow: true }
											)
											setPurchaseProcessPage(2)
											setLoading(false)
										}}
										color="secondaryColor"
									/>
								) : (
									<CustomButton
										label="Continuer"
										disabled={!(slots.length && slots.includes(toMinute(new Date(basketCommerce.pickupDate).getHours()+":"+new Date(basketCommerce.pickupDate).getMinutes())))}
										onClick={() => {
											setPage(page+1)
										}}
										color="secondaryColor"
									/>
								)}
							</div>
						</div>
					</div>
				)
			})}
		</div>
  )
}
