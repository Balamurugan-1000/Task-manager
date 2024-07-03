/** @format */

import { Link } from "react-router-dom";

const Welcome = () => {
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
								<Link
									to={"notes"}
									className="text-white btn join-item btn-primary"
								>
									<button>View Notes</button>
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
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Welcome;
