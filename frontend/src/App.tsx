/** @format */

import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public.tsx";
import Login from "./features/auth/Login.tsx";
import DashLayout from "./components/DashLayout.tsx";
import Welcome from "./features/auth/Welcome.tsx";
import NotesList from "./features/notes/NotesList.tsx";
import UsersList from "./features/users/UsersList.tsx";

function App() {
	return (
		<Routes>
			<Route
				path="/"
				element={<Layout />}
			>
				<Route
					index
					element={<Public />}
				/>
				<Route
					path="login"
					element={<Login />}
				/>

				<Route
					path="dash"
					element={<DashLayout />}
				>
					<Route
						index
						element={<Welcome />}
					/>

					<Route path="notes">
						<Route
							index
							element={<NotesList />}
						/>
					</Route>

					<Route path="users">
						<Route
							index
							element={<UsersList />}
						/>
					</Route>
				</Route>
				{/* End Dash */}
			</Route>
		</Routes>
	);
}

export default App;
