import { NextApiRequest, NextApiResponse } from "next";
import withSession from "../../lib/session";

export default withSession(
	function logoutRoute(req : NextApiRequest, res : NextApiResponse) {
		req.session.destroy();
		res.send({answer: "Log Out"});
	}
)