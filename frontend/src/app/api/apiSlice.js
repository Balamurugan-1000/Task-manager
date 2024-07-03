

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { setCredentials, logout, setToken } from '../../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3500',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        console.log('token', token)

        if (token) {
            headers.set("authorization", `Bearer ${token}`)
            console.log('headers', headers.authorization)
        }
        return headers
    }
})

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
        console.log('refreshResult', refreshResult)
        if (refreshResult?.data) {
            setToken(refreshResult.data.token)
            console.log(refreshResult)
            // retry original query with new access token
            result = await baseQuery(args, api, extraOptions)
        } else {

            if (refreshResult?.error?.status === 401) {
                refreshResult.error.data.message = "Your login has expired."
            }
            return refreshResult
        }
    }
    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Note', 'User'],
    endpoints: (builder) => ({}),
});
