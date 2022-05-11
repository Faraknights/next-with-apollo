import Head from "next/head";
import { GET_COMMERCES } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import Link from 'next/link'


export default function Main() {
  const {loading, error, data} = useQuery(GET_COMMERCES)

  if(loading)
    return "loading"
  if(error){
    console.log(error)
    return "error"
  }
  console.log(data)

  return (
    <main className="h-full w-full flex items-center justify-center bg-[#fafafe] flex-col">
      <h1 className="mb-3">Commerces</h1>
      {data.commerces.edges.map(element => (
        <Link href={{
            pathname: '/commerce',
            query: {
              id: element.node.id
            }
          }}>
          <div 
            className="w-1/2 mb-5 cursor-pointer border border-solid border-gray-200 p-4 rounded-lg bg-white" 
            key={element.node.id}
          >
            <h3 className="">{element.node.name}</h3>
            <span>{element.node.description}</span>
          </div>
        </Link>
      ))}
    </main>
  )
}
