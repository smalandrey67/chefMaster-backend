export const refreshTokenCookieOptions = {
	maxAge: 30 * 24 * 60 * 60 * 60 * 1000,
	httpOnly: true
};

export const accessTokenJwtOptions = {
	expiresIn: "30m"
};

export const refreshTokenJwtOptions = {
	expiresIn: "30d"
};
