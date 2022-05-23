import { GET_BASKET } from '../graphql/queryBasket';
import client from '../apollo/client'
import { ProductProps } from '../components/organisms/commerce/products';
import Header from '../components/organisms/header';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import RadioProgression from '../components/atoms/commerce/radioProgression';

interface BasketProps {
	name: String;
	description: String;
	quantity: number;
	price: number;
	endingDate: String;
	products: {
		product : ProductProps
	}[],
}

const idBasket = "625aec7b92a510926add41f0";


export default function listCommerces() {

  return (
	<main className="h-full w-full flex items-center justify-center bg-[#fafafe] flex-col">
	  <Header/>
	  <h1 className="m-5">Paiement</h1>
		<div className='w-1/2'>
			<RadioProgression structure={["Panier", "Créneaux", "Paiement", "Confirmation"]} currentPos={3}/>
		</div>
	  <div className="w-full h-full flex flex-col items-center">
	  </div>
	</main>
  )
}
