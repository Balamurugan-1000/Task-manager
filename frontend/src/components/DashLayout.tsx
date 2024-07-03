/** @format */

import DashHeader from "./DashHeader.tsx";
import DashFooter from "./DashFooter.tsx";
import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
const DashLayout = () => {
	const location = useLocation();
	const token = useSelector(state => state.auth.token);
	if (!token) {
		return (
			<Navigate
				to="/login"
				state={{ from: location }}
				replace
			/>
		);
	}

	return (
		<>
			<DashHeader />
			<Outlet />
			<DashFooter />
		</>
	);
};
export default DashLayout;
