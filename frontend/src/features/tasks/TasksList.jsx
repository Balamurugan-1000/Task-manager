/** @format */
import { useState } from "react";
import {
	useAddtaskMutation,
	useAddTaskTOGroupMutation,
	useRemoveTaskFromGroupMutation,
	useDeletetaskMutation,
} from "./tasksApiSlice";
import useStoreValue from "../../hooks/storedValues";
import { format, parseISO, set } from "date-fns";
import { useGetAllUsersQuery } from "../users/usersApiSlice";
import { company } from "../users/usersApiSlice";
import { useSelector } from "react-redux";
import { useGetGroupsQuery } from "../groups/groupSlice";

const TaskList = () => {
	// const {
	// 	data: usersData,
	// 	isLoading: isLoadingUsers,
	// 	isError: isErrorUsers,
	// } = useGetAllUsersQuery(company);

	const {
		usersData,
		groupsData,
		tasks,
		refetchAll,
		isLoadingUsers,
		isLoadingGroups,
		isLoadingTasks,
		isErrorUsers,
		isErrorGroups,
		isErrorTasks,
	} = useStoreValue();
	const groups = groupsData?.data;

	const [addTaskToGroup] = useAddTaskTOGroupMutation();
	const [removeTaskFromGroup] = useRemoveTaskFromGroupMutation();
	const [deleteTask] = useDeletetaskMutation();
	const [addTask] = useAddtaskMutation();
	const [selectedUser, setSelectedUser] = useState("");

	const [assignedTo, setAssignedTo] = useState("");
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [status, setStatus] = useState("");
	const [priority, setPriority] = useState("");
	const [DueDate, setDueDate] = useState("");

	const addTaskHandler = async () => {
		await addTask({
			AssignedTo: assignedTo,
			title,
			description,
			status,
			priority,
			DueDate,
		});
		document.getElementById(`add_member_modal_${1000}`)?.close();
		refetchAll();

		setAssignedTo("");
		setTitle("");
		setDescription("");
		setStatus("");
		setPriority("");
		setDueDate("");
	};

	const addTaskToGroupHandler = async (taskId, groupId) => {
		await addTaskToGroup({ taskId, groupId });
		document.getElementById(`add_member_modal_${taskId}`)?.close();
		console.log("Task added to group");

		refetchAll();
		setSelectedUser("");
	};
	const deleteTaskHandler = async taskId => {
		const confirm = window.confirm("Are you sure?");
		if (confirm) await deleteTask(taskId);
		refetchAll();
	};
	const currentUsername = useSelector(state => state.auth.user.user.username);
	const users = usersData?.filter(user => user.username !== currentUsername);
	console.log(tasks);
	return (
		<div className="p-4">
			{isLoadingTasks && <div>Loading...</div>}
			{isErrorTasks && <div>Error: {isErrorTasks.message}</div>}

			<div className="overflow-x-auto">
				<button
					className="mb-4 btn btn-primary btn-sm"
					onClick={() =>
						document
							.getElementById(`add_member_modal_${1000}`)
							?.showModal()
					}
				>
					Create Task
				</button>
				<dialog
					id={`add_member_modal_${1000}`}
					className="modal"
				>
					<div className="modal-box">
						<form
							className="flex flex-col items-start gap-3"
							onSubmit={e => {
								e.preventDefault();
								addTaskHandler();
							}}
						>
							<select
								className="w-full select select-bordered"
								value={assignedTo}
								onChange={e => setAssignedTo(e.target.value)}
							>
								<option value="">Select User</option>
								{users?.map(user => (
									<option
										key={user._id}
										value={user._id}
									>
										{user.username}
									</option>
								))}
							</select>
							<input
								type="text"
								placeholder="Title"
								className="w-full input input-bordered"
								onChange={e => setTitle(e.target.value)}
								value={title}
							/>
							<input
								type="text"
								placeholder="Description"
								className="w-full input input-bordered"
								onChange={e => setDescription(e.target.value)}
								value={description}
							/>
							<select
								className="w-full select select-bordered"
								onChange={e => setStatus(e.target.value)}
								value={status}
							>
								<option value="">Select Status</option>
								<option value="completed">completed</option>
								<option value="pending">pending</option>
								<option value="inprogress">inprogress</option>
								<option value="incompleted">incompleted</option>
							</select>
							<select
								className="w-full select select-bordered"
								onChange={e => setPriority(e.target.value)}
								value={priority}
							>
								<option value="">Select Priority</option>
								<option value="low">Low</option>
								<option value="medium">Medium</option>
								<option value="high">High</option>
							</select>
							<input
								type="date"
								placeholder="Due Date"
								className="w-full input input-bordered"
								onChange={e => setDueDate(e.target.value)}
								value={DueDate}
							/>
							<div className="flex justify-end w-full">
								<button
									className="btn btn-primary btn-sm"
									type="submit"
								>
									Create Task
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

				<div className="overflow-y-auto max-h-[70vh] text-xl hide-scrollbar scroll-smooth">
					<table className="table w-full">
						<thead className="sticky top-0 text-white bg-gray-800">
							<tr>
								<th className="p-4">ID</th>
								<th className="p-4">Title</th>
								<th className="p-4">Assigned To</th>
								<th className="p-4">Priority</th>
								<th className="p-4">Status</th>
								<th className="p-4">Description</th>
								<th className="p-4">Due Date</th>
								<th>Add</th>
							</tr>
						</thead>
						<tbody className="">
							{tasks?.length > 0 &&
								tasks?.map(task => (
									<tr
										key={task._id}
										className="border-b border-gray-200"
									>
										<td className="p-4">{task._id}</td>
										<td className="p-4">{task.title}</td>
										<td className="p-4">
											{task.AssignedTo?.username}
										</td>
										<td className="p-4">{task.priority}</td>
										<td className="p-4">{task.status}</td>
										<td className="p-4">
											{/* Open the modal using document.getElementById('ID').showModal() method */}
											<button
												className="btn"
												onClick={() =>
													document
														.getElementById(
															`my_modal_${task._id}`,
														)
														?.showModal()
												}
											>
												View Description
											</button>
											<dialog
												id={`my_modal_${task._id}`}
												className="modal"
											>
												<div className="modal-box">
													<h3 className="text-lg font-bold">
														{task.title}
													</h3>
													<p className="py-4">
														{task.description}
													</p>
													<div className="modal-action">
														<form method="dialog">
															{/* if there is a button in form, it will close the modal */}
															<button className="btn">
																Close
															</button>
														</form>
													</div>
												</div>
											</dialog>
										</td>
										<td className="p-4">
											{task.DueDate
												? format(
														parseISO(task.DueDate),
														"yyyy-MM-dd",
												  )
												: "N/A"}
										</td>
										<td>
											<button
												className="btn btn-primary btn-sm"
												onClick={() =>
													document
														.getElementById(
															`add_member_modal_${task._id}`,
														)
														?.showModal()
												}
											>
												Add Task to group
											</button>
											<dialog
												id={`add_member_modal_${task._id}`}
												className="modal"
											>
												<div className="modal-box">
													<form
														onSubmit={e => {
															e.preventDefault();
															addTaskToGroupHandler(
																task._id,
																selectedUser,
															);
														}}
														className="flex flex-col items-start gap-3"
													>
														<select
															className="w-full select select-bordered"
															value={selectedUser}
															onChange={e =>
																setSelectedUser(
																	e.target
																		.value,
																)
															}
														>
															<option value="">
																Select Group
															</option>
															{groups?.map(
																group => (
																	<option
																		key={
																			group._id
																		}
																		value={
																			group._id
																		}
																	>
																		{
																			group.name
																		}
																	</option>
																),
															)}
														</select>
														<div className="flex justify-end w-full">
															<button
																className="btn btn-primary btn-sm"
																type="submit"
															>
																Add Task to
																Group
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

											<button
												onClick={() =>
													deleteTaskHandler(task._id)
												}
												className="btn btn-sm btn-danger"
											>
												Delete
											</button>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default TaskList;
