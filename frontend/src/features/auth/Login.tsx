/** @format */
import { useLoginUserMutation } from "../users/usersApiSlice.js";
import { toast } from "react-toastify";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { setCredentials } from "./authSlice";

const Login = () => {
	const [username, setusername] = useState("");
	const [password, setPassword] = useState("");
	const [loginUser] = useLoginUserMutation();
	const dispatch = useDispatch();
	const token = useSelector(state => state.auth.token);

	const loginClick = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		try {
			const data = await loginUser({ username, password }).unwrap();
			if (data.error) {
				toast.error(data.error);
				return;
			}
			if (data.success === true) {
				dispatch(setCredentials(data));
				localStorage.setItem("auth", data.token);
				// localStorage.setItem("company", data.user.company);
				toast.success("Login successful!");
				window.location.reload();
			}
		} catch (error) {
			console.error(error);
			toast.error("Login failed. Please check your credentials.");
		}
	};

	if (token) {
		return <Navigate to="/dash" />;
	}

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
					<form
						className="card-body"
						onSubmit={loginClick}
					>
						<div className="form-control">
							<label className="label">
								<span className="label-text">username</span>
							</label>
							<input
								type="text"
								placeholder="username"
								className="input input-bordered"
								onChange={e => {
									setusername(e.target.value);
								}}
								value={username}
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
								onChange={e => {
									setPassword(e.target.value);
								}}
								value={password}
								required
							/>
						</div>
						<div className="mt-6 form-control">
							<button
								type="submit"
								className="btn btn-primary"
							>
								Login
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
