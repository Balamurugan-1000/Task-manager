/** @format */

import { Outlet } from "react-router-dom";
import DashHeader from "./DashHeader.tsx";
import DashFooter from "./DashFooter.tsx";

const DashLayout = () => {
	return (
		<div className="flex flex-col items-center justify-between w-screen h-screen overflow-hidden ">
			<DashHeader />
			<div className="flex-grow">
				<Outlet />
			</div>
			<DashFooter />
		</div>
	);
};
export default DashLayout;
