import { useMutation } from '@apollo/client';
import { FormEventHandler } from 'react';
import { LOGIN } from '../../graphql/login';
import fetchJson from '../../lib/fetchJson';
import useUser from '../../lib/useUser';
import LoginForm from '../molecules/loginForm';
import PopUp from '../molecules/popUp';

interface LoginPopUpProps{
	callbackSuccess?: Function;
}

export default function LoginPopUp(options : LoginPopUpProps) {
	const {callbackSuccess} = options
	return (
		<PopUp>
			<div className='flex flex-col'>
				<h2>Connexion</h2>
				<LoginForm callbackSuccess={callbackSuccess} redirect=''/>
			</div>
		</PopUp>
	)
}