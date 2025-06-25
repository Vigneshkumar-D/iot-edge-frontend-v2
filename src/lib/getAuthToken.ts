import Cookies from 'js-cookie';

export const getAuthToken = () => {
	const token = Cookies.get("AUTH_TOKEN"); // returns string | undefined
	return token;
};
