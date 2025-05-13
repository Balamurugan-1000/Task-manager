
import { apiSlice } from '../../app/api/apiSlice';
let user = localStorage.getItem("user");
user = JSON.parse(user);
export const company = user?.user?.company
export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (body) => ({
                url: `auth/login`,
                method: 'POST',
                body,
            }),
        }),

        registerUser: builder.mutation({
            query: (body) => ({
                url: `auth/register`,
                method: 'POST',
                body,
            }),
        }),
        getAllUsers: builder.query({
            query: (company) => `users/${company}`,
        }),
        createEmployee: builder.mutation({
            query: ({ username, password, company }) => ({
                url: `users/createEmployee`,
                method: 'POST',
                body: {
                    username,
                    password,
                    company,

                }
            }),
        }),
        deleteEmployee: builder.mutation({
            query: ({ id }) => ({
                url: `users/${id}`,
                method: 'DELETE'
            })
        }),
        updateEmployee: builder.mutation({
            query: ({ id, username, roles, active }) => ({
                url: `users/${id}`,
                method: 'PATCH',
                body: {
                    username,
                    roles,
                    active
                }
            })
        }),



    }),
})

export const { useLoginUserMutation,
    useRegisterUserMutation,
    useGetAllUsersQuery,
    useCreateEmployeeMutation,
    useDeleteEmployeeMutation,
    useUpdateEmployeeMutation


} = usersApiSlice;

