import { useEffect, useState } from 'react';
import useUser from '../lib/useUser';
import { Basket } from '../interfaces/basket';
import Layout from '../components/organisms/structure/layout';
import Commands from '../components/organisms/commands/commands';
import { GET_COMMANDS } from '../graphql/commands';
import clientWithHeader from '../apollo/clientWithHeader';
import CustomButton from '../components/atoms/general/customButton';
import LoginPopUp from '../components/organisms/login/loginPopUp';
import { CommandConnection } from '../interfaces/commands';

export default function pageCommands() {

	const [commands, setCommands] = useState({edges : []} as CommandConnection)
	const [openPopUp, setOpenPopUp] = useState(false)
	const {user} = useUser()

	const useEffectCallBack = () => {
		async function getCommands() {
			console.log(user)
			const { data } = await clientWithHeader.query({ query: GET_COMMANDS, context :{ accessToken : user!.jwt} });
			console.log(data)
			setCommands(data.commands)
		}
		if(user)
			getCommands()
	}

	useEffect(useEffectCallBack, [openPopUp])
	useEffect(useEffectCallBack, [])

	console.log(commands)

  return (
		<Layout>
			{ openPopUp && (
				<LoginPopUp callbackSuccess={() => setOpenPopUp(false)}/>
			)}
			{ user ? (
				<>
					<h1 className='my-3'>Commandes</h1>
					<Commands commands={commands}/>
				</>
			) : (
				<div className='h-full flex flex-col items-center justify-center'>
					<span className='italic mb-4'>Veuillez vous connecter</span>
					<CustomButton label="Se connecter" onClick={() => setOpenPopUp(true)}/>
				</div>
			)}
		</Layout>
  )
}
