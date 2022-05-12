import Link from 'next/link';
import { GET_DATA_COMMERCE, GET_ID_COMMERCES } from "../../../graphql/queries";
import { Schedule, Articles, Card, Description, Contact } from "../../../components/lib"
import slugify from '../../../utils/slugify'
import client from '../../../../apollo-client'

export async function getStaticPaths() {
  const { loading, error, data } = await client.query({ query: GET_ID_COMMERCES, variables: { first: 99999 }});
  const paths = data.commerces.edges.map((edge) => ({
     params: { id: edge.node.id , nameCommerce: slugify(edge.node.name) },
  }));

  return {
    paths: paths || [],
    fallback: false
  };
}

export async function getStaticProps({params}) {
  const { data } = await client.query({query : GET_DATA_COMMERCE, variables: { id: params.id }})
  return {
    props: { data },
  }
}

export default function Commerce({ data }) {
  return (
    <>
      <div className='h-full w-full relative'>
        {/* Bouton de retour à la page d'accueil */}
        <Link href="/commerces/1">
          <div className={'p-3 w-full cursor-pointer fixed top-0 left-0 right-0 z-20 h-[50px] bg-white'}>
              <a>{'← Retour'}</a>
          </div>
        </Link>
        {/* Bannière du profil */}
        <div className={`w-full h-[400px] fixed top-0 bg-gradient-to-b from-[#969697] to-[#3E3E3F] flex items-center justify-center -z-10`}>
          <img 
            className='h-[100px] opacity-20 mb-5'
            src="https://img.icons8.com/material/344/picture--v1.png" 
            alt="logo de base d'une image"
          />
          {/* Icône de profil et  */}
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
        <div className={`z-10 mt-[400px] bg-[#fafafe] h-full grid grid-cols-2`}>
          <div className='translate-y-[-60px]'>
            <Card>
              <Description label={data.commerce.description}></Description>
            </Card>
            <Articles articles={data.commerce.products.edges}/>
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
      </div>
    </>
  );
}