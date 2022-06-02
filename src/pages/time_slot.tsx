import Link from 'next/link';
import RadioProgression from '../components/atoms/commerce/radioProgression';
import {useEffect, useState} from 'react'
import useUser from '../lib/useUser';
import Layout from '../components/organisms/layout';
import CustomButton from '../components/atoms/customButton';
import { Basket } from '../interfaces/basket';
import InputDate from '../components/atoms/inputDate';
import { Day, Schedule } from '../interfaces/commerce';
import Router from 'next/router';

const days = ['sunday', 'monday', 'muesday', 'wednesday', 'thursday', 'friday', 'saturday'];

function toMinute(time: String) : number{
	return time.split(':').map(e=>parseInt(e))[0]*60+time.split(':').map(e=>parseInt(e))[1]
}

function fromMinute(time: number) : string{
	return ('0' + ~~(time/60)).slice(-2) + ":" + ('0' + time%60).slice(-2)
}

//Faire plusieurs créneaux par commerce
export default function listCommerces() {

	const [page, setPage] = useState(0);
	const timeGap = 15

	const [basket, setBasket] = useState({commerces: []} as Basket)
	const {user} = useUser()
	useEffect(() => {
		if(!user?.jwt){
			Router.push("/basket")
		}
		const newBasket = localStorage.getItem("basket")
		setBasket(JSON.parse(newBasket!))
  }, []);

	const min = new Date()
	let max = new Date()
	max.setDate(max.getDate() + 30)

  return (
		<Layout>
			<h1 className="m-5 mb-8">Créneaux</h1>
			<div className='w-1/2'>
				<RadioProgression structure={["Panier", "Créneaux",  "Coordonnées", "Confirmation"]} currentPos={2}/>
			</div>
			<div className="w-full h-full flex items-start">
				{ basket.commerces.map((commerce, i) => {
					let scheduleDay
					let slots = [] as Array<number>
					if(commerce){
						scheduleDay = commerce.businessHours[days[new Date(commerce.pickupDate).getDay()]] as Array<Day>
						if(scheduleDay && scheduleDay[0]){
							slots.push(toMinute(scheduleDay[0].opening))
							let j = 0
							for (let index = slots[0]; index <= toMinute(scheduleDay[scheduleDay.length-1].closing); index+=timeGap) {
								if(slots[slots.length-1] + timeGap <= toMinute(scheduleDay[j].closing)){
									slots = [...slots, index+15]
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
							key={commerce.id}
							className={'min-w-full flex flex-col items-center transition overflow-x-hidden'} 
							style={{transform: "translateX(-" + (page * 100).toString() + "%)"}}
						>
							<div className='flex flex-col bg-white w-1/2 shadow-md rounded-lg'>
								<span className='text-center my-4 text-xl'>Choix du créneau de retrait pour <b>{commerce.name}</b></span>
								<div className='m-3 flex flex-col items-center'>
									<div className='flex justify-between w-full'>
										<div className='h-10'>
											{/* Bouton pour au jour précédent */}
											<button
											  className='w-10 border border-gray-300'
												onClick={_ => {
													setBasket((currentBasket: any) => {
														let stateCopy =  {...currentBasket} as Basket
														stateCopy.commerces[i].pickupDate = new Date(new Date(commerce.pickupDate).setDate(new Date(commerce.pickupDate).getDate() - 1))
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
														stateCopy.commerces[i].pickupDate = new Date(new Date(commerce.pickupDate).setDate(new Date(commerce.pickupDate).getDate() + 1))
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
											date={new Date(commerce.pickupDate)}
											onChange={e => {
												setBasket((currentBasket: any) => {
													let stateCopy =  {...currentBasket} as Basket
													stateCopy.commerces[i].pickupDate = new Date(new Date(stateCopy.commerces[i].pickupDate).setFullYear(new Date(e.target.value).getFullYear()))
													stateCopy.commerces[i].pickupDate = new Date(new Date(stateCopy.commerces[i].pickupDate).setMonth(new Date(e.target.value).getMonth()))
													stateCopy.commerces[i].pickupDate = new Date(new Date(stateCopy.commerces[i].pickupDate).setDate(new Date(e.target.value).getDate()))
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
												const date = new Date(commerce.pickupDate)
												date.setHours(parseInt(fromMinute(time).split(":")[0]))
												date.setMinutes(parseInt(fromMinute(time).split(":")[1]))
												date.setMilliseconds(0)
												date.setSeconds(0)
												return (
													<div key={time} className='w-full flex items-center flex-col'>
														<div className='flex justify-between w-11/12'>
															<span>{fromMinute(time)} - {fromMinute(time+timeGap)}</span>
															{date.toISOString() == new Date(commerce.pickupDate).toISOString() ? (
																<span className='italic'>Sélectionné</span>
															) : (
																<button 
																	className='underline text-primary-color'
																	onClick={e => {
																		setBasket((currentBasket: any) => {
																			let stateCopy =  {...currentBasket} as Basket
																			stateCopy.commerces[i].pickupDate = date
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
										<div className='italic m-5'>Auncun créneau disponible sur cette journée</div>
									)}
								</div>
							</div>
							<div className='flex my-4'>
								{ i != 0 && (
									<div className='mr-2'>
										<CustomButton
											label="Retour"
											onClick={() => {
												setPage(page-1)
											}}
											color="red"
										/>
									</div>
								)}
								{ i + 1 == basket.commerces.length ? (
									<CustomButton
										disabled={!(slots.length && slots.includes(toMinute(new Date(commerce.pickupDate).getHours()+":"+new Date(commerce.pickupDate).getMinutes())))}
										label="Payer"
										onClick={e => Router.push("/contact_information")}
									/>
								) : (
									<CustomButton
										label="Continuer"
										disabled={!(slots.length && slots.includes(toMinute(new Date(commerce.pickupDate).getHours()+":"+new Date(commerce.pickupDate).getMinutes())))}
										onClick={() => {
											setPage(page+1)
										}}
									/>
								)}
							</div>
						</div>
					)
				})}
			</div>
		</Layout>
  )
}
