import Link from 'next/link';
import { useEffect, useState } from 'react';
import { KeyedMutator } from 'swr';
import clientWithHeader from '../../../apollo/clientWithHeader';
import { GET_CLIENT } from '../../../graphql/client';
import { User } from '../../../interfaces/user';
import fetchJson from '../../../lib/fetchJson';
import useUser from '../../../lib/useUser';
import { Login } from '../../../pages/api/login';
import CustomButton from '../../atoms/general/customButton';
import Aside from './aside';

interface HeaderProps {
	user?: Login;
	mutateUser?: KeyedMutator<Login>;
	dataUser: String; 
}

export default function Header () {

	const [client, setClient] = useState({} as User)
	const [openAside, setOpenAside] = useState(false)
	const {user, mutateUser} = useUser()

	useEffect(() => {
		async function GetUser() {
			const { data } = await clientWithHeader.query({ query: GET_CLIENT, context :{ accessToken : user!.jwt} });
			setClient(data.user)
		}
		if(user)
			GetUser()
	}, [])

	if(user)
		console.log(user!.jwt)
	
	return (
		<header className='w-full p-2 bg-white shadow-md flex justify-between items-center z-50'>
			<CustomButton 
				label="Menu"
				color='red'
				icon={(
					<svg className='h-4 fill-white' viewBox="0 0 384.97 384.97">
						<path d="M12.03,84.212h360.909c6.641,0,12.03-5.39,12.03-12.03c0-6.641-5.39-12.03-12.03-12.03H12.03
							C5.39,60.152,0,65.541,0,72.182C0,78.823,5.39,84.212,12.03,84.212z"/>
						<path d="M372.939,180.455H12.03c-6.641,0-12.03,5.39-12.03,12.03s5.39,12.03,12.03,12.03h360.909c6.641,0,12.03-5.39,12.03-12.03
							S379.58,180.455,372.939,180.455z"/>
						<path d="M372.939,300.758H12.03c-6.641,0-12.03,5.39-12.03,12.03c0,6.641,5.39,12.03,12.03,12.03h360.909
							c6.641,0,12.03-5.39,12.03-12.03C384.97,306.147,379.58,300.758,372.939,300.758z"/>
					</svg>
				)}
				onClick={_ => setOpenAside(true)}
			/>
			{ openAside && 
				<Aside 
					openAside={openAside}
					setOpenAside={setOpenAside}
				/>
			}
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
				<Link href={`/commands`}>
					<a>
						<span className='text-black font-semibold text-lg cursor-pointer p-2 hover:bg-gray-200'>Commandes</span>
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