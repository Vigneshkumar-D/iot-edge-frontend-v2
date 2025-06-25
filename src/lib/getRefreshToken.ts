import Cookies from 'js-cookie';

export const getRefreshToken = async () => {
	const token =  Cookies.get("REFRESH_TOKEN")?.valueOf;
	return token;
};
