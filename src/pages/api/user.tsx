import withSession, { NextIronRequest } from "../../lib/session";
import { NextApiResponse } from "next";

export default withSession(
  async function userRoute(req: NextIronRequest, res: NextApiResponse) {
   res.json({
     ...req.session.get('user')
   })
  }
);