"use client";
// import { usePathname, useSearchParams } from "next/navigation";
import { useLocation } from "react-router-dom";

import { authPlaceholder, registerIndividualPlaceholder, registerOrganizationPlaceholder } from "../../assets";

const AuthPlacholder = () => {
	// const path = usePathname();
	// const searchParams = useSearchParams();
	const location = useLocation();
	const path = location.pathname;
	const searchParams = new URLSearchParams(location.search);

	const type = searchParams.get("type") ?? "";

	if (path === "/auth/register") {
		if (type === "INDIVIDUAL") {
			return (
				<section className="sticky inset-y-0 left-0 hidden max-h-screen w-1/3 xl:block">
					<img alt="register-individual-placeholder" className="h-screen w-full object-cover" src={registerIndividualPlaceholder} />
				</section>
			);
		} else if (type === "ORGANIZATION") {
			return (
				<section className="sticky inset-y-0 left-0 hidden max-h-screen w-1/3 xl:block">
					<img alt="register-organization-placeholder" className="h-screen w-full object-cover" src={registerOrganizationPlaceholder} />
				</section>
			);
		}
	} else {
		return (
			<section className="sticky inset-y-0 left-0 hidden max-h-screen w-1/3 xl:block">
				<img alt="auth-placeholder" className="h-screen w-full object-cover" src={authPlaceholder} />
			</section>
		);
	}
};

export default AuthPlacholder;
