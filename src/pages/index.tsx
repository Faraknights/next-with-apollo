import Link from 'next/link'
import { HomeLogo } from '../assets/svg/menu/svgMenu'
import CustomButton from '../components/atoms/general/customButton'
import Timer from '../components/atoms/general/timer'
import Checkout from '../components/organisms/checkout/checkout'
import Header from '../components/organisms/structure/header'
import Layout from '../components/organisms/structure/layout'

export default function Main() {
	return (
		<Layout title='Accueil'>
			<div className='mt-10'>
				<Timer 
					size={60} 
					time={5} 
					callback={() => {
						console.log("Fini")
					}}
				/>
			</div>
		</Layout>
	)
}
