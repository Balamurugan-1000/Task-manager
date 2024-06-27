/** @format */

const Login = () => {
	return (
		<div className="min-h-screen gap-20 hero bg-base-200">
			<div className="flex-col gap-20 hero-content lg:flex-row-reverse min-w-[50%] ">
				<div className="gap-20 text-center lg:text-left">
					<h1 className="mb-4 text-5xl font-bold text-nowrap">
						Login now!
					</h1>
					<p className="text-lg">
						Login to access your account and manage your tasks.
					</p>
				</div>
				<div className="w-full max-w-sm shadow-2xl card bg-base-100 shrink-0">
					<form className="card-body">
						<div className="form-control">
							<label className="label">
								<span className="label-text">Email</span>
							</label>
							<input
								type="email"
								placeholder="email"
								className="input input-bordered"
								required
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Password</span>
							</label>
							<input
								type="password"
								placeholder="password"
								className="input input-bordered"
								required
							/>
							<label className="label">
								<a
									href="#"
									className="label-text-alt link link-hover"
								>
									Forgot password?
								</a>
							</label>
						</div>
						<div className="mt-6 form-control">
							<button className="btn btn-primary">Login</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
