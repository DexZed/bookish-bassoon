import { useAppSelector } from "../features/app/hooks";
import { useGetParcelsQuery } from "../features/parcel/parcelApiSlice";
import CustomErrorPage from "../pages/AppError";
import { percentageRatio, StatDate } from "../utilities/utils";
import Skeleton from "./Skeleton";

function AdminDash() {
  const selector = useAppSelector((state) => state.auth);
  const { data, isLoading, error } = useGetParcelsQuery(undefined);
  const totalParcels = data?.parcels.length;
  const startDate = data?.parcels[0]?.createdAt;
  const endDate = data?.parcels[data?.parcels.length - 1]?.createdAt;
  const cancelledParcels = data?.parcels.filter((parcel) => parcel.status === "Cancelled").length;
  const deliveredParcels= data?.parcels.filter((parcel) => parcel.status === "Delivered").length;
  return (
    <>
      {isLoading ? (
        <Skeleton />
      ) : error ? (
        <CustomErrorPage />
      ) : (
        <>
          <main className="h-dvh flex justify-center items-center flex-col gap-10">
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
                <div className="card-body"></div>
              </div>
            </div>
            <aside>
              <div className="md:stats shadow stats-vertical">
                <div className="stat">
                  <div className="stat-figure text-secondary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block h-8 w-8 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  <div className="stat-title">Total Parcels</div>
                  <div className="stat-value text-center">{totalParcels}</div>
                  <div className="stat-desc">{StatDate(startDate)} - {StatDate(endDate)}</div>
                </div>

                <div className="stat">
                  <div className="stat-figure text-secondary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block h-8 w-8 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                      ></path>
                    </svg>
                  </div>
                  <div className="stat-title">Cancelled Parcels</div>
                  <div className="stat-value text-center">{cancelledParcels}</div>
                  <div className="stat-desc text-center">{percentageRatio(cancelledParcels as number, totalParcels as number)}</div>
                </div>

                <div className="stat">
                  <div className="stat-figure text-secondary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block h-8 w-8 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                      ></path>
                    </svg>
                  </div>
                  <div className="stat-title">Delivered Parcels</div>
                  <div className="stat-value text-center">{deliveredParcels}</div>
                  <div className="stat-desc text-center">{percentageRatio(deliveredParcels as number, totalParcels as number)}</div>
                </div>
              </div>
            </aside>
          </main>
        </>
      )}
    </>
  );
}

export default AdminDash;
