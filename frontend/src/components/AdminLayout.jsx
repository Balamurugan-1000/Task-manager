/** @format */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminLayout = () => {
	const isAuthenticated = useSelector(
		(state: any) => state.auth.isAutheticated,
	);
	console.log(isAuthenticated);

	return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminLayout;
