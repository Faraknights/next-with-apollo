import Link from 'next/link';

export default function Header() {
    return (
        <nav className='w-full p-2 bg-white'>
          <Link href={`/commerces/1`}>
            <span className='text-black font-semibold text-lg cursor-pointer mr-3 p-2 hover:bg-gray-200'>Accueil</span>
          </Link>
          <Link href={`/paniers`}>
            <span className='text-black font-semibold text-lg cursor-pointer p-2 hover:bg-gray-200'>Panier</span>
          </Link>
        </nav>
    )         
}