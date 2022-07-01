import {useEffect, useState } from "react";
import Card from "../../components/atoms/general/card";
import SummaryCheckout from "../../components/molecules/checkout/summaryCheckout";
import CustomButton from "../../components/atoms/general/customButton";
import { ArrowSVG } from "../../assets/svg/general/svgGeneral";
import Checkout from "../../components/organisms/checkout/checkout";
import ListCards from "../../components/organisms/checkout/listCards";
import AddressPage from "../../components/organisms/checkout/address";
import ListAddresses from "../../components/organisms/checkout/listAdresses";
import useUser from "../../lib/useUser";
import { User } from "../../interfaces/user";
import { GET_USER } from "../../graphql/user";
import clientWithHeader from "../../apollo/clientWithHeader";
import { Basket } from "../../interfaces/basket";
import Router from "next/router";
import RadioProgression from "../../components/molecules/checkout/radioProgression";
import Layout from "../../components/organisms/structure/layout";

export enum PageContactInformation {
  "main" = 0,
  "createMethod" = 1,
  "listMethod" = 2,
}

export default function ContactInformation() {

  const [page, setPage] = useState(
    PageContactInformation.main as PageContactInformation
  );
  const [newCard, setNewCard] = useState(true);
  const [newAddress, setNewAddress] = useState(true);

  const [basket, setBasket] = useState({ edges: [] } as Basket);
  useEffect(() => {
    const tmpBasket = JSON.parse(localStorage.getItem("basket")!);
    if (tmpBasket) setBasket(tmpBasket);
  }, []);
  
  const { login } = useUser();

  const [user, setUser] = useState({} as User);
  const [loginReady, setLoginReady] = useState(false);
  if (login && login.jwt && !loginReady) {
    setLoginReady(true);
  }
  if (loginReady && login && !login.jwt) {
    setLoginReady(false);
    setUser({});
  }
  useEffect(() => {
    async function GetUser() {
      const { data } = await clientWithHeader.query({
        query: GET_USER,
        context: { accessToken: login!.jwt },
      });
      setUser(data.user);
    }
    if (login && login.jwt) GetUser();
  }, [loginReady]);
  
	useEffect(() => {
		if(login && !login?.jwt)
			Router.push("basket")
  }, []);

	useEffect(() => {
		if(login && !login?.jwt)
			Router.push("basket")
	}, [login])

  return (
		<Layout title='Coordonnées'>
			<div className="w-1/2">
				<RadioProgression
					structure={["Panier", "Créneaux", "Coordonnées", "Confirmation"]}
					currentPos={3}
				/>
			</div>
      <div className="flex min-w-full items-start overflow-hidden">
        <div
          className="min-w-full h-full flex flex-col items-center transition"
          style={{ transform: "translateX(-" + (page * 100).toString() + "%)" }}
        >
          <Card className="w-1/2 px-4 pb-0 mb-0">
            <h2 className="text-black font-medium">Récapitulatif de commande</h2>
            <SummaryCheckout basket={basket} />
          </Card>
          <Card className="w-1/2 p-0 pb-2 cursor-pointer mb-0">
            <div className="px-4 pb-0 pt-2" onClick={(_) => setPage(1)}>
              <div className="flex justify-between items-center">
                <h2 className="text-black font-medium">Adresse de facturation</h2>
                <ArrowSVG />
              </div>
              {basket.address ? (
                <div className="flex flex-col">
                  <h2 className="font-medium text-title-3 mt-2">
                    Adresse - Nom Prénom
                  </h2>
                  <h2 className="text-bodyLarge">
                    {basket.address.number} {}
                    {basket.address.route}
                    {basket.address.optionalRoute
                      ? ", " + basket.address.optionalRoute
                      : ""}
                    , {}
                    {basket.address.postalCode}, {}
                    {basket.address.city}
                  </h2>
                </div>
              ) : (
                <div className="my-5">
                  <h3 className="text-title-3 font-medium mb-2">
                    Aucune adresse de facturation
                  </h3>
                  <h3 className="text-bodyLarge">Renseignez votre adresse</h3>
                </div>
              )}
            </div>
          </Card>
          <Card className="w-1/2 p-0 pb-2 cursor-pointer">
            <div className="px-4 pb-0 pt-2" onClick={(_) => setPage(2)}>
              <div className="flex justify-between items-center">
                <h2 className="text-black font-medium">Infos de paiement</h2>
                <ArrowSVG />
              </div>
              {basket.stripeCard ? (
                <div className="flex flex-col">
                  <h2 className="font-medium text-title-3 mt-2">
                    Carte {basket.stripeCard.cardBrand}
                  </h2>
                  <div className="flex mb-2">
                    <h2 className="text-bodyLarge">
                      {basket.stripeCard.cardBrand}
                    </h2>
                    <h2 className="text-bodyLarge ml-2">
                      **** {basket.stripeCard.cardLast4Digits}
                    </h2>
                  </div>
                </div>
              ) : (
                <div className="my-5">
                  <h3 className="text-bodyLarge font-medium mb-2">
                    Aucun moyen de paiement
                  </h3>
                  <h3 className="text-bodyLarge">
                    Renseignez votre moyen de paiement
                  </h3>
                </div>
              )}
            </div>
          </Card>
          <CustomButton
            label="Payer"
            color="secondaryColor"
            disabled={!basket.stripeCard}
            onClick={(e) => {
              Router.push("confirm")
            }}
          />
        </div>
        {newAddress ? (
          <div
            className={
              "min-w-full h-full flex flex-col items-center transition " +
              (page != 1 ? "opacity-0" : "")
            }
            style={{ transform: "translateX(-" + (page * 100).toString() + "%)" }}
          >
            <AddressPage user={user} />
          </div>
        ) : (
          <div
            className={
              "min-w-full h-full flex flex-col items-center transition " +
              (page != 1 ? "opacity-0" : "")
            }
            style={{ transform: "translateX(-" + (page * 100).toString() + "%)" }}
          >
            <ListAddresses
              basket={basket}
              setBasket={setBasket}
              setNewCard={setNewCard}
              setPage={setPage}
              user={user}
            />
          </div>
        )}
        {newCard ? (
          <div
            className={
              "min-w-full h-full flex flex-col items-center transition " +
              (page != 2 ? "opacity-0" : "")
            }
            style={{ transform: "translateX(-" + (page * 100).toString() + "%)" }}
          >
            <Checkout />
          </div>
        ) : (
          <div
            className={
              "min-w-full h-full flex flex-col items-center transition " +
              (page != 2 ? "opacity-0" : "")
            }
            style={{ transform: "translateX(-" + (page * 100).toString() + "%)" }}
          >
            <ListCards
              basket={basket}
              setBasket={setBasket}
              setNewCard={setNewCard}
              setPage={setPage}
              user={user}
            />
          </div>
        )}
      </div>
    </Layout>
  );
}
