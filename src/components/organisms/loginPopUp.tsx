import { useMutation } from '@apollo/client';
import { LOGIN } from '../../graphql/login';
import fetchJson from '../../lib/fetchJson';
import useUser from '../../lib/useUser';
import LoginForm from '../molecules/loginForm';
import PopUp from '../molecules/popUp';

export default function LoginPopUp() {

	const [login] =  useMutation(LOGIN, {
		onCompleted: async data => {
			if(data) {
				mutateUser(
					await fetchJson( "/api/login", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({jwt: data.login}),
					})
				)
			}
		}
	});
	const { mutateUser } = useUser();

	return (
		<PopUp>
			<div className='flex flex-col'>
				<h2>Connexion</h2>
				<form 
					className="flex flex-col items-center justify-between border border-gray-200 border-solid bg-[#fafafa] p-4 rounded-2xl"
					onSubmit={async (form ) => {
						form.preventDefault();
						login({ variables: {input : {email: form.currentTarget.email.value, password: form.currentTarget.password.value}}});
					}}
				>
					<LoginForm/>
				</form>
			</div>
		</PopUp>
	)
}