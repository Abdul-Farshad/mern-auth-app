import { useSelector, useDispatch } from "react-redux";
import ImageUpload from "./ImageUpload";
import axios from "axios";
import {toast} from 'react-toastify'

import {
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOut
} from "../../redux/user/userSlice";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleDeleteAccount = async () => {
    try {
      const response = await axios.delete(`/api/user/delete/${currentUser._id}`);
      const data = response.data;
      if (response.status !== 200) {
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess());  
      toast.success(data.message)
    } catch (err) {
      console.error("Error deleting account:", err);
      dispatch(deleteUserFailure("Failed to delete account"));
      toast.error("Failed to delete account")
    }
  };

  const handleSignout = async () => {
    try {
      const response = await axios.get('/api/user-auth/signout');
      dispatch(signOut())
      toast.success(response.data.message)
    } catch (err) {
      console.error(err.message)
    }
  }
  return (
    <div className="p-3 max-w-md mx-auto">
      <h2 className="text-center my-7">Profile</h2>
      <form className="flex flex-col gap-4">
        <ImageUpload />
        <input
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-3 border"
          defaultValue={currentUser.username}
          disabled
        />
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3 border"
          defaultValue={currentUser.email}
          disabled
        />
      </form>
      <div className="flex justify-between mt-4">
        <span
          className="text-red-700 hover:text-red-500 cursor-pointer"
          onClick={handleDeleteAccount}
        >
          Delete account
        </span>
        <span className="text-red-700 hover:text-red-500 cursor-pointer" onClick={handleSignout}>Sign out</span>
      </div>
    </div>
  );
}

export default Profile;
