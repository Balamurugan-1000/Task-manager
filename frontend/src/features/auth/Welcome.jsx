/** @format */

import { Link } from "react-router-dom";
import { selectUser } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";
const Welcome = () => {
	const user = useSelector(selectUser);
	console.log(user.user.roles);
	return (
		<div>
			<div className="w-screen overflow-hidden bg-base-300 hero h-fit mb-[-150px]">
				<div className="min-h-screen mt-10">
					<div className="text-center hero-content text-neutral-content">
						<div className="max-w-md">
							<h1 className="mb-5 text-[70px] font-bold">
								Welcome to Taskify
							</h1>
							<p className="mb-5 text-xl">
								Welcome to Taskify, the best task manager you'll
								ever use.
							</p>
							<div className="gap-1 join join-vertical lg:join-horizontal">
								{user.user.roles === 5000 ? (
									<div className="">
										<Link
											to={"tasks"}
											className="text-white btn join-item btn-primary"
										>
											<button>View tasks</button>
										</Link>
										<Link
											to={"users"}
											className="text-white btn join-item btn-secondary"
										>
											<button>View Users</button>
										</Link>
										<Link
											to={"groups"}
											className="text-white btn btn-accent join-item"
										>
											<button>View Groups</button>
										</Link>
									</div>
								) : (
									<div className="">
										<Link
											to={"tasksAssigned"}
											className="text-white btn join-item btn-primary"
										>
											<button>View tasks</button>
										</Link>
										<Link
											to={"groupsAssigned"}
											className="text-white btn join-item btn-secondary"
										>
											<button>View Groups</button>
										</Link>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Welcome;
