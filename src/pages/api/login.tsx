import withSession, { NextIronRequest } from "../../lib/session";
import { NextApiResponse } from "next";

export type Login = {
	jwt: String;
};

export default withSession(
  async function loginRoute(req: NextIronRequest, res: NextApiResponse) {
    const { jwt } = await req.body;

    const user = { jwt: jwt } as Login;
    req.session.set( 'user', user )
    await req.session.save();
    res.json(user);
  }
);