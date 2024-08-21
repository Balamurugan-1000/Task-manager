/** @format */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";

import { useRegisterUserMutation } from "../users/usersApiSlice.js";
import { useState } from "react";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
const Register = () => {
	const navigate = useNavigate();
	const [register] = useRegisterUserMutation();
	const [username, setusername] = useState("");
	const [companyName, setCompanyName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [email, setEmail] = useState("");
	const token = useSelector(state => state.auth.token);

	const registerClick = async (e: any) => {
		e.preventDefault();
		try {
			if (password !== confirmPassword) {
				alert("Passwords do not match");
				return;
			}

			const data = await register({
				username,
				company: companyName,
				password,
				email,
			}).unwrap();
			console.log(data);

			if (data.error) {
				toast.error(data.error);
				return;
			}

			toast.success("User registered successfully");
			setusername("");
			setCompanyName("");
			setPassword("");
			setConfirmPassword("");
			navigate("/dash");
		} catch (error) {
			toast.error("Registration failed. Please try again");
			console.log(error);
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
						Register now!
					</h1>
					<p className="text-lg">
						Register your Company to get started
					</p>
				</div>
				<div className="w-full max-w-sm shadow-2xl card bg-base-100 shrink-0">
					<form
						className="card-body"
						onSubmit={e => registerClick(e)}
					>
						<div className="form-control">
							<label className="label">
								<span className="label-text">username</span>
							</label>
							<input
								type="text"
								placeholder="username"
								className="input input-bordered"
								required
								value={username}
								onChange={e => {
									setusername(e.target.value);
								}}
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Email</span>
							</label>
							<input
								type="email"
								placeholder="Email"
								className="input input-bordered"
								required
								value={email}
								onChange={e => {
									setEmail(e.target.value);
								}}
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Company name</span>
							</label>
							<input
								type="text"
								placeholder="Company or Organization name"
								className="input input-bordered"
								required
								value={companyName}
								onChange={e => {
									setCompanyName(e.target.value);
								}}
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
								value={password}
								onChange={e => {
									setPassword(e.target.value);
								}}
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">
									Confirm password
								</span>
							</label>
							<input
								type="password"
								placeholder="Retype password"
								className="input input-bordered"
								required
								value={confirmPassword}
								onChange={e => {
									setConfirmPassword(e.target.value);
								}}
							/>
						</div>

						<div className="mt-6 form-control">
							<button
								type="submit"
								className="btn btn-primary"
							>
								Register
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;
