/**
 * eslint-disable no-mixed-spaces-and-tabs
 *
 * @format
 */

/** @format */

/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSelector } from "react-redux";
import {
	useGetAllUsersQuery,
	useCreateEmployeeMutation,
	useDeleteEmployeeMutation,
} from "./usersApiSlice.js";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const UsersList = () => {
	const company = useSelector(state => state.auth.user.user.company);
	const {
		data: users,
		error,
		isLoading,
		refetch,
	} = useGetAllUsersQuery({ company });
	const [createEmployee, { data, error: createError }] =
		useCreateEmployeeMutation();
	const [deleteEmployee] = useDeleteEmployeeMutation();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	const submitHandler = async e => {
		e.preventDefault();
		if (!username) {
			toast.error("Username is required");
			return;
		}
		if (!password) {
			toast.error("Password is required");
			return;
		}
		await createEmployee({ username, password, company });
		refetch();
		setUsername("");
		setPassword("");
		(document.getElementById("my_modal_3") as HTMLDialogElement).close();
	};

	const deleteEmployeeHandler = async ({ id }) => {
		const confirm = window.confirm("Are you sure?");
		if (confirm) {
			await deleteEmployee({ id });
			refetch();
		}
	};

	if (users?.success === false) {
		return <div>Error: {users?.message}</div>;
	}
	const usersData = users.filter(user => user.roles !== 5000);

	return (
		<div className="max-w-[80%] mx-auto">
			<div className="overflow-x-auto">
				{/* You can open the modal using document.getElementById('ID').showModal() method */}
				<button
					className="btn"
					onClick={() =>
						(
							document.getElementById(
								"my_modal_3",
							) as HTMLDialogElement
						)?.showModal()
					}
				>
					Create User
				</button>
				<dialog
					id="my_modal_3"
					className="modal"
				>
					<div className="modal-box">
						<form method="dialog">
							{/* if there is a button in form, it will close the modal */}
							<button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">
								✕
							</button>
						</form>
						<h3 className="text-lg font-bold">Hello!</h3>
						<form
							onSubmit={e => {
								submitHandler(e);
							}}
						>
							<input
								type="text"
								placeholder="Username"
								className="outline-none input"
								onChange={e => setUsername(e.target.value)}
								value={username}
								autoFocus
							/>
							<input
								type="password"
								placeholder="Password"
								className="input"
								onChange={e => setPassword(e.target.value)}
								value={password}
							/>

							<button className="btn">Add</button>
						</form>
					</div>
				</dialog>
				<table className="table">
					{/* head */}
					<thead>
						<tr>
							<th>Name</th>
							<th>Job</th>
							<th>Groups</th>
							<th>Tasks</th>
							<th>Edit</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{/* row 1 */}

						{usersData?.map(user => (
							<tr key={user._id}>
								<td>{user.username}</td>

								<td>
									{user.roles === 5000 ? "Admin" : "Employee"}
								</td>
								<td>
									{user?.groups?.length === 0
										? "Not in Group"
										: user.groups.map(group => (
												<p key={group._id}>
													{group.name}
												</p>
										  ))}
								</td>
								<td>
									{user?.tasks?.length === 0
										? "No Task"
										: user?.tasks?.map(task => (
												<p key={task._id}>
													{task.name}
												</p>
										  ))}
								</td>
								<td>
									<button className="btn btn-sm btn-ghost">
										Edit
									</button>
								</td>
								<td>
									<button
										onClick={() =>
											deleteEmployeeHandler({
												id: user._id,
											})
										}
										className="btn btn-sm btn-danger"
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
					{/* foot */}
				</table>
			</div>
		</div>
	);
};

export default UsersList;
