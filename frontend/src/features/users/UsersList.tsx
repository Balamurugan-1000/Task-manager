/** @format */

import { useSelector } from "react-redux";
import {
	useGetAllUsersQuery,
	useCreateEmployeeMutation,
	useDeleteEmployeeMutation,
	useUpdateEmployeeMutation,
} from "./usersApiSlice.js";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UsersList = () => {
	const company = useSelector(state => state.auth.user.user.company);
	const name = useSelector(state => state.auth.user.user.username);
	const {
		data: users,
		error,
		isLoading,
		refetch,
	} = useGetAllUsersQuery(company);
	const [createEmployee, { data, error: createError }] =
		useCreateEmployeeMutation();
	const [deleteEmployee] = useDeleteEmployeeMutation();
	const [updateEmployee] = useUpdateEmployeeMutation();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [roles, setRoles] = useState("Employee");
	const [active, setActive] = useState(true);

	const [editUser, setEditUser] = useState(null);

	useEffect(() => {
		if (createError) {
			toast.error(createError);
		}
	}, [createError]);

	useEffect(() => {
		setUsername("");
		setPassword("");
		setRoles("");
		setActive(true);
	}, [users]);

	console.log(users);
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

	const editEmployeeHandler = async e => {
		e.preventDefault();
		if (!editUser) return;

		await updateEmployee({ id: editUser._id, username, active, roles });
		setEditUser(null);
		setActive(true);
		setUsername("");
		setRoles("");
		refetch();
		(document.getElementById("my_modal_2") as HTMLDialogElement).close();
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
	const usersData = users.filter(user => user.username !== name);

	const openEditModal = user => {
		setEditUser(user);
		setUsername(user.username);
		setActive(user.active);
		setRoles(user.roles);
		document.getElementById("my_modal_2")?.showModal();
	};

	return (
		<div className="max-w-[90%] mx-auto">
			<div className="overflow-x-auto">
				<button
					className="mt-10 ml-5 btn btn-primary btn-sm"
					onClick={() => {
						setActive(true);
						setUsername("");
						setRoles("");
						(
							document.getElementById(
								"my_modal_3",
							) as HTMLDialogElement
						)?.showModal();
					}}
				>
					Create User
				</button>
				<dialog
					id="my_modal_3"
					className="modal"
				>
					<div className="modal-box">
						<form method="dialog">
							<button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">
								✕
							</button>
						</form>
						<h3 className="text-lg font-bold">Create User</h3>
						<form onSubmit={submitHandler}>
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
												<p
													key={task._id}
													className="py-1 mb-3 rounded-md text-[15px]"
												>
													{task.title}
												</p>
										  ))}
								</td>
								<td>
									<button
										className="btn btn-sm btn-primary hover:bg-blue-500"
										onClick={e => openEditModal(user)}
									>
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
										className="text-white bg-red-500 btn btn-sm hover:bg-red-600 "
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{editUser && (
				<dialog
					id="my_modal_2"
					className="modal"
				>
					<div className="modal-box">
						<form
							onSubmit={editEmployeeHandler}
							className="gap-2 text-xl "
						>
							<input
								type="text"
								placeholder="Username"
								className="w-full mb-2 text-xl outline-none input placeholder:text-xl"
								onChange={e => setUsername(e.target.value)}
								value={username}
								autoFocus
							/>

							<input
								type="checkbox"
								onChange={e => setActive(e.target.checked)}
								checked={active}
							/>
							<label>Active</label>
							<select
								className="input"
								onChange={e => setRoles(e.target.value)}
								value={roles}
							>
								<option value="">Select Role</option>
								<option value="Admin">Admin</option>
								<option value="Employee">Employee</option>
							</select>
							<button
								className="btn"
								type="submit"
							>
								Update
							</button>
						</form>
					</div>
					<form
						onSubmit={e => {
							e.preventDefault();
							setEditUser(null)(
								document.getElementById(
									"my_modal_2",
								) as HTMLDialogElement,
							).close();
							setActive(true);
							setUsername("");
							setRoles("");
						}}
						method="dialog"
						className="modal-backdrop"
					>
						<button>close</button>
					</form>
				</dialog>
			)}
		</div>
	);
};

export default UsersList;
