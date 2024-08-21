/** @format */
import { selectUser } from "../features/auth/authSlice";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
const DashHeader = () => {
	const dispatch = useDispatch();
	let user = useSelector(selectUser);
	user = user.user;
	console.log(user);
	return (
		<div className="navbar bg-base-100">
			<div className="flex-1">
				<Link
					to={"/dash"}
					className="text-xl btn btn-ghost"
				>
					Tasify
				</Link>
			</div>
			{user.roles === 5000 ? (
				<div className="flex-none gap-10">
					<Link
						to="users"
						className="btn btn-square btn-ghost"
					>
						Users
					</Link>
					<Link
						to="groups"
						className="btn btn-square btn-ghost"
					>
						Groups
					</Link>
					<Link
						to="tasks"
						className="btn btn-square btn-ghost"
					>
						Tasks
					</Link>

					<button
						className="btn btn-square btn-ghost"
						onClick={() => dispatch(logout())}
					>
						logout
					</button>
				</div>
			) : (
				<div className="flex-none gap-10">
					<Link
						to="tasksAssigned"
						className="btn btn-square btn-ghost"
					>
						Tasks
					</Link>
					<Link
						to="groupsAssigned"
						className="btn btn-square btn-ghost"
					>
						Groups
					</Link>

					<button
						className="btn btn-square btn-ghost"
						onClick={() => dispatch(logout())}
					>
						logout
					</button>
				</div>
			)}
		</div>
	);
};

export default DashHeader;
