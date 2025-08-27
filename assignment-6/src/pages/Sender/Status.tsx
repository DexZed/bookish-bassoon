import { Link, useParams } from "react-router";
import { useSenderStatusLogQuery } from "../../features/sender/senderApiSlice";
import Skeleton from "../../components/Skeleton";
import CustomErrorPage from "../AppError";
import { formatDate } from "../../utilities/utils";

function Status() {
  const { parcelId } = useParams();
  const { data, isLoading, error } = useSenderStatusLogQuery(
    parcelId as string
  );

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
          <article className="h-dvh flex justify-center items-center">
            <div className="card w-96 bg-base-100 shadow-sm">
              <div className="card-body">
                <span className="badge badge-xs badge-warning">
                  Type: <span className="font-bold">{data?.parcel.type}</span>
                </span>
                <div className="flex justify-between">
                  <h2 className="text-3xl font-bold text-wrap">
                    ID: {data?.parcel._id}
                  </h2>
                  <span className="text-xl">${data?.parcel.fee}</span>
                </div>
                <ul className="mt-6 flex flex-col gap-2 text-xs">
                  <li>
                    <span>Receiver: {data?.parcel.receiver}</span>
                  </li>
                  <li>
                    <span>Status : {data?.parcel.status}</span>
                  </li>
                  <li>
                    <span>Pickup Location: {data?.parcel.pickupAddress}</span>
                  </li>
                  <li>
                    <span>
                      Delivery Location: {data?.parcel.deliveryAddress}
                    </span>
                  </li>
                  <li className="opacity-50">
                    <span>
                      Delivery Date : {formatDate(data?.parcel.deliveryDate)}
                    </span>
                  </li>
                  <li className="opacity-50">
                    <ul className="list bg-base-100 rounded-box shadow-md">
                      <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
                        Status Logs
                      </li>
                      {data?.parcel.statusLogs.map((log, idx) => (
                        <li className="list-row flex" key={idx}>
                          <div className="flex gap-2 flex-col">
                            <div>Status</div>
                            <div className="text-xs uppercase font-semibold opacity-60">
                              {log.status}
                            </div>
                            <div>Location</div>
                            <div className="text-xs uppercase font-semibold opacity-60">
                              {log.location}
                            </div>
                          </div>
                          <p className="list-col-wrap text-xs">
                            Note : {log.note}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
                <div className="mt-6">
                  <Link to={'/sender/parcels'} className="btn btn-neutral btn-outline invert w-full">Go Back</Link >
                </div>
              </div>
            </div>
          </article>
        </>
      )}
    </>
  );
}
export default Status;
