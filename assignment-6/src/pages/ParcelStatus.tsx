import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router";
import type { Parcel, ParcelsResponse } from "../interfaces/globalInterfaces";
import Skeleton from "../components/Skeleton";
import CustomErrorPage from "./AppError";
import { useGetUserByIdQuery } from "../features/public/publicApiSlice";
import { formatDate } from "../utilities/utils";

function ParcelStatus() {
  const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
  const { trkID } = useParams();

  const { data, error, isLoading } = useQuery({
    queryKey: ["parcel-status", trkID],
    queryFn: async () => {
      const result = await axios.get(
        `${BASE_URL}/search-parcels?trackingId=${trkID}`
      );
      return result.data as ParcelsResponse;
    },
  });
  const parcel = data?.parcels[0] as Parcel;
  console.log(data);
  const { data: sender } = useGetUserByIdQuery(parcel?.sender as string);
  const { data: receiver } = useGetUserByIdQuery(parcel?.receiver as string);

  return (
    <>
      {isLoading ? (
        <Skeleton />
      ) : error ? (
        <CustomErrorPage error={JSON.stringify(error.message)} />
      ) : (
        <>
          <div className="h-dvh flex justify-center items-center gap-4">
            <div className="card w-96 bg-base-100 shadow-sm">
              <div className="card-body">
                <span className="badge badge-xs badge-warning">
                  {parcel.type}
                </span>
                <div className="flex justify-between">
                  <h2 className="text-xl md:text-3xl font-bold ">
                    <div className="tooltip" data-tip={`${parcel._id}`}>
                      <button className="btn">
                        {parcel._id.slice(0, 10) + "..."}
                      </button>
                    </div>
                  </h2>
                  <span className="text-xl">${parcel.fee}</span>
                </div>
                <ul className="mt-6 flex flex-col gap-2 text-xs">
                  <li>
                    <span>Tracking ID: {parcel.trackingId}</span>
                  </li>
                  <li>
                    <span>Sender: {sender?.user.name}</span>
                  </li>
                  <li>
                    <span>Receiver: {receiver?.user.name}</span>
                  </li>
                  <li>
                    <span>Status: {parcel.status}</span>
                  </li>
                  <li>
                    <span>Weight: {parcel.weight} kg</span>
                  </li>
                  <li>
                    <span>Pickup Address: {parcel.pickupAddress}</span>
                  </li>
                  <li>
                    <span>Delivery Address: {parcel.deliveryAddress}</span>
                  </li>
                  <li className="opacity-50">
                    <span>
                      Delivery Date: {formatDate(parcel.deliveryDate)}
                    </span>
                  </li>
                  <li className="opacity-50">
                    <span>Created At : {formatDate(parcel.createdAt)}</span>
                  </li>
                </ul>
                <div>
                  <h3 className="text-center mt-6">Status Logs</h3>
                  {parcel.statusLogs
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
                  <Link to={"/search"} className="btn btn-neutral btn-block">
                    Go Back
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ParcelStatus;
