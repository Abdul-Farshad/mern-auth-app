import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingAnimation from "../../assets/LoadingAnimation";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../../redux/user/userSlice";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../firebase";

function ImageUpload() {
  const { currentUser } = useSelector((state) => state.user);
  const [image, setImage] = useState(undefined);
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "-" + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    dispatch(updateUserStart());

    uploadTask.on(
      "state_changed",
      () => {
        // const progress =
        //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.error("Upload failed:", error);
        toast.error("Upload failed");
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        updateDatabaseData(downloadURL);
      }
    );
  };

  const updateDatabaseData = async (imageURL) => {
    try {
      const response = await axios.post(
        `/api/upload/profile-image/${currentUser._id}`,
        { imageURL },
        {
          headers: { "Content-type": "application/json" },
        }
      );
      const data = response.data;
      if (response.status === 200) {
        dispatch(
          updateUserSuccess({
            ...currentUser,
            profilePicture: data.newImage,
          })
        );
        toast.success(response.data.message);
      } else {
        dispatch(updateUserFailure(data.message));
      }
    } catch (err) {
      console.log("error: ", err);
      toast.error("Failed to upload profile picture");
      if (axios.isAxiosError(err)) {
        dispatch(
          updateUserFailure(
            err.response?.data.message || "Something went wrong!"
          )
        );
      } else {
        dispatch(updateUserFailure(err.message));
      }
    }
  };

  return (
    <div className="relative self-center rounded-full">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 rounded-full">
          <span className="text-white text-xs text-center">
            <LoadingAnimation />
          </span>
        </div>
      )}
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
          onChange={(e) => setImage(e.target.files[0])}
        />
      </label>
    </div>
  );
}

export default ImageUpload;
