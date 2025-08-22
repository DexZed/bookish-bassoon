// TODO: Add functionality and styling

import InputLayout from "../components/InputLayout";

type Props = {};

function Register({}: Props) {
  return (
    <>
      <div className="h-dvh flex justify-center items-center flex-col gap-4">
        <h1 className="text-3xl font-bold">Register</h1>
        <form className="space-y-2 card bg-base-200 border-base-300 rounded-box w-xs border p-4 ">
        <InputLayout description="Name">
        <input type="text" className="input input-secondary" placeholder="Name" />
        </InputLayout>
        <InputLayout description="Email">
        <input type="email" className="input input-primary" placeholder="Email" />
        </InputLayout>
        <InputLayout description="Password">
        <input type="text" className="input input-primary" placeholder="Asd1234" />
        </InputLayout>
        <div>
          <button className="btn btn-accent w-full btn-outline" type="submit">Register</button>
        </div>
      </form>
      </div>
    </>
  );
}

export default Register;
