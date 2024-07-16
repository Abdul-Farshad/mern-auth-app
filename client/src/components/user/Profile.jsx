import { useSelector } from "react-redux";
import ImageUpload from "./ImageUpload";


function Profile() {
  const { currentUser } = useSelector((state) => state.user);
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
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}

export default Profile;
