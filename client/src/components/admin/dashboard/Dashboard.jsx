import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import AlertPopup from "../../confirmation.jsx/AlertPopup";
import { useNavigate } from "react-router-dom";
import EditUser from "../editUser";
import { adminSignOut } from "../../../redux/admin/adminSlice";
import ReactPaginate from "react-paginate";
import "./dashboard.css";
function Dashboard() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAdminAuth = async () => {
      try {
        const response = await axios.get("/api/admin-auth/check-auth");
        if (response.status !== 200) {
          dispatch(adminSignOut());
        }
      } catch (err) {
        console.log("checkAdminAuth error : ", err);
        dispatch(adminSignOut());
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `/api/admin/fetch-users?page=${page}&search=${searchTerm}`
        );
        const data = response.data;
        if (data.users) {
          setUsers(data.users);
          setTotalPages(data.pagination.totalPages);
        }
      } catch (err) {
        console.log(err);
        if (axios.isAxiosError(err)) {
          if (err.response.status === 401) {
            navigate("/admin/sign-in");
          }
        }
      }
    };

    checkAdminAuth().then(() => {
      console.log("here");
      fetchUsers();
    });
  }, [searchTerm, page, dispatch]);

  // Pagination
  const handlePageClick = (e) => {
    setPage(e.selected + 1);
  };

  // Delete User -->
  const handleDeleteUser = async (userId) => {
    setSelectedUser(userId);
    setShowConfirmDelete(true);
  };

  const confirmDeleteUser = async () => {
    try {
      const response = await axios.delete(
        `/api/admin/delete-user/${selectedUser._id}`
      );
      const data = response.data;
      if (response.status === 200) {
        setUsers(users.filter((user) => user._id !== selectedUser._id));
        toast.success(data.message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setShowConfirmDelete(false);
      setSelectedUser(null);
    }
  };
  // Edit user data -->
  const handleEditUser = (user) => {
    setShowEditUser(true);
    setSelectedUser(user);
  };

  const handleEditUserSuccess = (updatedUser) => {
    console.log("reached success function");
    console.log(updatedUser);
    setShowEditUser(false);
    const updatedUsers = users.map((user) =>
      user._id === updatedUser._id ? updatedUser : user
    );
    console.log("users: ", updatedUsers);
    setUsers(updatedUsers);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="p-6">
      {showEditUser && (
        <EditUser
          user={selectedUser}
          onCancel={() => setShowEditUser(false)}
          onSuccess={handleEditUserSuccess}
        />
      )}
      {showConfirmDelete && (
        <AlertPopup
          title="Are you sure?"
          text="You won't be able to revert this!"
          icon="warning"
          confirmButtonText="Yes, delete it!"
          cancelButtonText="No, cancel"
          onConfirm={confirmDeleteUser}
          onClose={() => setShowConfirmDelete(false)}
        />
      )}
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      {/* {loading ? ( */}
      {/* <p className="text-gray-500">Loading...</p> */}
      {/* ) : ( */}
      <div className="overflow-hidden bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center bg-slate-200 p-2">
          <div className="flex-1 flex justify-center">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={handleSearch}
              className="border rounded p-2 w-full md:w-1/2 lg:w-1/3 outline-none border-gray-300 focus:border-gray-400 focus:ring-0"
            />
          </div>
          <button
            onClick={() => navigate("/admin/dashboard/add-user")}
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded ml-4"
          >
            Add New User
          </button>
        </div>

        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider ">
                Profile
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-2 whitespace-nowrap flex justify-center">
                  <img
                    className="h-14 w-14 object-cover rounded"
                    src={user.profilePicture || "/default-avatar.png"}
                    alt="Profile"
                  />
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-center ">
                  {user.username}
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-center">
                  {user.email}
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-center ">
                  <div className="flex items-center justify-around">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="text-blue-500 hover:text-blue-700 p-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user)}
                      className="text-red-500 hover:text-red-700 mr-2 p-1"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default Dashboard;
