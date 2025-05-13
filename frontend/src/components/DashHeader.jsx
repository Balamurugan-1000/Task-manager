
/** @format */
import { selectUser } from "../features/auth/authSlice";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

const DashHeader = () => {
    const dispatch = useDispatch();
    const userData = useSelector(selectUser);
    const user = userData?.user || {}; // Ensures no errors if userData is undefined

    return (
        <div className="navbar bg-base-100 px-4 shadow-md">
            <div className="flex-1">
                <Link to="/dash" className="text-xl font-bold btn btn-ghost">
                    Tasify
                </Link>
            </div>
            <div className="flex-none flex gap-4">
                {user.roles === 5000 ? (
                    <>
                        <Link to="/dash/users" className="btn btn-ghost">Users</Link>
                        <Link to="/dash/groups" className="btn btn-ghost">Groups</Link>
                        <Link to="/dash/tasks" className="btn btn-ghost">Tasks</Link>
                    </>
                ) : (
                    <>
                        <Link to="/dash/tasksAssigned" className="btn btn-ghost">Tasks</Link>
                        <Link to="/dash/groupsAssigned" className="btn btn-ghost">Groups</Link>
                    </>
                )}
                <button
                    type="button"
                    className="btn btn-error text-white"
                    onClick={() => dispatch(logout())}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default DashHeader;

