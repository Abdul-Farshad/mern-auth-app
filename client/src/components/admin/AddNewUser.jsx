import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  newUserAddingStarted,
  newUserAddingSuccess,
  newUserAddingFailed,
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
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .trim("whitespace not allowed")
    .strict(true),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required")
    .trim("whitespace not allowed")
    .strict(true),
});

function AddNewUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { loading, error } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const onSubmit = async (formData) => {
    try {
      dispatch(newUserAddingStarted());
      // Pass formData to backend
      const response = await axios.post("/api/admin/add-user", formData);
      const data = response.data;
      if (data.success) {
        dispatch(newUserAddingSuccess());
        reset();
        toast.success(data.message);
        return;
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errMsg = err.response?.data?.message || "Something went wrong!";
        dispatch(newUserAddingFailed(errMsg));
      } else {
        console.error(err);
      }
    }
  };

  return (
    <div className="p-3 max-w-md mx-auto">
      <h2 className="text-center my-7">Create New User</h2>
      {error && <p className="text-red-700 text-center mb-2">{error}</p>}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full">
          <input
            type="text"
            placeholder="Username"
            id="username"
            name="username"
            className="bg-slate-100 p-3 rounded-lg w-full border"
            {...register("username")}
            maxLength="20"
          />
          {errors.username && (
            <p className="inputError">{errors.username.message}</p>
          )}
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            id="email"
            name="email"
            className="bg-slate-100 p-3 rounded-lg w-full border"
            {...register("email")}
          />
          {errors.email && <p className="inputError">{errors.email.message}</p>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            className="bg-slate-100 p-3 rounded-lg w-full border"
            {...register("password")}
          />
          {errors.password && (
            <p className="inputError">{errors.password.message}</p>
          )}
        </div>
        <div>
          <input
            type="password"
            placeholder="Re-enter your password"
            id="confirm-password"
            name="confirmPassword"
            className="bg-slate-100 p-3 rounded-lg w-full border"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="inputError">{errors.confirmPassword.message}</p>
          )}
        </div>
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "CREATE USER"}
        </button>
      </form>
    </div>
  );
}

export default AddNewUser;
