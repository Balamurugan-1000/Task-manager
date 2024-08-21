import { apiSlice } from "../../app/api/apiSlice";


const groupSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getGroups: builder.query({
			query: ({ id }) => `groups/${id}`

		}),
		createGroup: builder.mutation({
			query: ({ id, name }) => ({
				url: `groups/${id}`,
				method: 'POST',
				body: { name }

			})
		}),
		deleteGroup: builder.mutation({
			query: ({ id }) => ({
				url: `groups/${id}`,
				method: 'DELETE'
			})
		}),
		addMember: builder.mutation({
			query: ({ id, userId }) => ({
				url: `groups/addMember/${id}`,
				method: 'PATCH',
				body: { userId }
			})
		}),
		removeMember: builder.mutation({
			query: ({ id, userId }) => ({
				url: `groups/removeMember/${id}`,
				method: 'PATCH',
				body: { userId }
			})
		}),

		getGroupsByUser: builder.query({
			query: ({ userId }) => `groups/user/${userId}`
		}),
	}),
})




export const {
	useGetGroupsQuery, useCreateGroupMutation,
	useDeleteGroupMutation, useAddMemberMutation, useRemoveMemberMutation,
	useGetGroupsByUserQuery

} = groupSlice;