import { useState } from 'react';
import { LOGIN } from '../graphql/login';
import { useMutation } from '@apollo/client';
import useUser from '../lib/useUser';
import fetchJson from '../lib/fetchJson';
import Router from 'next/router';

export interface LoginProps {
	email: String;
	password: string;
}

export default function listCommerces() {

	const [input, setInput] = useState({email: "commercant@me.com", password: "dE8bdTUE"});
	const [login, { data, loading, error }] =  useMutation(LOGIN);
	const { mutateUser } = useUser();

	return (
		<main className="h-full w-full flex items-center justify-center bg-[#f2f2f2] flex-col">
			<h1 className="m-5">Login</h1>
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
							Router.push("/")
						}
					}}  
				>Connexion</button>
			</div>
		</main>
	)
}
