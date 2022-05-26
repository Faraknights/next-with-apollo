import withSession from "../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";

export default withSession(
  async function userRoute(req: NextApiRequest, res: NextApiResponse) {
   res.json({
     ...req.session.user
   })
  }
);