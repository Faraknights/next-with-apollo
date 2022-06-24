import React, { useEffect } from 'react';
import LoginForm from '../components/molecules/login/loginForm';
import Router from 'next/router';
import Layout from '../components/organisms/structure/layout';

export default function listCommerces() {
	useEffect(() => {
		Router.push("")
	}, [])
	
	return (
		<Layout title='Connexion'>
			<div className='mt-7'>
				<LoginForm redirect='/'/>	
			</div>
		</Layout>
	)
}
