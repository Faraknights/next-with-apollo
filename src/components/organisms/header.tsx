import Link from 'next/link';
import { useEffect, useState } from 'react';
import { KeyedMutator } from 'swr';
import clientWithHeader from '../../apollo/clientWithHeader';
import { GET_CLIENT, Client } from '../../graphql/client';
import fetchJson from '../../lib/fetchJson';
import useUser from '../../lib/useUser';
import { Login } from '../../pages/api/login';
import CustomButton from '../atoms/customButton';

interface HeaderProps {
	user?: Login;
	mutateUser?: KeyedMutator<Login>;
	dataUser: String; 
}

export default function Header () {

	const [client, setClient] = useState({} as Client)
	const {user, mutateUser} = useUser()

	useEffect(() => {
		async function GetUser() {
			const { data: client } = await clientWithHeader.query({ query: GET_CLIENT, context :{ accessToken : user!.jwt} });
			setClient(client.user)
		}
		if(user)
			GetUser()
	}, [])
	

	return (
		<header className='w-full p-2 bg-white shadow-md flex justify-between items-center z-50'>
			<nav>
				<Link href={`/commerces/1`}>
					<a>
						<span className='text-black font-semibold text-lg cursor-pointer mr-3 p-2 hover:bg-gray-200'>Accueil</span>
					</a>
				</Link>
				<Link href={`/basket`}>
					<a>
						<span className='text-black font-semibold text-lg cursor-pointer p-2 hover:bg-gray-200'>Panier</span>
					</a>
				</Link>
			</nav>
			<div>
				{(user && user!.jwt &&
					<>
						<span className='mr-3'>{client.firstName}</span>
						<CustomButton
							label="Se déconnecter"
							color='red'
							submitButton={true}
							onClick={async e => {
								mutateUser(
									await fetchJson("/api/logout", {
										method: "POST"
									})
								);
							}}
						/>
					</>
				) || ( 
					<Link href={"/login"}>
						<a className='block h-full'>
							<CustomButton label="Se connecter"/>
						</a>
					</Link>
				)}
				</div>
		</header>
	)
}