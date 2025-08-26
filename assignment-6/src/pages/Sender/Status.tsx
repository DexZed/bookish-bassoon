import { useParams } from "react-router";
import { useSenderStatusLogQuery } from "../../features/sender/senderApiSlice";
import Skeleton from "../../components/Skeleton";
import CustomErrorPage from "../AppError";

function Status() {
  const { parcelId } = useParams();
  const { data, isLoading, error } = useSenderStatusLogQuery(
    parcelId as string
  );
  console.log(parcelId);
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
          <div className="card w-96 bg-base-100 shadow-sm">
            <div className="card-body">
              <span className="badge badge-xs badge-warning">Most Popular</span>
              <div className="flex justify-between">
                <h2 className="text-3xl font-bold">Parcel ID: {data?._id}</h2>
                <span className="text-xl">$29/mo</span>
              </div>
              <ul className="mt-6 flex flex-col gap-2 text-xs">
                <li>
                  <span>High-resolution image generation</span>
                </li>
                <li>
                  <span>Customizable style templates</span>
                </li>
                <li>
                  <span>Batch processing capabilities</span>
                </li>
                <li>
                  <span>AI-driven image enhancements</span>
                </li>
                <li className="opacity-50">
                  <span className="line-through">
                    Seamless cloud integration
                  </span>
                </li>
                <li className="opacity-50">
                  <span className="line-through">
                    Real-time collaboration tools
                  </span>
                </li>
              </ul>
              <div className="mt-6">
                <button className="btn btn-primary btn-block">Go Back</button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
export default Status;
