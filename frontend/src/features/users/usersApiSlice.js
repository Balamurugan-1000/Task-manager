
import { apiSlice } from '../../app/api/apiSlice';
import { useSelector } from 'react-redux';
const GetUser = () => {

    const user = useSelector(state => state.auth.user.user)
    return user.com
}

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (body) => ({
                url: `auth/login`,
                method: 'POST',
                body,
            }),
        }),
        createEmployeeByAdmin: builder.mutation({
            query: (body) => ({
                url: `users/createEmployee`,
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
            query: ({ company }) => `users/${company}`,
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
        })


    }),
})

export const { useLoginUserMutation, useCreateEmployeeByAdminMutation,
    useRegisterUserMutation,
    useGetAllUsersQuery,
    useCreateEmployeeMutation,
    useDeleteEmployeeMutation


} = usersApiSlice;


