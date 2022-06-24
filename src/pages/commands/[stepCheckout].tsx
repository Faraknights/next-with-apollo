import {useEffect, useState } from 'react';
import RadioProgression from '../../components/molecules/checkout/radioProgression';
import useUser from '../../lib/useUser';
import LoginPopUp from '../../components/organisms/login/loginPopUp';
import Router, { useRouter } from 'next/router';
import Layout from '../../components/organisms/structure/layout';
import { Basket } from '../../interfaces/basket';
import BasketPage from '../../components/organisms/checkout/basket';
import TimeSlotPage from '../../components/organisms/checkout/time_slot';
import ContactInformation from '../../components/organisms/checkout/contact_information';
import { User } from '../../interfaces/user';
import { GET_USER } from '../../graphql/user';
import clientWithHeader from '../../apollo/clientWithHeader';
import ConfirmPage from '../../components/organisms/checkout/confirm';

export async function getStaticPaths() {
	return {
		paths: [
      { params: {
				stepCheckout: "basket"
			}},
      { params: {
				stepCheckout: "time_slot"
			}},
      { params: {
				stepCheckout: "contact_information"
			}},
      { params: {
				stepCheckout: "confirm"
			}},
    ],
		fallback: false
	};
};

interface staticProps{
	params: purchaseProcess
}

export async function getStaticProps(options : staticProps) {
	const { params : { stepCheckout }} = options

	return {
		props: { stepCheckout },
	}
}

interface purchaseProcess{
	stepCheckout: string;
}

export enum PurchaseProcessPage {
	"basket" = 0,
	"time_slot" = 1,
	"contact_information" = 2,
	"confirm" = 3,
}

export default function purchaseProcess(options: purchaseProcess) {

	const {stepCheckout} = options
	const router = useRouter()
	const [purchaseProcessPage, setPurchaseProcessPage] = useState(PurchaseProcessPage[stepCheckout] as number)
	const [clickConnection, setClickConnection] = useState(false)
	const [confirmStart, setConfirmStart] = useState(false)

	//si on est déconnecté sur les pages intermédiaires on revient sur la page du panier
	const {user: login} = useUser()
	if(purchaseProcessPage != 0 && login && !login.jwt){
		router.push(
			{pathname: '/commands/basket'}, 
			undefined, 
			{ shallow: true }
		)
		setPurchaseProcessPage(0)
		setClickConnection(false)
	}
	
	//on charge le panier
	const [basket, setBasket] = useState({edges: []} as Basket)
	useEffect(() => {
		const tmpBasket = JSON.parse(localStorage.getItem("basket")!)
		if(tmpBasket)
			setBasket(tmpBasket)
	}, []) 

	//lorsqu'on revient en arrière avec les bouton du navigateur
	useEffect(() => {
		setPurchaseProcessPage(PurchaseProcessPage[router.query.stepCheckout.toString()])
		const copyBasket = JSON.parse(localStorage.getItem("basket")) as Basket
		if(copyBasket){
			copyBasket.address = {
				id: "62ac720de53fe308ea5d9ec5",
				city: "Le Rheu",
				number: "54",
				postalCode: "35650",
				route: "Rue Nationale",
				optionalRoute: ""
			}
			localStorage.setItem("basket", JSON.stringify(copyBasket))
		}
	}, [router.query.stepCheckout])

	
	const [user, setUser] = useState({} as User)
	const [loginReady, setLoginReady] = useState(false)
	if(login && login.jwt && !loginReady) setLoginReady(true)
	if(loginReady && login && !login.jwt) {
		setLoginReady(false)
		setUser({})
	}
	useEffect(() => {
		async function GetUser() {
			const { data } = await clientWithHeader.query({ query: GET_USER, context :{ accessToken : login!.jwt} });
			setUser(data.user)
		}
		if(login && login.jwt)
			GetUser()
	}, [loginReady])

  return (
		<Layout title='Mon panier'>
			<div className='w-1/2'>
				<RadioProgression structure={["Panier", "Créneaux",  "Coordonnées", "Confirmation"]} currentPos={purchaseProcessPage + 1}/>
			</div>
			{ login && !login.jwt && clickConnection && (
				<LoginPopUp/>
			)}
			<div 
				className='flex min-w-full items-start transition'
				style={{transform: "translateX(-" + (purchaseProcessPage * 100).toString() + "%)"}}
			>
				<BasketPage 
					basket={basket} 
					setBasket={setBasket} 
					login={login}
					setPurchaseProcessPage={setPurchaseProcessPage}
					setClickConnection={setClickConnection}
					router={router}
				/>
				<TimeSlotPage 
					basket={basket} 
					setBasket={setBasket} 
					setPurchaseProcessPage={setPurchaseProcessPage}
					router={router}
				/>
				<ContactInformation 
					basket={basket}
					router={router}
					setBasket={setBasket}
					setPurchaseProcessPage={setPurchaseProcessPage}
					user={user}
					setConfirmStart={setConfirmStart}
				/>
				<ConfirmPage 
					basket={basket} 
					setBasket={setBasket} 
					login={login}
					setPurchaseProcessPage={setPurchaseProcessPage}
					setClickConnection={setClickConnection}
					router={router}
					confirmStart={confirmStart}
				/>
			</div>
		</Layout>
  )
}
