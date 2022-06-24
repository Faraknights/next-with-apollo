import React, { useCallback, useEffect, useRef, useState } from 'react';
import InputForm from '../../atoms/general/inputForm';
import CustomButton from '../../atoms/general/customButton';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../../graphql/user';
import { ChangesUser, User } from '../../../interfaces/user';
import { ChangesAddress } from '../../../interfaces/map';
import clientWithHeader from '../../../apollo/clientWithHeader';
import { v4 } from "uuid"

interface AddressPageProps{
	user: User;
}

export default function AddressPage(options : AddressPageProps) {
	const {user} = options
	const [sessionToken] = useState(v4())
	const [predictions, setPredictions] = useState([])

	const [inputform, setInputForm] = useState({
		number: "",
		route: "",
		optionalRoute:"",
		postalCode:"",
		city:"",
	} as ChangesAddress)
	const [addressInput, setAddressInput] = useState('')

  const [isLoading, setIsLoading] = useState(false);
	const updateUser = async () => {
		if(user.addresses){
			const addresses = [...user.addresses, inputform] as ChangesAddress
			try {
				const data = await clientWithHeader.mutate({
					mutation: UPDATE_USER,
					variables: {
						id: user.id,
						input: {
							addresses: addresses
						},
					},
				}) as User;
			} catch (err) {}
		}
	};
	const [update, setUpdate] = useState(false)
	useEffect(() => {
		updateUser()
	}, [update])
	


	function useOutsideAlerter(ref) {
		useEffect(() => {
			/**
			 * Alert if clicked on outside of element
			 */
			function handleClickOutside(event) {
				if (ref.current && !ref.current.contains(event.target)) {
					setPredictions([])
				}
			}
			// Bind the event listener
			document.addEventListener("mousedown", handleClickOutside);
			return () => {
				// Unbind the event listener on clean up
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}, [ref]);
	}

	function unwrapAdressComponent (component){
		setInputForm(currentState => {
			let stateCopy =  {...currentState}
			component.forEach(element => {
				switch(element.types[0]){
					case "street_number":
					stateCopy.number = element.long_name
					break;
					case "route":
					stateCopy.route = element.long_name
					break;
					case "locality":
					stateCopy.city = element.long_name
					break;
					case "postal_code":
					stateCopy.postalCode = element.long_name
					break;
				}
			});
			return stateCopy;
		});
	}

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
		<form className="w-full h-full flex flex-col items-center" onSubmit={async e => {
			e.preventDefault()
			setUpdate(!update)
		}}>
			<div className='w-1/2 max-w-[600px] mt-10'>
				<div className='flex flex-col my-2 w-full relative'>
					<label className="text-bodyLarge font-medium text-dark-grey">Adresse<i className='font-bold text-secondary-color'>*</i></label>
					<input  
						autoComplete="off" 
						type={"text"} 
						name={"route"} 
						placeholder={"24 rue de la Nationale, 35650, Le Rheu"}	
						value={addressInput} 
						onChange={e => {
						const text = e.target.value.replace(/\s/g, '');
						fetch("http://localhost:8082/maps/autocomplete", {
							method: "POST",
							body: JSON.stringify({
								Input: text,
								SessionTokenString: sessionToken
							})
						}).then((res) => res.json())
						.then((data) => {
							if(data.status == "OK"){
								setPredictions(data.predictions)
							}
						});
						setAddressInput(e.target.value);
					}} className='border border-gray-300 border-solid outline-none p-2 rounded-lg w-full' />
					<div ref={wrapperRef} className='z-10 w-full absolute top-full max-h-96 flex flex-col bg-white shadow-[0px_2px_12px_0px_rgba(0,0,0,0.05)] overflow-auto'>
						{predictions.map(elem => (
							<div className='py-2 cursor-pointer hover:bg-light-grey-1 flex flex-col border-b' key={elem.place_id}>
								<span key={elem.place_id} className='px-3 block w-full' onClick={e => {
									fetch("http://localhost:8082/maps/details", {
										method: "POST",
										body: JSON.stringify({
											PlaceID: elem.place_id,
											SessionTokenString: sessionToken
										})
									}).then((res) => res.json())
									.then((data) => {
										if(data.status == "OK"){
											unwrapAdressComponent(data.result.address_components)
											setAddressInput("");
										}
									});
									setPredictions([])
								}}>{elem.description}</span>
							</div>
						))}
					</div>
				</div>
				<div className='grid grid-cols-[7%_55%_20%_20%]'>
					<div className='flex flex-col my-2 w-full relative'>
						<label className="text-bodyLarge font-medium text-dark-grey">n°</label>
						{inputform.number ? (
							<span className='text-primary-color'>{inputform.number}</span>
						) : (
							<i className='text-light-grey-3'>24</i>
						)}
					</div>
					<div className='ml-2 flex flex-col my-2 w-full relative'>
						<label className=" text-bodyLarge font-medium text-dark-grey">Route</label>
						{inputform.number ? (
							<span className='text-primary-color'>{inputform.route}</span>
						) : (
							<i className='text-light-grey-3'>Rue de la Nationale</i>
						)}
					</div>
					<div className='ml-2 flex flex-col my-2 w-full relative'>
						<label className="text-bodyLarge font-medium text-dark-grey">Code postal</label>
						{inputform.number ? (
							<span className='text-primary-color'>{inputform.postalCode}</span>
						) : (
							<i className='text-light-grey-3'>35650</i>
						)}
					</div>
					<div className='ml-2 flex flex-col my-2 w-full relative'>
						<label className="text-bodyLarge font-medium text-dark-grey">Ville</label>
						{inputform.number ? (
							<span className='text-primary-color'>{inputform.city}</span>
						) : (
							<i className='text-light-grey-3'>Le Rheu</i>
						)}
					</div>
				</div>
				<div className='flex flex-col my-2 w-full relative'>
					<label className="mt-5 text-bodyMedium font-medium text-dark-grey">Informations complémentaires</label>
					<input 
						autoComplete="off" 
						type={"text"} 
						name={"route"} 
						placeholder={"Appartement 3"}	
						value={inputform.optionalRoute} 
						onChange={e => {}} 
						className='border border-gray-300 border-solid outline-none p-2 rounded-lg w-full' 
					/>
				</div>
			</div>
				
			<div className='mt-5'>
				<CustomButton
					label="Ajouter cette adresse"
					submitButton={true}
					loading={isLoading}
					disabled={ !inputform.number || !inputform.route || !inputform.postalCode || !inputform.city }
					color="secondaryColor"
				/>
			</div>
		</form>
  )
}
