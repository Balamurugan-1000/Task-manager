/** @format */

import React from "react";
import {
	useGetTaskByUserQuery,
	useUpdateStatusMutation,
} from "../features/tasks/tasksApiSlice.js";
import { selectUser } from "../features/auth/authSlice.js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const UserTask = () => {
	const user = useSelector(selectUser);
	const { data, error, isLoading, refetch } = useGetTaskByUserQuery(
		user.user.username,
	);
	const [updateStatus] = useUpdateStatusMutation();
	console.log(data);
	const handleStatusChange = async (taskId, status) => {
		try {
			console.log(taskId, status);
			await updateStatus({ taskId, status }).unwrap();
			toast.success("Task status updated successfully!");
			refetch();
		} catch (err) {
			toast.error(err.message || "An error occurred!");
		}
	};

	const sortedTasks = data?.slice().sort((a, b) => {
		const priorities = { High: 1, Medium: 2, Low: 3 };
		return priorities[a.priority] - priorities[b.priority];
	});

	return (
		<div className="container p-4 mx-auto">
			<h1 className="mb-4 text-2xl font-bold">
				Tasks Assigned to {user.user.username}
			</h1>
			{isLoading && <p>Loading...</p>}
			{error && <p>Error: {error.message}</p>}
			<div className="overflow-x-auto">
				<div className="inline-block min-w-full overflow-hidden rounded-lg shadow-md">
					<div className="overflow-y-auto hide-scrollbar border gap-10 max-h-[700px]">
						<table className="min-w-full leading-normal text-center">
							<thead className="sticky top-0 bg-base-300">
								<tr className="h-full py-4">
									<th className="p-4 text-center">Title</th>
									<th className="p-4 text-center">
										Description
									</th>
									<th className="p-4 text-center">Status</th>
									<th className="p-4 text-center">
										Priority
									</th>
									<th className="p-4 text-center">
										Due Date
									</th>
									<th className="p-4 text-center">
										Update Status
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-700 ">
								{sortedTasks?.map(task => (
									<tr
										key={task._id}
										className=""
									>
										<td className="p-4 text-xl font-bold">
											{task.title}
										</td>
										<td className="p-4 break-words text-pretty max-w-[300px]">
											{task.description}
										</td>
										<td className="p-4">{task.status}</td>
										<td className="p-4">
											<div
												className={`w-3/4 rounded-lg mx-auto text-center p-2 ${
													task.priority === "high"
														? "bg-red-500 text-white"
														: task.priority ===
														  "medium"
														? "bg-yellow-500 text-white"
														: "bg-green-500 text-white"
												}`}
											>
												{String(
													task.priority,
												).toUpperCase()}
											</div>
										</td>
										<td className="p-4">
											{new Date(
												task.dueDate,
											).toLocaleDateString()}
										</td>
										<td className="p-4">
											<select
												value={task.status}
												onChange={e =>
													handleStatusChange(
														task._id,
														e.target.value,
													)
												}
												className="w-full p-2 rounded outline-none bg-base-300"
											>
												<option
													className="bg-base-300 "
													value={task.status}
												>
													{task.status}
												</option>
												{[
													"completed",
													"pending",
													"inprogress",
													"incompleted",
												]
													.filter(
														status =>
															status !==
															task.status,
													)
													.map(status => (
														<option
															className="bg-base-300"
															key={status}
															value={status}
														>
															{status}
														</option>
													))}
											</select>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserTask;
