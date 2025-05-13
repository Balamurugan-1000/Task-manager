/** @format */

import { useGetGroupsByUserQuery } from "../features/groups/groupSlice";
import { useSelector } from "react-redux";
import { selectUser } from "../features/auth/authSlice";

const UserGroups = () => {
	const user = useSelector(selectUser);
	const { data, error, isLoading } = useGetGroupsByUserQuery({
		userId: user?.user?.userid,
	});
	const groups = data?.data;
	console.log(groups);

	return (
		<div className="p-4 text-xl bg-base-100">
			<h1 className="mb-4 text-3xl font-bold">User Groups</h1>
			{isLoading && <p>Loading...</p>}
			{error && <p>Error: {error.message}</p>}
			<div className="overflow-x-auto text-center rounded-lg shadow-lg">
				<table className="table w-3/4 mx-auto mt-5">
					<thead>
						<tr className="bg-base-300">
							<th className="px-4 py-2 text-lg">Name</th>
							<th className="px-4 py-2 text-lg">Members</th>
							<th className="px-4 py-2 text-lg">Tasks</th>
							<th className="px-4 py-2 text-lg">Group Status</th>
							<th className="px-4 py-2 text-lg">Priority</th>
						</tr>
					</thead>
					<tbody>
						{groups?.map(group => (
							<tr
								key={group._id}
								className="hover:bg-base-200"
							>
								<td className="px-4 py-4 text-lg border-t">
									{group.name}
								</td>
								<td className="px-4 py-4 text-lg border-t">
									{group.members.map(member => (
										<div
											key={member._id}
											className="flex items-center justify-between w-full gap-2 p-2 mb-2 text-center text-white bg-gray-800 rounded-md"
										>
											<span>{member.username}</span>
										</div>
									))}
								</td>
								<td className="px-4 py-4 text-lg border-t">
									{group.tasks.map(task => (
										<div
											key={task._id}
											className="flex items-center gap-2 p-2 mb-2 rounded-md cursor-pointer bg-base-300"
											onClick={() =>
												document
													.getElementById(
														`my_modal_${task._id}`,
													)
													.showModal()
											}
										>
											<button className="w-full text-lg btn btn-ghost">
												{task.title}
											</button>
											<dialog
												id={`my_modal_${task._id}`}
												className="modal"
											>
												<div className="modal-box">
													<form method="dialog">
														<button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">
															✕
														</button>
													</form>

													<h2 className="text-2xl font-bold">
														{task.title}
													</h2>
													<p className="text-lg">
														<strong>
															Description:
														</strong>{" "}
														{task.description}
													</p>
													<p className="text-lg">
														<strong>Status:</strong>{" "}
														{task.status}
													</p>
													<p className="text-lg">
														<strong>
															Priority:
														</strong>{" "}
														{task.priority}
													</p>
													<p className="text-lg">
														<strong>
															Due Date:
														</strong>{" "}
														{new Date(
															task.DueDate,
														).toLocaleDateString()}
													</p>
												</div>
											</dialog>
										</div>
									))}
								</td>
								<td className="px-4 py-4 text-lg border-t">
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
								<td className="px-4 py-4 text-lg border-t">
									{group.tasks.map(task => (
										<div
											key={task._id}
											className={`w-3/4 rounded-lg mx-auto text-center p-2 ${
												task.priority === "high"
													? "bg-red-500 text-white"
													: task.priority === "medium"
													? "bg-yellow-500 text-white"
													: "bg-green-500 text-white"
											}`}
										>
											{String(
												task.priority,
											).toUpperCase()}
										</div>
									))}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default UserGroups;
