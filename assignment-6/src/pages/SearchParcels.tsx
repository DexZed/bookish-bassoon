import { useForm, type SubmitHandler } from "react-hook-form";
import InputLayout from "../components/InputLayout";
import SelectorLayout from "../components/SelectorLayout";
import type { SearchFields } from "../interfaces/globalInterfaces";

type Props = {};

function SearchParcels({}: Props) {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SearchFields>();
  const onSubmit: SubmitHandler<SearchFields> = async (data) => {
    console.log(data);
    try {
    } catch (error) {
      setError("root", {
        type: "FormError",
        message: "Something went wrong",
      });
      console.error(error);
    }
  };
  return (
    <>
      <main>
        <aside>
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset>
              <legend className="text-center text-2xl font-bold ">
                Search
              </legend>
              <div className="flex justify-between m-6 ">
                <InputLayout
                  description="Tracking ID"
                  errorDescription={
                    errors.trackingId && `${errors.trackingId?.message}`
                  }
                >
                  <input
                    {...register("trackingId")}
                    type="text"
                    className="input input-accent"
                    placeholder="TRK-YYYYMMDD-xxxxxx"
                  />
                </InputLayout>
                <SelectorLayout
                  description="Status"
                  errorDescription={errors.status && `${errors.status?.message}`}
                >
                  <select
                    {...register("status")}
                    className="select select-primary"
                    required
                  >
                    <option disabled>Status Type</option>
                    <option value={"Requested"}>Requested</option>
                    <option value={"Approved"}>Approved</option>
                    <option value={"Dispatched"}>Dispatched</option>
                    <option value={"In Transit"}>In Transit</option>
                    <option value={"Delivered"}>Delivered</option>
                    <option value={"Cancelled"}>Cancelled</option>
                    <option value={"Returned"}>Returned</option>
                    
                  </select>
                </SelectorLayout>
                <SelectorLayout
                  description="Sort"
                  errorDescription={errors.sort && `${errors.sort?.message}`}
                >
                  <select
                    {...register("sort")}
                    className="select select-secondary "
                    required
                  >
                    <option disabled>Sort by Date</option>
                    <option value={"asd"}>Ascending</option>
                    <option value={"dsc"}>Descending</option>
                  </select>
                </SelectorLayout>
                <div className="flex place-self-center translate-y-3">
                  <button type="submit" className="btn btn-primary btn-outline">
                   {isSubmitting ? "Searching..." : "Search"}
                  </button>
                </div>
              </div>
            </fieldset>
          </form>
        </aside>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Tracking ID</th>
                <th>Sender</th>
                <th>Receiver</th>
                <th>Status</th>
                <th>Fee</th>
                <th>Type</th>
                <th>Pickup Address</th>
                <th>Delivery Address</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {/* row 2 */}
              <tr className="hover:bg-base-300">
                <th>1232141</th>
                <td>Hart Hagerty</td>
                <td>Desktop Support Technician</td>
                <td>Purple</td>
                <td>200</td>
                <td>Other</td>
                <td>123 avenue</td>
                <td>456 avenue</td>
                <td>26th May 2023</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}

export default SearchParcels;
