import React from 'react';
import { LOGIN } from '../graphql/login';
import { useMutation } from '@apollo/client';
import useUser from '../lib/useUser';
import fetchJson from '../lib/fetchJson';
import Router from 'next/router';
import LoginForm from '../components/molecules/loginForm';

export default function listCommerces() {

	const [login, { data }] =  useMutation(LOGIN, {
		onCompleted: async (data) => {
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
		}
	});
	const { mutateUser } = useUser();

	return (
		<main className="h-full w-full flex items-center justify-center flex-col">
			<h1 className="m-5">Connexion</h1>
			<form 
				className="flex flex-col items-center justify-between border border-gray-200 border-solid bg-[#fafafa] p-4 rounded-2xl"
				onSubmit={(form) => {
					form.preventDefault();
					login({ variables: {input : {email: form.currentTarget.email.value, password: form.currentTarget.password.value}}});
				}}
			>
				<LoginForm/>
			</form>
		</main>
	)
}
