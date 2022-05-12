import Head from "next/head";
import { GET_COMMERCES, GET_ID_COMMERCES } from "../../graphql/queries";
import Link from 'next/link'
import { slugify, pagination } from '../../utils/lib'
import { Pagination } from '../../components/lib'
import client from '../../apollo-client'

const nbCommercePage = 1;

export async function getStaticPaths() {
    const { loading, error, data } = await client.query({ query: GET_ID_COMMERCES, variables: { first: 99999 }});
    const paths = [...Array(Math.ceil(data.commerces.edges.length/nbCommercePage))].map((edge, i) => ({
       params: { page: (i + 1).toString() },
    }));
    return {
      paths: paths || [],
      fallback: false
    };
};

export async function getStaticProps({params}) {
    const {data} =  await client.query({ query: GET_COMMERCES, variables: { first: 99999 }})
    const nbPage = Math.ceil(data.commerces.edges.length / nbCommercePage)
    
    let tmp = data.commerces.edges.slice((params.page - 1) * nbCommercePage, (params.page) * nbCommercePage)

    return {
        props: { data: {commerces: {edges: tmp}}, nbPage, currentPage: params.page},
    }
}

export default function Main({ data, nbPage, currentPage}) {
    console.log(currentPage, nbPage)
  return (
    <main className="h-full w-full flex items-center justify-center bg-[#fafafe] flex-col">
      <h1 className="m-5">Commerces</h1>
      <div className="w-full h-full flex flex-col items-center justify-between">
        <div className="w-full flex flex-col items-center">
          {data.commerces.edges.map(element => (
            <Link href={`/commerce/${encodeURIComponent(element.node.id)}/${encodeURIComponent(slugify(element.node.name))}`}>
              <div 
                className="w-1/2 mb-5 cursor-pointer border border-solid border-gray-200 p-4 rounded-lg bg-white" 
                key={element.node.id}
              >
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
