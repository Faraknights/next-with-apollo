import { useMutation } from "@apollo/client";
import Router from "next/router";
import { useState } from "react";
import { LOGIN } from "../../graphql/login";
import fetchJson from "../../lib/fetchJson";
import useUser from "../../lib/useUser";
import { Login } from "../../pages/api/login";
import CustomButton from "../atoms/customButton";
import InputForm from "../atoms/inputForm";

interface LoginFormProps{
	redirect: string;
}

export default function LoginForm (options: LoginFormProps) {
	const {redirect} = options
	
	const { user, mutateUser } = useUser();
	const [login] =  useMutation(LOGIN, {
		onCompleted: async data => {
			if(data) {
				mutateUser(
					await fetchJson( "/api/login", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({jwt: data.login}),
					})
				).then((res: any) => {
					if(res.jwt){
						Router.push(redirect)
					} else {
						setLoading(false)
					}
				})
			}
		}
	});
	const [input, setInput] = useState({email: "commercant@me.com", password: "dE8bdTUE"});
	const [loading, setLoading] = useState(false)
	return (
		<form 
			onSubmit={async e => {
				e.preventDefault();
				setLoading(true)
				login({ variables: {input : {email: e.currentTarget.email.value, password: e.currentTarget.password.value}}});
			}}
			className="flex flex-col items-center justify-between border border-gray-200 border-solid bg-[#fafafa] p-4 rounded-2xl"
		>
			<InputForm
				inputName={"email"}
				placeholder={"commercant@me.com"}
				label={"E-mail"}
				inputState={input.email}
				inputSetState={setInput}
			/>
			<InputForm
				inputName={"password"}
				placeholder={"dE8bdTUE"}
				label={"Mot de passe"}
				inputState={input.password}
				inputSetState={setInput}
			/>
			<CustomButton
				label="Connexion"
				loading={loading}
				submitButton={true}
			/>
		</form>
	)
}