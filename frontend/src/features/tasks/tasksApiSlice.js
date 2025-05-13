/** @format */

import { apiSlice } from '../../app/api/apiSlice';



export const tasksApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		gettasks: builder.query({
			query: () => 'tasks',
		}),
		addtask: builder.mutation({
			query: (task) => ({
				url: 'tasks',
				method: 'POST',
				body: task,
			}),
		}),
		deletetask: builder.mutation({
			query: (id) => ({
				url: `tasks/${id}`,
				method: 'DELETE',
			}),
		}),
		updatetask: builder.mutation({
			query: (task) => ({
				url: `tasks/${task.id}`,
				method: 'PUT',
				body: task,
			}),
		}),
		addTaskTOGroup: builder.mutation({
			query: ({ taskId, groupId }) => ({
				url: `tasks/group/${groupId}/task/${taskId}`,
				method: 'POST',
			}),
		}),
		removeTaskFromGroup: builder.mutation({
			query: (task) => ({
				url: `tasks/group/${groupId}/task/${taskId}`,
				method: 'DELETE',
			}),
		}),
		getTaskByUser: builder.query({
			query: (username) => `tasks/user/${username}`,
		}),
		updateStatus: builder.mutation({
			query: ({ taskId, status }) => ({
				url: `tasks/${taskId}/status/`,
				method: 'PATCH',
				body: { status },
			}),

		})
	}),
});


export const {
	useGettasksQuery, useAddtaskMutation, useDeletetaskMutation, useUpdatetaskMutation,
	useAddTaskTOGroupMutation, useRemoveTaskFromGroupMutation, useGetTaskByUserQuery,
	useUpdateStatusMutation

} = tasksApiSlice;