import { GetServerSidePropsContext, NextApiRequest } from "next";
import { Session, SessionOptions, withIronSession } from "next-iron-session";

const sessionOptions: SessionOptions = {
  password: "UhOH4CHOUKYfehasXvkHCq8ZX7nu5maTpJQBUDmp",//cacher le mot de passe en process.env
  cookieName: "iron-session/examples/next.js",
  cookieOptions: {
    secure: true //process.env.NODE_ENV === "production", 
  },
};

export default function withSession(handler: Function) {
  return withIronSession(handler, sessionOptions);
}

export type NextIronRequest = NextApiRequest & {
	session: Session
}

export type NextIronServerSideProps = |
	GetServerSidePropsContext & {
		req: NextIronRequest
	}