import { useMutation } from '@apollo/client';
import Router from 'next/router';
import { useState } from 'react';
import { LOGIN } from '../../graphql/login';
import fetchJson from '../../lib/fetchJson';
import useUser from '../../lib/useUser';
import PopUp from '../molecules/popUp';

export default function LoginPopUp() {

	const [input, setInput] = useState({email: "commercant@me.com", password: "dE8bdTUE"});
	const [login, { data, loading, error }] =  useMutation(LOGIN);
	const { mutateUser } = useUser();

	return (
		<PopUp>
			<div className='flex flex-col'>
				<h2>Connexion</h2>
				<div className="flex flex-col items-center justify-between border border-gray-200 border-solid bg-[#fafafa] p-4 rounded-2xl">
					<div className='flex flex-col w-full'>
						<label htmlFor="email">E-mail</label>
						<input 
							type="email" 
							id='email'
							value={input.email} 
							onChange={e => {
								setInput(input => {
									let inputTmp =  {...input}
									inputTmp.email = e.target.value
									return inputTmp;
								});
							}}
							className='border border-gray-300 border-solid outline-none p-2 rounded-lg' 
						/>
					</div>
					<div className='flex flex-col w-full'>
						<label htmlFor="password">Mot de passe</label>
						<input 
							type="password" 
							id='password'
							value={input.password} 
							onChange={e => {
								setInput(c => {
									let inputTmp =  {...input}
									inputTmp.password = e.target.value
									return inputTmp;
								});
							}}
							className='border border-gray-300 border-solid outline-none p-2 rounded-lg' 
						/>
					</div>
					<button 
						className='p-2 bg-orange-300 text-white rounded-lg mt-3'
						onClick={async e => {
							login({ variables: {input : input} });
							if(data) {
								mutateUser(
									await fetchJson( "/api/login", {
										method: "POST",
										headers: { "Content-Type": "application/json" },
										body: JSON.stringify({jwt: data.login}),
									})
								)
							}
						}}  
					>Connexion</button>
				</div>
			</div>
		</PopUp>
	)
}