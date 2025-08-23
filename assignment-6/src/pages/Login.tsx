// TODO: ADD functionality and styling

import InputLayout from "../components/InputLayout";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, type LoginFields } from "../interfaces/interfaces";
import { useNavigate } from "react-router";
import { useAppDispatch} from "../features/app/hooks";
import { useLoginMutation } from "../features/slices/authApiSlice";
import { setAuthData } from "../features/slices/authSlice";
import Skeleton from "../components/Skeleton";
import { showErrorAlert, showSuccessAlert } from "../utilities/utils";
import CustomErrorPage from "./AppError";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, { isLoading, error }] = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });
  const onSubmit: SubmitHandler<LoginFields> = async (data) => {
    try {
      const res = await login(data).unwrap();
      dispatch(setAuthData(res));
      showSuccessAlert("Success", "Logged in successfully");
     
      navigate(`/${res.role}`);
    } catch (err) {
      showErrorAlert("Something went wrong!", err as string);
      console.error(err);
    }
  };
  return (
    <>
      {isLoading ? (
        <>
          <Skeleton></Skeleton>
        </>
      ) : error ? (
        <>
          <CustomErrorPage />
        </>
      ) : (
        <>
          <div className="h-dvh flex justify-center items-center flex-col gap-4">
            <h1 className="text-3xl font-bold">Log In</h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-2 card bg-base-200 border-base-300 rounded-box w-xs border p-4 "
            >
              <InputLayout
                description="Name"
                errorDescription={errors.name && `${errors.name?.message}`}
              >
                <input
                  {...register("name")}
                  type="text"
                  className="input input-primary"
                  required
                  placeholder="Full Name"
                />
              </InputLayout>
              <InputLayout
                description="Email"
                errorDescription={errors.email && `${errors.email?.message}`}
              >
                <input
                  {...register("email")}
                  type="email"
                  className="input input-secondary"
                  required
                  placeholder="Email"
                />
              </InputLayout>
              <InputLayout
                description="Password"
                errorDescription={
                  errors.password && `${errors.password?.message}`
                }
              >
                <input
                  {...register("password")}
                  type={"password"}
                  className="input input-info"
                  required
                  placeholder="Password"
                />
              </InputLayout>
              <div>
                <button
                  disabled={isSubmitting}
                  className="btn btn-warning w-full btn-outline rounded-2xl mt-2"
                  type="submit"
                >
                  {isSubmitting ? "Loading..." : "Register"}
                </button>
                <span className="text-amber-500">{errors.root?.message}</span>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}
