import React, { useEffect } from 'react';
import { LOGIN } from '../graphql/login';
import { useMutation } from '@apollo/client';
import useUser from '../lib/useUser';
import fetchJson from '../lib/fetchJson';
import LoginForm from '../components/molecules/loginForm';
import Router from 'next/router';

export default function listCommerces() {
	useEffect(() => {
		Router.push("")
	}, [])
	
	return (
		<main className="h-full w-full flex items-center justify-center flex-col">
			<h1 className="m-5">Connexion</h1>
			<LoginForm redirect='/'/>		
		</main>
	)
}
