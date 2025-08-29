
// TODO: ADD functionality and styling

import Skeleton from "../../components/Skeleton"
import { useAppSelector } from "../../features/app/hooks"
import { useApproveParcelMutation, useGetIncomingQuery } from "../../features/receiver/receiverApiSlice"
import { showErrorAlert, showSuccessAlert } from "../../utilities/utils"
import CustomErrorPage from "../AppError"


function Incoming() {
  const selector = useAppSelector((state) => state.auth)
  const {data, isLoading, error} = useGetIncomingQuery(selector.id as string,{
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  })
  const [approve] = useApproveParcelMutation();
  async function acceptParcel(id: string) {
    try {
      await approve({ id, payload: { status: "Delivered" } }).unwrap();
      showSuccessAlert("Success", "Parcel marked as Delivered")
    } catch (error: any) {
      showErrorAlert("Error", error.data.message  as string)
      console.error(error);
    }
  }
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
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.parcels.map((parcel, idx) => (
                        <tr key={idx}>
                          <th>{parcel.trackingId}</th>
                          <td>{parcel.sender}</td>
                          <td>{parcel.type}</td>
                          <td>{parcel.status}</td>
                          <td>{parcel.pickupAddress}</td>
                          <td>{parcel.deliveryAddress}</td>
                          <td><button onClick={() => acceptParcel(parcel._id)} className="btn btn-success btn-outline rounded-4xl">Approve</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>
            </>
          )}
        </>
    </>
  )
}

export default Incoming