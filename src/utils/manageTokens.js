import { tokenService } from "../services/token.service.js";

export async function manageTokens(user) {
	const tokens = tokenService.generateTokens({ id: user.id, email: user.email });
	await tokenService.saveRefreshToken(user.id, tokens.refreshToken);

	return tokens;
}
