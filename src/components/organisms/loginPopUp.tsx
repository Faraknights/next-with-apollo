import { useMutation } from '@apollo/client';
import { LOGIN } from '../../graphql/login';
import fetchJson from '../../lib/fetchJson';
import useUser from '../../lib/useUser';
import LoginForm from '../molecules/loginForm';
import PopUp from '../molecules/popUp';

export default function LoginPopUp() {

	return (
		<PopUp>
			<div className='flex flex-col'>
				<h2>Connexion</h2>
				<LoginForm redirect=''/>
			</div>
		</PopUp>
	)
}