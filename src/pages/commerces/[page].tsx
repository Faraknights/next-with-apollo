import { GET_COMMERCES, GET_ID_COMMERCES } from "../../graphql/queryCommerce";
import Link from 'next/link'
import { Pagination } from '../../components/lib'
import client from '../../../apollo-client'
import slugify from '../../utils/slugify'
import {ListCommercesUnitProps} from '../commerce/[id]/[storeKeeperWord]'
import Header from "../../components/organisms/header";

const nbCommercePage = 2;

interface ListCommercesProps {
  commerces: {
    edges: Array<ListCommercesUnitProps>
  }
}

export async function getStaticPaths() {
    const { data } = await client.query({ query: GET_ID_COMMERCES, variables: { first: 99999 }});
    const paths = [...Array(Math.ceil(data.commerces.edges.length/nbCommercePage))].map((edge, i) => ({
       params: { page: (i + 1).toString() },
    }));
    return {
      paths: paths || [],
      fallback: false
    };
};

export async function getStaticProps({params}: {params: {page : string}}) {
    const { data} =  await client.query({ query: GET_COMMERCES, variables: { first: 99999 }})
    const nbPage = Math.ceil(data.commerces.edges.length / nbCommercePage)
    
    let tmp = data.commerces.edges.slice((parseInt(params.page) - 1) * nbCommercePage, (parseInt(params.page)) * nbCommercePage)

    return {
        props: { data: {commerces: {edges: tmp}}, nbPage, currentPage: parseInt(params.page)},
    }
}

export default function listCommerces({ data, nbPage, currentPage}: {data: ListCommercesProps, nbPage: number, currentPage: number}) {
  return (
    <main className="h-full w-full flex items-center justify-center bg-[#fafafe] flex-col">
      <Header/>
      <h1 className="m-5">Commerces</h1>
      <div className="w-full h-full flex flex-col items-center justify-between">
        <div className="w-full flex flex-col items-center">
          {data.commerces.edges.map(element => (
            <Link key={element.node.id} href={`/commerce/${encodeURIComponent(element.node.id)}/${encodeURIComponent(slugify(element.node.storekeeperWord))}`}>
              <div className="w-1/2 mb-5 cursor-pointer border border-solid border-gray-200 p-4 rounded-lg bg-white">
                <h3 className="">{element.node.name}</h3>
                <span>{element.node.description}</span>
              </div>
            </Link>
          ))}
        </div>
        <Pagination currentPage={currentPage} nbPage={nbPage} uri={'/commerces/'}/>
      </div>
    </main>
  )
}
