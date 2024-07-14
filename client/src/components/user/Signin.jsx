import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

// For form validation
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required")
    .trim("Whitespace not allowed")
    .strict(true),
  password: yup.string().required("Password is required").strict(true),
});
// ------------------------------------------------------------------------

function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = async (formData) => {
    try {
      // setting loading
      dispatch(signInStart());
      //   pass formData to back end
      const response = await axios.post("/api/user-auth/signin", formData);
      const data = response.data;
      if (data.success) {
        // add data to global state
        dispatch(signInSuccess(data.userData));
        reset();
        toast.success(data.message);
        return navigate("/");
      }
    } catch (err) {
      console.log(err)
      if (axios.isAxiosError(err)) {
        console.log("dispatching error")
        dispatch(signInFailure(err.response?.data.message || "Something went wrong!"));
      } else {
        dispatch(signInFailure(err.message));
      }
    }
  };

  return (
    <div className="p-3 max-w-md mx-auto">
      <h2 className="text-center my-7">Sign In</h2>
      {error && <p className="text-red-700 text-center mb-2">{error}</p>}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
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
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign in"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>{`Don't have an account?`}</p>
        <Link to="/sign-up">
          <span className="text-blue-500">Sign up</span>
        </Link>
      </div>
    </div>
  );
}

export default Signin;
