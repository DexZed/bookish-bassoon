import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputLayout from "../components/InputLayout";
import SelectorLayout from "../components/selectorLayout";
import { RegistrationSchema, type RegistrationFields } from "../interfaces/interfaces";

type Props = {};
// TODO: Add api calls and sweet alert
function Register({}: Props) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFields>({
    resolver: zodResolver(RegistrationSchema),
  });
  const onSubmit: SubmitHandler<RegistrationFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
      throw new Error("Random error message");
    } catch (error) {
      setError("root", {
        message: "Random error message",
      });
    }
  };
  return (
    <>
      <div className="h-dvh flex justify-center items-center flex-col gap-4">
        <h1 className="text-3xl font-bold">Register</h1>
        <form
          className="space-y-2 card bg-base-200 border-base-300 rounded-box w-xs border p-4 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputLayout
            description="Name"
            errorDescription={`${errors.name?.message}`}
          >
            <input
              {...register("name")}
              type="text"
              className="input input-secondary"
              placeholder="Name"
            />
          </InputLayout>
          <InputLayout
            description="Email"
            errorDescription={`${errors.email?.message}`}
          >
            <input
              {...register("email")}
              type="email"
              className="input input-primary"
              placeholder="Email"
            />
          </InputLayout>
          <InputLayout
            description="Password"
            errorDescription={`${errors.password?.message}`}
          >
            <input
              {...register("password")}
              type="text"
              className="input input-primary"
              placeholder="Asd1234"
            />
          </InputLayout>
          <SelectorLayout
            description="Role"
            errorDescription={`${errors.role?.message}`}
          >
            <select
              {...register("role")}
              className="select select-primary w-full"
              defaultValue={"Select a role"}
            >
              <option disabled={true}>Select a role</option>
              <option value={"sender"}>Sender</option>
              <option value={"receiver"}>Receiver</option>
            </select>
          </SelectorLayout>
          <div>
            <button
              disabled={isSubmitting}
              className="btn btn-accent w-full btn-outline rounded-2xl"
              type="submit"
            >
              {isSubmitting ? "Loading..." : "Register"}
            </button>
            <span className="text-amber-500">{errors.root?.message}</span>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
