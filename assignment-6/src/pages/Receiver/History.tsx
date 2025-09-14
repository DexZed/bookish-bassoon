import Skeleton from "../../components/Skeleton";
import { useAppSelector } from "../../features/app/hooks";
import { useGetHistoryQuery } from "../../features/receiver/receiverApiSlice";
import usePaginate from "../../hooks/paginate";
import CustomErrorPage from "../AppError";

function History() {
  const selector = useAppSelector((state) => state.auth);
  const { data, isLoading, error } = useGetHistoryQuery({
    id: selector.id as string,
    status: "Delivered",
  });
  const { visibleData, isdisabled, handleLoadMore } = usePaginate(
    data?.parcels
  );
  return (
    <>
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
                Receiver Parcels
              </h2>
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>TRK ID</th>
                      <th>Sender ID</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Pickup Location</th>
                      <th>Delivery Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleData.map((parcel, idx) => (
                      <tr key={idx}>
                        <th>{parcel.trackingId}</th>
                        <td>{parcel.sender}</td>
                        <td>{parcel.type}</td>
                        <td>{parcel.status}</td>
                        <td>{parcel.pickupAddress}</td>
                        <td>{parcel.deliveryAddress}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-center items-center m-4 gap-2">
                  <button
                    disabled={isdisabled}
                    className="btn btn-outline btn-info rounded-full"
                    onClick={handleLoadMore}
                  >
                    Load More
                  </button>
                </div>
              </div>
            </article>
          </>
        )}
      </>
    </>
  );
}

export default History;
