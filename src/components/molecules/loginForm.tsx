import { useState } from "react";
import InputForm from "../atoms/inputForm";

export default function LoginForm () {

	const [input, setInput] = useState({email: "commercant@me.com", password: "dE8bdTUE"});

	return (
		<>
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
			<button
				type="submit"
				className="p-2 bg-orange-300 text-white rounded-lg mt-3"
			>Connexion</button>
		</>
	)
}