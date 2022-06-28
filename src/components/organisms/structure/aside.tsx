import { Dispatch, SetStateAction, useState } from "react";
import React, { useRef, useEffect } from "react";
import Menu, { positionMenu } from "../../molecules/general/menu";
import {
  CommandsLogo,
  CommerceLogo,
  FavoriteLogo,
  FidelityLogo,
  HomeLogo,
  LogoutLogo,
  SettingsLogo,
} from "../../../assets/svg/menu/svgMenu";
import fetchJson from "../../../lib/fetchJson";

interface AsideProps {
  openAside: boolean;
  setOpenAside: Dispatch<SetStateAction<boolean>>;
  mutateLogin: any;
}

export default function Aside(options: AsideProps) {
  const { openAside, setOpenAside, mutateLogin } = options;
  const [style, setStyle] = useState([
    "-translate-x-full",
    "bg-[rgba(0,0,0,0)]",
  ]);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setStyle(["-translate-x-full", "bg-[rgba(0,0,0,0)]"]);
          setTimeout(() => {
            setOpenAside(!openAside);
          }, 100);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useEffect(() => {
    setStyle(["translate-x-0", "bg-[rgba(0,0,0,.2)]"]);
  }, []);

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <>
      <div
        className={
          "fixed transition duration-200 top-0 left-0 right-0 bottom-0 pointer-events-none z-0 " +
          style[1]
        }
      ></div>
      <aside
        ref={wrapperRef}
        className={
          "bg-white transition duration-75 ease-linear fixed top-0 left-0 bottom-0 w-80 z-10 " +
          style[0]
        }
      >
        <Menu
          position={positionMenu.vertical}
          structure={[
            {
              icon: <HomeLogo />,
              label: "Accueil",
              link: "/",
            },
            {
              icon: <CommandsLogo />,
              label: "Commandes",
              link: "/commands/basket",
            },
            {
              icon: <FavoriteLogo />,
              label: "Favoris",
            },
            {
              icon: <FidelityLogo />,
              label: "Fidélité",
            },
            {
              icon: <CommerceLogo />,
              label: "Commerces",
              link: "/commerces/1",
            },
            {
              icon: <SettingsLogo />,
              label: "Paramètres",
            },
            {
              icon: <LogoutLogo />,
              label: "Déconnexion",
              warning: true,
              onClick: async (e) => {
                mutateLogin(
                  await fetchJson("/api/logout", {
                    method: "POST",
                  })
                );
                setOpenAside(!openAside);
              },
            },
          ]}
        />
      </aside>
    </>
  );
}
