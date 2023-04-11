export const refreshTokenCookieOptions = {
	maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
	httpOnly: true,
	sameSite: "none",
	secure: true
};

export const accessTokenJwtOptions = {
	expiresIn: "30m"
};

export const refreshTokenJwtOptions = {
	expiresIn: "30d"
};
