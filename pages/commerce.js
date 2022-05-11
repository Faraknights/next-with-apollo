import Link from 'next/link';
import { GET_DATA_COMMERCE } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { Day, Articles, Card } from "../components/lib"

export default function Commerce() {
  const heightBanner = 400;

  const router = useRouter();
  const { id: id } = router.query;
  const {loading, error, data} = useQuery(GET_DATA_COMMERCE, {
    variables: { id },
  })
  if(loading)
    return "loading"
  if(error){
    console.log(error)
    return "error"
  }
  console.log(data)

  return (
    <>
      <div className='h-full w-full relative'>
        {/* Bouton de retour à la page d'accueil */}
        <Link href="/">
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
              <div className='description'>{data.commerce.description}</div>
            </Card>
            <Articles articles={data.commerce.products.edges}/>
          </div>
          <div className='translate-y-[-60px]'>
            <Card>
              <div>
                <Day label="Lundi" day={data.commerce.businessHours.monday}/>
                <Day label="Mardi" day={data.commerce.businessHours.tuesday}/>
                <Day label="Mercredi" day={data.commerce.businessHours.wednesday}/>
                <Day label="Jeudi" day={data.commerce.businessHours.thursday}/>
                <Day label="Vendredi" day={data.commerce.businessHours.friday}/>
                <Day label="Samedi" day={data.commerce.businessHours.saturday}/>
                <Day label="Dimanche" day={data.commerce.businessHours.sunday}/>
              </div>
            </Card>
            <Card>
              <div className='grid grid-cols-2'>
                <img 
                  className='w-full rounded-2xl col-[1/3] mb-3'
                  src="https://www.moroccojewishtimes.com/wp-content/uploads/2021/09/fadc14dd.jpg"
                />
                <div className='flex flex-col'>
                  <span className='font-medium'>Coordonnées</span>
                  <span>{data.commerce.email}</span>
                  <span>{data.commerce.phone}</span>
                </div>
                <div className='flex flex-col'>
                  <span className='font-medium'>Adresse</span>
                  <span>{data.commerce.address}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}