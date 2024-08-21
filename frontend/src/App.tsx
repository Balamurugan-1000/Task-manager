/** @format */

import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
import TasksList from "./features/tasks/TasksList";
import UsersList from "./features/users/UsersList";
import Register from "./features/auth/Register";
import Groups from "./components/Groups";
import UserTask from "./components/UserTask";
import UserGroups from "./components/UserGroups";
function App() {
	return (
		<>
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
						path="register"
						element={<Register />}
					/>

					<Route
						path="dash"
						element={<DashLayout />}
					>
						<Route
							index
							element={<Welcome />}
						/>
						<Route
							path="tasks"
							element={<TasksList />}
						/>
						<Route
							path="groups"
							element={<Groups />}
						/>
						<Route
							path="users"
							element={<UsersList />}
						/>
						<Route
							path="tasksAssigned"
							element={<UserTask />}
						/>
						<Route
							path="groupsAssigned"
							element={<UserGroups />}
						/>
					</Route>
					{/* </Route> */}
				</Route>
			</Routes>

			<ToastContainer />
		</>
	);
}

export default App;
