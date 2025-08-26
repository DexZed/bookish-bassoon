import Skeleton from "../../components/Skeleton"
import { useAppSelector } from "../../features/app/hooks"
import { useGetSenderParcelsQuery } from "../../features/sender/senderApiSlice"
import CustomErrorPage from "../AppError"



function Parcels() {
  const selector = useAppSelector((state) => state.auth)

  const {} = useGetSenderParcelsQuery(selector.)
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
                {/* <tbody>
                  {data?.parcels.map((parcel, idx) => (
                    <tr key={idx}>
                      <th>{parcel.trackingId}</th>
                      <td>{parcel.sender}</td>
                      <td>{parcel.receiver}</td>
                      <td>{parcel.type}</td>
                      <td>{parcel.status}</td>
                      <td>{parcel.pickupAddress}</td>
                      <td>{parcel.deliveryAddress}</td>

                      <td className="flex gap-2 flex-col">
                        <button onClick={() => handleBlock(parcel._id)} disabled={parcel.isBlocked} className="btn btn-warning btn-outline btn-xs rounded-full">
                          Block
                        </button>
                        <button onClick={() => handleUnblock(parcel._id)} disabled={!parcel.isBlocked} className="btn btn-info btn-outline btn-xs rounded-full">
                          Unblock
                        </button>
                        <Link to={`/status/${parcel._id}`} className="btn btn-primary btn-outline btn-xs rounded-full">
                          Update
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody> */}
              </table>
            </div>
          </article>
        </>
      )}
    </>
  )
}

export default Parcels