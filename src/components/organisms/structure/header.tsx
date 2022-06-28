import Link from "next/link";
import { useEffect, useState } from "react";
import clientWithHeader from "../../../apollo/clientWithHeader";
import { MenuSVG } from "../../../assets/svg/general/svgGeneral";
import { GET_USER } from "../../../graphql/user";
import { User } from "../../../interfaces/user";
import fetchJson from "../../../lib/fetchJson";
import useUser from "../../../lib/useUser";
import CustomButton from "../../atoms/general/customButton";
import Aside from "./aside";
import Router from "next/router";

interface HeaderProps {
  title?: string;
}

export default function Header(options: HeaderProps) {
  const { title } = options;

  const [user, setUser] = useState({} as User);
  const [openAside, setOpenAside] = useState(false);
  const { login, mutateLogin } = useUser();

  useEffect(() => {
    async function GetUser() {
      const { data } = await clientWithHeader.query({
        query: GET_USER,
        context: { accessToken: login!.jwt },
      });
      setUser(data.user);
    }
    if (login && login.jwt) {
      GetUser();
    }
  }, []);
  return (
    <header className="w-full p-2 bg-white shadow-md flex justify-between items-center z-50 fixed top-0 h-16">
      <div className="flex items-center">
        <CustomButton
          label="Menu"
          color="secondaryColor"
          icon={<MenuSVG />}
          onClick={(_) => setOpenAside(true)}
        />
        {openAside && (
          <Aside
            openAside={openAside}
            setOpenAside={setOpenAside}
            mutateLogin={mutateLogin}
          />
        )}
        <h1 className="ml-5">{title}</h1>
      </div>
      <div>
        {login && login!.jwt ? (
          <>
            <span className="mr-3">{user.firstName}</span>
            <CustomButton
              label="Se déconnecter"
              color="secondaryColor"
              onClick={async (e) => {
                mutateLogin(
                  await fetchJson("/api/logout", {
                    method: "POST",
                  })
                );
              }}
            />
          </>
        ) : (
          <CustomButton
            label="Se connecter"
            onClick={(_) => {
              Router.push("/login");
            }}
          />
        )}
      </div>
    </header>
  );
}
