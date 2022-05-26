import withSession from "../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";

export type Login = {
	jwt: String;
};

export default withSession(
  async function loginRoute(req : NextApiRequest, res : NextApiResponse) {
    const { jwt } = await req.body;

    const user = { jwt: jwt } as Login;
    req.session.user = user
    await req.session.save();
    res.json(user);
  }
);