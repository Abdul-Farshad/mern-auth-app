import { useSelector } from "react-redux";
function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-3 max-w-md mx-auto">
      <h2 className="text-center my-7">Profile</h2>
      <form className="flex flex-col gap-4">
      <div className="relative self-center rounded-full">
          <img
            className="h-24 w-24 self-center rounded-full object-cover"
            src={currentUser.profilePicture}
            alt="Profile"
          />
          <label
            htmlFor="upload-profile-picture"
            className="absolute right-0 bottom-0 bg-white rounded-full p-2 cursor-pointer shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="4"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <input
              type="file"
              id="upload-profile-picture"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>

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
