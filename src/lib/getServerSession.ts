// "use server";
// import { jwtDecode } from "jwt-decode";
// import { cookies } from "next/headers";

// export const getServerSession = async () => {
// 	const token = (await cookies()).get("AUTH_TOKEN")?.value;
// 	const decodedToken: Token | null = token ? jwtDecode(token) : null;
// 	const session: AuthSession = {
// 		uuid: decodedToken?.uuid || null,
// 		avatarUrl: decodedToken?.avatarUrl || null,
// 		name: decodedToken?.name || null,
// 		email: decodedToken?.email || null,
// 		contactNo: decodedToken?.contactNo || null,
// 		organization: {
// 			uuid: decodedToken?.organization?.uuid || null,
// 			logoUrl: decodedToken?.organization?.logoUrl || null,
// 			name: decodedToken?.organization?.name || null,
// 			email: decodedToken?.organization?.email || null,
// 			contactNo: decodedToken?.organization?.contactNo || null,
// 			website: decodedToken?.organization?.website || null,
// 		},
// 		roles: decodedToken?.roles || [],
// 	};
// 	return decodedToken ? session : null;
// };

import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';

export const getClientSession = (): AuthSession | null => {
	const token = Cookies.get("AUTH_TOKEN"); // ✅ CORRECT

	if (!token) return null;

	let decodedToken: Token | null = null;

	try {
		decodedToken = jwtDecode<Token>(token);
	} catch (e) {
		console.error("Invalid JWT token:", e);
		return null;
	}

	const session: AuthSession = {
		uuid: decodedToken?.uuid || null,
		avatarUrl: decodedToken?.avatarUrl || null,
		name: decodedToken?.name || null,
		email: decodedToken?.email || null,
		contactNo: decodedToken?.contactNo || null,
		organization: {
			uuid: decodedToken?.organization?.uuid || null,
			logoUrl: decodedToken?.organization?.logoUrl || null,
			name: decodedToken?.organization?.name || null,
			email: decodedToken?.organization?.email || null,
			contactNo: decodedToken?.organization?.contactNo || null,
			website: decodedToken?.organization?.website || null,
		},
		roles: decodedToken?.roles || [],
	};

	return session;
};
