import { useGetGroupsQuery } from "../features/groups/groupSlice";
import { company, useGetAllUsersQuery } from "../features/users/usersApiSlice";
import { useGettasksQuery } from "../features/tasks/tasksApiSlice";
import { useCallback } from "react";

const useStoredValues = () => {
	const {
		data: usersData,
		isLoading: isLoadingUsers,
		isError: isErrorUsers,
		refetch: usersRefetch,
	} = useGetAllUsersQuery(company);

	const {
		data: groupsData,
		isLoading: isLoadingGroups,
		isError: isErrorGroups,
		refetch: groupRefetch,
	} = useGetGroupsQuery({ id: company });

	const {
		data: tasks,
		error: isErrorTasks,
		isLoading: isLoadingTasks,
		refetch: taskRefetch,
	} = useGettasksQuery();

	const refetchAll = useCallback(() => {
		usersRefetch();
		groupRefetch();
		taskRefetch();
	}, [usersRefetch, groupRefetch, taskRefetch]);

	return {
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
	};
};

export default useStoredValues;
