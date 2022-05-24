import Header from '../components/organisms/header';
import Link from 'next/link';
import RadioProgression from '../components/atoms/commerce/radioProgression';
import {useState} from 'react'

const timeSlotsStructure = [
	{
		name : "test",
		selected: -1,
		slots: [{
			beginning: "12:30",
			ending: "13:30"
		},{
			beginning: "13:30",
			ending: "14:30"
		},]
	},{
		name : "test",
		selected: -1,
		slots: [{
			beginning: "12:30",
			ending: "13:30"
		}]
	},
]

//Faire plusieurs créneaux par commerce
export default function listCommerces() {

	const [page, setPage] = useState(0);
	const [slots, setSlots] = useState(timeSlotsStructure);
	console.log("test")

  return (
	<main className="h-full w-full flex items-center justify-center bg-[#fafafe] flex-col">
	  <Header/>
	  <h1 className="m-5">baskets</h1>
		<div className='w-1/2'>
			<RadioProgression structure={["Panier", "Créneaux",  "Coordonnées", "Confirmation"]} currentPos={2}/>
		</div>
	  <div className="w-full h-full flex  items-start">
			{ slots.map((store, i) => (
				<div className={'min-w-full flex flex-col items-center transition'} style={{transform: "translateX(-" + (page * 100).toString() + "%)"}}>
					<div className='flex flex-col bg-white w-1/2 shadow-md rounded-lg'>
						<span className='text-center'>choix du créneau pour le commerce {store.name}</span>
						{ store.slots.map((slot, j) => (
							<div className='flex p-2 justify-between'>
								<span>{slot.beginning} - {slot.ending}</span>
								{( store.selected == j &&(
									<span className='cursor-default font-bold italic text-gray-700'>Sélectionné</span>
								)) || (
									<a 
										className='underline text-orange-400 cursor-pointer'
										onClick={() => {
											setSlots((slots => {
												let slotsCopy = [...slots];
												slotsCopy[i].selected = j
												return slotsCopy
											}))
										}}
									>
										Choisir ce créneau
									</a>
								)}
							</div>
						))}
					</div>
					<div className='flex'>
						{ i != 0 && (
							<button 
								className=" mt-4 p-2 bg-gray-300 rounded-lg text-white mr-2"
								onClick={() => {
									setPage(page-1)
								}}
							>
								Retour
							</button>
						)}
						{ (i + 1 == timeSlotsStructure.length && (
							<Link href={"/contact_information"}>
								<a>
									<button className=" mt-4 p-2 bg-orange-400 rounded-lg text-white" >Payer</button>
								</a>
							</Link>
						)) || (
							<button 
								className=" mt-4 p-2 bg-orange-400 rounded-lg text-white"
								onClick={() => {
									setPage(page+1)
								}}
							>
								Continuer
							</button>
						)}
					</div>
				</div>
			))}
	  </div>
	</main>
  )
}
