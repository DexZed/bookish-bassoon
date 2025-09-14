import { Link } from "react-router";
import Skeleton from "../../components/Skeleton";
import { useAppSelector } from "../../features/app/hooks";
import {
  useCancelSenderParcelMutation,
  useGetSenderParcelsQuery,
} from "../../features/sender/senderApiSlice";
import { showSuccessAlert, showErrorAlert } from "../../utilities/utils";
import CustomErrorPage from "../AppError";
import usePaginate from "../../hooks/paginate";

function Parcels() {
  
  const selector = useAppSelector((state) => state.auth);
  const [parcelCancel] = useCancelSenderParcelMutation();
  const { data, isLoading, error } = useGetSenderParcelsQuery(
    selector.id as string,
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );
  const invalidStatuses = new Set([
    "Requested",
    "Dispatched",
    "In Transit",
    "Cancelled",
  ]);
  const { visibleData, isdisabled, handleLoadMore } = usePaginate(data?.parcels);
  async function handleCancel(id: string) {
    try {
      await parcelCancel(id);
      showSuccessAlert("Success", "Parcel canceled successfully");
    } catch (error) {
      console.error(error);
      showErrorAlert("Error", "Something went wrong while canceling parcel");
    }
  }
  return (
    <>
      {isLoading ? (
        <>
          <Skeleton />
        </>
      ) : error ? (
        <>
          <CustomErrorPage />
        </>
      ) : (
        <>
          <article>
            <h2 className="text-3xl font-bold text-center mb-4 mt-4">
              Sender Parcels
            </h2>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>TRK ID</th>
                    <th>Sender ID</th>
                    <th>Receiver ID</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Pickup Location</th>
                    <th>Delivery Location</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleData.map((parcel, idx) => (
                    <tr key={idx}>
                      <th>{parcel.trackingId}</th>
                      <td>{parcel.sender}</td>
                      <td>{parcel.receiver}</td>
                      <td>{parcel.type}</td>
                      <td>{parcel.status}</td>
                      <td>{parcel.pickupAddress}</td>
                      <td>{parcel.deliveryAddress}</td>
                      <td className="flex justify-between gap-2">
                        <Link
                          className="btn btn-outline btn-info rounded-4xl"
                          to={`/sender/status/${parcel._id}`}
                        >
                          Status Details
                        </Link>

                        {(() => {
                          const isInvalid = invalidStatuses.has(parcel.status);
                          return (
                            <div
                              className={isInvalid ? "tooltip" : undefined}
                              data-tip={
                                isInvalid
                                  ? "Only allowed if status is not Requested, Dispatched, In Transit or Cancelled"
                                  : undefined
                              }
                            >
                              <button
                                disabled={isInvalid}
                                onClick={() => handleCancel(parcel._id)}
                                className="btn btn-outline btn-warning rounded-4xl"
                              >
                                Cancel
                              </button>
                            </div>
                          );
                        })()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-center items-center m-4 gap-2">
                <button disabled={isdisabled} className="btn btn-outline btn-info rounded-full" onClick={handleLoadMore}>
                  Load More
                </button>
              </div>
            </div>
          </article>
        </>
      )}
    </>
  );
}

export default Parcels;
