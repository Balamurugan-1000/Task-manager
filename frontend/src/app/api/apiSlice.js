

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { setCredentials, logout, setToken } from '../../features/auth/authSlice';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3500',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token

        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

// const dispatch = useDispatch();
const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 401 || result.error?.originalStatus == 401) {
        const refreshResult = await baseQuery(
            {
                url: 'auth/refresh_token',
                method: 'POST',
            },
            api,
            extraOptions
        );
        if (refreshResult?.data) {
            localStorage.setItem('auth', refreshResult.data.token)
            console.log(refreshResult)
            result = await baseQuery(args, api, extraOptions)
        } else {

            if (refreshResult?.status === 401) {
                refreshResult.error.data.message = "Your login has expired."
                dispatch(logout())

                console.log(refreshResult)
                return refreshResult

            }
            return refreshResult
        }
    }
    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['task', 'User'],
    endpoints: (builder) => ({}),
})