import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import {
  userDataUpdateFailed,
  userDataUpdatingStarted,
  userDataUpdatingSuccess,
  cleanState,
} from "../../redux/admin/adminSlice";

// For form validation
const schema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .test("no-spaces", "Whitespace not allowed", (value) => !/\s/.test(value))
    .min(3, "Username must be at least 3 characters")
    .max(15, "Username must be at most 15 characters")
    .matches(
      /^[a-zA-Z0-9]*$/,
      "Username can only contain alphanumeric characters"
    )
    .strict(true),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required")
    .trim("Whitespace not allowed")
    .strict(true),
});
//---------------------------------------------------------------------------

const EditUser = ({ user, onCancel, onSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { ...user },
  });
  const { loading, error } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
        dispatch(cleanState())
    }
  },[])
  const handleSave = async (formData) => {
    try {
        const isDataChanged =  formData.username !== user.username || formData.email !== user.email;
        if(!isDataChanged) {
            toast.info("No changes detected");
            return;
        }
      dispatch(userDataUpdatingStarted());
      const response = await axios.put(
        `/api/admin/edit-user/${user._id}`,
        formData
      );
      const data = response.data
      dispatch(userDataUpdatingSuccess());
      onSuccess(data.updatedUser);
      toast.success(data.message);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response.data.message)
        if(err.response.status === 404 && err.response.data.message === "User not found") {
            const errMsg = err.response.data.message;
            toast.error(errMsg);
            dispatch(cleanState())
            return;
        } 
        dispatch(
          userDataUpdateFailed(
            err.response?.data.message || "Something went wrong!"
          )
        );
      } else {
        console.error(err);
      }
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white px-8 py-4 rounded-lg shadow-lg  max-w-md">
        <h2 className="text-center my-5">Edit User</h2>
        {loading && (
          <p className="text-center text-sm text-blue-500">Updating...</p>
        )}
        {error && <p className="text-red-700 text-center mb-2">{error}</p>}
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(handleSave)}
        >
          <div>
            <label className="font-semibold">Username</label>
            <input
              type="text"
              placeholder="Username"
              id="username"
              name="username"
              className="bg-slate-100 p-3 rounded-lg w-full border mt-2"
              {...register("username")}
              maxLength="20"
            />
            {errors.email && (
              <p className="inputError">{errors.username.message}</p>
            )}
          </div>
          <div>
            <label className="font-semibold">Email</label>
            <input
              type="email"
              placeholder="Email"
              id="email"
              name="email"
              className="bg-slate-100 p-3 rounded-lg w-full border mt-2"
              {...register("email")}
            />
            {errors.email && (
              <p className="inputError">{errors.email.message}</p>
            )}
          </div>

          <div className="flex justify-end">
            <button
            //   disabled={loading}
              type="button"
              onClick={onCancel}
              className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-300"
            >
              CLOSE
            </button>
            <button
              disabled={loading}
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400"
            >
              SAVE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
