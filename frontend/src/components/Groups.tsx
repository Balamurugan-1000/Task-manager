/** @format */
import { useState } from "react";
import {
	useCreateGroupMutation,
	useDeleteGroupMutation,
	useAddMemberMutation,
	useRemoveMemberMutation,
} from "../features/groups/groupSlice";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { company } from "../features/users/usersApiSlice";
import { useSelector } from "react-redux";
import useStoredValue from "../hooks/storedValues";
const Groups = () => {
	const {
		usersData,
		groupsData,
		refetchAll,
		isLoadingUsers,
		isLoadingGroups,
		isErrorUsers,
		isErrorGroups,
	} = useStoredValue();

	const [createGroup] = useCreateGroupMutation();
	const [name, setName] = useState("");

	const currentUsername = useSelector(state => state.auth.user.user.username);
	const users = usersData?.filter(user => user.username !== currentUsername);
	const [selectedUser, setSelectedUser] = useState("");

	const [deleteGroup] = useDeleteGroupMutation();
	const [addMember] = useAddMemberMutation();
	const [removeMember] = useRemoveMemberMutation();

	const createGroupHandler = async () => {
		await createGroup({
			id: company,
			name,
		});
		setName("");
		document.getElementById("create_group_modal").close();
		refetchAll();
	};

	const deleteGroupHandler = async id => {
		await deleteGroup({ id });
		refetchAll();
	};

	const addMemberHandler = async (id, userId) => {
		await addMember({ id, userId });
		document.getElementById(`add_member_modal_${id}`).close();
		setSelectedUser("");
		refetchAll();
	};

	const removeMemberHandler = async ({ id, userId }) => {
		const confirm = window.confirm("Are you sure?");
		if (confirm) {
			await removeMember({ id, userId });
			refetchAll();
		}
	};

	const groups = groupsData?.data;

	if (isLoadingUsers || isLoadingGroups) {
		return <div>Loading...</div>;
	}

	if (isErrorUsers || isErrorGroups) {
		return <div>Error loading data</div>;
	}
	console.log(groups);
	return (
		<div className="overflow-x-auto">
			<button
				className="mt-10 ml-5 btn btn-primary btn-sm"
				onClick={() =>
					document.getElementById("create_group_modal").showModal()
				}
			>
				Create Group
			</button>
			<dialog
				id="create_group_modal"
				className="modal"
			>
				<div className="modal-box">
					<form
						className="flex flex-col items-start gap-3"
						onSubmit={e => {
							e.preventDefault();
							createGroupHandler();
						}}
					>
						<input
							type="text"
							placeholder="Group Name"
							className="w-full input input-bordered"
							value={name}
							onChange={e => setName(e.target.value)}
						/>
						<div className="flex justify-end w-full">
							<button
								className="btn btn-primary btn-sm"
								type="submit"
							>
								Create Group
							</button>
						</div>
					</form>
				</div>
				<form
					method="dialog"
					className="modal-backdrop"
				>
					<button className="btn btn-sm">x</button>
				</form>
			</dialog>

			<table className="table w-full mt-5">
				<thead>
					<tr className="bg-base-300">
						<th>ID</th>
						<th>Name</th>
						<th>Members</th>
						<th>Tasks</th>
						<th>Status</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{groups?.map(group => (
						<tr key={group.title}>
							<td>{group.id}</td>
							<td>{group.name}</td>
							<td>
								{group.members.map(member => (
									<div
										key={member._id}
										className="flex items-center justify-between gap-2 p-2 mb-2 text-white bg-gray-800 rounded-md"
									>
										<span>{member.username}</span>
										<button
											className="btn btn-xs btn-error"
											onClick={() =>
												removeMemberHandler({
													id: group._id,
													userId: member._id,
												})
											}
										>
											<FontAwesomeIcon icon={faTrash} />
										</button>
									</div>
								))}
							</td>
							<td>
								{group.tasks?.map(task => (
									<div key={task._id}>{task.title}</div>
								))}
							</td>
							<td>
								<span
									className={
										group.active
											? "text-green-500"
											: "text-red-500"
									}
								>
									{group.active ? "Active" : "Inactive"}
								</span>
							</td>
							<td className="flex gap-2">
								<button
									className="btn btn-danger btn-sm"
									onClick={() =>
										deleteGroupHandler(group._id)
									}
								>
									Delete
								</button>
								<button
									className="btn btn-primary btn-sm"
									onClick={() =>
										document
											.getElementById(
												`add_member_modal_${group._id}`,
											)
											.showModal()
									}
								>
									Add Member
								</button>
								<dialog
									id={`add_member_modal_${group._id}`}
									className="modal"
								>
									<div className="modal-box">
										<form
											className="flex flex-col items-start gap-3"
											onSubmit={e => {
												e.preventDefault();
												addMemberHandler(
													group._id,
													selectedUser,
												);
											}}
										>
											<select
												className="w-full select select-bordered"
												value={selectedUser}
												onChange={e =>
													setSelectedUser(
														e.target.value,
													)
												}
											>
												<option value="">
													Select User
												</option>
												{users?.map(user => (
													<option
														key={user._id}
														value={user._id}
													>
														{user.username}
													</option>
												))}
											</select>
											<div className="flex justify-end w-full">
												<button
													className="btn btn-primary btn-sm"
													type="submit"
												>
													Add Member
												</button>
											</div>
										</form>
									</div>
									<form
										method="dialog"
										className="modal-backdrop"
									>
										<button className="btn btn-sm">
											x
										</button>
									</form>
								</dialog>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Groups;
