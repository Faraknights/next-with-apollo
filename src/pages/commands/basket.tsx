import { useEffect, useState } from 'react';
import Router from 'next/router';
import Layout from '../../components/organisms/structure/layout';
import RadioProgression from '../../components/molecules/checkout/radioProgression';
import useUser from '../../lib/useUser';
import LoginPopUp from '../../components/organisms/login/loginPopUp';
import { Basket } from '../../interfaces/basket';
import CustomButton from '../../components/atoms/general/customButton';
import { AddSVG } from '../../assets/svg/general/svgGeneral';
import getUnitLabel from '../../lib/getUnitLabel';
import SummaryCheckout from '../../components/molecules/checkout/summaryCheckout';
import Card from '../../components/atoms/general/card';

export default function BasketPage() {
  /*const {
    basket,
    setBasket,
    login,
    setPurchaseProcessPage,
    router,
  } = options;*/

  //on charge le panier
  const [basket, setBasket] = useState({ edges: [] } as Basket);
  useEffect(() => {
    const tmpBasket = JSON.parse(localStorage.getItem("basket")!);
    if (tmpBasket) setBasket(tmpBasket);
  }, []);

  const [loading, setLoading] = useState(false);
  const [clickConnection, setClickConnection] = useState(false);

  function removeProduct(indexCommerce: number, indexProduct: number) {
    setBasket((e) => {
      let basketCopy = { ...basket } as Basket;
      basketCopy.edges[indexCommerce].products = basketCopy.edges[
        indexCommerce
      ].products.filter((_, i) => i != indexProduct);
      if (!basketCopy.edges[indexCommerce].products.length) {
        basketCopy.edges = basketCopy.edges.filter(
          (_, i) => indexCommerce != i
        );
      }
      localStorage.setItem("basket", JSON.stringify(basketCopy));
      return basketCopy;
    });
  }

  const { login } = useUser();

  return (
    <Layout title="Mon panier">
      <div className="w-1/2">
        <RadioProgression
          structure={["Panier", "Créneaux", "Coordonnées", "Confirmation"]}
          currentPos={1}
        />
      </div>
      {login && !login.jwt && clickConnection && <LoginPopUp />}
			<div className="min-w-full h-full flex flex-col items-center">
					
					{ basket.edges.length !== 0 ? (
							<>
								<div className='flex lg:flex-row flex-col w-full items-center lg:items-start justify-start lg:justify-center'>
									<div className='bg-white mt-3 p-4 rounded-lg lg:w-[45rem] md:w-1/2 flex flex-col shadow-md'>
										<div className='mb-3 flex items-center'>
											<h3 className='mr-3'>Vos articles</h3>
											<CustomButton 
												label='Continuer mes achats' 
												color='secondaryColor'
												icon={<AddSVG/>}
												unfilled={true}
											/>
										</div>
										{ basket.edges.map ((basketCommerce, i) => (
											<div key={basketCommerce.commerce.id}>
												<div className='bg-primary-color-lightened pl-2 rounded text-lg font-medium text-black flex items-center justify-between'>
													<span>{basketCommerce.commerce.name}</span>
													<div className='bg-white mr-2 text-sm w-5 h-5 rounded-full flex items-center justify-center'>{basketCommerce.products.length}</div>
												</div>
												{ basketCommerce.products.map((ccProduct, j) => (
													<div key={ccProduct.product.id} className='grid grid-cols-[auto_1fr_auto] grid-rows-2 my-5'>
														<div className='h-20 w-20 bg-gray-200 rounded-xl flex items-center justify-center row-[1/3] mr-4'>
															<img 
																className='h-2/4 opacity-60'
																src="https://img.icons8.com/material/344/picture--v1.png" 
																alt="logo de base d'une image"
															/>
														</div>
														<span className='font-medium self-center text-lg'>{ccProduct.product.name}</span>
														<CustomButton 
															color="secondaryColor"
															label="Supprimer"
															onClick={e => removeProduct(i,j)}
														/>
														<span className='self-center text-sm'>
															<b className='font-medium text-2xl text-primary-color mr-2'>{ccProduct.product.price}€</b>/{getUnitLabel(ccProduct.product.unit)}
														</span>
														<div className='self-end flex items-center justify-center'>
															<button 
																className='h-5 w-5 rounded-full bg-primary-color text-white flex items-center justify-center text-lg font-bold'
																onClick={e => {
																	if(ccProduct.quantity == 1){
																		removeProduct(i,j)
																	} else {
																		setBasket(e => {
																			let basketCopy = {...basket} as Basket
																			basketCopy.edges[i].products[j].quantity--
																			localStorage.setItem("basket", JSON.stringify(basketCopy))
																			return basketCopy;
																		})
																	}
																}}
															>-</button>
															<span className='mx-2'>{ccProduct.quantity}</span>
															<button 
																className='h-5 w-5 rounded-full bg-primary-color text-white flex items-center justify-center text-lg font-bold'
																onClick={e => {
																	setBasket(e => {
																		let basketCopy = {...basket} as Basket
																		basketCopy.edges[i].products[j].quantity++
																		localStorage.setItem("basket", JSON.stringify(basketCopy))
																		return basketCopy;
																	})
																}}
															>+</button>
														</div>
													</div>
												))}
											</div>
										))}
									</div>
									<div className='w-1/2 lg:w-60 lg:ml-3' >
										<SummaryCheckout basket={basket}/>
									</div> 
								</div>
								<div className='mt-4'>
									<CustomButton 
										disabled={basket.edges.length === 0}
										loading={loading} 
										color="secondaryColor"
										label="Passer ma commande"
										onClick={e => {
											if( login && !login.jwt){
												setClickConnection(true)
											} else {
												Router.push("time_slot")
											}
										}}
									/>
								</div>
							</>
					) : (
						<Card className='mt-32'>
							<div className='flex flex-col items-center'>
								<span className='italic'>Aucun produit de vos régions dans votre panier</span>
								<span className='italic mb-4'>Ajoutez-en pour continuer</span>
								<CustomButton 
									label="Chercher des produits"
									onClick={_ => {
										Router.push('/commerces/1')
									}}
								/>
							</div>
						</Card>
					)}
			</div>
    </Layout>
  )
}
