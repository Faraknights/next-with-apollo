import { GET_COMMERCES, GET_ID_COMMERCES } from "../../graphql/Commerce";
import Link from 'next/link'
import client from '../../apollo/client'
import slugify from '../../lib/slugify'
import Layout from "../../components/organisms/structure/layout";
import Pagination from "../../components/organisms/pageCommerces/pagination";
import { CommerceConnection } from "../../interfaces/commerce";

const nbCommercePage = 2;

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
	const {data} =	await client.query({ query: GET_COMMERCES, variables: { first: 99999 }})
	const nbPage = Math.ceil(data.commerces.edges.length / nbCommercePage)
	
	let tmp = data.commerces.edges.slice((parseInt(params.page) - 1) * nbCommercePage, (parseInt(params.page)) * nbCommercePage)

	return {
		props: { data: {edges: tmp}, nbPage, currentPage: parseInt(params.page)},
	}
}

interface ListCommercesProps {
	data: CommerceConnection;
	nbPage: number;
	currentPage: number;
}

export default function listCommerces(options : ListCommercesProps) {
	const { data, nbPage, currentPage} = options
	return (
		<Layout>
			<div className="grow flex flex-col items-center justify-between">
				<div className="flex flex-col items-center">
					<h1 className="m-5">Commerces</h1>
					<div className="w-full h-full flex flex-col items-center justify-between">
						<div className="w-full flex flex-col items-center">
							{data.edges.map(element => (
								<Link key={element.node.id} href={`/commerce/${encodeURIComponent(element.node.id)}/${encodeURIComponent(slugify(element.node.storekeeperWord))}`}>
									<div className="w-1/2 mb-5 cursor-pointer border border-solid border-gray-200 p-4 rounded-lg bg-white">
										<h3 className="">{element.node.name}</h3>
										<span>{element.node.description}</span>
									</div>
								</Link>
							))}
						</div>
					</div>
				</div>
				<Pagination currentPage={currentPage} nbPage={nbPage} uri={'/commerces/'}/>
			</div>
		</Layout>
	)
}
