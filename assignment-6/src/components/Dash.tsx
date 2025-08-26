import type { AuthState } from '../interfaces/globalInterfaces'

type Props = {userData:AuthState}

function Dash({userData}: Props) {

  return (
    <>
      <main className="h-dvh flex justify-center items-center">
        <div className="stack size-64 ">
          <div className="border-base-content card bg-base-100 border text-center rotate-12">
            <div className="card-body -rotate-12 flex justify-center items-center">
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold">{userData.name} </h2>
                <p className="text-lg">{userData.email} </p>
                <p className="text-md text-gray-500">{userData.role} </p>
              </div>
            </div>
          </div>
          <div className="border-base-content card bg-base-100 border text-center">
            <div className="card-body"></div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Dash