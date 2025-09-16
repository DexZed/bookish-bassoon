import { Link } from "react-router";
import Skeleton from "../../components/Skeleton";
import { useBlockParcelMutation, useGetParcelsQuery, useUnblockParcelMutation } from "../../features/parcel/parcelApiSlice";
import { showErrorAlert, showSuccessAlert } from "../../utilities/utils";
import CustomErrorPage from "../AppError";
import { useState } from "react";


function AllParcels() {
  const { data, isLoading, error } = useGetParcelsQuery(undefined);
  const [block] = useBlockParcelMutation();
  const [unblock] = useUnblockParcelMutation();
  const [visibleCount, setVisibleCount] = useState(3);
  const parcels = data?.parcels || [];
  const visibleParcels = parcels.slice(0, visibleCount);
  
  async function handleBlock(id: string) {
    try {
      await block(id).unwrap();
      showSuccessAlert("Parcel Blocked", "Parcel Blocked Successfully");
    } catch (error) {
      console.error(error);
      showErrorAlert('Error', 'Something went wrong while blocking the parcel')
    }
  }
  async function handleUnblock(id: string){
    try {
      await unblock(id);
    showSuccessAlert("Parcel Unblocked", "Parcel Unblocked Successfully");
    } catch (error) {
      console.error(error);
      showErrorAlert('Error', 'Something went wrong while unblocking the parcel')
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
              All Parcels
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
                  {visibleParcels.map((parcel, idx) => (
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
                        <Link to={`/admin/status/${parcel._id}`} className="btn btn-primary btn-outline btn-xs rounded-full">
                          Update
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
               <div className="flex justify-center items-center m-4 gap-2">
                <button disabled={visibleCount >= parcels.length} className="btn btn-outline btn-info rounded-full" onClick={() => setVisibleCount((prev) => prev + 10)}>
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

export default AllParcels;
