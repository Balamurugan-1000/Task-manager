// features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		isAutheticated: localStorage.getItem('auth') ? true : false,
		token: localStorage.getItem('auth'),
		company: localStorage.getItem('company'),
		user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
	},
	reducers: {
		setCredentials: (state, action) => {
			state.isAutheticated = localStorage.getItem('auth') ? true : false;
			state.token = localStorage.getItem('auth'),
				state.company = localStorage.getItem('company')
			state.user = localStorage.setItem('user', JSON.stringify(action.payload))

		},
		logout: (state) => {
			state.isAutheticated = false
			state.token = null
			state.user = null
			localStorage.clear()

		},
	},
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

export const selectIsAuthenticated = (state) => state.auth.isAutheticated;
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;

export const setToken = (token) => {
	localStorage.setItem('auth', token)
}