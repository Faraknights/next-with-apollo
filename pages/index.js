import Head from "next/head";
import { GET_COMMERCES } from "../graphql/queries";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import Link from 'next/link'
import slugify from '../utils/slugify'

export default function Main() {
  return (
    <Link href={`/commerces/1`}>
      Liste
    </Link>
  )
}
