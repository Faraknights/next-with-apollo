import { GET_DATA_COMMERCE, GET_ID_COMMERCES } from "../../../graphql/Commerce";
import slugify from '../../../lib/slugify'
import client from '../../../apollo/client'
import Layout from '../../../components/organisms/layout';
import { Commerce, ListCommercesUnit } from '../../../interfaces/commerce';
import Card from '../../../components/organisms/card';
import Description from '../../../components/organisms/description';
import Products from '../../../components/organisms/commerce/products';
import Schedule from '../../../components/organisms/commerce/schedule'
import Contact from '../../../components/organisms/commerce/contact';

export async function getStaticPaths() {
	const { data } = await client.query({ query: GET_ID_COMMERCES, variables: { first: 99999 }});
	const paths = data.commerces.edges.map((commerce: ListCommercesUnit) => ({
		 params: { id: commerce.node.id , storeKeeperWord: slugify(commerce.node.storekeeperWord) },
	}));

	return {
		paths: paths || [],
		fallback: false
	};
}

export async function getStaticProps({params} : {params: {id: string}}) {
	const { data } = await client.query({query : GET_DATA_COMMERCE, variables: { id: params.id }})
	return {
		props: { data },
	}
}

export default function CommercePage({ data } : {data: {commerce : Commerce}}) {
	return (
		<Layout>
			{/* Bannière du profil */}
			<div className={`w-full h-[400px] fixed top-0 bg-gradient-to-b from-[#969697] to-[#3E3E3F] flex items-center justify-center -z-0`}>
				<img 
					className='h-[100px] opacity-20 mb-5'
					src="https://img.icons8.com/material/344/picture--v1.png" 
					alt="logo de base d'une image"
				/>
				{/* Icône de profil et	*/}
				<div className='absolute bottom-24 left-12 flex items-center'>
					<div className='h-24 w-24 bg-[#fafafe] rounded-full flex items-center justify-center'>
						<img 
							className='h-2/4 opacity-80'
							src="https://img.icons8.com/material/344/picture--v1.png" 
							alt="logo de base d'une image"
						/>
					</div>
					<span className='text-white ml-5'>{data.commerce.storekeeperWord}</span>
				</div>
			</div>
			{/* Détails du profil */}
			<div className={`z-10 mt-[350px] bg-[#fafafe] h-full grid grid-cols-2`}>
				<div className='translate-y-[-60px]'>
					<Card>
						<Description label={data.commerce.description}></Description>
					</Card>
					<Products commerce={data.commerce}/>
				</div>
				<div className='translate-y-[-60px]'>
					<Card>
						<Schedule businessHours={data.commerce.businessHours}/>
					</Card>
					<Card>
						<Contact
							email={data.commerce.email}
							phone={data.commerce.phone}
							address={data.commerce.address}
							map={false}
						/>
					</Card>
				</div>
			</div>
		</Layout>
	);
}