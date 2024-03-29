const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const googleVerify = async (token) => {
	const ticket = await client.verifyIdToken({
		idToken: token,
		audience: process.env.GOOGLE_CLIENT_ID,
	});
	const payload = ticket.getPayload();
	const { name, picture, email } = payload;
	return {
		name,
		img: picture,
		email,
	};
};
module.exports = {
	googleVerify,
};
