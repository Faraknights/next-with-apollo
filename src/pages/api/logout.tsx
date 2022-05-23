import { NextApiResponse } from "next";
import withSession, { NextIronRequest } from "../../lib/session";

export default withSession(
	function logoutRoute(req : NextIronRequest, res : NextApiResponse) {
		req.session.destroy();
		res.send({answer: "Log Out"});
	}
)