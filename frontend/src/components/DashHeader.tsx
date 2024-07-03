/** @format */

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
const DashHeader = () => {
	const dispatch = useDispatch();
	return (
		<div className="navbar bg-base-100">
			<div className="flex-1">
				<Link
					to={"/"}
					className="text-xl btn btn-ghost"
				>
					Tasify
				</Link>
			</div>
			<div className="flex-none">
				<button
					className="btn btn-square btn-ghost"
					onClick={() => dispatch(logout())}
				>
					logout
				</button>
			</div>
		</div>
	);
};

export default DashHeader;
