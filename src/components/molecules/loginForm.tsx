import { useState } from "react";
import CustomButton from "../atoms/customButton";
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
			<CustomButton
				label="Connexion"
				submitButton={true}
			/>
		</>
	)
}