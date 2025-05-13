/** @format */

import { Link } from "react-router-dom";
const Public = () => {
	let data = localStorage.getItem("user");
	data = JSON.parse(data);
	const content = data?.user ? "Dash" : "Login";
	return (
		<div className="w-screen h-screen overflow-hidden">
			<div className="nav">
				<div className="navbar bg-base-300">
					<div className="navbar-start">
						<div className="dropdown">
							<div
								tabIndex={0}
								role="button"
								className="btn btn-ghost lg:hidden"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="w-5 h-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M4 6h16M4 12h8m-8 6h16"
									/>
								</svg>
							</div>
							<ul
								tabIndex={0}
								className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
							>
								<li>
									<Link to={"/dash"}>Item 1</Link>
								</li>
								<li>
									<a>Parent</a>
									<ul className="p-2">
										<li>
											<a>Submenu 1</a>
										</li>
										<li>
											<a>Submenu 2</a>
										</li>
									</ul>
								</li>
								<li>
									<a>Item 3</a>
								</li>
							</ul>
						</div>
						<Link
							to={"/"}
							className="text-xl btn btn-ghost"
						>
							Taskify
						</Link>
					</div>
					<div className="hidden navbar-center lg:flex">
						<ul className="px-1 menu menu-horizontal">
							<li>
								<a>Item 1</a>
							</li>
							<li>
								<details>
									<summary>Parent</summary>
									<ul className="p-2">
										<li>
											<a>Submenu 1</a>
										</li>
										<li>
											<a>Submenu 2</a>
										</li>
									</ul>
								</details>
							</li>
							<li>
								<a>Item 3</a>
							</li>
						</ul>
					</div>
					<div className="navbar-end">
						<button className="btn">
							<Link
								to="/login"
								className="text-lg"
							>
								{content}
							</Link>
						</button>
					</div>
				</div>
			</div>
			<div className="w-screen hero">
				<div className="min-h-screen hero">
					<div className="bg-black hero-overlay bg-opacity-80"></div>
					<div className="text-center hero-content text-neutral-content">
						<div className="max-w-md">
							<h1 className="mb-5 text-[70px] font-bold">
								Hello there
							</h1>
							<p className="mb-5 text-xl">
								Welcome to Taskify, the best task manager you'll
								ever use.
							</p>
							<Link to={"/register"}>
								<button className="text-white btn-primary btn">
									Get Started
								</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Public;
