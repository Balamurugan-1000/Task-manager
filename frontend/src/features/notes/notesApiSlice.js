/** @format */

import { apiSlice } from '../../app/api/apiSlice';



export const notesApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getNotes: builder.query({
			query: () => 'tasks',
		}),
		addNote: builder.mutation({
			query: (note) => ({
				url: 'notes',
				method: 'POST',
				body: note,
			}),
		}),
		deleteNote: builder.mutation({
			query: (id) => ({
				url: `notes/${id}`,
				method: 'DELETE',
			}),
		}),
		updateNote: builder.mutation({
			query: (note) => ({
				url: `notes/${note.id}`,
				method: 'PUT',
				body: note,
			}),
		}),
	}),
});


export const { useGetNotesQuery, useAddNoteMutation, useDeleteNoteMutation, useUpdateNoteMutation } = notesApiSlice;