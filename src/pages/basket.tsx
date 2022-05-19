import { GET_BASKET } from '../graphql/queryCommerce';
import client from '../../apollo-client'
import { ProductProps } from '../components/organisms/commerce/products';
import Header from '../components/organisms/header';

interface BasketProps {
    name: String;
    description: String;
    quantity: number;
    price: number;
    endingDate: String;
    products: ProductProps[],
}

const idBasket = "625aec7b92a510926add41f0";

export async function getStaticProps() {
    const {data} =  await client.query({ query: GET_BASKET, variables: idBasket})

    return {
        props: {
            data,
        }
    }
}

export default function listCommerces({ data }: {data: BasketProps}) {
  return (
    <main className="h-full w-full flex items-center justify-center bg-[#fafafe] flex-col">
      <Header/>
      <h1 className="m-5">Paniers</h1>
      <div className="w-full h-full flex flex-col items-center justify-between">
        
      </div>
    </main>
  )
}
