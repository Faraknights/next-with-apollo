import { GetServerSidePropsContext, NextApiHandler, NextApiRequest } from "next";
import { Session } from "next-iron-session";
import { withIronSessionApiRoute } from "iron-session/next";
import { IronSessionOptions } from "iron-session";
import { Login } from "../pages/api/login";

const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD + "",//cacher le mot de passe en process.env
  cookieName: "iron-session/examples/next.js",
  cookieOptions: {
    sameSite: "lax",
    maxAge: 10000000,
    secure: false,//mettre à true en prod 
  },
};

export default function withSession(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}

export type NextIronRequest = NextApiRequest & {
	session: Session
}

export type NextIronServerSideProps = |
	GetServerSidePropsContext & {
		req: NextIronRequest
	}

// This is where we specify the typings of req.session.*
declare module "iron-session" {
  interface IronSessionData {
    user?: Login;
  }
}