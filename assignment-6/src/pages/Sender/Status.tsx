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
                </ul>
                <div>
                  <h3 className="text-center mt-6">Status Logs</h3>
                  {data?.parcel.statusLogs
                    .slice()
                    .sort(
                      (a, b) =>
                        new Date(b.updatedAt).getTime() -
                        new Date(a.updatedAt).getTime()
                    )
                    .map((log, i) => (
                      <div
                        key={i}
                        className="collapse collapse-arrow bg-base-100 border border-base-300"
                      >
                        <input
                          type="radio"
                          name="my-accordion-2"
                          defaultChecked
                        />
                        <div className="collapse-title font-semibold">
                          Updated Date : {formatDate(log.updatedAt)}
                        </div>
                        <div className="collapse-content text-sm">
                          Status : {log.status} <br /> Location : {log.location}{" "}
                          <br />
                          Description : {log.note}
                        </div>
                      </div>
                    ))}
                </div>
                <div className="mt-6">
                  <Link
                    to={"/sender/parcels"}
                    className="btn btn-info btn-outline w-full"
                  >
                    Go Back
                  </Link>
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
