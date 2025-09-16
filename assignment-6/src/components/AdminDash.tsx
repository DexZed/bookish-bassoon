import { useAppSelector } from "../features/app/hooks";
import { useGetParcelsQuery } from "../features/parcel/parcelApiSlice";
import { useGetUsersQuery } from "../features/users/userApiSlice";
import CustomErrorPage from "../pages/AppError";
import { percentageRatio, StatDate } from "../utilities/utils";
import BarChartTable from "./BarChartTable";
import Skeleton from "./Skeleton";

function AdminDash() {
  const selector = useAppSelector((state) => state.auth);
  const { data, isLoading, error } = useGetParcelsQuery(undefined);
  const { data: users } = useGetUsersQuery(undefined);
  const totalParcels = data?.parcels.length;
  const startDate = data?.parcels[0]?.createdAt;
  const totalUsers = users?.users.length;
  const senderCount = users?.users.filter(
    (user) => user.role === "sender"
  ).length;
  const receiverCount = users?.users.filter(
    (user) => user.role === "receiver"
  ).length;
  const endDate = data?.parcels[data?.parcels.length - 1]?.createdAt;
  const cancelledParcels = data?.parcels.filter(
    (parcel) => parcel.status === "Cancelled"
  ).length;
  const deliveredParcels = data?.parcels.filter(
    (parcel) => parcel.status === "Delivered"
  ).length;
  const inTransitParcels = data?.parcels.filter(
    (parcel) => parcel.status === "In Transit"
  ).length;
  const pendingParcels = data?.parcels.filter(
    (parcel) => parcel.status === "Pending"
  ).length;
  const dispatchedParcels = data?.parcels.filter(
    (parcel) => parcel.status === "Dispatched"
  ).length;
  const approvedParcels = data?.parcels.filter(
    (parcel) => parcel.status === "Approved"
  ).length;
  const returnedPArcels = data?.parcels.filter(
    (parcel) => parcel.status === "Returned"
  ).length;

  const statusData = [
    { name: "Returned", Parcel: returnedPArcels as number },
    { name: "Cancelled", Parcel: cancelledParcels as number },
    { name: "Delivered", Parcel: deliveredParcels as number },
    { name: "In Transit", Parcel: inTransitParcels as number },
    { name: "Pending", Parcel: pendingParcels as number },

    { name: "Dispatched", Parcel: dispatchedParcels as number },
    { name: "Approved", Parcel: approvedParcels as number },

    { name: "Total Parcels", Parcel: totalParcels as number },
  ];

  return (
    <>
      {isLoading ? (
        <Skeleton />
      ) : error ? (
        <CustomErrorPage />
      ) : (
        <>
          <main className="h-dvh flex justify-center items-center flex-col gap-10 m-6">
            <div className="stack size-64 mt-10 md:mt-0">
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
                  <div className="stat-desc">
                    {StatDate(startDate)} - {StatDate(endDate)}
                  </div>
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
                  <div className="stat-title">Total Senders</div>
                  <div className="stat-value text-center">{senderCount}</div>
                  <div className="stat-desc text-center">
                    {percentageRatio(
                      senderCount as number,
                      totalUsers as number
                    )}
                  </div>
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
                  <div className="stat-title">Total Receivers</div>
                  <div className="stat-value text-center">{receiverCount}</div>
                  <div className="stat-desc text-center">
                    {percentageRatio(
                      receiverCount as number,
                      totalUsers as number
                    )}
                  </div>
                </div>
              </div>
            </aside>
            <article className="w-full h-64">
              <BarChartTable data={statusData} dataKey="Parcel"></BarChartTable>
            </article>
          </main>
        </>
      )}
    </>
  );
}

export default AdminDash;
