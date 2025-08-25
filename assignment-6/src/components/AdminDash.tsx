import { useAppSelector } from "../features/app/hooks";

function AdminDash() {
  const selector = useAppSelector((state) => state.auth);
  return (
    <>
      <main className="h-dvh flex justify-center items-center">
        <div className="stack size-64 ">
          <div className="border-base-content card bg-base-100 border text-center rotate-12">
            <div className="card-body -rotate-12 flex justify-center items-center">
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold">{selector.name} </h2>
                <p className="text-lg">{selector.email} </p>
                <p className="text-md text-gray-500">{selector.role} </p>
              </div>
            </div>
          </div>
          <div className="border-base-content card bg-base-100 border text-center">
            <div className="card-body">B</div>
          </div>
        </div>
      </main>
    </>
  );
}

export default AdminDash;
