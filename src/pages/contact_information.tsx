import Header from '../components/organisms/header';
import Link from 'next/link';
import RadioProgression from '../components/atoms/commerce/radioProgression';

export default function listCommerces() {

  return (
	<main className="h-full w-full flex items-center justify-center bg-[#fafafe] flex-col">
	  <Header/>
	  <h1 className="m-5">Coordonnées</h1>
		<div className='w-1/2'>
			<RadioProgression structure={["Panier", "Créneaux", "Coordonnées", "Confirmation"]} currentPos={3}/>
		</div>
	  <div className="w-full h-full flex flex-col items-center">
			<span>Bla bla récap</span>
			<Link href={"/checkout"}>
				<a>
					<button className=" mt-4 p-2 bg-orange-400 rounded-lg text-white" >Payer</button>
				</a>
			</Link>
	  </div>
	</main>
  )
}
