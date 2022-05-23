import Header from '../components/organisms/header';
import Link from 'next/link';
import RadioProgression from '../components/atoms/commerce/radioProgression';

export default function listCommerces() {

  return (
	<main className="h-full w-full flex items-center justify-center bg-[#fafafe] flex-col">
	  <Header/>
	  <h1 className="m-5">baskets</h1>
		<div className='w-1/2'>
			<RadioProgression structure={["Panier", "Créneaux",  "Paiement", "Confirmation"]} currentPos={2}/>
		</div>
	  <div className="w-full h-full flex flex-col items-center">
			<Link href={"/checkout"}>
				<button className=" mt-4 p-2 bg-orange-400 rounded-lg text-white" >Passer ma commande</button>
			</Link>
	  </div>
	</main>
  )
}
